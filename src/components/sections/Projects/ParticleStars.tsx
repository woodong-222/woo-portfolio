import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CustomStars = () => {
	const pointsRef = useRef<THREE.Points>(null!);
	const count = 350;

	const [positions, randoms, colors] = useMemo(() => {
		const pos = new Float32Array(count * 3);
		const rand = new Float32Array(count);
		const col = new Float32Array(count);
		for (let i = 0; i < count; i++) {
			pos[i * 3 + 0] = (Math.random() - 0.5) * 60;
			pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
			pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
			rand[i] = Math.random();
			// 약 15% 확률로 파란색(1.0), 나머지는 하얀색(0.0)
			col[i] = Math.random() > 0.85 ? 1.0 : 0.0;
		}
		return [pos, rand, col];
	}, []);

	const uniforms = useMemo(
		() => ({
			uTime: { value: 0 },
			uBlueColor: { value: new THREE.Color('#96b4ff') },
			uWhiteColor: { value: new THREE.Color('#ffffff') },
		}),
		[]
	);

	useFrame((state) => {
		if (pointsRef.current) {
			pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.012;
			pointsRef.current.rotation.z = state.clock.getElapsedTime() * 0.004;
			(pointsRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value =
				state.clock.getElapsedTime();
		}
	});

	return (
		<points ref={pointsRef}>
			<bufferGeometry>
				<bufferAttribute
					attach="attributes-position"
					args={[positions, 3]}
				/>
				<bufferAttribute
					attach="attributes-aRandom"
					args={[randoms, 1]}
				/>
				<bufferAttribute
					attach="attributes-aColorType"
					args={[colors, 1]}
				/>
			</bufferGeometry>
			<shaderMaterial
				transparent
				depthWrite={false}
				blending={THREE.AdditiveBlending}
				uniforms={uniforms}
				vertexShader={`
          uniform float uTime;
          attribute float aRandom;
          attribute float aColorType;
          varying float vAlpha;
          varying float vColorType;
          void main() {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            vec4 viewPosition = viewMatrix * modelPosition;
            gl_Position = projectionMatrix * viewPosition;
            
            float twinkle = sin(uTime * (aRandom * 0.8 + 0.3) + aRandom * 20.0) * 0.5 + 0.5;
            vAlpha = 0.3 + twinkle * 1.2;
            vColorType = aColorType;
            
            gl_PointSize = (280.0 * aRandom + 120.0) * twinkle * (1.0 / - viewPosition.z);
          }
        `}
				fragmentShader={`
          uniform vec3 uBlueColor;
          uniform vec3 uWhiteColor;
          varying float vAlpha;
          varying float vColorType;
          void main() {
            vec2 uv = gl_PointCoord;
            float distanceToCenter = distance(uv, vec2(0.5));
            
            float strength = 0.04 / distanceToCenter - 0.08;
            strength = clamp(strength, 0.0, 1.0);
            
            // vColorType에 따라 하얀색과 파란색을 섞음
            vec3 finalColor = mix(uWhiteColor, uBlueColor, vColorType);
            
            gl_FragColor = vec4(finalColor, strength * vAlpha);
          }
        `}
			/>
		</points>
	);
};

export const ParticleStars = () => {
	return (
		<div className="projects-stack__canvas">
			<Canvas camera={{ position: [0, 0, 10] }}>
				<CustomStars />
			</Canvas>
		</div>
	);
};
