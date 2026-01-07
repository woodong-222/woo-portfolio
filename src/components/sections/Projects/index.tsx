import { forwardRef, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { Github, ChevronLeft, ChevronRight, ExternalLink, X, Link as LinkIcon } from "lucide-react";
import useResponsive from "@/utils/hooks/useResponsive";
import { projects, Project, Screenshot } from "./projects.data";
import "./Projects.scss";

const HEADER_HEIGHT = 70;
const TITLE_AREA_HEIGHT = 120; // 제목 영역 높이
const CARD_OFFSET = 12;

const CARD_THEMES = [
	// MON47 - 주황 계열
	{ bg: 'rgba(69, 26, 3, 0.5)', glow: '#f59e0b', border: '#fdba74' },
	// Winection - 파랑 계열
	{ bg: 'rgba(23, 37, 84, 0.5)', glow: '#3b82f6', border: '#93c5fd' },
	// WHSCA - 초록 계열
	{ bg: 'rgba(5, 46, 22, 0.5)', glow: '#10b981', border: '#6ee7b7' },
	// Pokeface - 노랑 계열
	{ bg: 'rgba(66, 32, 6, 0.5)', glow: '#eab308', border: '#fde047' },
	// Portfolio - 노랑 계열
	{ bg: 'rgba(49, 33, 91, 0.5)', glow: '#a78bfa', border: '#7c3aed' },
];

const Projects = () => {
	const { isMobile, isTablet } = useResponsive();
	const cardsRef = useRef<HTMLDivElement>(null);
	const lastCardRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLDivElement>(null);
	const [activeProject, setActiveProject] = useState<Project | null>(null);
	const [openingProjectId, setOpeningProjectId] = useState<string | null>(null);

	const layoutConfig = useMemo(
		() => {
			if (isMobile) {
				return { stackSpacing: '55vh', lastExtraSpacing: '40vh' };
			}

			if (isTablet) {
				return { stackSpacing: '65vh', lastExtraSpacing: '50vh' };
			}

			return { stackSpacing: '75vh', lastExtraSpacing: '60vh' };
		},
		[isMobile, isTablet]
	);

	const cardCount = projects.length;

	// 모든 카드가 동일한 sticky top (마지막 카드의 translateY 포함한 실제 위치)
	const stickyTop = HEADER_HEIGHT + TITLE_AREA_HEIGHT;
	const lastCardVisualTop = stickyTop + ((cardCount - 1) * CARD_OFFSET);

	useEffect(() => {
		let rafId: number;

		const handleScroll = () => {
			rafId = requestAnimationFrame(() => {
				if (!lastCardRef.current || !titleRef.current) return;

				const lastCardRect = lastCardRef.current.getBoundingClientRect();

				// 제목 이동 (마지막 카드 기준)
				// 마지막 카드의 시각적 위치는 stickyTop + translateY
				if (lastCardRect.top < lastCardVisualTop) {
					const offset = lastCardVisualTop - lastCardRect.top;
					titleRef.current.style.transform = `translateY(-${offset}px)`;
				} else {
					titleRef.current.style.transform = 'translateY(0)';
				}
			});
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => {
			window.removeEventListener('scroll', handleScroll);
			cancelAnimationFrame(rafId);
		};
	}, [lastCardVisualTop]);

	useEffect(() => {
		if (activeProject) {
			document.body.style.overflow = 'hidden';
			return;
		}

		document.body.style.overflow = '';
	}, [activeProject]);

	const stackStyle = useMemo(
		() =>
			({
				'--card-stack-spacing': layoutConfig.stackSpacing,
				'--card-stack-last-extra': layoutConfig.lastExtraSpacing,
				'--card-count': cardCount,
				'--card-offset': `${CARD_OFFSET}px`,
			}) as CSSProperties,
		[layoutConfig, cardCount]
	);

	return (
		<>
			<div className="projects-stack" style={stackStyle}>
				{/* 제목 - 카드 컨테이너 밖에서 sticky, JS로 오프셋 조절 */}
				<div
					ref={titleRef}
					className="projects-stack__title"
					style={{ top: `${HEADER_HEIGHT}px` }}
				>
					<h2 className="section-title">Project</h2>
				</div>

				<div className="projects-stack__cards" ref={cardsRef}>
					{projects.map((project, index) => (
						<ProjectCard
							key={project.id}
							project={project}
							index={index}
							total={projects.length}
							cardOffset={CARD_OFFSET}
							theme={CARD_THEMES[index % CARD_THEMES.length]}
							isExpanding={openingProjectId === project.id}
							onOpen={() => {
								setOpeningProjectId(project.id);
								window.setTimeout(() => {
									setActiveProject(project);
									setOpeningProjectId(null);
								}, 220);
							}}
							ref={index === projects.length - 1 ? lastCardRef : undefined}
						/>
					))}
				</div>

				<div className="projects-stack__tail" aria-hidden />
			</div>

			{activeProject && (
				<ProjectModal
					project={activeProject}
					onClose={() => {
						setActiveProject(null);
						setOpeningProjectId(null);
					}}
				/>
			)}
		</>
	);
};

interface ProjectCardProps {
	project: Project;
	index: number;
	total: number;
	theme: { bg: string; glow: string; border: string };
	cardOffset: number;
	isExpanding: boolean;
	onOpen: () => void;
}

const ProjectCard = forwardRef<HTMLDivElement, ProjectCardProps>(
	({ project, index, total, theme, cardOffset, isExpanding, onOpen }, ref) => {
	const { i18n, t } = useTranslation('common');
	const lang = i18n.language as 'ko' | 'en';
	const isLastCard = index === total - 1;

	// 모든 카드가 동일한 top, translateY로 간격 설정
	// 이렇게 하면 sticky 해제 시에도 translateY가 유지되어 간격 보존
	const stickyTop = HEADER_HEIGHT + TITLE_AREA_HEIGHT;
	const translateY = index * cardOffset;

	return (
		<div
			ref={ref}
			className={`project-card ${isLastCard ? 'project-card--last' : ''} ${isExpanding ? 'project-card--expanding' : ''}`}
			style={{
				top: `${stickyTop}px`,
				backgroundColor: theme.bg,
				'--glow-color': theme.glow,
				'--border-color': theme.border,
				'--card-translate': `${translateY}px`,
				zIndex: index + 1,
			} as CSSProperties}
		>
			<div className="project-card__inner">
				<div className="project-card__content">
					<div className="project-period">{project.type} | {project.period}</div>
					
					<h3 className="project-title">
						{project.title[lang]}
					</h3>

					<div className="project-description">
						{project.features[lang].slice(0, 3).map((feature, idx) => (
							<p key={idx}>{feature}</p>
						))}
					</div>

					<div className="project-tech">
						{project.technologies.slice(0, 6).map((tech, idx) => (
							<span key={idx} className="tech-tag">{tech}</span>
						))}
					</div>

					<div className="project-actions">
						<button
							type="button"
							className="action-btn action-btn--primary"
							onClick={onOpen}
						>
							{t('buttons.detail')}
						</button>
					</div>
				</div>

				<div className="project-card__visual">
					<ScreenshotSlider screenshots={project.screenshots} glowColor={theme.glow} variant="card" />
				</div>
			</div>
		</div>
	);
});

interface ProjectModalProps {
	project: Project;
	onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
	const { i18n, t } = useTranslation('common');
	const lang = i18n.language as 'ko' | 'en';
	const [isGitPanelOpen, setIsGitPanelOpen] = useState(false);

	return (
		<div className="project-modal" role="dialog" aria-modal="true">
			<div className="project-modal__backdrop" onClick={onClose} />
			<div className="project-modal__shell" role="document">
				<div className="project-modal__dialog">
					<button className="project-modal__close" type="button" onClick={onClose} aria-label={t('buttons.close')}>
						<X size={18} />
					</button>
					<div className="project-modal__header">
						<p className="project-modal__eyebrow">{project.type} · {project.period}</p>
						<h3 className="project-modal__title">{project.title[lang]}</h3>
						<div className="project-modal__meta">
							<span>{project.scale[lang]}</span>
							<span>{project.mainTech}</span>
							<span>{project.library}</span>
						</div>
					</div>

					<div className="project-modal__body">
						<div className="project-modal__left">
							<h4>{lang === 'ko' ? '핵심 포인트' : 'Highlights'}</h4>
							<ul>
								{project.features[lang].map((feature, idx) => (
									<li key={idx}>{feature}</li>
								))}
							</ul>

							<h4>{lang === 'ko' ? '기술 스택' : 'Tech Stack'}</h4>
							<div className="project-modal__tags">
								{project.technologies.map((tech) => (
									<span key={tech}>{tech}</span>
								))}
							</div>
						</div>

						<div className="project-modal__right">
							<ScreenshotSlider screenshots={project.screenshots} glowColor={project.glowColor} variant="modal" />
						</div>
					</div>
				</div>

				<div className="project-modal__external-actions" aria-label="Project links">
					{project.liveUrl && (
						<div className="project-modal__action-item">
							<a
								href={project.liveUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="project-modal__action-btn"
								aria-label={t('buttons.visit')}
							>
								<ExternalLink size={18} />
							</a>
							<a
								href={project.liveUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="project-modal__action-tooltip"
							>
								{lang === 'ko' ? '사이트 바로가기' : 'Visit site'}
							</a>
						</div>
					)}
					{project.githubUrl && (
						<div className="project-modal__action-item">
							<a
								href={project.githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="project-modal__action-btn project-modal__action-btn--single"
								aria-label={t('buttons.github')}
							>
								<Github size={18} />
							</a>
							<a
								href={project.githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="project-modal__action-tooltip"
							>
								{lang === 'ko' ? '깃허브 바로가기' : 'GitHub'}
							</a>
						</div>
					)}
					{project.githubUrls && project.githubUrls.length > 0 && (
						<div className={`project-modal__action-item project-modal__action-item--multi ${isGitPanelOpen ? 'is-open' : ''}`}>
							<button
								type="button"
								className={`project-modal__action-btn project-modal__action-btn--multi ${isGitPanelOpen ? 'is-open' : ''}`}
								aria-label={t('buttons.github')}
								onClick={() => setIsGitPanelOpen((prev) => !prev)}
							>
								<span className="project-modal__action-icon" aria-hidden="true">
									{isGitPanelOpen ? <X size={18} /> : <Github size={18} />}
								</span>
							</button>
							<div className="project-modal__action-panel">
								{project.githubUrls.map((item) => (
									<a
										key={item.url}
										href={item.url}
										target="_blank"
										rel="noopener noreferrer"
									>
										<LinkIcon size={14} />
										{item.label}
									</a>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

interface ScreenshotSliderProps {
	screenshots: Screenshot[];
	glowColor: string;
	variant?: 'card' | 'modal';
}

const ScreenshotSlider = ({ screenshots, glowColor, variant = 'card' }: ScreenshotSliderProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const { i18n } = useTranslation('common');
	const lang = i18n.language as 'ko' | 'en';
	const isModal = variant === 'modal';

	useEffect(() => {
		if (!isModal || screenshots.length <= 1) return;
		const timer = window.setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % screenshots.length);
		}, 4500);

		return () => window.clearInterval(timer);
	}, [screenshots.length]);

	const goToPrev = () => {
		setCurrentIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
	};

	const goToNext = () => {
		setCurrentIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
	};

	const prevIndex = currentIndex === 0 ? screenshots.length - 1 : currentIndex - 1;
	const nextIndex = currentIndex === screenshots.length - 1 ? 0 : currentIndex + 1;

	return (
		<div className="screenshot-slider" style={{ '--slider-glow': glowColor } as CSSProperties}>
			<button onClick={goToPrev} className="slider-btn">
				<ChevronLeft size={18} />
			</button>

			<div className="screenshot-slider__image-wrapper">
				{isModal && (
					<div className="screenshot-slider__preview screenshot-slider__preview--left" onClick={() => setCurrentIndex(prevIndex)}>
						<img src={screenshots[prevIndex].src} alt={screenshots[prevIndex].label[lang]} />
					</div>
				)}
				<div className="screenshot-slider__image">
					<img src={screenshots[currentIndex].src} alt={screenshots[currentIndex].label[lang]} />
				</div>
				{isModal && (
					<div className="screenshot-slider__preview screenshot-slider__preview--right" onClick={() => setCurrentIndex(nextIndex)}>
						<img src={screenshots[nextIndex].src} alt={screenshots[nextIndex].label[lang]} />
					</div>
				)}
				{isModal && (
					<div className="screenshot-slider__caption">
						{screenshots[currentIndex].label[lang]}
					</div>
				)}

				<div className="screenshot-slider__dots">
					{screenshots.map((_, idx) => (
						<button
							key={idx}
							className={`dot ${idx === currentIndex ? 'active' : ''}`}
							onClick={() => setCurrentIndex(idx)}
						/>
					))}
				</div>
			</div>

			<button onClick={goToNext} className="slider-btn">
				<ChevronRight size={18} />
			</button>
		</div>
	);
};

export default Projects;
