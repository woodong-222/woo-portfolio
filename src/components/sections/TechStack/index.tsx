import React, { forwardRef, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { createVariants } from "@/utils/types/motion";
import useResponsive from "@/utils/hooks/useResponsive";
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
	  skills: ["Python", "C++", "C", "TypeScript"] },
	{ key: "dev",   label: "Development", color: "#3b82f6",
	  skills: ["React", "FastAPI", "PostgreSQL", "MySQL", "Docker", "AWS", "Jenkins", "Nginx"] },
	{ key: "sec",   label: "Security",    color: "#10b981",
	  skills: ["Cloud", "Web"] },
	{ key: "other", label: "Other",       color: "#8b5cf6",
	  skills: ["Notion", "Slack", "Figma", "Photoshop", "Premiere"] },
];

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
			whileInView={{ opacity: 1, scale: 1, filter: "drop-shadow(0 0 0px transparent) drop-shadow(0 0 0px transparent)", transition: { duration: 0.35, delay, ease: [0.25, 0.46, 0.45, 0.94] } }}
			viewport={{ once: false, margin: "-20px" }}
			transition={{ duration: 0.04, ease: "easeOut" }}
			whileHover={{
				scale: 1.12,
				zIndex: 10,
				filter: `drop-shadow(0 0 8px ${color}ee) drop-shadow(0 0 20px ${color}66)`,
				transition: { duration: 0.12, ease: "easeOut" },
			}}
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

const NEON_COLOR = "#818cf8";
const NEON_GLOW =
	`drop-shadow(0 0 6px ${NEON_COLOR}cc) drop-shadow(0 0 16px ${NEON_COLOR}55)`;

// Mobile groups: one label per category, multiple rows allowed
interface MobileGroupDef {
	key: string;
	label: string;
	color: string;
	rows: string[][];
}

const MOBILE_GROUPS: MobileGroupDef[] = [
	{ key: "lang",  label: "Languages",   color: "#f59e0b",
	  rows: [["Python", "C++", "C", "TypeScript"]] },
	{ key: "dev",   label: "Development", color: "#3b82f6",
	  rows: [
		["React", "FastAPI", "PostgreSQL", "MySQL"],
		["Docker", "AWS", "Jenkins", "Nginx"],
	  ] },
	{ key: "sec",   label: "Security",    color: "#10b981",
	  rows: [["Cloud", "Web"]] },
	{ key: "other", label: "Other",       color: "#8b5cf6",
	  rows: [["Notion", "Slack", "Figma", "Photoshop", "Premiere"]] },
];

const TechStackSection = forwardRef<HTMLElement>((_, forwardedRef) => {
	const { isMobile } = useResponsive();
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

				{isMobile ? (
					/* ── 모바일: 카테고리별 수직 그룹 ── */
					<div className="mobile-stack">
						{MOBILE_GROUPS.map((group, groupIdx) => (
							<div key={group.key} className="mobile-stack__group">
								<span
									className="mobile-stack__label"
									style={{ color: group.color }}
								>
									{group.label}
								</span>
								<div className="honeycomb-wrapper">
									<motion.div
										className="honeycomb"
										ref={groupIdx === 0 ? honeycombRef : undefined}
										initial={{ filter: "drop-shadow(0 0 0px transparent)" }}
										whileInView={{
											filter: NEON_GLOW,
											transition: { duration: 0.9, delay: 0.2, ease: "easeOut" },
										}}
										viewport={{ once: false, margin: "-20px" }}
									>
										{group.rows.map((rowSkills, rowIdx) => (
											<div
												key={rowIdx}
												className={`honeycomb__row${rowIdx % 2 === 1 ? " honeycomb__row--offset" : ""}`}
											>
												{rowSkills.map((skill, colIdx) => (
													<HexCell
														key={skill}
														label={skill}
														color={group.color}
														delay={colIdx * 0.05}
													/>
												))}
											</div>
										))}
									</motion.div>
								</div>
							</div>
						))}
					</div>
				) : (
					/* ── 데스크탑/태블릿: 기존 레이아웃 ── */
					<div className="honeycomb-wrapper">
						<div className="labels-panel">
							{CATEGORIES.map((cat, i) => (
								<React.Fragment key={cat.key}>
									{i > 0 && <div className="labels-panel__divider" />}
									<span
										className="labels-panel__item"
										style={{ color: cat.color }}
									>
										{cat.label}
									</span>
								</React.Fragment>
							))}
						</div>

						<motion.div
							className="honeycomb"
							ref={honeycombRef}
							initial={{ filter: "drop-shadow(0 0 0px transparent)" }}
							whileInView={{
								filter: NEON_GLOW,
								transition: { duration: 0.9, delay: 0.5, ease: "easeOut" },
							}}
							viewport={{ once: false, margin: "-20px" }}
						>
							{CATEGORIES.map((cat, rowIdx) => (
								<div
									key={cat.key}
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
								</div>
							))}
						</motion.div>
					</div>
				)}

			</div>
		</section>
	);
});

TechStackSection.displayName = "TechStackSection";

export default TechStackSection;
