import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Github, ExternalLink, Eye, Calendar } from "lucide-react";
import { projects, Project } from "./projects.data";
import { createVariants } from "@/utils/types/motion";
import { ScrollIndicator } from "@/components/common";
import "./Projects.scss";

interface ProjectsProps {
	onProjectClick: (project: Project) => void;
}

const Projects = ({ onProjectClick }: ProjectsProps) => {
	const { i18n } = useTranslation();
	const [selectedCategory, setSelectedCategory] = useState<string>("all");
	const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

	const containerVariants = createVariants({
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { delayChildren: 0.3, staggerChildren: 0.1 } },
	});

	const itemVariants = createVariants({
		hidden: { y: 30, opacity: 0 },
		visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" as const } },
	});

	const categories = [
		{ key: "all", label: i18n.language === "ko" ? "전체" : "All" },
		{ key: "security", label: i18n.language === "ko" ? "보안" : "Security" },
		{ key: "web", label: i18n.language === "ko" ? "웹" : "Web" },
		{ key: "cloud", label: i18n.language === "ko" ? "클라우드" : "Cloud" },
		{ key: "other", label: i18n.language === "ko" ? "기타" : "Other" },
	];

	const filteredProjects = projects.filter(
		(project) => selectedCategory === "all" || project.category === selectedCategory,
	);

	return (
		<section className="projects section" ref={ref}>
			<motion.div
				className="projects__container container"
				variants={containerVariants}
				initial="hidden"
				animate={inView ? "visible" : "hidden"}
			>
				<motion.h2 className="section-title" variants={itemVariants}>
					{i18n.language === "ko" ? "프로젝트" : "Projects"}
				</motion.h2>

				<motion.div className="category-filters" variants={itemVariants}>
					{categories.map((category) => (
						<motion.button
							key={category.key}
							className={`category-btn ${selectedCategory === category.key ? "active" : ""}`}
							onClick={() => setSelectedCategory(category.key)}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							{category.label}
						</motion.button>
					))}
				</motion.div>

				<motion.div className="projects-grid" variants={containerVariants}>
					{filteredProjects.map((project) => (
						<ProjectCard
							key={project.id}
							project={project}
							onProjectClick={onProjectClick}
							variants={itemVariants}
						/>
					))}
				</motion.div>

				{filteredProjects.length === 0 && (
					<motion.div className="no-projects" variants={itemVariants}>
						<p>
							{i18n.language === "ko"
								? "해당 카테고리에 프로젝트가 없습니다."
								: "No projects found in this category."}
						</p>
					</motion.div>
				)}
			</motion.div>
			<ScrollIndicator />
		</section>
	);
};

interface ProjectCardProps {
	project: Project;
	onProjectClick: (project: Project) => void;
	variants: any;
}

const ProjectCard = ({ project, onProjectClick, variants }: ProjectCardProps) => {
	const { i18n } = useTranslation();

	const getCategoryLabel = (category: string) => {
		if (i18n.language === "ko") {
			if (category === "security") return "보안";
			if (category === "web") return "웹";
			if (category === "cloud") return "클라우드";
			return "기타";
		}
		return category.charAt(0).toUpperCase() + category.slice(1);
	};

	const getCategoryColor = (category: string) => {
		switch (category) {
			case "security":
				return "#10b981";
			case "web":
				return "#3b82f6";
			case "cloud":
				return "#06b6d4";
			default:
				return "#6366f1";
		}
	};

	return (
		<motion.div
			className="project-card"
			variants={variants}
			whileHover={{ scale: 1.02, y: -5 }}
			transition={{ duration: 0.3 }}
		>
			{project.featured && (
				<div className="featured-badge">
					★ {i18n.language === "ko" ? "추천" : "Featured"}
				</div>
			)}

			<div className="project-header">
				<div className="project-category" style={{ color: getCategoryColor(project.category) }}>
					<span className="category-text">{getCategoryLabel(project.category)}</span>
				</div>
				<div className="project-period">
					<Calendar size={14} />
					<span>{project.period}</span>
				</div>
			</div>

			<div className="project-content">
				<h3 className="project-title">
					{project.title[i18n.language as keyof typeof project.title]}
				</h3>

				<p className="project-description">
					{project.description[i18n.language as keyof typeof project.description]}
				</p>

				<div className="project-tech">
					{project.technologies.slice(0, 5).map((tech, index) => (
						<span key={index} className="tech-tag">
							{tech}
						</span>
					))}
					{project.technologies.length > 5 && (
						<span className="tech-more">
							+{project.technologies.length - 5}
						</span>
					)}
				</div>
			</div>

			<div className="project-actions">
				<motion.button
					className="action-btn primary"
					onClick={() => onProjectClick(project)}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<Eye size={16} />
					{i18n.language === "ko" ? "자세히 보기" : "View Details"}
				</motion.button>

				{project.githubUrl && (
					<motion.a
						href={project.githubUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="action-btn secondary"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<Github size={16} />
						GitHub
					</motion.a>
				)}

				{project.liveUrl && (
					<motion.a
						href={project.liveUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="action-btn secondary"
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<ExternalLink size={16} />
						{i18n.language === "ko" ? "라이브" : "Live"}
					</motion.a>
				)}
			</div>
		</motion.div>
	);
};

export default Projects;
