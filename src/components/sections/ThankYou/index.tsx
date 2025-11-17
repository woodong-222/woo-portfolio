import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Heart, Star, Rocket } from "lucide-react";
import { createVariants } from "@/utils/types/motion";
import "./ThankYou.scss";

const ThankYou = () => {
	const { t, i18n } = useTranslation("thankyou");
	const { ref, inView } = useInView({
		threshold: 0.3,
		triggerOnce: true,
	});

	const containerVariants = createVariants({
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.2,
			},
		},
	});

	const itemVariants = createVariants({
		hidden: { y: 30, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.8,
				ease: "easeOut" as const,
			},
		},
	});

	const floatingVariants = createVariants({
		animate: {
			y: [0, -10, 0],
			rotate: [0, 5, 0],
			transition: {
				duration: 3,
				repeat: Infinity,
				ease: "easeInOut" as const,
			},
		},
	});

	const currentYear = new Date().getFullYear();

	return (
		<section className="thank-you section" ref={ref}>
			<motion.div
				className="thank-you__container container"
				variants={containerVariants}
				initial="hidden"
				animate={inView ? "visible" : "hidden"}
			>
				<div className="thank-you__content">
					<motion.div className="floating-elements">
						<motion.div
							className="floating-item heart"
							variants={floatingVariants}
							animate="animate"
						>
							<Heart size={24} fill="currentColor" />
						</motion.div>
						<motion.div
							className="floating-item star"
							variants={floatingVariants}
							animate="animate"
							style={{ animationDelay: "1s" }}
						>
							<Star size={20} fill="currentColor" />
						</motion.div>
						<motion.div
							className="floating-item rocket"
							variants={floatingVariants}
							animate="animate"
							style={{ animationDelay: "2s" }}
						>
							<Rocket size={22} />
						</motion.div>
					</motion.div>

					<motion.div className="thank-you__main" variants={itemVariants}>
						<h2 className="thank-you__title">{t("title")}</h2>

						<motion.div
							className="thank-you__message"
							variants={itemVariants}
							whileHover={{ scale: 1.02 }}
							transition={{ duration: 0.3 }}
						>
							<p className="message-text">{t("message")}</p>
							<p className="description-text">{t("description")}</p>
						</motion.div>

						<motion.div
							className="growth-visualization"
							variants={itemVariants}
						>
							<div className="growth-path">
								<div className="growth-step current">
									<div className="step-dot"></div>
									<span className="step-label">
										{i18n.language === "ko" ? "현재" : "Now"}
									</span>
								</div>
								<div className="growth-line">
									<motion.div
										className="growth-progress"
										initial={{ width: 0 }}
										animate={inView ? { width: "100%" } : { width: 0 }}
										transition={{ duration: 2, delay: 1 }}
									></motion.div>
								</div>
								<div className="growth-step future">
									<div className="step-dot"></div>
									<span className="step-label">
										{i18n.language === "ko" ? "미래" : "Future"}
									</span>
								</div>
							</div>
							<p className="growth-text">
								{i18n.language === "ko"
									? "보안 전문가로의 여정이 계속됩니다"
									: "The journey to become a security expert continues"}
							</p>
						</motion.div>
					</motion.div>

					<motion.div className="social-links" variants={itemVariants}>
						<motion.a
							href="https://github.com/woodong-222"
							target="_blank"
							rel="noopener noreferrer"
							className="social-link github"
							whileHover={{ scale: 1.1, rotate: 5 }}
							whileTap={{ scale: 0.95 }}
						>
							<div className="social-icon">🐱</div>
							<span>GitHub</span>
						</motion.a>

						<motion.a
							href="https://velog.io/@woo2083/posts"
							target="_blank"
							rel="noopener noreferrer"
							className="social-link blog"
							whileHover={{ scale: 1.1, rotate: -5 }}
							whileTap={{ scale: 0.95 }}
						>
							<div className="social-icon">📝</div>
							<span>Blog</span>
						</motion.a>

						<motion.div
							className="social-link contact"
							whileHover={{ scale: 1.1, rotate: 3 }}
							whileTap={{ scale: 0.95 }}
						>
							<div className="social-icon">💬</div>
							<span>{i18n.language === "ko" ? "연락하기" : "Contact"}</span>
						</motion.div>
					</motion.div>

					<motion.footer className="thank-you__footer" variants={itemVariants}>
						<p className="copyright">{t("copyright", { year: currentYear })}</p>
					</motion.footer>
				</div>
			</motion.div>
		</section>
	);
};

export default ThankYou;
