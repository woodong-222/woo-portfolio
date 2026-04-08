import { forwardRef, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Github, ExternalLink, X, Link as LinkIcon, ChevronLeft, ChevronRight } from "lucide-react";
import useResponsive from "@/utils/hooks/useResponsive";
import { projects, type Project, type Screenshot } from "./projects.data";
import "./Projects.scss";

// ─── Constants ───────────────────────────────────────────────────────────────

const HEADER_HEIGHT = 70;
const TITLE_AREA_HEIGHT = 110;
const CARD_OFFSET = 14;

const CARD_THEMES = [
	{ bg: "rgba(69, 26, 3, 0.55)", glow: "#f59e0b", border: "#fdba74" },
	{ bg: "rgba(23, 37, 84, 0.55)", glow: "#3b82f6", border: "#93c5fd" },
	{ bg: "rgba(5, 46, 22, 0.55)", glow: "#10b981", border: "#6ee7b7" },
	{ bg: "rgba(66, 32, 6, 0.55)", glow: "#eab308", border: "#fde047" },
	{ bg: "rgba(49, 33, 91, 0.55)", glow: "#a78bfa", border: "#c4b5fd" },
];

// ─── ScreenshotImage ──────────────────────────────────────────────────────────

interface ScreenshotImageProps {
	src: string;
	alt: string;
	className?: string;
}

const ScreenshotImage = ({ src, alt, className }: ScreenshotImageProps) => {
	const [hasError, setHasError] = useState(false);

	if (hasError) {
		return <div className="screenshot-skeleton" aria-label={alt} />;
	}

	return (
		<img
			src={src}
			alt={alt}
			className={className}
			loading="lazy"
			onError={() => setHasError(true)}
		/>
	);
};

// ─── ScreenshotSlider ─────────────────────────────────────────────────────────

interface ScreenshotSliderProps {
	screenshots: Screenshot[];
	glowColor: string;
	variant?: "card" | "modal";
}

const ScreenshotSlider = ({ screenshots, glowColor, variant = "card" }: ScreenshotSliderProps) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const { i18n } = useTranslation("common");
	const lang = i18n.language as "ko" | "en";
	const isModal = variant === "modal";

	useEffect(() => {
		if (!isModal || screenshots.length <= 1) return;
		const timer = window.setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % screenshots.length);
		}, 4500);
		return () => window.clearInterval(timer);
	}, [isModal, screenshots.length]);

	if (screenshots.length === 0) {
		return (
			<div className="screenshot-slider" style={{ "--slider-glow": glowColor } as CSSProperties}>
				<div className="screenshot-slider__image-wrapper">
					<div className="screenshot-slider__image">
						<div className="screenshot-skeleton" />
					</div>
				</div>
			</div>
		);
	}

	const prevIndex = currentIndex === 0 ? screenshots.length - 1 : currentIndex - 1;
	const nextIndex = currentIndex === screenshots.length - 1 ? 0 : currentIndex + 1;

	return (
		<div className="screenshot-slider" style={{ "--slider-glow": glowColor } as CSSProperties}>
			<button
				onClick={() => setCurrentIndex(prevIndex)}
				className="slider-btn"
				aria-label="이전 스크린샷"
			>
				<ChevronLeft size={16} />
			</button>

			<div className="screenshot-slider__image-wrapper">
				{isModal && (
					<div
						className="screenshot-slider__preview screenshot-slider__preview--left"
						onClick={() => setCurrentIndex(prevIndex)}
					>
						<ScreenshotImage src={screenshots[prevIndex].src} alt={screenshots[prevIndex].label[lang]} />
					</div>
				)}

				<div className="screenshot-slider__image">
					<ScreenshotImage
						src={screenshots[currentIndex].src}
						alt={screenshots[currentIndex].label[lang]}
					/>
				</div>

				{isModal && (
					<div
						className="screenshot-slider__preview screenshot-slider__preview--right"
						onClick={() => setCurrentIndex(nextIndex)}
					>
						<ScreenshotImage src={screenshots[nextIndex].src} alt={screenshots[nextIndex].label[lang]} />
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
							className={`dot ${idx === currentIndex ? "active" : ""}`}
							onClick={() => setCurrentIndex(idx)}
							aria-label={`스크린샷 ${idx + 1}`}
						/>
					))}
				</div>
			</div>

			<button
				onClick={() => setCurrentIndex(nextIndex)}
				className="slider-btn"
				aria-label="다음 스크린샷"
			>
				<ChevronRight size={16} />
			</button>
		</div>
	);
};

