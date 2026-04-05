import React, { forwardRef, useMemo } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { createVariants } from "@/utils/types/motion";
import useResponsive from "@/utils/hooks/useResponsive";
import { getSkillIcon } from "./skillIcons";
import "./TechStack.scss";

// ─── Types & Constants ───────────────────────────────────────────────────────

type SkillCategory = "lang" | "dev" | "sec" | "other";

interface HexSkill {
	label: string;
	category: SkillCategory;
}

const CATEGORY_META: Record<SkillCategory, { label: string; color: string }> = {
	lang:  { label: "Languages",   color: "#f59e0b" },
	dev:   { label: "Development", color: "#3b82f6" },
	sec:   { label: "Security",    color: "#10b981" },
	other: { label: "Other",       color: "#8b5cf6" },
};

const HEX_SKILLS: HexSkill[] = [
	{ label: "Python",      category: "lang"  },
	{ label: "TypeScript",  category: "lang"  },
	{ label: "JavaScript",  category: "lang"  },
	{ label: "Java",        category: "lang"  },
	{ label: "C",           category: "lang"  },
	{ label: "C++",         category: "lang"  },
	{ label: "React",       category: "dev"   },
	{ label: "FastAPI",     category: "dev"   },
	{ label: "PostgreSQL",  category: "dev"   },
	{ label: "MySQL",       category: "dev"   },
	{ label: "Docker",      category: "dev"   },
	{ label: "AWS",         category: "dev"   },
	{ label: "Jenkins",     category: "dev"   },
	{ label: "GitHub",      category: "dev"   },
	{ label: "Nginx",       category: "dev"   },
	{ label: "Vercel",      category: "dev"   },
	{ label: "Cloud",       category: "sec"   },
	{ label: "Web",         category: "sec"   },
	{ label: "Windows OS",  category: "other" },
	{ label: "Linux OS",    category: "other" },
	{ label: "MacOS",       category: "other" },
	{ label: "Figma",       category: "other" },
	{ label: "Notion",      category: "other" },
	{ label: "Slack",       category: "other" },
	{ label: "Photoshop",   category: "other" },
	{ label: "Premiere",    category: "other" },
];

const DESKTOP_ROW_SIZES = [7, 6, 7, 6];
const MOBILE_ROW_SIZES  = [5, 4, 5, 4, 5, 3];

function buildHexRows(skills: HexSkill[], rowSizes: number[]): HexSkill[][] {
	const rows: HexSkill[][] = [];
	let cursor = 0;
	for (const size of rowSizes) {
		rows.push(skills.slice(cursor, cursor + size));
		cursor += size;
	}
	return rows;
}

// ─── HexCell ─────────────────────────────────────────────────────────────────

interface HexCellProps {
	skill: HexSkill;
	globalIndex: number;
}

const HexCell = ({ skill, globalIndex }: HexCellProps) => {
	const iconMeta = getSkillIcon(skill.label);
	const color = CATEGORY_META[skill.category].color;

	return (
		<motion.div
			className="hex-cell"
			style={{ "--hex-color": color } as React.CSSProperties}
			initial={{ opacity: 0, scale: 0.4 }}
			whileInView={{ opacity: 1, scale: 1 }}
			viewport={{ once: true, margin: "-20px" }}
			transition={{
				duration: 0.45,
				delay: globalIndex * 0.022,
				ease: [0.25, 0.46, 0.45, 0.94],
			}}
			whileHover={{ scale: 1.18, zIndex: 10 }}
		>
			<div className="hex-cell__bg" />
			<div className="hex-cell__face">
				<div className="hex-cell__icon">
					{iconMeta?.src ? (
						<img src={iconMeta.src} alt={skill.label} loading="lazy" />
					) : iconMeta?.icon ? (
						iconMeta.icon
					) : (
						<span className="hex-cell__fallback">{skill.label.charAt(0)}</span>
					)}
				</div>
				<span className="hex-cell__label">{skill.label}</span>
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
	const { isMobile } = useResponsive();

	const rowSizes = isMobile ? MOBILE_ROW_SIZES : DESKTOP_ROW_SIZES;
	const hexRows = useMemo(() => buildHexRows(HEX_SKILLS, rowSizes), [rowSizes]);

	const titleVariants = createVariants({
		hidden: { y: 50, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
		},
	});

	return (
		<section
			className="tech-stack section"
			id="tech-stack"
			ref={mergeRefs<HTMLElement | null>(ref, forwardedRef)}
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

				<div className="honeycomb">
					{hexRows.map((row, rowIdx) => {
						const rowStart = rowSizes.slice(0, rowIdx).reduce((a, b) => a + b, 0);
						return (
							<div
								key={rowIdx}
								className={`honeycomb__row${rowIdx % 2 === 1 ? " honeycomb__row--offset" : ""}`}
							>
								{row.map((skill, skillIdx) => (
									<HexCell
										key={skill.label}
										skill={skill}
										globalIndex={rowStart + skillIdx}
									/>
								))}
							</div>
						);
					})}
				</div>

				<div className="tech-legend">
					{(Object.entries(CATEGORY_META) as [SkillCategory, { label: string; color: string }][]).map(
						([key, { label, color }]) => (
							<div key={key} className="tech-legend__item">
								<span className="tech-legend__dot" style={{ backgroundColor: color }} />
								<span className="tech-legend__label">{label}</span>
							</div>
						)
					)}
				</div>
			</div>
		</section>
	);
});

TechStackSection.displayName = "TechStackSection";

export default TechStackSection;
