import { forwardRef } from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import Tilt from "react-parallax-tilt";
import { Github, ExternalLink, Mail, ArrowDown } from "lucide-react";
import "./Hero.scss";

const Hero = forwardRef<HTMLElement>((props, ref) => {
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
			transition: { duration: 0.8, ease: "easeOut" },
		},
	};

	const floatingVariants = {
		animate: {
			y: [0, -20, 0],
			transition: {
				duration: 3,
				repeat: Infinity,
				ease: "easeInOut",
			},
		},
	};

	const skills = [
		{ icon: "🔐", text: "보안", color: "#10b981" },
		{ icon: "💻", text: "풀스택", color: "#6366f1" },
		{ icon: "☁️", text: "클라우드", color: "#06b6d4" },
		{ icon: "🎨", text: "UI/UX", color: "#ec4899" },
		{ icon: "⚡", text: "성능최적화", color: "#8b5cf6" },
	];

	return (
		<section ref={ref} className="hero-new" id="hero">
			{/* Floating Background Shapes */}
			<div className="floating-shapes">
				<motion.div
					className="shape shape-1"
					animate={{
						x: [0, 30, 0],
						y: [0, -50, 0],
						rotate: [0, 90, 0],
					}}
					transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
				/>
				<motion.div
					className="shape shape-2"
					animate={{
						x: [0, -40, 0],
						y: [0, 60, 0],
						rotate: [0, -90, 0],
					}}
					transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
				/>
				<motion.div
					className="shape shape-3"
					animate={{
						x: [0, 20, 0],
						y: [0, -30, 0],
						scale: [1, 1.2, 1],
					}}
					transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
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
						<motion.div className="greeting" variants={itemVariants}>
							👋 안녕하세요,
						</motion.div>

						<motion.h1 className="hero-new__title" variants={itemVariants}>
							<TypeAnimation
								sequence={[
									"보안 전문가이자",
									2000,
									"풀스택 개발자이자",
									2000,
									"문제 해결사이자",
									2000,
									"혁신을 추구하는",
									2000,
								]}
								wrapper="span"
								speed={50}
								repeat={Infinity}
								className="typing-text"
							/>
							<br />
							<span className="gradient-text">이동우</span>입니다
						</motion.h1>

						<motion.p className="hero-new__subtitle" variants={itemVariants}>
							안전하고 아름다운 웹을 만듭니다
							<br />
							<span className="highlight-text">
								Security · Performance · UX
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
									💼 프로젝트 보기
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
									연락하기
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
									alt="이동우 프로필"
									className="profile-image"
								/>
								<div className="image-border" />
							</div>
						</Tilt>

						{/* Floating Icons */}
						<div className="floating-icons">
							<motion.div
								className="icon-float icon-1"
								animate={{
									y: [0, -15, 0],
									rotate: [0, 10, 0],
								}}
								transition={{ duration: 3, repeat: Infinity }}
							>
								🔐
							</motion.div>
							<motion.div
								className="icon-float icon-2"
								animate={{
									y: [0, -20, 0],
									rotate: [0, -10, 0],
								}}
								transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
							>
								💻
							</motion.div>
							<motion.div
								className="icon-float icon-3"
								animate={{
									y: [0, -18, 0],
									rotate: [0, 15, 0],
								}}
								transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
							>
								🌐
							</motion.div>
							<motion.div
								className="icon-float icon-4"
								animate={{
									y: [0, -22, 0],
									rotate: [0, -15, 0],
								}}
								transition={{ duration: 4.5, repeat: Infinity, delay: 1.5 }}
							>
								☁️
							</motion.div>
						</div>
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
					<span>Scroll</span>
				</motion.div>
			</div>
		</section>
	);
});

Hero.displayName = "Hero";

export default Hero;
