import { forwardRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Tilt from "react-parallax-tilt";
import { Github, ExternalLink, Mail, ArrowDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import "./Hero.scss";

const Hero = forwardRef<HTMLElement>((_props, ref) => {
	const { t, i18n } = useTranslation("hero");
	
	// 마우스 위치 추적
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			// 화면 중앙을 기준으로 -1 ~ 1 범위로 정규화
			const x = (e.clientX / window.innerWidth - 0.5) * 2;
			const y = (e.clientY / window.innerHeight - 0.5) * 2;
			setMousePosition({ x, y });
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.15,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 30, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { duration: 0.8 },
		},
	};

	const floatingVariants = {
		animate: {
			y: [0, -20, 0],
			transition: {
				duration: 3,
				repeat: Infinity,
			},
		},
	};

	const skills = [
		{ icon: "🔐", text: t("skills.security"), color: "#10b981" },
		{ icon: "💻", text: t("skills.fullstack"), color: "#6366f1" },
		{ icon: "☁️", text: t("skills.cloud"), color: "#06b6d4" },
		{ icon: "🎨", text: t("skills.uiux"), color: "#ec4899" },
		{ icon: "⚡", text: t("skills.performance"), color: "#8b5cf6" },
	];

	return (
		<section ref={ref} className="hero-new" id="hero">
			{/* Floating Background Shapes with Parallax */}
			<div className="floating-shapes">
				<motion.div
					className="shape shape-1"
					animate={{
						x: [0, 30, 0],
						y: [0, -50, 0],
						rotate: [0, 90, 0],
					}}
					transition={{ duration: 20, repeat: Infinity }}
					style={{
						transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
					}}
				/>
				<motion.div
					className="shape shape-2"
					animate={{
						x: [0, -40, 0],
						y: [0, 60, 0],
						rotate: [0, -90, 0],
					}}
					transition={{ duration: 15, repeat: Infinity }}
					style={{
						transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
					}}
				/>
				<motion.div
					className="shape shape-3"
					animate={{
						x: [0, 20, 0],
						y: [0, -30, 0],
						scale: [1, 1.2, 1],
					}}
					transition={{ duration: 18, repeat: Infinity }}
					style={{
						transform: `translate(${mousePosition.x * 15}px, ${mousePosition.y * 15}px)`,
					}}
				/>
			</div>

			<div className="hero-new__container">
				<motion.div
					className="hero-new__content"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
					{/* Left Side - Text Content */}
					<div className="hero-new__text">
						<motion.h1 className="hero-new__title" variants={itemVariants}>
							<TypeAnimation
								key={i18n.language}
								sequence={[
									t("typing.security"),
									2000,
									t("typing.fullstack"),
									2000,
									t("typing.solver"),
									2000,
									t("typing.innovator"),
									2000,
								]}
								wrapper="span"
								speed={50}
								repeat={Infinity}
								className="typing-text"
							/>
							<br />
							<span className="gradient-text">{t("name")}</span>{t("nameEnd")}
						</motion.h1>

						<motion.p className="hero-new__subtitle" variants={itemVariants}>
							{t("subtitle")}
							<br />
							<span className="highlight-text">
								{t("highlight")}
							</span>
						</motion.p>

						<motion.div className="hero-new__buttons" variants={itemVariants}>
							<motion.a
								href="#projects"
								className="btn-primary glass-btn"
								whileHover={{ scale: 1.05, y: -2 }}
								whileTap={{ scale: 0.95 }}
							>
								<span className="btn-content">
									{t("buttons.projects")}
								</span>
								<span className="btn-ripple" />
							</motion.a>

							<motion.a
								href="#thank-you"
								className="btn-secondary glass-btn"
								whileHover={{ scale: 1.05, y: -2 }}
								whileTap={{ scale: 0.95 }}
							>
								<span className="btn-content">
									<Mail size={18} />
									{t("buttons.contact")}
								</span>
								<span className="btn-ripple" />
							</motion.a>
						</motion.div>

						<motion.div className="hero-new__skills" variants={itemVariants}>
							{skills.map((skill, index) => (
								<motion.div
									key={skill.text}
									className="skill-badge"
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
									whileHover={{ scale: 1.1, y: -5 }}
									style={{ borderColor: skill.color }}
								>
									<span className="skill-icon">{skill.icon}</span>
									<span className="skill-text">{skill.text}</span>
								</motion.div>
							))}
						</motion.div>

						<motion.div className="hero-new__social" variants={itemVariants}>
							<motion.a
								href="https://github.com/woodong-222"
								target="_blank"
								rel="noopener noreferrer"
								className="social-link"
								whileHover={{ scale: 1.1, rotate: 5 }}
								whileTap={{ scale: 0.9 }}
							>
								<Github size={20} />
							</motion.a>
							<motion.a
								href="https://velog.io/@woo2083/posts"
								target="_blank"
								rel="noopener noreferrer"
								className="social-link"
								whileHover={{ scale: 1.1, rotate: -5 }}
								whileTap={{ scale: 0.9 }}
							>
								<ExternalLink size={20} />
							</motion.a>
						</motion.div>
					</div>

					{/* Right Side - Profile Image */}
					<motion.div
						className="hero-new__image"
						variants={itemVariants}
						animate={floatingVariants.animate}
					>
						<Tilt
							tiltMaxAngleX={10}
							tiltMaxAngleY={10}
							glareEnable={true}
							glareMaxOpacity={0.2}
							glareColor="#ffffff"
							glarePosition="all"
							scale={1.05}
						>
							<div className="image-container">
								<div className="image-glow" />
								<img
									src="/profile.jpeg"
									alt={t("profileAlt")}
									className="profile-image"
								/>
								<div className="image-border" />
							</div>
						</Tilt>
					</motion.div>
				</motion.div>

				{/* Scroll Indicator */}
				<motion.div
					className="scroll-indicator"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 1.5, duration: 0.8 }}
				>
					<motion.div
						animate={{ y: [0, 10, 0] }}
						transition={{ duration: 1.5, repeat: Infinity }}
					>
						<ArrowDown size={24} />
					</motion.div>
					<span>{t("scroll")}</span>
				</motion.div>
			</div>
		</section>
	);
});

Hero.displayName = "Hero";

export default Hero;