// ─── ProjectCard ──────────────────────────────────────────────────────────────

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
		const { i18n, t } = useTranslation("common");
		const lang = i18n.language as "ko" | "en";
		const isLastCard = index === total - 1;
		const stickyTop = HEADER_HEIGHT + TITLE_AREA_HEIGHT;
		const translateY = index * cardOffset;

		return (
			<motion.div
				ref={ref}
				className={`project-card ${isLastCard ? "project-card--last" : ""} ${isExpanding ? "project-card--expanding" : ""}`}
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: false, margin: "-60px" }}
				transition={{ duration: 0.5, delay: index * 0.08 }}
				style={{
					top: `${stickyTop}px`,
					"--stack-y": `${translateY}px`,
					backgroundColor: theme.bg,
					"--glow-color": theme.glow,
					"--border-color": theme.border,
					zIndex: index + 1,
				} as CSSProperties}
			>
				<div className="project-card__inner">
					{/* 좌: 텍스트 */}
					<div className="project-card__content">
						<div className="project-card__meta">
							<span className="project-card__type">{project.type}</span>
							<span className="project-card__period">{project.period}</span>
							<span className="project-card__scale">{project.scale[lang]}</span>
						</div>

						<h3 className="project-card__title">{project.title[lang]}</h3>

						<p className="project-card__impact">{project.impact[lang]}</p>

						<ul className="project-card__features">
							{project.features[lang].slice(0, 3).map((feature, idx) => (
								<li key={idx}>{feature}</li>
							))}
						</ul>

						<div className="project-card__tech">
							{project.technologies.slice(0, 5).map((tech) => (
								<span key={tech} className="tech-tag">{tech}</span>
							))}
						</div>

						<div className="project-card__actions">
							<button
								type="button"
								className="action-btn action-btn--primary"
								onClick={onOpen}
							>
								{t("buttons.detail")}
							</button>
							{project.liveUrl && (
								<a
									href={project.liveUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="action-btn action-btn--secondary"
								>
									<LinkIcon size={13} />
									Link
								</a>
							)}
							{project.githubUrl && (
								<a
									href={project.githubUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="action-btn action-btn--secondary"
								>
									<Github size={13} />
									GitHub
								</a>
							)}
						</div>
					</div>

					{/* 우: 스크린샷 */}
					<div className="project-card__visual">
						<ScreenshotSlider
							screenshots={project.screenshots}
							glowColor={theme.glow}
							variant="card"
						/>
					</div>
				</div>
			</motion.div>
		);
	}
);

ProjectCard.displayName = "ProjectCard";

// ─── ProjectModal ─────────────────────────────────────────────────────────────

interface ProjectModalProps {
	project: Project;
	onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
	const { i18n, t } = useTranslation("common");
	const lang = i18n.language as "ko" | "en";
	const [isGitPanelOpen, setIsGitPanelOpen] = useState(false);

