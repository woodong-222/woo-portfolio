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
		visible: { opacity: 1, transition: { delayChildren: 0.1, staggerChildren: 0.12 } },
	});

	const titleVariants = createVariants({
		hidden: { y: 30, opacity: 0 },
		visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
	});

	const itemVariants = createVariants({
		hidden: { opacity: 0, y: 16 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
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

				<div className="exp-list">
					{timeline.map((period) => (
						<motion.div key={period.year} className="exp-item" variants={itemVariants}>
							<div className="exp-item__year">{period.year}</div>
							<div className="exp-item__body">
								<p className="exp-item__main">{period.items[0]}</p>
								{period.items[1] && (
									<p className="exp-item__detail">{period.items[1]}</p>
								)}
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
