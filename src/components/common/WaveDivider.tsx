import "./WaveDivider.scss";

interface WaveDividerProps {
	color: string;
	className?: string;
	flip?: boolean;
}

const WaveDivider = ({ color, className = "", flip = false }: WaveDividerProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			viewBox="0 24 150 28"
			preserveAspectRatio="none"
			className={`wave-divider ${className} ${flip ? "wave-divider--flip" : ""}`}
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
	);
};

export default WaveDivider;
