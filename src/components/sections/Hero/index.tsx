import { forwardRef } from "react";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { Github, ArrowDown, Link as LinkIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import ReactiveBackground from "./ReactiveBackground";
import "./Hero.scss";

const LAST_UPDATED = "2025.11";

const Hero = forwardRef<HTMLElement>((_props, ref) => {
	const { t } = useTranslation("hero");
	const { t: tCommon } = useTranslation("common");
	const eyebrowText = t("eyebrow");
	const titleHighlight = t("title.highlight");
	const titleLineTwo = t("title.line2");
	const descriptionText = t("description");
	const updatedLabel = t("meta.updated", { date: LAST_UPDATED });

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
						{eyebrowText}
					</motion.span>
					<motion.h1 className="hero-new__title" variants={itemVariants}>
						<span className="gradient-text">{titleHighlight}</span>
						<br />
						{titleLineTwo}
					</motion.h1>

					<motion.p className="hero-new__subtitle" variants={itemVariants}>
						{descriptionText}
					</motion.p>

							<motion.div className="hero-new__channels" variants={itemVariants}>
								<motion.a
									href="https://github.com/woodong-222"
									target="_blank"
									rel="noopener noreferrer"
									className="channel-btn primary"
									whileHover={{ y: -2, scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<Github size={18} />
									GitHub
								</motion.a>
								<motion.a
									href="https://velog.io/@woo2083/posts"
									target="_blank"
									rel="noopener noreferrer"
									className="channel-btn ghost"
									whileHover={{ y: -2, scale: 1.02 }}
									whileTap={{ scale: 0.98 }}
								>
									<LinkIcon size={18} />
									{tCommon('buttons.blog')}
								</motion.a>
							</motion.div>

					<motion.div className="hero-new__meta" variants={itemVariants}>
						{updatedLabel}
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
