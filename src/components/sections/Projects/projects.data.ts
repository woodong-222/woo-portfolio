export interface Project {
	id: string;
	title: {
		ko: string;
		en: string;
	};
	description: {
		ko: string;
		en: string;
	};
	detailedDescription: {
		ko: string;
		en: string;
	};
	technologies: string[];
	githubUrl?: string;
	liveUrl?: string;
	imageUrl?: string;
	featured: boolean;
	category: 'security' | 'web' | 'cloud' | 'other';
}

export const projects: Project[] = [
	{
		id: '1',
		title: {
			ko: '보안 취약점 스캐너',
			en: 'Security Vulnerability Scanner',
		},
		description: {
			ko: '웹 애플리케이션의 보안 취약점을 자동으로 탐지하는 도구',
			en: 'Automated tool for detecting security vulnerabilities in web applications',
		},
		detailedDescription: {
			ko: '웹 애플리케이션에서 발생할 수 있는 다양한 보안 취약점을 자동으로 탐지하고 분석합니다. SQL Injection, XSS, CSRF 등 주요 취약점을 식별하고 상세 리포트를 제공합니다.',
			en: 'An automated tool that detects and analyzes various security vulnerabilities in web applications. It identifies major vulnerabilities such as SQL Injection, XSS, CSRF and provides detailed reports.',
		},
		technologies: ['Python', 'FastAPI', 'SQLAlchemy', 'React', 'Docker'],
		githubUrl: 'https://github.com/woodong-222',
		featured: true,
		category: 'security',
	},
	{
		id: '2',
		title: {
			ko: '클라우드 보안 모니터링 시스템',
			en: 'Cloud Security Monitoring System',
		},
		description: {
			ko: 'AWS 인프라 보안 상태를 실시간으로 모니터링하는 시스템',
			en: 'Real-time monitoring system for AWS infrastructure security status',
		},
		detailedDescription: {
			ko: 'AWS 클라우드 환경의 보안 상태를 실시간으로 모니터링하고 이상 징후를 탐지합니다. CloudTrail, GuardDuty 등 AWS 서비스와 연동하여 종합적인 보안 모니터링을 제공합니다.',
			en: 'A system that monitors the security status of AWS cloud environment in real-time and detects anomalies. It provides comprehensive security monitoring by integrating with AWS services such as CloudTrail and GuardDuty.',
		},
		technologies: ['Python', 'AWS', 'Lambda', 'CloudWatch', 'React', 'Redis'],
		githubUrl: 'https://github.com/woodong-222',
		featured: true,
		category: 'cloud',
	},
	{
		id: '3',
		title: {
			ko: '포트폴리오 웹사이트',
			en: 'Portfolio Website',
		},
		description: {
			ko: '반응형 디자인과 다국어 지원을 갖춘 개인 포트폴리오',
			en: 'Personal portfolio with responsive design and multi-language support',
		},
		detailedDescription: {
			ko: '현재 보고 있는 포트폴리오 웹사이트입니다. React와 TypeScript로 제작했고, 반응형 디자인과 다국어 지원을 제공합니다.',
			en: 'This is the portfolio website you are currently viewing. Built with React and TypeScript, it includes features such as responsive design and multi-language support.',
		},
		technologies: ['React', 'TypeScript', 'SCSS', 'Framer Motion', 'Vite'],
		githubUrl: 'https://github.com/woodong-222',
		featured: false,
		category: 'web',
	},
];

export const getProjectsByCategory = (category: Project['category']) => {
	return projects.filter((project) => project.category === category);
};

export const getFeaturedProjects = () => {
	return projects.filter((project) => project.featured);
};
