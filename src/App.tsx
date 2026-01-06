import Header from '@/components/layout/Header';
import FloatingConnect from '@/components/layout/FloatingConnect';
import Hero from '@/components/sections/Hero';
import AboutMe from '@/components/sections/AboutMe';
import TechStack from '@/components/sections/TechStack';
import Experience from '@/components/sections/Experience';
import Projects from '@/components/sections/Projects';
import ContactMe from '@/components/sections/ContactMe';
import WaveDivider from '@/components/common/WaveDivider';
import useScrollSpy from '@/utils/hooks/useScrollSpy';
import '@/utils/i18n';
import '@/utils/styles/globals.scss';

const App = () => {
	const { currentSection, sectionRefs } = useScrollSpy(6);

	const handleSectionClick = (index: number) => {
		const section = sectionRefs.current[index];
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const setSectionRef = (index: number) => (el: HTMLElement | null) => {
		sectionRefs.current[index] = el;
	};

	return (
		<div className="app">
			<Header 
				currentSection={currentSection} 
				onSectionClick={handleSectionClick} 
			/>

	<main className="scroll-container">
		<Hero ref={setSectionRef(0)} />

		<div className="about-wrapper">
			<AboutMe ref={setSectionRef(1)} />
			<TechStack ref={setSectionRef(2)} />
			<Experience ref={setSectionRef(3)} />
			<WaveDivider color="#0f0f1a" className="about-to-projects" />
		</div>

				<div ref={setSectionRef(4)} id="projects">
					<Projects />
				</div>

				<section ref={setSectionRef(5)} id="contact-me">
					<ContactMe />
				</section>
			</main>

			<FloatingConnect />
		</div>
	);
};

export default App;
