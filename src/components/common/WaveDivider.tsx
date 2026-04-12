import "./WaveDivider.scss";

interface WaveDividerProps {
	color: string;
	className?: string;
	flip?: boolean;
	showDots?: boolean;
}

const WaveDivider = ({ color, className = "", flip = false, showDots = false }: WaveDividerProps) => {
	const classes = [
		"wave-divider-wrap",
		className,
		flip ? "wave-divider-wrap--flip" : "",
		showDots ? "wave-divider-wrap--dots" : "",
	].filter(Boolean).join(" ");

	return (
		<div className={classes}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				xmlnsXlink="http://www.w3.org/1999/xlink"
				viewBox="0 24 150 28"
				preserveAspectRatio="none"
				className="wave-divider"
			>
				<defs>
					<path
						id="gentle-wave"
						d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
					/>
				</defs>
				<g className="wave-divider__parallax">
					<use xlinkHref="#gentle-wave" x="50" y="0" fill={color} />
					<use xlinkHref="#gentle-wave" x="50" y="3" fill={`${color}d1`} />
					<use xlinkHref="#gentle-wave" x="50" y="6" fill={`${color}a3`} />
				</g>
			</svg>
		</div>
	);
};

export default WaveDivider;
