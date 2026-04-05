import React, { forwardRef, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { createVariants } from "@/utils/types/motion";
import { getSkillIcon } from "./skillIcons";
import "./TechStack.scss";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface CategoryDef {
	key: string;
	label: string;
	color: string;
	skills: string[];
}

const CATEGORIES: CategoryDef[] = [
	{ key: "lang",  label: "Languages",   color: "#f59e0b",
	  skills: ["Python", "TypeScript", "JavaScript", "Java", "C", "C++"] },
	{ key: "dev",   label: "Development", color: "#3b82f6",
	  skills: ["React", "FastAPI", "PostgreSQL", "MySQL", "Docker", "AWS", "Jenkins", "GitHub", "Nginx", "Vercel"] },
	{ key: "sec",   label: "Security",    color: "#10b981",
	  skills: ["Cloud", "Web"] },
	{ key: "other", label: "Other",       color: "#8b5cf6",
	  skills: ["Windows OS", "Linux OS", "MacOS", "Figma", "Notion", "Slack", "Photoshop", "Premiere"] },
];

// All rows padded to the same width for uniform honeycomb rectangle
const ROW_WIDTH = 10; // matches Development (largest category)

// ─── GhostHexCell ─────────────────────────────────────────────────────────────

const GhostHexCell = () => (
	<div className="hex-ghost" aria-hidden="true">
		<svg viewBox="0 0 88 102" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
			<polygon
				points="44,0 88,25.5 88,76.5 44,102 0,76.5 0,25.5"
				fill="none"
				stroke="rgba(148,163,184,0.28)"
				strokeWidth="2"
			/>
		</svg>
	</div>
);

// ─── HexCell ─────────────────────────────────────────────────────────────────

interface HexCellProps {
	label: string;
	color: string;
	delay: number;
}

const HexCell = ({ label, color, delay }: HexCellProps) => {
	const iconMeta = getSkillIcon(label);
	return (
		<motion.div
			className="hex-cell"
			style={{ "--hex-color": color } as React.CSSProperties}
			initial={{ opacity: 0, scale: 0.5 }}
			whileInView={{ opacity: 1, scale: 1, transition: { duration: 0.35, delay, ease: [0.25, 0.46, 0.45, 0.94] } }}
			viewport={{ once: true, margin: "-20px" }}
			transition={{ duration: 0.14, ease: "easeOut" }}
			whileHover={{ scale: 1.12, zIndex: 10, transition: { duration: 0.12, ease: "easeOut" } }}
		>
			<div className="hex-cell__bg" />
			<div className="hex-cell__face">
				<div className="hex-cell__icon">
					{iconMeta?.src ? (
						<img src={iconMeta.src} alt={label} loading="lazy" />
					) : iconMeta?.icon ? (
						iconMeta.icon
					) : (
						<span className="hex-cell__fallback">{label.charAt(0)}</span>
					)}
				</div>
				<span className="hex-cell__label">{label}</span>
			</div>
		</motion.div>
	);
};

// ─── TechStackSection ─────────────────────────────────────────────────────────

function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
	return (node: T) => {
		refs.forEach((ref) => {
			if (!ref) return;
			if (typeof ref === "function") ref(node);
			else (ref as React.MutableRefObject<T | null>).current = node;
		});
	};
}

const TechStackSection = forwardRef<HTMLElement>((_, forwardedRef) => {
	const { ref, inView } = useInView({ threshold: 0.1 });
	const sectionRef = useRef<HTMLElement | null>(null);
	const honeycombRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const align = () => {
			const section = sectionRef.current;
			const honeycomb = honeycombRef.current;
			if (!section || !honeycomb) return;
			const sr = section.getBoundingClientRect();
			const hr = honeycomb.getBoundingClientRect();
			const offsetX = hr.left - sr.left;
			const offsetY = hr.top - sr.top + section.scrollTop;
			section.style.setProperty("--hex-bg-x", `${offsetX}px`);
			section.style.setProperty("--hex-bg-y", `${offsetY}px`);
		};
		align();
		window.addEventListener("resize", align);
		return () => window.removeEventListener("resize", align);
	}, []);

	const titleVariants = createVariants({
		hidden: { y: 50, opacity: 0 },
		visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
	});

	return (
		<section
			className="tech-stack section"
			id="tech-stack"
			ref={mergeRefs<HTMLElement | null>(ref, forwardedRef, sectionRef)}
		>
			<div className="tech-stack__container container">
				<motion.h2
					className="section-title"
					variants={titleVariants}
					initial="hidden"
					animate={inView ? "visible" : "hidden"}
				>
					Tech Stack
				</motion.h2>

				<div className="honeycomb-wrapper">
					<div className="honeycomb" ref={honeycombRef}>
						{CATEGORIES.map((cat, rowIdx) => {
							// Fill row to ROW_WIDTH with ghost cells
							const ghosts = Math.max(0, ROW_WIDTH - cat.skills.length);
							return (
								<div
									key={cat.key}
									// Even rows (0,2) = aligned; odd rows (1,3) = offset W/2
									className={`honeycomb__row${rowIdx % 2 === 1 ? " honeycomb__row--offset" : ""}`}
								>
									{cat.skills.map((skill, colIdx) => (
										<HexCell
											key={skill}
											label={skill}
											color={cat.color}
											delay={rowIdx * 0.1 + colIdx * 0.04}
										/>
									))}
									{Array.from({ length: ghosts }, (_, i) => (
										<GhostHexCell key={`ghost-${rowIdx}-${i}`} />
									))}
								</div>
							);
						})}
					</div>
				</div>

				{/* Color-coded category legend */}
				<div className="tech-legend">
					{CATEGORIES.map(cat => (
						<div key={cat.key} className="tech-legend__item">
							<span className="tech-legend__dot" style={{ background: cat.color }} />
							<span className="tech-legend__label">{cat.label}</span>
						</div>
					))}
				</div>
			</div>
		</section>
	);
});

TechStackSection.displayName = "TechStackSection";

export default TechStackSection;
