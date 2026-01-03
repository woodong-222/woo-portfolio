import { forwardRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, MessageCircle, Github, Link as LinkIcon } from "lucide-react";
import { createVariants } from "@/utils/types/motion";
import { FLOATING_CONNECT_OPEN_EVENT } from "@/utils/constants/events";
import "./Contact.scss";

const Contact = forwardRef<HTMLDivElement>((_, ref) => {
	const { ref: viewRef, inView } = useInView({ threshold: 0.2 });
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
		<section className="contact section" id="contact" ref={ref}>
			<motion.div
				ref={viewRef}
				className="contact__container container"
				variants={containerVariants}
				initial="hidden"
				animate={inView ? "visible" : "hidden"}
			>
				<motion.h2 className="section-title" variants={itemVariants}>
					Contact Me
				</motion.h2>

				<div className="contact__grid">
					<motion.div className="contact__card" variants={itemVariants}>
						<div className="contact__eyebrow">
							<Mail size={16} /> Get in touch
						</div>
						<p className="contact__lead">
							봐주셔서 감사합니다. 보안 담당자 및 보안 제품 개발자로 성장해나가는 제 모습을 지켜봐주세요.
						</p>
						<p className="contact__desc">
							우측 하단의 Connect 버튼을 통해 메일을 보내실 수 있습니다. 언제든 편하게 연락 주세요.
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
								<p className="info-title">빠른 연락</p>
								<p className="info-text">Connect 버튼으로 메일을 보내주세요.</p>
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
								<p className="info-title">Tech Blog</p>
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

Contact.displayName = "Contact";

export default Contact;
