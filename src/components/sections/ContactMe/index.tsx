import { forwardRef, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import { Github, Link as LinkIcon, Send, User, MessageSquare } from "lucide-react";
import emailjs from "@emailjs/browser";
import { createVariants } from "@/utils/types/motion";
import WaveDivider from "@/components/common/WaveDivider";
import "./ContactMe.scss";

const ContactMe = forwardRef<HTMLDivElement>((_, ref) => {
	const { ref: viewRef, inView } = useInView({ threshold: 0.2 });
	const { t } = useTranslation("contactMe");
	const { t: tCommon } = useTranslation("common");
	const currentYear = new Date().getFullYear();

	const [formData, setFormData] = useState({ name: "", message: "" });
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

	const containerVariants = createVariants({
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { delayChildren: 0.2, staggerChildren: 0.1 } },
	});

	const itemVariants = createVariants({
		hidden: { y: 20, opacity: 0 },
		visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmitStatus("idle");

		try {
			const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
			const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
			const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

			if (!serviceId || !templateId || !publicKey) {
				console.warn("EmailJS configuration is missing. Falling back to demo mode.");
				await new Promise(resolve => setTimeout(resolve, 800));
				setSubmitStatus("success");
				setFormData({ name: "", message: "" });
				return;
			}

			await emailjs.send(
				serviceId,
				templateId,
				{
					from_name: formData.name,
					from_email: "",
					message: formData.message,
					to_email: "ehddn2083@gmail.com",
				},
				publicKey
			);

			setSubmitStatus("success");
			setFormData({ name: "", message: "" });
		} catch (err) {
			console.error("Email send error:", err);
			setSubmitStatus("error");
		} finally {
			setIsSubmitting(false);
		}
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
					{t("title")}
				</motion.h2>

				<div className="contact__grid">
					<motion.div className="contact__form-card" variants={itemVariants}>
						<p className="contact__form-title">{t("buttonLabel")}</p>
						<p className="contact__form-desc">{t("desc")}</p>

						<form className="contact__form" onSubmit={handleSubmit}>
							<label className="field">
								<span className="field__label">
									<User size={16} /> {t("name")}
								</span>
								<div className="field__input">
									<input
										name="name"
										type="text"
										value={formData.name}
										onChange={handleInputChange}
										placeholder={t("placeholder.name")}
										required
										disabled={isSubmitting}
									/>
								</div>
							</label>

							<label className="field">
								<span className="field__label">
									<MessageSquare size={16} /> {t("message")}
								</span>
								<div className="field__input">
									<textarea
										name="message"
										value={formData.message}
										onChange={handleInputChange}
										placeholder={t("placeholder.message")}
										rows={5}
										required
										disabled={isSubmitting}
									/>
								</div>
							</label>

							{submitStatus === "error" && (
								<p className="form-feedback error">{t("error")}</p>
							)}
							{submitStatus === "success" && (
								<p className="form-feedback success">{t("success")}</p>
							)}

							<button type="submit" className="contact__submit" disabled={isSubmitting}>
								<Send size={16} />
								{isSubmitting ? "..." : t("send")}
							</button>
						</form>
					</motion.div>

					<motion.div className="contact__info-card" variants={itemVariants}>
						<div className="info-hero">
							<p className="info-eyebrow">{t("eyebrow")}</p>
							<h3 className="info-title">{t("lead")}</h3>
							<p className="info-desc">{t("desc")}</p>

							<div className="info-actions">
								<a
									className="channel-btn primary"
									href="https://github.com/woodong-222"
									target="_blank"
									rel="noopener noreferrer"
								>
									<Github size={18} />
									GitHub
								</a>
								<a
									className="channel-btn ghost"
									href="https://velog.io/@woo2083/posts"
									target="_blank"
									rel="noopener noreferrer"
								>
									<LinkIcon size={18} />
									{tCommon("buttons.blog")}
								</a>
							</div>
						</div>
					</motion.div>
				</div>

				<motion.footer className="contact__footer" variants={itemVariants}>
					<p>Copyright ⓒ {currentYear} Woo. All rights reserved.</p>
				</motion.footer>
			</motion.div>
		</section>
	);
});

ContactMe.displayName = "ContactMe";

export default ContactMe;
