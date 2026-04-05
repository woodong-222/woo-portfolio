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
		const handleScroll = () => {
			const scrollPosition = window.scrollY + 150;
			let current = 0;

			sectionRefs.current.forEach((section) => {
				if (section) {
					const sectionTop = section.offsetTop;
					const sectionBottom = sectionTop + section.offsetHeight;

					if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
						current = sectionRefs.current.indexOf(section);
					}
				}
			});

			setCurrentSection(current);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [sectionCount]);

	return {
		currentSection,
		sectionRefs,
	};
};

export default useScrollSpy;