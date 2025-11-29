import { forwardRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Shield, Target, Users, Lightbulb } from "lucide-react";
import { createVariants } from "@/utils/types/motion";
import { getSkillIcon } from "./skillIcons";
import "./About.scss";

type TechCategory = {
	key: string;
	title: string;
	color: string;
	icon: string;
	items?: string[];
	groups?: { label: string; items: string[] }[];
};

const About = forwardRef<HTMLDivElement>((_, ref) => {
	return (
		<div ref={ref} className="about-wrapper">
			<IntroductionSection />
			<TechStackSection />
			<CareerSection />
		</div>
	);
});

About.displayName = "About";

const IntroductionSection = () => {
	const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

	const containerVariants = createVariants({
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { delayChildren: 0.3, staggerChildren: 0.15 } },
	});

	const itemVariants = createVariants({
		hidden: { y: 30, opacity: 0 },
		visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" as const } },
	});

	const principles = [
		{
			icon: <Shield size={24} />,
			title: "Balance",
			text: "사용자 경험과 보안의 균형을 위해 보안을 강화하면서도 사용자의 편리함을 고려해 최적의 밸런스를 맞춥니다.",
			color: "#6366f1",
		},
		{
			icon: <Target size={24} />,
			title: "Communication",
			text: "방법론의 차이를 이해하고 의도와 배경을 파악해 간극을 좁힌 뒤, 방법은 마지막에 결정합니다.",
			color: "#8b5cf6",
		},
		{
			icon: <Users size={24} />,
			title: "Teamwork",
			text: "팀의 방향성과 목표를 명확히 설정해 모두가 일관되게 움직이도록 돕고 혼란을 최소화합니다.",
			color: "#3b82f6",
		},
		{
			icon: <Lightbulb size={24} />,
			title: "Growth",
			text: "기존 방식에 얽매이지 않는 창의적 접근으로 문제를 해결하며, 새로운 기술을 끊임없이 학습합니다.",
			color: "#06b6d4",
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
					About Me
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
};

const TechStackSection = () => {
	const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

	const containerVariants = createVariants({
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { delayChildren: 0.2, staggerChildren: 0.1 } },
	});

	const itemVariants = createVariants({
		hidden: { y: 20, opacity: 0 },
		visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
	});

	const techCategories: TechCategory[] = [
		{
			key: "language",
			title: "Languages",
			items: ["Python", "C", "C++", "Java", "JavaScript"],
			color: "#6366f1",
			icon: "λ",
		},
		{
			key: "development",
			title: "Development",
			groups: [
				{ label: "Frontend", items: ["React"] },
				{ label: "Backend & DB", items: ["FastAPI", "PostgreSQL", "MySQL"] },
				{ label: "DevOps & Cloud", items: ["Jenkins", "AWS", "Docker", "Git", "Nginx", "Vercel"] },
			],
			color: "#06b6d4",
			icon: "</>",
		},
		{
			key: "security",
			title: "Security",
			items: ["Cloud", "Web"],
			color: "#10b981",
			icon: "🔒",
		},
		{
			key: "other",
			title: "Other",
			groups: [
				{ label: "OS", items: ["Windows OS", "Linux OS", "MacOS"] },
				{ label: "Collaboration", items: ["Slack", "Notion"] },
				{ label: "Design", items: ["Figma", "Photoshop", "Premiere"] },
			],
			color: "#8b5cf6",
			icon: "★",
		},
	];

	const splitIndex = Math.ceil(techCategories.length / 2);
	const columnGroups = [techCategories.slice(0, splitIndex), techCategories.slice(splitIndex)];

	return (
		<section className="tech-stack section" id="tech-stack" ref={ref}>
			<motion.div
				className="tech-stack__container container"
				variants={containerVariants}
				initial="hidden"
				animate={inView ? "visible" : "hidden"}
			>
				<motion.h2 className="section-title" variants={itemVariants}>
					기술 스택
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
										<span className="tech-card__icon" style={{ color: category.color }}>
											{category.icon}
										</span>
										<span className="tech-card__title">{category.title}</span>
									</div>
									{category.groups ? (
										<div className="tech-groups">
											{category.groups.map((group) => (
												<div key={`${category.key}-${group.label}`} className="tech-group">
													<p className="tech-group__label">{group.label}</p>
													<div className="tech-grid">
														{group.items.map((item) => (
															<TechSkillItem key={`${category.key}-${group.label}-${item}`} label={item} />
														))}
													</div>
												</div>
											))}
										</div>
									) : (
										<div className="tech-grid">
											{category.items?.map((item) => (
												<TechSkillItem key={`${category.key}-${item}`} label={item} />
											))}
										</div>
									)}
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
	const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

	const containerVariants = createVariants({
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { delayChildren: 0.3, staggerChildren: 0.2 } },
	});

	const itemVariants = createVariants({
		hidden: { x: -30, opacity: 0 },
		visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" as const } },
	});

	const timeline = [
		{
			year: "2025.07 ~ 2025.12",
			items: [
				"Best of the Best 14기 보안제품개발 트랙 수강",
				"네트워크, 시스템, 클라우드 등 다양한 보안 환경 경험 및 알려지지 않은 URL의 악성 행위 탐지 프로젝트 진행",
			],
		},
		{
			year: "2024.03 ~ 2024.09",
			items: [
				"차세대 보안리더 양성교육, WHS 2기 수료",
				"보안 기초 설립 및 클라우드 환경에서의 DevSecOps 보안 위협 방어 프로젝트 진행",
			],
		},
		{
			year: "2020.03 ~ 2026.08",
			items: [
				"한국기술교육대학교 컴퓨터공학부 재학",
				"2024 컴퓨터공학부 학생회 학회장",
			],
		},
	];

	return (
		<section className="career section" id="career" ref={ref}>
			<motion.div
				className="career__container container"
				variants={containerVariants}
				initial="hidden"
				animate={inView ? "visible" : "hidden"}
			>
				<motion.h2 className="section-title" variants={itemVariants}>
					경력 & 교육
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
