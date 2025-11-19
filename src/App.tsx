import { useState } from 'react';
import { ThemeProvider } from '@/utils/contexts/ThemeContext';
import Header from '@/components/layout/Header';
import FloatingConnect from '@/components/layout/FloatingConnect';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import ThankYou from '@/components/sections/ThankYou';
import ProjectModal from '@/components/modals/ProjectModal';
import useScrollSpy from '@/utils/hooks/useScrollSpy';
import { Project } from '@/components/sections/Projects/projects.data';
import '@/utils/i18n';
import '@/utils/styles/globals.scss';

const App = () => {
	const [selectedProject, setSelectedProject] = useState<Project | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { currentSection, sectionRefs } = useScrollSpy(4);

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
					<Hero ref={setSectionRef(0)} />

					<About ref={setSectionRef(1)} />

					<section ref={setSectionRef(2)} id="projects">
						<Projects onProjectClick={handleProjectClick} />
					</section>

					<section ref={setSectionRef(3)} id="thank-you">
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
