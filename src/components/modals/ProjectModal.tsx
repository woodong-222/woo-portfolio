import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Github, ExternalLink, Calendar, Users, Target } from 'lucide-react';
import { Project } from '@/components/sections/Projects/projects.data';
import { createVariants } from '@/utils/types/motion';
import './ProjectModal.scss';

interface ProjectModalProps {
	project: Project | null;
	isOpen: boolean;
	onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
	const { i18n } = useTranslation();

	useEffect(() => {
		document.body.style.overflow = isOpen ? 'hidden' : 'unset';
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		if (isOpen) document.addEventListener('keydown', handleEscape);
		return () => document.removeEventListener('keydown', handleEscape);
	}, [isOpen, onClose]);

	const getCategoryColor = (category: string) => {
		switch (category) {
			case 'security': return '#10b981';
			case 'web': return '#3b82f6';
			case 'cloud': return '#06b6d4';
			default: return '#facc15';
		}
	};

	const overlayVariants = createVariants({
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
		exit: { opacity: 0 },
	});

	const modalVariants = createVariants({
		hidden: { opacity: 0, scale: 0.8, y: 50 },
		visible: {
			opacity: 1,
			scale: 1,
			y: 0,
			transition: { type: 'spring' as const, duration: 0.5, bounce: 0.3 },
		},
		exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.3 } },
	});

	if (!project) return null;

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					<motion.div
						className="modal-overlay"
						variants={overlayVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						onClick={onClose}
					/>
					<div className="modal-container">
						<motion.div
							className="project-modal"
							variants={modalVariants}
							initial="hidden"
							animate="visible"
							exit="exit"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="modal-header">
								<div className="project-meta">
									<div
										className="project-category"
										style={{ color: getCategoryColor(project.category) }}
									>
										<span className="category-text">
											{project.category.charAt(0).toUpperCase() + project.category.slice(1)}
										</span>
									</div>
									{/* Featured badge removed - property doesn't exist */}
								</div>

								<motion.button
									className="close-btn"
									onClick={onClose}
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
								>
									<X size={24} />
								</motion.button>
							</div>

							<div className="modal-content">
								<div className="project-title">
									<h2>{project.title[i18n.language as keyof typeof project.title]}</h2>
								</div>

								<div className="project-image-placeholder">
									<div className="placeholder-content">
										<div className="placeholder-icon">★</div>
										<p className="placeholder-text">
											{i18n.language === 'ko' ? '프로젝트' : 'Project'}
										</p>
									</div>
								</div>

								<div className="project-description">
									<p>{project.features[i18n.language as 'ko' | 'en'][0]}</p>
								</div>

								<div className="project-details">
									<div className="detail-section">
										<div className="detail-header">
											<Target size={20} />
											<h4>{i18n.language === 'ko' ? '개요' : 'Overview'}</h4>
										</div>
										<p className="detail-info">
											{project.scale[i18n.language as 'ko' | 'en']}
										</p>
									</div>

									<div className="detail-section">
										<div className="detail-header">
											<Calendar size={20} />
											<h4>{i18n.language === 'ko' ? '기간' : 'Period'}</h4>
										</div>
										<p className="detail-info">{project.period}</p>
									</div>

									<div className="detail-section">
										<div className="detail-header">
											<Users size={20} />
											<h4>{i18n.language === 'ko' ? '구성' : 'Team'}</h4>
										</div>
										<p className="detail-info">
											{i18n.language === 'ko' ? '개인 또는 팀 프로젝트' : 'Solo or team project'}
										</p>
									</div>
								</div>

								<div className="tech-stack-detailed">
									<h4>{i18n.language === 'ko' ? '기술 스택' : 'Technologies Used'}</h4>
									<div className="tech-tags">
										{project.technologies.map((tech, index) => (
											<motion.span
												key={index}
												className="tech-tag"
												whileHover={{ scale: 1.05 }}
												transition={{ duration: 0.2 }}
											>
												{tech}
											</motion.span>
										))}
									</div>
								</div>

								<div className="project-actions">
									{project.githubUrl && (
										<motion.a
											href={project.githubUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="action-btn primary"
											whileHover={{ scale: 1.05 }}
											whileTap={{ scale: 0.95 }}
										>
											<Github size={20} />
											{i18n.language === 'ko' ? '코드 보기' : 'View Code'}
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
											<ExternalLink size={20} />
											{i18n.language === 'ko' ? '라이브 보기' : 'Live Demo'}
										</motion.a>
									)}
								</div>
							</div>
						</motion.div>
					</div>
				</>
			)}
		</AnimatePresence>
	);
};

export default ProjectModal;
