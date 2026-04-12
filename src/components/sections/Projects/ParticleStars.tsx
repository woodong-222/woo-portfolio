import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const CustomStars = () => {
	const pointsRef = useRef<THREE.Points>(null!);
	const count = 350;

	const [positions, randoms] = useMemo(() => {
		const pos = new Float32Array(count * 3);
		const rand = new Float32Array(count);
		for (let i = 0; i < count; i++) {
			pos[i * 3 + 0] = (Math.random() - 0.5) * 60;
			pos[i * 3 + 1] = (Math.random() - 0.5) * 60;
			pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;
			rand[i] = Math.random();
		}
		return [pos, rand];
	}, []);

	const uniforms = useMemo(
		() => ({
			uTime: { value: 0 },
			uColor: { value: new THREE.Color('#96b4ff') },
		}),
		[]
	);

	useFrame((state) => {
		if (pointsRef.current) {
			pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.015;
			pointsRef.current.rotation.z = state.clock.getElapsedTime() * 0.005;
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
			</bufferGeometry>
			<shaderMaterial
				transparent
				depthWrite={false}
				blending={THREE.AdditiveBlending}
				uniforms={uniforms}
				vertexShader={`
          uniform float uTime;
          attribute float aRandom;
          varying float vAlpha;
          void main() {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
            vec4 viewPosition = viewMatrix * modelPosition;
            gl_Position = projectionMatrix * viewPosition;
            
            float twinkle = sin(uTime * (aRandom * 2.0 + 0.5) + aRandom * 10.0) * 0.5 + 0.5;
            vAlpha = twinkle * (0.8 + aRandom * 1.5);
            gl_PointSize = (120.0 * aRandom + 60.0) * twinkle * (1.0 / - viewPosition.z);
          }
        `}
				fragmentShader={`
          uniform vec3 uColor;
          varying float vAlpha;
          void main() {
            vec2 uv = gl_PointCoord;
            float distanceToCenter = distance(uv, vec2(0.5));
            
            float strength = 0.03 / distanceToCenter - 0.06;
            strength = clamp(strength, 0.0, 1.0);
            gl_FragColor = vec4(uColor, strength * vAlpha);
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
