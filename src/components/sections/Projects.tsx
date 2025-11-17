import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Eye } from 'lucide-react';
import { projects, Project } from '@/data/projects';
import './Projects.scss';

interface ProjectsProps {
	onProjectClick: (project: Project) => void;
}

const Projects = ({ onProjectClick }: ProjectsProps) => {
	const { t, i18n } = useTranslation();
	const [selectedCategory, setSelectedCategory] = useState<string>('all');
	const { ref, inView } = useInView({
		threshold: 0.2,
		triggerOnce: true,
	});

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 30, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.6,
				ease: 'easeOut',
			},
		},
	};

	const categories = [
		{ key: 'all', label: i18n.language === 'ko' ? '전체' : 'All' },
		{ key: 'security', label: i18n.language === 'ko' ? '보안' : 'Security' },
		{ key: 'web', label: i18n.language === 'ko' ? '웹' : 'Web' },
		{ key: 'cloud', label: i18n.language === 'ko' ? '클라우드' : 'Cloud' },
		{ key: 'other', label: i18n.language === 'ko' ? '기타' : 'Other' },
	];

	const filteredProjects = projects.filter(project => 
		selectedCategory === 'all' || project.category === selectedCategory
	);

	const getCategoryIcon = (category: string) => {
		switch (category) {
			case 'security': return '🔐';
			case 'web': return '🌐';
			case 'cloud': return '☁️';
			default: return '💡';
		}
	};

	return (
		<section className="projects section" ref={ref}>
			<motion.div
				className="projects__container container"
				variants={containerVariants}
				initial="hidden"
				animate={inView ? 'visible' : 'hidden'}
			>
				<motion.h2 className="section-title" variants={itemVariants}>
					{i18n.language === 'ko' ? '프로젝트' : 'Projects'}
				</motion.h2>

				<motion.div className="category-filters" variants={itemVariants}>
					{categories.map((category) => (
						<motion.button
							key={category.key}
							className={`category-btn ${
								selectedCategory === category.key ? 'active' : ''
							}`}
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
						<p>{i18n.language === 'ko' ? '해당 카테고리의 프로젝트가 없습니다.' : 'No projects found in this category.'}</p>
					</motion.div>
				)}
			</motion.div>
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
	
	const getCategoryIcon = (category: string) => {
		switch (category) {
			case 'security': return '🔐';
			case 'web': return '🌐';
			case 'cloud': return '☁️';
			default: return '💡';
		}
	};

	const getCategoryColor = (category: string) => {
		switch (category) {
			case 'security': return '#10b981';
			case 'web': return '#3b82f6';
			case 'cloud': return '#06b6d4';
			default: return '#6366f1';
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
					⭐ {i18n.language === 'ko' ? '추천' : 'Featured'}
				</div>
			)}

			<div className="project-header">
				<div 
					className="project-category"
					style={{ color: getCategoryColor(project.category) }}
				>
					<span className="category-icon">{getCategoryIcon(project.category)}</span>
					<span className="category-text">
						{project.category.charAt(0).toUpperCase() + project.category.slice(1)}
					</span>
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
					{project.technologies.slice(0, 4).map((tech, index) => (
						<span key={index} className="tech-tag">
							{tech}
						</span>
					))}
					{project.technologies.length > 4 && (
						<span className="tech-more">
							+{project.technologies.length - 4}
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
					{i18n.language === 'ko' ? '자세히 보기' : 'View Details'}
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
						{i18n.language === 'ko' ? '라이브' : 'Live'}
					</motion.a>
				)}
			</div>
		</motion.div>
	);
};

export default Projects;