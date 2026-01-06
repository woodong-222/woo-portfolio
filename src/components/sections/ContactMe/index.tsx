import { forwardRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import { Mail, MessageCircle, Github, Link as LinkIcon } from "lucide-react";
import { createVariants } from "@/utils/types/motion";
import { FLOATING_CONNECT_OPEN_EVENT } from "@/utils/constants/events";
import WaveDivider from "@/components/common/WaveDivider";
import "./ContactMe.scss";

const ContactMe = forwardRef<HTMLDivElement>((_, ref) => {
	const { ref: viewRef, inView } = useInView({ threshold: 0.2 });
	const { t } = useTranslation('contactMe');
	const currentYear = new Date().getFullYear();

	const containerVariants = createVariants({
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { delayChildren: 0.2, staggerChildren: 0.1 } },
	});

	const itemVariants = createVariants({
		hidden: { y: 20, opacity: 0 },
		visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
	});

	const handleConnectClick = () => {
		if (typeof window === "undefined") {
			return;
		}

		window.dispatchEvent(new Event(FLOATING_CONNECT_OPEN_EVENT));
	};

	return (
		<section className="contact section" id="contact-me" ref={ref}>
			{/* Projects → Contact 섹션 전환 물결 */}
			<WaveDivider color="#0f0f1a" className="projects-to-contact" flip />
			<motion.div
				ref={viewRef}
				className="contact__container container"
				variants={containerVariants}
				initial="hidden"
				animate={inView ? "visible" : "hidden"}
			>
				<motion.h2 className="section-title" variants={itemVariants}>
					{t('title')}
				</motion.h2>

				<div className="contact__grid">
					<motion.div className="contact__card" variants={itemVariants}>
						<div className="contact__eyebrow">
							<Mail size={16} /> {t('eyebrow')}
						</div>
						<p className="contact__lead">
							{t('lead')}
						</p>
						<p className="contact__desc">
							{t('desc')}
						</p>
					<button className="contact__cta" type="button" onClick={handleConnectClick}>
						Connect
					</button>
					</motion.div>

					<motion.div className="contact__info" variants={itemVariants}>
						<div className="info-row">
							<div className="info-icon">
								<MessageCircle size={16} />
							</div>
							<div>
								<p className="info-title">{t('quickContact')}</p>
								<p className="info-text">{t('quickContactDesc')}</p>
							</div>
						</div>
						<div className="info-row">
							<div className="info-icon">
								<Github size={16} />
							</div>
							<div>
								<p className="info-title">GitHub</p>
								<a className="info-link" href="https://github.com/woodong-222" target="_blank" rel="noreferrer">
									github.com/woodong-222
								</a>
							</div>
						</div>
						<div className="info-row">
							<div className="info-icon">
								<LinkIcon size={16} />
							</div>
							<div>
								<p className="info-title">{t('buttons.blog')}</p>
								<a className="info-link" href="https://velog.io/@woo2083/posts" target="_blank" rel="noreferrer">
									velog.io/@woo2083
								</a>
							</div>
						</div>
					</motion.div>
				</div>

				<motion.footer className="contact__footer" variants={itemVariants}>
					<p>Copyright © {currentYear} Woo. all rights reserved.</p>
				</motion.footer>
			</motion.div>
		</section>
	);
});

ContactMe.displayName = "ContactMe";

export default ContactMe;
