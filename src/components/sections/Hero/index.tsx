import { forwardRef } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Github, ExternalLink, ArrowDown, Link as LinkIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import ReactiveBackground from "./ReactiveBackground";
import "./Hero.scss";

const Hero = forwardRef<HTMLElement>((_props, ref) => {
	const { t } = useTranslation("hero");

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

	return (
		<section ref={ref} className="hero-new" id="hero">
			<ReactiveBackground />
			<div className="hero-new__container">
				<motion.div
					className="hero-new__content"
					variants={containerVariants}
					initial="hidden"
					animate="visible"
				>
						{/* Left Side - Text Content */}
						<div className="hero-new__text">
							<motion.span
								className="hero-new__eyebrow"
								variants={itemVariants}
							>
								Security · Fullstack · Cloud
							</motion.span>
							<motion.h1 className="hero-new__title" variants={itemVariants}>
								<span className="gradient-text">세상을 바꾸는 한사람</span>
								<br />
								‘이동우’를 소개합니다.
							</motion.h1>

							<motion.p className="hero-new__subtitle" variants={itemVariants}>
								정보보안 전문가 및 보안 제품 개발자를 목표로 공부 중인 대학생으로
								보안제품 개발, 클라우드 보안, 웹 개발 및 보안 등 다양한 분야에서
								깊이 있는 지식을 쌓아가고 있습니다.
							</motion.p>

							<motion.div className="hero-new__channels" variants={itemVariants}>
								<motion.a
									href="https://github.com/woodong-222"
									className="channel-btn primary"
									whileHover={{ y: -2, scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<Github size={18} />
									GitHub
								</motion.a>
								<motion.a
									href="https://velog.io/@woo2083/posts"
									className="channel-btn ghost"
									whileHover={{ y: -2, scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<LinkIcon size={18} />
									기술 블로그
								</motion.a>
							</motion.div>

							<motion.div className="hero-new__meta" variants={itemVariants}>
								업데이트: 2025.11
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
							glareEnable
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
