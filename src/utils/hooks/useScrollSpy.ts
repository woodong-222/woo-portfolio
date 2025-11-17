import { useState, useEffect, useRef } from 'react';

interface UseScrollSpyReturn {
	currentSection: number;
	sectionRefs: React.MutableRefObject<(HTMLElement | null)[]>;
}

const useScrollSpy = (sectionCount: number): UseScrollSpyReturn => {
	const [currentSection, setCurrentSection] = useState(0);
	const sectionRefs = useRef<(HTMLElement | null)[]>(
		new Array(sectionCount).fill(null),
	);

	useEffect(() => {
		const scrollContainer = document.querySelector('.scroll-container') as HTMLElement;
		
		if (!scrollContainer) {
			return;
		}
		
		const handleScroll = () => {
			const scrollPosition = scrollContainer.scrollTop + 150;
			let current = 0;

			sectionRefs.current.forEach((section, index) => {
				if (section) {
					const sectionTop = section.offsetTop;
					const sectionBottom = sectionTop + section.offsetHeight;

					if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
						current = index;
					}
				}
			});

			setCurrentSection(current);
		};

		scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => {
			scrollContainer.removeEventListener('scroll', handleScroll);
		};
	}, [sectionCount]);

	return {
		currentSection,
		sectionRefs,
	};
};

export default useScrollSpy;