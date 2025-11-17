import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { createVariants } from '@/utils/types/motion';
import './Hero.scss';

const Hero = () => {
	const { t } = useTranslation('hero');
	const { ref, inView } = useInView({
		threshold: 0.3,
		triggerOnce: true,
	});

	const containerVariants = createVariants({
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.2,
			},
		},
	});

	const itemVariants = createVariants({
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.8,
				ease: 'easeOut' as const,
			},
		},
	});

	const imageVariants = createVariants({
		hidden: { scale: 0.8, opacity: 0 },
		visible: {
			scale: 1,
			opacity: 1,
			transition: {
				duration: 1,
				ease: 'easeOut' as const,
			},
		},
	});

	return (
		<section className="hero section" ref={ref}>
			<motion.div
				className="hero__container container"
				variants={containerVariants}
				initial="hidden"
				animate={inView ? 'visible' : 'hidden'}
			>
				<div className="hero__content">
					<motion.div className="hero__text" variants={itemVariants}>
						<motion.p className="hero__greeting" variants={itemVariants}>
							{t('greeting')}
						</motion.p>
						
						<motion.h1 className="hero__title" variants={itemVariants}>
							{t('title')}{' '}
							<span className="hero__name text-gradient">{t('name')}</span>
							<br />
							{t('subtitle')}
						</motion.h1>

						<motion.p className="hero__description" variants={itemVariants}>
							{t('description')}
						</motion.p>

						<motion.div className="hero__actions" variants={itemVariants}>
							<motion.a
								href="https://github.com/woodong-222"
								target="_blank"
								rel="noopener noreferrer"
								className="btn btn-primary"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<Github size={20} />
								GitHub
							</motion.a>
							
							<motion.a
								href="https://velog.io/@woo2083/posts"
								target="_blank"
								rel="noopener noreferrer"
								className="btn btn-secondary"
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
							>
								<ExternalLink size={20} />
								Tech Blog
							</motion.a>
						</motion.div>

						<motion.div className="hero__update" variants={itemVariants}>
							<span className="update-text">
								{t('lastUpdated')}: {new Date().toLocaleDateString()}
							</span>
						</motion.div>
					</motion.div>

					<motion.div
						className="hero__image"
						variants={imageVariants}
						whileHover={{ scale: 1.05 }}
						transition={{ duration: 0.3 }}
					>
						<div className="image-container">
							<div className="image-content">
								<div className="profile-ring">
									<div className="profile-avatar">
										<img 
											src="/profile.jpeg" 
											alt="이동우 프로필 사진"
											className="profile-photo"
										/>
									</div>
								</div>
								
								<div className="floating-elements">
									<div className="floating-item security">🔐</div>
									<div className="floating-item code">💻</div>
									<div className="floating-item cloud">☁️</div>
									<div className="floating-item web">🌐</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>

				<motion.div 
					className="hero__scroll-indicator"
					animate={{ y: [0, 10, 0] }}
					transition={{ duration: 2, repeat: Infinity }}
				>
					<div className="scroll-arrow"></div>
					<span className="scroll-text">Scroll</span>
				</motion.div>
			</motion.div>
		</section>
	);
};

export default Hero;