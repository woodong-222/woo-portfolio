import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import useResponsive from '@/utils/hooks/useResponsive';
import './Header.scss';

interface HeaderProps {
	currentSection: number;
	onSectionClick: (index: number) => void;
}

const Header = ({ currentSection, onSectionClick }: HeaderProps) => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isDarkSection, setIsDarkSection] = useState(false);
	const { i18n } = useTranslation('common');
	const { isMobile } = useResponsive();

	// Prevent unused variable warning
	void currentSection;
	void onSectionClick;

	const menuItems = [
		{ id: 'about-intro', label: i18n.language === 'ko' ? '소개' : 'About' },
		{ id: 'tech-stack', label: i18n.language === 'ko' ? '기술' : 'Skills' },
		{ id: 'career', label: i18n.language === 'ko' ? '경력' : 'Career' },
		{ id: 'projects', label: i18n.language === 'ko' ? '프로젝트' : 'Projects' },
		{ id: 'contact', label: i18n.language === 'ko' ? '연락처' : 'Contact' },
	];

	useEffect(() => {
		const handleScroll = () => {
			const scrollContainer = document.querySelector('.scroll-container');
			const scrollTop = scrollContainer ? scrollContainer.scrollTop : window.scrollY;
			setIsScrolled(scrollTop > 50);
		};

		const scrollContainer = document.querySelector('.scroll-container');
		if (scrollContainer) {
			scrollContainer.addEventListener('scroll', handleScroll, { passive: true });
			handleScroll();

			return () => {
				scrollContainer.removeEventListener('scroll', handleScroll);
			};
		}

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll();

		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Intersection Observer로 어두운 배경 섹션 감지
	useEffect(() => {
		const projectsSection = document.getElementById('projects');
		if (!projectsSection) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				const rect = entry.boundingClientRect;
				const headerHeight = 100; // 네비게이션 바 높이
				
				// Projects 섹션의 상단이 네비게이션 바 영역(0~100px)에 들어오면 true
				// rect.top <= headerHeight: 섹션 상단이 네비게이션 바 아래로 들어옴
				// rect.bottom > 0: 섹션이 아직 화면에 있음
				setIsDarkSection(rect.top <= headerHeight && rect.bottom > 0);
			},
			{
				threshold: Array.from({ length: 101 }, (_, i) => i / 100), // 0~1까지 0.01 단위
				rootMargin: '0px', // 오프셋 없음
			}
		);

		observer.observe(projectsSection);

		return () => observer.disconnect();
	}, []);

	const handleMenuClick = (id: string) => {
		const element = document.getElementById(id);
		if (element) {
			element.scrollIntoView({ behavior: 'smooth' });
		}
		setIsMobileMenuOpen(false);
	};

	const handleLogoClick = () => {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<motion.header
			className={`header ${isScrolled ? 'scrolled' : ''} ${isDarkSection ? 'header--dark' : ''}`}
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
		>
			<div className="header__container">
				<motion.div
					className="header__logo"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handleLogoClick}
				>
					<span className="logo-text">Woo</span>
				</motion.div>

				{!isMobile && (
					<nav className="header__nav">
						<div className="nav__sections">
							{menuItems.map((item) => (
								<button
									key={item.id}
									className="nav__item"
									onClick={() => handleMenuClick(item.id)}
								>
									{item.label}
								</button>
							))}
						</div>
					</nav>
				)}

				{isMobile && (
					<motion.button
						className="mobile-menu-btn"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						{isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
					</motion.button>
				)}
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
						{menuItems.map((item) => (
							<motion.button
								key={item.id}
								className="mobile-nav__item"
								onClick={() => handleMenuClick(item.id)}
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
							>
								{item.label}
							</motion.button>
						))}
					</nav>
				</motion.div>
			)}
		</motion.header>
	);
};

export default Header;
