import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Send, User, Mail, MessageSquare, ArrowUp } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { createVariants } from '@/utils/types/motion';
import { FLOATING_CONNECT_OPEN_EVENT } from '@/utils/constants/events';
import './FloatingConnect.scss';

const FloatingConnect = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		message: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
	const [spinTarget, setSpinTarget] = useState<'contact' | 'lang' | 'top' | null>(null);
	const { t, i18n } = useTranslation('contactMe');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);

		try {
			// EmailJS 설정 확인
			const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
			const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
			const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

			// 환경변수가 설정되지 않은 경우 경고
			if (!serviceId || !templateId || !publicKey) {
				console.warn('EmailJS configuration is missing. Please check your .env file.');
				// 시뮬레이션 모드
				await new Promise(resolve => setTimeout(resolve, 1000));
				setSubmitStatus('success');
				setFormData({ name: '', message: '' });
				
				setTimeout(() => {
					setIsOpen(false);
					setSubmitStatus('idle');
				}, 2000);
				return;
			}

			// 실제 이메일 전송
			const templateParams = {
				from_name: formData.name,
				from_email: '',
				message: formData.message,
				to_email: 'ehddn2083@gmail.com', // 받을 이메일 주소
			};

			await emailjs.send(
				serviceId,
				templateId,
				templateParams,
				publicKey
			);

			setSubmitStatus('success');
			setFormData({ name: '', message: '' });
			
			setTimeout(() => {
				setIsOpen(false);
				setSubmitStatus('idle');
			}, 2000);
		} catch (error) {
			console.error('Email send error:', error);
			setSubmitStatus('error');
		} finally {
			setIsSubmitting(false);
		}
	};

	useEffect(() => {
		const handleExternalOpen = () => {
			setIsOpen(true);
			setSubmitStatus('idle');
		};

		window.addEventListener(FLOATING_CONNECT_OPEN_EVENT, handleExternalOpen);
		return () => window.removeEventListener(FLOATING_CONNECT_OPEN_EVENT, handleExternalOpen);
	}, []);

	const triggerSpin = (target: 'contact' | 'lang' | 'top') => {
		setSpinTarget(target);
		setTimeout(() => {
			setSpinTarget(null);
		}, 520);
	};

	const toggleOpen = () => {
		triggerSpin('contact');

		if (isOpen) {
			setIsOpen(false);
			return;
		}

		setIsOpen(true);
		setSubmitStatus('idle');
	};

	const toggleLanguage = () => {
		triggerSpin('lang');
		i18n.changeLanguage(i18n.language === 'ko' ? 'en' : 'ko');
	};

	const scrollToTop = () => {
		triggerSpin('top');
		const scrollContainer = document.querySelector('.scroll-container');
		if (scrollContainer instanceof HTMLElement && scrollContainer.scrollHeight > scrollContainer.clientHeight) {
			scrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
			return;
		}

		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const formVariants = createVariants({
		hidden: { 
			opacity: 0, 
			scale: 0.8,
			transformOrigin: 'bottom right',
		},
		visible: { 
			opacity: 1, 
			scale: 1,
			transition: {
				type: 'spring' as const,
				duration: 0.4,
				bounce: 0.3,
			},
		},
		exit: { 
			opacity: 0, 
			scale: 0.8,
			transition: { duration: 0.2 },
		},
	});

	return (
		<div className="floating-connect" id="connect">
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="connect-overlay"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={toggleOpen}
					/>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{isOpen && (
					<motion.div
						className="connect-form-container"
						variants={formVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="connect-form">
							<div className="form-header">
								<h3>{t('title')}</h3>
								<motion.button
									className="close-btn"
									onClick={toggleOpen}
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
								>
									<X size={20} />
								</motion.button>
							</div>

							{submitStatus === 'success' ? (
								<motion.div
									className="success-message"
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
								>
									<div className="success-icon">✅</div>
									<p>{t('success')}</p>
								</motion.div>
							) : (
								<form onSubmit={handleSubmit} className="contact-form">
									<div className="form-group">
										<div className="input-wrapper">
											<User size={18} className="input-icon" />
											<input
												type="text"
												name="name"
												value={formData.name}
												onChange={handleInputChange}
												placeholder={t('placeholder.name')}
												required
												disabled={isSubmitting}
											/>
										</div>
									</div>

									<div className="form-group">
										<div className="textarea-wrapper">
											<MessageSquare size={18} className="textarea-icon" />
											<textarea
												name="message"
												value={formData.message}
												onChange={handleInputChange}
												placeholder={t('placeholder.message')}
												rows={4}
												required
												disabled={isSubmitting}
											/>
										</div>
									</div>

									{submitStatus === 'error' && (
										<div className="error-message">
											<p>{t('error')}</p>
										</div>
									)}

									<motion.button
										type="submit"
										className="submit-btn"
										disabled={isSubmitting}
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
									>
										<Send size={16} />
										{isSubmitting ? 
											<span className="loading-text">...</span> : 
											t('send')
										}
									</motion.button>
								</form>
							)}
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			<div className="floating-actions">
				<motion.button
					className={`floating-action contact ${isOpen ? 'active' : ''} ${spinTarget === 'contact' ? 'spin' : ''}`}
					onClick={toggleOpen}
					aria-label={t('buttonLabel')}
					title={t('buttonLabel')}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<span className="floating-action__icon" aria-hidden="true">
						{isOpen ? <X size={18} /> : <Mail size={18} />}
					</span>
				</motion.button>
				<motion.button
					className={`floating-action lang ${spinTarget === 'lang' ? 'spin' : ''}`}
					onClick={toggleLanguage}
					aria-label="Toggle language"
					title={i18n.language === 'ko' ? 'EN' : 'KO'}
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<span className="floating-action__icon floating-action__text">
						{i18n.language === 'ko' ? 'EN' : 'KO'}
					</span>
				</motion.button>
				<motion.button
					className={`floating-action top ${spinTarget === 'top' ? 'spin' : ''}`}
					onClick={scrollToTop}
					aria-label="Back to top"
					title="Top"
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
				>
					<span className="floating-action__icon" aria-hidden="true">
						<ArrowUp size={18} />
					</span>
				</motion.button>
			</div>
		</div>
	);
};

export default FloatingConnect;
