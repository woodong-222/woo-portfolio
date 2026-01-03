import Header from '@/components/layout/Header';
import FloatingConnect from '@/components/layout/FloatingConnect';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';
import useScrollSpy from '@/utils/hooks/useScrollSpy';
import '@/utils/i18n';
import '@/utils/styles/globals.scss';

const App = () => {
	const { currentSection, sectionRefs } = useScrollSpy(4);

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

				<About ref={setSectionRef(1)} />

				<div ref={setSectionRef(2)} id="projects">
					<Projects />
				</div>

				<section ref={setSectionRef(3)} id="contact">
					<Contact />
				</section>
			</main>

			<FloatingConnect />
		</div>
	);
};

export default App;
