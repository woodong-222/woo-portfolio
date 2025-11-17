import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code, Shield, Users, Lightbulb, Target } from "lucide-react";
import { createVariants } from "@/utils/types/motion";
import { forwardRef } from "react";
import { getSkillIcon } from "./skillIcons";
import "./About.scss";

const About = forwardRef<HTMLDivElement>((_, ref) => {
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

	type TechCategory = {
		key: string;
		title: string;
		items: string[];
		color: string;
		icon: string;
	};

	const resolveSkills = (path: string): string[] => {
		const translated = t(path, { returnObjects: true }) as unknown;
		if (Array.isArray(translated)) {
			return translated as string[];
		}
		if (typeof translated === "string") {
			return translated
				.split(",")
				.map((item) => item.trim())
				.filter(Boolean);
		}
		return [];
	};

	const techCategories: TechCategory[] = [
		{
			key: "programming",
			title: t("techStack.categories.programming"),
			items: resolveSkills("techStack.skills.programming"),
			color: "#6366f1",
			icon: "⚡",
		},
		{
			key: "frontend",
			title: t("techStack.categories.frontend"),
			items: resolveSkills("techStack.skills.frontend"),
			color: "#3b82f6",
			icon: "🎨",
		},
		{
			key: "backend",
			title: t("techStack.categories.backend"),
			items: resolveSkills("techStack.skills.backend"),
			color: "#8b5cf6",
			icon: "🔧",
		},
		{
			key: "devops",
			title: t("techStack.categories.devops"),
			items: resolveSkills("techStack.skills.devops"),
			color: "#06b6d4",
			icon: "☁️",
		},
		{
			key: "security",
			title: t("techStack.categories.security"),
			items: resolveSkills("techStack.skills.security"),
			color: "#10b981",
			icon: "🔐",
		},
		{
			key: "os",
			title: t("techStack.categories.os"),
			items: resolveSkills("techStack.skills.os"),
			color: "#f59e0b",
			icon: "💻",
		},
		{
			key: "collaboration",
			title: t("techStack.categories.collaboration"),
			items: resolveSkills("techStack.skills.collaboration"),
			color: "#ef4444",
			icon: "🤝",
		},
		{
			key: "design",
			title: t("techStack.categories.design"),
			items: resolveSkills("techStack.skills.design"),
			color: "#ec4899",
			icon: "🎭",
		},
	];

	const splitIndex = Math.ceil(techCategories.length / 2);
	const columnGroups = [
		techCategories.slice(0, splitIndex),
		techCategories.slice(splitIndex),
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

				<div className="tech-columns">
					{columnGroups.map((column, columnIndex) => (
						<div key={`column-${columnIndex}`} className="tech-column">
							{column.map((category) => (
								<motion.div
									key={category.key}
									className="tech-card"
									variants={itemVariants}
									whileHover={{ translateY: -4 }}
									transition={{ duration: 0.3 }}
								>
									<div className="tech-card__header">
										<span
											className="tech-card__icon"
											style={{ color: category.color }}
										>
											{category.icon}
										</span>
										<h3>{category.title}</h3>
									</div>
									<div className="tech-card__skills">
										{category.items.map((item) => (
											<TechSkillItem
												key={`${category.key}-${item}`}
												label={item}
											/>
										))}
									</div>
								</motion.div>
							))}
						</div>
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

type TechSkillItemProps = {
	label: string;
};

const TechSkillItem = ({ label }: TechSkillItemProps) => {
	const iconMeta = getSkillIcon(label);

	return (
		<div className="tech-item" title={label}>
			<span
				className={`tech-item__icon${!iconMeta ? " tech-item__icon--fallback" : ""}`}
				style={iconMeta?.bg ? { backgroundColor: iconMeta.bg } : undefined}
				aria-hidden="true"
			>
				{iconMeta?.src ? (
					<img src={iconMeta.src} alt={`${label} logo`} loading="lazy" />
				) : iconMeta?.icon ? (
					iconMeta.icon
				) : (
					label.charAt(0)
				)}
			</span>
			<span className="tech-item__label">{label}</span>
		</div>
	);
};
