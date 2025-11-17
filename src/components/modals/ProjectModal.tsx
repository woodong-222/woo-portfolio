import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Github, ExternalLink, Calendar, Users, Target } from 'lucide-react';
import { Project } from '@/data/projects';
import { createVariants } from '@/types/motion';
import './ProjectModal.scss';

interface ProjectModalProps {
	project: Project | null;
	isOpen: boolean;
	onClose: () => void;
}

const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
	const { i18n } = useTranslation();

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);

	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener('keydown', handleEscape);
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen, onClose]);

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

	const overlayVariants = createVariants({
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
		exit: { opacity: 0 }
	});

	const modalVariants = createVariants({
		hidden: { 
			opacity: 0, 
			scale: 0.8,
			y: 50 
		},
		visible: { 
			opacity: 1, 
			scale: 1,
			y: 0,
			transition: {
				type: "spring" as const,
				duration: 0.5,
				bounce: 0.3
			}
		},
		exit: { 
			opacity: 0, 
			scale: 0.8,
			y: 50,
			transition: {
				duration: 0.3
			}
		}
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
										<span className="category-icon">
											{getCategoryIcon(project.category)}
										</span>
										<span className="category-text">
											{project.category.charAt(0).toUpperCase() + project.category.slice(1)}
										</span>
									</div>
									{project.featured && (
										<div className="featured-badge">
											⭐ {i18n.language === 'ko' ? '추천 프로젝트' : 'Featured Project'}
										</div>
									)}
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
										<div className="placeholder-icon">
											{getCategoryIcon(project.category)}
										</div>
										<p className="placeholder-text">
											{i18n.language === 'ko' ? '프로젝트 이미지' : 'Project Image'}
										</p>
									</div>
								</div>

								<div className="project-description">
									<p>{project.detailedDescription[i18n.language as keyof typeof project.detailedDescription]}</p>
								</div>

								<div className="project-details">
									<div className="detail-section">
										<div className="detail-header">
											<Target size={20} />
											<h4>{i18n.language === 'ko' ? '주요 기능' : 'Key Features'}</h4>
										</div>
										<ul className="feature-list">
											<li>{i18n.language === 'ko' ? '사용자 친화적인 인터페이스' : 'User-friendly interface'}</li>
											<li>{i18n.language === 'ko' ? '반응형 디자인 적용' : 'Responsive design implementation'}</li>
											<li>{i18n.language === 'ko' ? '최신 보안 표준 준수' : 'Latest security standards compliance'}</li>
											<li>{i18n.language === 'ko' ? '성능 최적화' : 'Performance optimization'}</li>
										</ul>
									</div>

									<div className="detail-section">
										<div className="detail-header">
											<Calendar size={20} />
											<h4>{i18n.language === 'ko' ? '개발 기간' : 'Development Period'}</h4>
										</div>
										<p className="detail-info">
											{i18n.language === 'ko' ? '2024년 3월 - 2024년 6월 (3개월)' : 'March 2024 - June 2024 (3 months)'}
										</p>
									</div>

									<div className="detail-section">
										<div className="detail-header">
											<Users size={20} />
											<h4>{i18n.language === 'ko' ? '팀 구성' : 'Team Composition'}</h4>
										</div>
										<p className="detail-info">
											{i18n.language === 'ko' ? '개인 프로젝트 (1인)' : 'Individual Project (1 person)'}
										</p>
									</div>
								</div>

								<div className="tech-stack-detailed">
									<h4>{i18n.language === 'ko' ? '사용 기술' : 'Technologies Used'}</h4>
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
											{i18n.language === 'ko' ? '라이브 데모' : 'Live Demo'}
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