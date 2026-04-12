import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Shield, Target, Users, Lightbulb } from "lucide-react";
import { createVariants } from "@/utils/types/motion";
import "./AboutMe.scss";

function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
	return (node: T) => {
		refs.forEach((ref) => {
			if (!ref) return;
			if (typeof ref === "function") {
				ref(node);
			} else {
				(ref as React.MutableRefObject<T | null>).current = node;
			}
		});
	};
}

const AboutMe = forwardRef<HTMLElement>((_, forwardedRef) => {
	const { ref: inViewRef, inView } = useInView({ threshold: 0.1 });
	const { t } = useTranslation("aboutMe");

	const containerVariants = createVariants({
		hidden: { transition: { staggerChildren: 0.08, staggerDirection: -1 } },
		visible: { transition: { delayChildren: 0.15, staggerChildren: 0.1 } },
	});

	const titleVariants = createVariants({
		hidden: { y: 40, opacity: 0 },
		visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
	});

	const cardVariants = createVariants({
		hidden: { y: 30, opacity: 0 },
		visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
	});

	const principles = [
		{
			num: "01",
			title: t("principles.balance.title"),
			icon: <Shield size={14} />,
			text: t("principles.balance.text"),
			color: "#f59e0b",
		},
		{
			num: "02",
			title: t("principles.communication.title"),
			icon: <Target size={14} />,
			text: t("principles.communication.text"),
			color: "#eab308",
		},
		{
			num: "03",
			title: t("principles.teamwork.title"),
			icon: <Users size={14} />,
			text: t("principles.teamwork.text"),
			color: "#fbbf24",
		},
		{
			num: "04",
			title: t("principles.growth.title"),
			icon: <Lightbulb size={14} />,
			text: t("principles.growth.text"),
			color: "#facc15",
		},
	];

	const line2Words = t("headline.line2").split(" ");

	return (
		<section
			className="about-me section"
			id="about-me"
			ref={mergeRefs<HTMLElement | null>(inViewRef, forwardedRef)}
		>
			<motion.div
				className="about-me__container container"
				variants={containerVariants}
				initial="hidden"
				animate={inView ? "visible" : "hidden"}
			>
				{/* ① 디스플레이 헤드라인 */}
				<motion.div className="about-me__headline" variants={titleVariants}>
					<span className="about-me__headline-line1">{t("headline.line1")}</span>
					<span className="about-me__headline-line2">
						{line2Words.map((word, i) =>
							i === line2Words.length - 1 ? (
								<mark key={i} className="about-me__highlight">{word}</mark>
							) : (
								<span key={i}>{word} </span>
							)
						)}
					</span>
				</motion.div>

				{/* ② Bio + Callout */}
				<motion.div className="about-me__main" variants={cardVariants}>
					<p className="about-me__bio">{t("bio")}</p>
					<blockquote className="about-me__callout">
						{t("callout")}
					</blockquote>
				</motion.div>

				{/* ③ 번호형 원칙 카드 */}
				<div className="about-me__values">
					{principles.map((p, i) => (
						<motion.div
							key={i}
							className="value-item"
							variants={cardVariants}
						>
							<span className="value-item__num">{p.num}</span>
							<div className="value-item__body">
								<span
									className="value-item__title"
									style={{ color: p.color } as React.CSSProperties}
								>
									{p.icon}
									{p.title}
								</span>
								<p className="value-item__text">{p.text}</p>
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>
		</section>
	);
});

AboutMe.displayName = "AboutMe";

export default AboutMe;
