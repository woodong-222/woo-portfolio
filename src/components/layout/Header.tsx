import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import useResponsive from '@/utils/hooks/useResponsive';
import './Header.scss';

interface HeaderProps {
	currentSection: number;
	onSectionClick: (index: number) => void;
}

const Header = ({ currentSection, onSectionClick }: HeaderProps) => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
	const { t, i18n } = useTranslation('common');
	const { isMobile } = useResponsive();

	const sections = [
		{ key: 'home', label: t('navigation.home') },
		{ 
			key: 'about', 
			label: t('navigation.about'),
			hasDropdown: true,
			subSections: [
				{ id: 'about-intro', label: i18n.language === 'ko' ? '소개' : 'Introduction' },
				{ id: 'tech-stack', label: i18n.language === 'ko' ? '기술' : 'Tech Stack' },
				{ id: 'career', label: i18n.language === 'ko' ? '경력' : 'Career' },
			]
		},
		{ key: 'projects', label: t('navigation.projects') },
		{ key: 'contact', label: t('navigation.contact') },
	];

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const toggleLanguage = () => {
		const newLang = i18n.language === 'ko' ? 'en' : 'ko';
		i18n.changeLanguage(newLang);
	};

	const handleSectionClick = (index: number) => {
		onSectionClick(index);
		setIsMobileMenuOpen(false);
		setAboutDropdownOpen(false);
	};

	const handleSubSectionClick = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
		setAboutDropdownOpen(false);
		setIsMobileMenuOpen(false);
	};

	return (
		<motion.header
			className={`header ${isScrolled ? 'scrolled' : ''}`}
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
		>
			<div className="header__container">
				<motion.div
					className="header__logo"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<span className="logo-text">Woo</span>
				</motion.div>

				{!isMobile && (
					<nav className="header__nav">
						<div className="nav__sections">
							{sections.map((section, index) => (
								<div 
									key={section.key}
									className="nav__item-wrapper"
									onMouseEnter={() => section.hasDropdown && setAboutDropdownOpen(true)}
									onMouseLeave={() => section.hasDropdown && setAboutDropdownOpen(false)}
								>
									<button
										className={`nav__item ${
											currentSection === index ? 'active' : ''
										}`}
										onClick={() => handleSectionClick(index)}
									>
										{section.label}
										{section.hasDropdown && (
											<ChevronDown size={16} className="dropdown-icon" />
										)}
									</button>
									
									{section.hasDropdown && (
										<AnimatePresence>
											{aboutDropdownOpen && (
												<motion.div
													className="nav__dropdown"
													style={{
														position: 'absolute',
														left: '50%',
													}}
													initial={{ opacity: 0, x: '-50%', y: -10 }}
													animate={{ opacity: 1, x: '-50%', y: 0 }}
													exit={{ opacity: 0, x: '-50%', y: -10 }}
													transition={{ duration: 0.2 }}
												>
													{section.subSections?.map((subSection) => (
														<button
															key={subSection.id}
															className="dropdown__item"
															onClick={() => handleSubSectionClick(subSection.id)}
														>
															{subSection.label}
														</button>
													))}
												</motion.div>
											)}
										</AnimatePresence>
									)}
								</div>
							))}
						</div>
					</nav>
				)}

				<div className="header__controls">
					<motion.button
						className="control-btn"
						onClick={toggleLanguage}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						title={t('language.en')}
					>
						<Globe size={20} />
						<span className="btn-text">
							{i18n.language.toUpperCase()}
						</span>
					</motion.button>

					{isMobile && (
						<motion.button
							className="control-btn mobile-menu-btn"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							{isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
						</motion.button>
					)}
				</div>
			</div>

			{isMobile && (
				<motion.div
					className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
					initial={{ opacity: 0, height: 0 }}
					animate={{
						opacity: isMobileMenuOpen ? 1 : 0,
						height: isMobileMenuOpen ? 'auto' : 0,
					}}
					transition={{ duration: 0.3 }}
				>
					<nav className="mobile-nav">
						{sections.map((section, index) => (
							<motion.button
								key={section.key}
								className={`mobile-nav__item ${
									currentSection === index ? 'active' : ''
								}`}
								onClick={() => handleSectionClick(index)}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								{section.label}
							</motion.button>
						))}
					</nav>
				</motion.div>
			)}
		</motion.header>
	);
};

export default Header;
