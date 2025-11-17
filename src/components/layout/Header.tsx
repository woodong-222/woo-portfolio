import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Moon, Sun, Menu, X, Globe } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import useResponsive from '@/hooks/useResponsive';
import './Header.scss';

interface HeaderProps {
	currentSection: number;
	onSectionClick: (index: number) => void;
}

const Header = ({ currentSection, onSectionClick }: HeaderProps) => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const { theme, toggleTheme } = useTheme();
	const { t, i18n } = useTranslation('common');
	const { isMobile } = useResponsive();

	const sections = [
		{ key: 'home', label: t('navigation.home') },
		{ key: 'about', label: t('navigation.about') },
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
					<span className="logo-text">Dwoo</span>
				</motion.div>

				{!isMobile && (
					<nav className="header__nav">
						<div className="nav__sections">
							{sections.map((section, index) => (
								<button
									key={section.key}
									className={`nav__item ${
										currentSection === index ? 'active' : ''
									}`}
									onClick={() => handleSectionClick(index)}
								>
									{section.label}
								</button>
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

					<motion.button
						className="control-btn"
						onClick={toggleTheme}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						title={theme === 'light' ? t('theme.dark') : t('theme.light')}
					>
						{theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
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