import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code, Shield, Users, Lightbulb, Target } from "lucide-react";
import { createVariants } from "@/utils/types/motion";
import { forwardRef } from "react";
import "./About.scss";

const About = forwardRef<HTMLElement>((props, ref) => {
	return (
		<div ref={ref} className="about-wrapper">
			<IntroductionSection />
			<TechStackSection />
			<CareerSection />
		</div>
	);
});

About.displayName = 'About';

const IntroductionSection = () => {
	const { t } = useTranslation("about");
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
				staggerChildren: 0.15,
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

	const principles = [
		{
			icon: <Shield size={24} />,
			text: t("introduction.items.0"),
			color: "#6366f1",
		},
		{
			icon: <Target size={24} />,
			text: t("introduction.items.1"),
			color: "#8b5cf6",
		},
		{
			icon: <Users size={24} />,
			text: t("introduction.items.2"),
			color: "#3b82f6",
		},
		{
			icon: <Lightbulb size={24} />,
			text: t("introduction.items.3"),
			color: "#06b6d4",
		},
		{
			icon: <Code size={24} />,
			text: t("introduction.items.4"),
			color: "#10b981",
		},
	];

	return (
		<section className="about-intro section" id="about-intro" ref={ref}>
			<motion.div
				className="about-intro__container container"
				variants={containerVariants}
				initial="hidden"
				animate={inView ? "visible" : "hidden"}
			>
				<motion.h2 className="section-title" variants={itemVariants}>
					{t("introduction.title")}
				</motion.h2>

				<div className="principles-grid">
					{principles.map((principle, index) => (
						<motion.div
							key={index}
							className="principle-card"
							variants={itemVariants}
							whileHover={{ scale: 1.02, y: -5 }}
							transition={{ duration: 0.3 }}
						>
							<div className="principle-icon" style={{ color: principle.color }}>
								{principle.icon}
							</div>
							<div
								className="principle-text"
								dangerouslySetInnerHTML={{ __html: principle.text }}
							/>
						</motion.div>
					))}
				</div>
			</motion.div>
		</section>
	);
};

const TechStackSection = () => {
	const { t } = useTranslation("about");
	const { ref, inView } = useInView({
		threshold: 0.3,
		triggerOnce: true,
	});

	const containerVariants = createVariants({
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delayChildren: 0.2,
				staggerChildren: 0.1,
			},
		},
	});

	const itemVariants = createVariants({
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.6,
				ease: "easeOut" as const,
			},
		},
	});

	const techCategories = [
		{
			title: t("techStack.categories.programming"),
			items: t("techStack.skills.programming", {
				returnObjects: true,
			}) as string[],
			color: "#6366f1",
			icon: "⚡",
		},
		{
			title: "Frontend",
			items: [t("techStack.skills.development.frontend")],
			color: "#3b82f6",
			icon: "🎨",
		},
		{
			title: "Backend & DB",
			items: [t("techStack.skills.development.backend")],
			color: "#8b5cf6",
			icon: "🔧",
		},
		{
			title: "DevOps & Cloud",
			items: [t("techStack.skills.development.devops")],
			color: "#06b6d4",
			icon: "☁️",
		},
		{
			title: t("techStack.categories.security"),
			items: t("techStack.skills.security", { returnObjects: true }) as string[],
			color: "#10b981",
			icon: "🔐",
		},
		{
			title: "OS",
			items: [t("techStack.skills.other.os")],
			color: "#f59e0b",
			icon: "💻",
		},
		{
			title: "Collaboration",
			items: [t("techStack.skills.other.collaboration")],
			color: "#ef4444",
			icon: "🤝",
		},
		{
			title: "Design",
			items: [t("techStack.skills.other.design")],
			color: "#ec4899",
			icon: "🎭",
		},
	];

	return (
		<section className="tech-stack section" id="tech-stack" ref={ref}>
			<motion.div
				className="tech-stack__container container"
				variants={containerVariants}
				initial="hidden"
				animate={inView ? "visible" : "hidden"}
			>
				<motion.h2 className="section-title" variants={itemVariants}>
					{t("techStack.title")}
				</motion.h2>

				<div className="tech-grid">
					{techCategories.map((category, index) => (
						<motion.div
							key={index}
							className="tech-category"
							variants={itemVariants}
							whileHover={{ scale: 1.02 }}
							transition={{ duration: 0.3 }}
						>
							<div className="tech-header">
								<span className="tech-icon">{category.icon}</span>
								<h3 className="tech-title">{category.title}</h3>
							</div>
							<div className="tech-items">
								{category.items.map((item, itemIndex) => (
									<span key={itemIndex} className="tech-item">
										{item}
									</span>
								))}
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>
		</section>
	);
};

const CareerSection = () => {
	const { t } = useTranslation("about");
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
		hidden: { x: -30, opacity: 0 },
		visible: {
			x: 0,
			opacity: 1,
			transition: {
				duration: 0.8,
				ease: "easeOut" as const,
			},
		},
	});

	const timeline = t("career.timeline", { returnObjects: true }) as Array<{
		year: string;
		items: string[];
	}>;

	return (
		<section className="career section" id="career" ref={ref}>
			<motion.div
				className="career__container container"
				variants={containerVariants}
				initial="hidden"
				animate={inView ? "visible" : "hidden"}
			>
				<motion.h2 className="section-title" variants={itemVariants}>
					{t("career.title")}
				</motion.h2>

				<div className="timeline">
					{timeline.map((period) => (
						<motion.div
							key={period.year}
							className="timeline-item"
							variants={itemVariants}
							whileHover={{ scale: 1.02 }}
							transition={{ duration: 0.3 }}
						>
							<div className="timeline-marker">
								<div className="timeline-dot"></div>
								<div className="timeline-year">{period.year}</div>
							</div>
							<div className="timeline-content">
								{period.items.map((item, itemIndex) => (
									<div key={itemIndex} className="timeline-achievement">
										{item}
									</div>
								))}
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>
		</section>
	);
};

export default About;
