import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { createVariants } from "@/utils/types/motion";
import "./Experience.scss";

function mergeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
	return (node: T) => {
		refs.forEach((ref) => {
			if (!ref) return;
			if (typeof ref === "function") {
				ref(node);
			} else {
				(ref as React.MutableRefObject<T | null>).current = node;
			}
		});
	};
}

const Experience = forwardRef<HTMLElement>((_, forwardedRef) => {
	const { ref, inView } = useInView({ threshold: 0.15 });
	const { t } = useTranslation("experience");

	const containerVariants = createVariants({
		hidden: { opacity: 0 },
		visible: { opacity: 1, transition: { delayChildren: 0.2, staggerChildren: 0.15 } },
	});

	const titleVariants = createVariants({
		hidden: { y: 50, opacity: 0 },
		visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
	});

	const itemVariants = createVariants({
		hidden: { x: -60, opacity: 0 },
		visible: { x: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
	});

	const timeline = t("timeline", { returnObjects: true }) as { year: string; items: string[] }[];

	return (
		<section className="experience section" id="experience" ref={mergeRefs<HTMLElement | null>(ref, forwardedRef)}>
			<motion.div
				className="experience__container container"
				variants={containerVariants}
				initial="hidden"
				animate={inView ? "visible" : "hidden"}
			>
				<motion.h2 className="section-title" variants={titleVariants}>
					{t("title")}
				</motion.h2>

				<div className="timeline">
					{timeline.map((period, index) => (
						<motion.div
							key={period.year}
							className="timeline-item"
							variants={itemVariants}
							custom={index}
							whileHover={{ scale: 1.02, x: 10 }}
							transition={{ duration: 0.3 }}
						>
							<div className="timeline-marker">
								<div className="timeline-dot"></div>
								<div className="timeline-year">{period.year}</div>
							</div>
							<div className="timeline-content">
								{period.items.map((item, itemIndex) => (
									<div key={itemIndex} className="timeline-achievement">
										{item}
									</div>
								))}
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>
		</section>
	);
});

Experience.displayName = "Experience";

export default Experience;
