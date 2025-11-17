import { useState } from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import Header from '@/components/layout/Header';
import FloatingConnect from '@/components/layout/FloatingConnect';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import ThankYou from '@/components/sections/ThankYou';
import ProjectModal from '@/components/modals/ProjectModal';
import useScrollSpy from '@/hooks/useScrollSpy';
import { Project } from '@/data/projects';
import '@/i18n';
import '@/styles/globals.scss';

const App = () => {
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { currentSection, sectionRefs } = useScrollSpy(6);

	const handleSectionClick = (index: number) => {
		const section = sectionRefs.current[index];
		if (section) {
			section.scrollIntoView({ behavior: 'smooth' });
		}
	};

	const handleProjectClick = (project: Project) => {
		setSelectedProject(project);
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setTimeout(() => {
			setSelectedProject(null);
		}, 300);
	};

	const setSectionRef = (index: number) => (el: HTMLElement | null) => {
		sectionRefs.current[index] = el;
	};

	return (
		<ThemeProvider>
			<div className="app">
				<Header 
					currentSection={currentSection} 
					onSectionClick={handleSectionClick} 
				/>

				<main className="scroll-container">
					<section ref={setSectionRef(0)} id="hero">
						<Hero />
					</section>

					<section ref={setSectionRef(1)} id="about-intro">
						<About />
					</section>

					<section ref={setSectionRef(4)} id="projects">
						<Projects onProjectClick={handleProjectClick} />
					</section>

					<section ref={setSectionRef(5)} id="thank-you">
						<ThankYou />
					</section>
				</main>

				<FloatingConnect />

				<ProjectModal
					project={selectedProject}
					isOpen={isModalOpen}
					onClose={handleCloseModal}
				/>
			</div>
		</ThemeProvider>
	);
};

export default App;
