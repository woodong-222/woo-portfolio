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
			const scrollPosition = window.scrollY + window.innerHeight / 2;

			sectionRefs.current.forEach((section, index) => {
				if (section) {
					const sectionTop = section.offsetTop;
					const sectionBottom = sectionTop + section.offsetHeight;

					if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
						setCurrentSection(index);
					}
				}
			});
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll();

		return () => window.removeEventListener('scroll', handleScroll);
	}, [sectionCount]);

	return {
		currentSection,
		sectionRefs,
	};
};

export default useScrollSpy;