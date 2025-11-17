import { useState, useEffect } from 'react';

interface ScreenSize {
	width: number;
	height: number;
}

interface UseResponsiveReturn {
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;
	screenSize: ScreenSize;
}

const useResponsive = (): UseResponsiveReturn => {
	const [screenSize, setScreenSize] = useState<ScreenSize>({
		width: typeof window !== 'undefined' ? window.innerWidth : 1200,
		height: typeof window !== 'undefined' ? window.innerHeight : 800,
	});

	useEffect(() => {
		const handleResize = () => {
			setScreenSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		};

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return {
		isMobile: screenSize.width <= 767,
		isTablet: screenSize.width >= 768 && screenSize.width <= 1023,
		isDesktop: screenSize.width >= 1024,
		screenSize,
	};
};

export default useResponsive;