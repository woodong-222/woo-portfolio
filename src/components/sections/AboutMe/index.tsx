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
	const { ref: inViewRef, inView } = useInView({ threshold: 0.15 });
	const { t } = useTranslation("aboutMe");

	const containerVariants = createVariants({
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { delayChildren: 0.2, staggerChildren: 0.12 } },
	});

	const titleVariants = createVariants({
		hidden: { y: 60, opacity: 0, scale: 0.9 },
		visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
	});

	const cardVariants = createVariants({
		hidden: { y: 80, opacity: 0, scale: 0.95 },
		visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
	});

	const principles = [
		{
			icon: <Shield size={24} />,
			title: "Balance",
			text: t("principles.balance"),
			color: "#fbbf24",
		},
		{
			icon: <Target size={24} />,
			title: "Communication",
			text: t("principles.communication"),
			color: "#f59e0b",
		},
		{
			icon: <Users size={24} />,
			title: "Teamwork",
			text: t("principles.teamwork"),
			color: "#facc15",
		},
		{
			icon: <Lightbulb size={24} />,
			title: "Growth",
			text: t("principles.growth"),
			color: "#eab308",
		},
	];

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
				<motion.h2 className="section-title" variants={titleVariants}>
					{t("title")}
				</motion.h2>

				<div className="principles-grid">
					{principles.map((principle, index) => (
						<motion.div
							key={index}
							className="principle-card"
							variants={cardVariants}
							whileHover={{ scale: 1.03, y: -8, boxShadow: "0 25px 50px rgba(99, 102, 241, 0.2)" }}
							transition={{ duration: 0.3 }}
						>
							<div className="principle-icon" style={{ color: principle.color }}>
								{principle.icon}
							</div>
							<div className="principle-content">
								<p className="principle-title">{principle.title}</p>
								<p className="principle-text">{principle.text}</p>
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
