import { useMemo, useState, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
import { Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import useResponsive from "@/utils/hooks/useResponsive";
import { projects, Project, Screenshot } from "./projects.data";
import "./Projects.scss";

const HEADER_HEIGHT = 70;
const TITLE_HEIGHT = 140;
const CARD_OFFSET = 12;

const CARD_THEMES = [
	// MON47 - 주황 계열
	{ bg: 'rgba(69, 26, 3, 0.5)', glow: '#f59e0b', border: '#fcd34d' },
	// Winection - 파랑 계열
	{ bg: 'rgba(23, 37, 84, 0.5)', glow: '#3b82f6', border: '#93c5fd' },
	// WHSCA - 초록 계열
	{ bg: 'rgba(5, 46, 22, 0.5)', glow: '#10b981', border: '#6ee7b7' },
	// Pokeface - 노랑 계열
	{ bg: 'rgba(66, 32, 6, 0.5)', glow: '#eab308', border: '#fde047' },
	// Portfolio - 보라 계열
	{ bg: 'rgba(46, 16, 101, 0.5)', glow: '#8b5cf6', border: '#c4b5fd' },
];

const Projects = () => {
	const { isMobile, isTablet } = useResponsive();

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
		<div className="projects-stack" style={stackStyle}>
			<div className="projects-stack__header">
				<h2 className="section-title">Project</h2>
			</div>

			<div className="projects-stack__cards">
				{projects.map((project, index) => (
					<ProjectCard 
						key={project.id} 
						project={project} 
						index={index}
						total={projects.length}
						cardOffset={CARD_OFFSET}
						theme={CARD_THEMES[index % CARD_THEMES.length]}
					/>
				))}

				<div className="projects-stack__tail" aria-hidden />
			</div>
		</div>
	);
};

interface ProjectCardProps {
	project: Project;
	index: number;
	total: number;
	theme: { bg: string; glow: string; border: string };
	cardOffset: number;
}

const ProjectCard = ({ project, index, total, theme, cardOffset }: ProjectCardProps) => {
	const { i18n } = useTranslation();
	const lang = i18n.language as 'ko' | 'en';
	const isLastCard = index === total - 1;
	
	// 헤더가 sticky가 아니므로 TITLE_HEIGHT 제거
	const topOffset = HEADER_HEIGHT + 20 + (index * cardOffset);

	return (
		<div 
			className={`project-card ${isLastCard ? 'project-card--last' : ''}`}
			style={{ 
				top: `${topOffset}px`,
				zIndex: index + 1,
				backgroundColor: theme.bg,
				'--glow-color': theme.glow,
				'--border-color': theme.border,
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
						{project.githubUrl && (
							<a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="action-btn">
								<Github size={14} /> GitHub
							</a>
						)}
						{project.liveUrl && (
							<a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="action-btn">
								<ExternalLink size={14} /> Live
							</a>
						)}
					</div>
				</div>

				<div className="project-card__visual">
					<ScreenshotSlider screenshots={project.screenshots} lang={lang} glowColor={theme.glow} />
				</div>
			</div>
		</div>
	);
};

interface ScreenshotSliderProps {
	screenshots: Screenshot[];
	lang: 'ko' | 'en';
	glowColor: string;
}

const ScreenshotSlider = ({ screenshots, lang, glowColor }: ScreenshotSliderProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	const goToPrev = () => {
		setCurrentIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
	};

	const goToNext = () => {
		setCurrentIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
	};

	return (
		<div className="screenshot-slider" style={{ '--slider-glow': glowColor } as CSSProperties}>
			<button onClick={goToPrev} className="slider-btn">
				<ChevronLeft size={18} />
			</button>

			<div className="screenshot-slider__image-wrapper">
				<div className="screenshot-slider__image">
					<div className="screenshot-placeholder">
						<span>Screenshot</span>
					</div>
				</div>

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
