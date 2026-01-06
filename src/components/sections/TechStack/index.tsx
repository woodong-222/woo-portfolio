import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code2, Server, ShieldCheck, Palette } from "lucide-react";
import { createVariants } from "@/utils/types/motion";
import { getSkillIcon } from "./skillIcons";
import "./TechStack.scss";

type TechCategory = {
	key: string;
	title: string;
	color: string;
	icon: React.ReactNode;
	items?: string[];
	groups?: { label: string; items: string[] }[];
};

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

const TechStackSection = forwardRef<HTMLElement>((_, forwardedRef) => {
	const { ref, inView } = useInView({ threshold: 0.1 });

	const containerVariants = createVariants({
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { delayChildren: 0.1, staggerChildren: 0.1 } },
	});

	const titleVariants = createVariants({
		hidden: { y: 50, opacity: 0 },
		visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
	});

	const cardVariants = createVariants({
		hidden: { y: 60, opacity: 0, scale: 0.95 },
		visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
	});

	const techCategories: TechCategory[] = [
		{
			key: "language",
			title: "Languages",
			items: ["Python", "C", "C++", "Java", "JavaScript", "TypeScript"],
			color: "#fbbf24",
			icon: <Code2 size={20} />,
		},
		{
			key: "development",
			title: "Development",
			groups: [
				{ label: "Frontend", items: ["React"] },
				{ label: "Backend & DB", items: ["FastAPI", "PostgreSQL", "MySQL"] },
				{ label: "DevOps & Cloud", items: ["Jenkins", "AWS", "Docker", "GitHub", "Nginx", "Vercel"] },
			],
			color: "#06b6d4",
			icon: <Server size={20} />,
		},
		{
			key: "security",
			title: "Security",
			items: ["Cloud", "Web"],
			color: "#10b981",
			icon: <ShieldCheck size={20} />,
		},
		{
			key: "other",
			title: "Other",
			groups: [
				{ label: "OS", items: ["Windows OS", "Linux OS", "MacOS"] },
				{ label: "Collaboration", items: ["Slack", "Notion"] },
				{ label: "Design", items: ["Figma", "Photoshop", "Premiere"] },
			],
			color: "#f59e0b",
			icon: <Palette size={20} />,
		},
	];

	return (
		<section
			className="tech-stack section"
			id="tech-stack"
			ref={mergeRefs<HTMLElement | null>(ref, forwardedRef)}
		>
			<motion.div
				className="tech-stack__container container"
				variants={containerVariants}
				initial="hidden"
				animate={inView ? "visible" : "hidden"}
			>
				<motion.h2 className="section-title" variants={titleVariants}>
					Tech Stack
				</motion.h2>

				<div className="tech-grid-container">
					{techCategories.map((category, index) => (
						<motion.div
							key={category.key}
							className="tech-category"
							variants={cardVariants}
							custom={index}
							whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.15)" }}
						>
							<div className="tech-category__header" style={{ borderColor: category.color }}>
								<span className="tech-category__icon" style={{ backgroundColor: category.color }}>
									{category.icon}
								</span>
								<h3 className="tech-category__title">{category.title}</h3>
							</div>
							
							<div className="tech-category__content">
								{category.groups ? (
									category.groups.map((group) => (
										<div key={`${category.key}-${group.label}`} className="tech-subgroup">
											<span className="tech-subgroup__label">{group.label}</span>
											<div className="tech-skills">
												{group.items.map((item) => (
													<TechSkillItem key={`${category.key}-${group.label}-${item}`} label={item} />
												))}
											</div>
										</div>
									))
								) : (
									<div className="tech-skills">
										{category.items?.map((item) => (
											<TechSkillItem key={`${category.key}-${item}`} label={item} />
										))}
									</div>
								)}
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>
		</section>
	);
});

TechStackSection.displayName = "TechStackSection";

export default TechStackSection;

type TechSkillItemProps = {
	label: string;
};

const TechSkillItem = ({ label }: TechSkillItemProps) => {
	const iconMeta = getSkillIcon(label);

	return (
		<motion.div 
			className="tech-skill" 
			title={label}
			whileHover={{ scale: 1.08, y: -4 }}
			transition={{ duration: 0.2 }}
		>
			<div
				className={`tech-skill__icon${!iconMeta ? " tech-skill__icon--fallback" : ""}`}
				style={iconMeta?.bg ? { backgroundColor: iconMeta.bg } : undefined}
			>
				{iconMeta?.src ? (
					<img src={iconMeta.src} alt={`${label} logo`} loading="lazy" />
				) : iconMeta?.icon ? (
					iconMeta.icon
				) : (
					<span className="fallback-text">{label.charAt(0)}</span>
				)}
			</div>
			<span className="tech-skill__label">{label}</span>
		</motion.div>
	);
};
