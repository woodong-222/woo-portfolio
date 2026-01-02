import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import "./ScrollIndicator.scss";

interface ScrollIndicatorProps {
	text?: string;
	onClick?: () => void;
}

const ScrollIndicator = ({ text = "Scroll", onClick }: ScrollIndicatorProps) => {
	const handleClick = () => {
		if (onClick) {
			onClick();
		} else {
			// 기본 동작: 다음 섹션으로 스크롤
			window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
		}
	};

	return (
		<motion.div
			className="scroll-indicator"
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.5, duration: 0.6 }}
			onClick={handleClick}
		>
			<motion.div
				className="scroll-indicator__icon"
				animate={{ y: [0, 8, 0] }}
				transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
			>
				<ChevronDown size={28} />
			</motion.div>
			<span className="scroll-indicator__text">{text}</span>
		</motion.div>
	);
};

export default ScrollIndicator;