	return (
		<div className="project-modal" role="dialog" aria-modal="true">
			<div className="project-modal__backdrop" onClick={onClose} />
			<div className="project-modal__shell" role="document">
				<div
					className="project-modal__dialog"
					style={{
						"--modal-glow": project.glowColor,
						"--modal-border": project.glowColor + "44",
						"--modal-bg": "rgba(15, 23, 42, 0.55)",
					} as React.CSSProperties}
				>
					<button
						className="project-modal__close"
						type="button"
						onClick={onClose}
						aria-label={t("buttons.close")}
					>
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
							<h4>{lang === "ko" ? "핵심 포인트" : "Highlights"}</h4>
							<ul>
								{project.features[lang].map((feature, idx) => (
									<li key={idx}>{feature}</li>
								))}
							</ul>
							<h4>{lang === "ko" ? "기술 스택" : "Tech Stack"}</h4>
							<div className="project-modal__tags">
								{project.technologies.map((tech) => (
									<span key={tech}>{tech}</span>
								))}
							</div>
						</div>

						<div className="project-modal__right">
							<ScreenshotSlider
								screenshots={project.screenshots}
								glowColor={project.glowColor}
								variant="modal"
							/>
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
								aria-label={t("buttons.visit")}
							>
								<ExternalLink size={18} />
							</a>
							<a
								href={project.liveUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="project-modal__action-tooltip"
							>
								{lang === "ko" ? "사이트 바로가기" : "Visit site"}
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
								aria-label={t("buttons.github")}
							>
								<Github size={18} />
							</a>
							<a
								href={project.githubUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="project-modal__action-tooltip"
							>
								{lang === "ko" ? "깃허브 바로가기" : "GitHub"}
							</a>
						</div>
					)}
					{project.githubUrls && project.githubUrls.length > 0 && (
						<div
							className={`project-modal__action-item project-modal__action-item--multi ${
								isGitPanelOpen ? "is-open" : ""
							}`}
						>
							<button
								type="button"
								className={`project-modal__action-btn project-modal__action-btn--multi ${
									isGitPanelOpen ? "is-open" : ""
								}`}
								aria-label={t("buttons.github")}
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

ProjectModal.displayName = "ProjectModal";

// ─── Projects (main) ──────────────────────────────────────────────────────────

const Projects = () => {
	const { isMobile, isTablet } = useResponsive();
	const titleRef = useRef<HTMLDivElement>(null);
	const lastCardRef = useRef<HTMLDivElement>(null);
	const [activeProject, setActiveProject] = useState<Project | null>(null);
	const [openingProjectId, setOpeningProjectId] = useState<string | null>(null);

	const cardCount = projects.length;
	const stickyTop = HEADER_HEIGHT + TITLE_AREA_HEIGHT;
	const lastCardVisualTop = stickyTop + ((cardCount - 1) * CARD_OFFSET);

	const layoutConfig = useMemo(() => {
		if (isMobile) return { stackSpacing: "55vh", lastExtraSpacing: "40vh" };
		if (isTablet) return { stackSpacing: "65vh", lastExtraSpacing: "50vh" };
		return { stackSpacing: "75vh", lastExtraSpacing: "60vh" };
	}, [isMobile, isTablet]);

	const stackStyle = useMemo(
		() => ({
			"--card-stack-spacing": layoutConfig.stackSpacing,
			"--card-stack-last-extra": layoutConfig.lastExtraSpacing,
			"--card-count": cardCount,
			"--card-offset": `${CARD_OFFSET}px`,
		}) as CSSProperties,
		[layoutConfig, cardCount]
	);

	// 마지막 카드가 올라오면 제목도 밀어올리기
	useEffect(() => {
		let rafId: number;
		const handleScroll = () => {
			rafId = requestAnimationFrame(() => {
				if (!lastCardRef.current || !titleRef.current) return;
				const rect = lastCardRef.current.getBoundingClientRect();
				if (rect.top < lastCardVisualTop) {
					const offset = lastCardVisualTop - rect.top;
					titleRef.current.style.transform = `translateY(-${offset}px)`;
				} else {
					titleRef.current.style.transform = "translateY(0)";
				}
			});
		};
		window.addEventListener("scroll", handleScroll, { passive: true });
		return () => {
			window.removeEventListener("scroll", handleScroll);
			cancelAnimationFrame(rafId);
		};
	}, [lastCardVisualTop]);

	useEffect(() => {
		document.body.style.overflow = activeProject ? "hidden" : "";
		return () => { document.body.style.overflow = ""; };
	}, [activeProject]);

	return (
		<>
			<div className="projects-stack" id="projects" style={stackStyle}>
				<div
					ref={titleRef}
					className="projects-stack__title"
					style={{ top: `${HEADER_HEIGHT}px` }}
				>
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
							isExpanding={openingProjectId === project.id}
							onOpen={() => {
								setOpeningProjectId(project.id);
								window.setTimeout(() => {
									setActiveProject(project);
									setOpeningProjectId(null);
								}, 200);
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

export default Projects;
