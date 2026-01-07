export interface Screenshot {
	src: string;
	label: {
		ko: string;
		en: string;
	};
}

export interface Project {
	id: string;
	period: string;
	title: {
		ko: string;
		en: string;
	};
	type: string;
	scale: {
		ko: string;
		en: string;
	};
	mainTech: string;
	library: string;
	features: {
		ko: string[];
		en: string[];
	};
	technologies: string[];
	githubUrl?: string;
	liveUrl?: string;
	screenshots: Screenshot[];
	logoText: string;
	logoColor: string;
	glowColor: string; // 네온 테두리 색상
	category: 'security' | 'web' | 'cloud' | 'other';
}

export const projects: Project[] = [
	{
		id: '1',
		period: '2025.09 ~ 2025.12',
		title: {
			ko: 'MON47',
			en: 'MON47',
		},
		type: 'Web',
		scale: {
			ko: '팀 프로젝트',
			en: 'Team Project',
		},
		mainTech: 'React',
		library: 'FastAPI',
		features: {
			ko: [
				'알려지지 않은 URL의 악성 행위를 실시간으로 탐지하고 분석합니다.',
				'네트워크, 시스템, 클라우드 등 다양한 보안 환경에서 동작합니다.',
				'머신러닝 기반 악성 URL 분류 모델을 적용했습니다.',
				'사용자 친화적인 대시보드로 탐지 결과를 시각화합니다.',
				'RESTful API를 통해 다른 보안 시스템과 연동 가능합니다.',
			],
			en: [
				'Detects and analyzes malicious behavior of unknown URLs in real-time.',
				'Operates across network, system, and cloud security environments.',
				'Applied ML-based malicious URL classification model.',
				'Visualizes detection results through user-friendly dashboard.',
				'Integrates with other security systems via RESTful API.',
			],
		},
		technologies: ['Python', 'FastAPI', 'SQLAlchemy', 'React', 'Docker'],
		githubUrl: 'https://github.com/bob-mon47',
		liveUrl: 'https://mon47.com',
		screenshots: [
			{ src: '/screenshots/mon47/main.png', label: { ko: '메인 화면', en: 'Main' } },
			{ src: '/screenshots/mon47/dashboard.png', label: { ko: '대시보드', en: 'Dashboard' } },
			{ src: '/screenshots/mon47/analysis.png', label: { ko: '분석 결과', en: 'Analysis' } },
		],
		logoText: 'MON47',
		logoColor: '#10b981',
		glowColor: '#10b981',
		category: 'security',
	},
	{
		id: '2',
		period: '2024.09 ~ 2025.06',
		title: {
			ko: 'Winection',
			en: 'Winection',
		},
		type: 'Web',
		scale: {
			ko: '팀 프로젝트',
			en: 'Team Project',
		},
		mainTech: 'React',
		library: 'AWS Lambda',
		features: {
			ko: [
				'농인과 비농인 간 실시간 양방향 수어 변환을 제공합니다.',
				'AI 기반 수어 인식으로 자막과 음성을 자동 생성합니다.',
				'WebRTC를 활용한 저지연 화상 채팅을 구현했습니다.',
				'AWS Lambda를 통한 서버리스 아키텍처로 확장성을 확보했습니다.',
				'Redis 캐싱으로 실시간 데이터 처리 성능을 최적화했습니다.',
			],
			en: [
				'Provides real-time bidirectional sign language conversion between deaf and hearing users.',
				'AI-based sign language recognition auto-generates subtitles and voice.',
				'Implemented low-latency video chat using WebRTC.',
				'Secured scalability with serverless architecture via AWS Lambda.',
				'Optimized real-time data processing with Redis caching.',
			],
		},
		technologies: ['Python', 'AWS', 'Lambda', 'React', 'Redis', 'WebRTC'],
		githubUrl: 'https://github.com/DongUgaUga',
		liveUrl: 'https://winection.kro.kr',
		screenshots: [
			{ src: '/screenshots/winection/main.png', label: { ko: '메인 화면', en: 'Main' } },
			{ src: '/screenshots/winection/video.png', label: { ko: '화상 채팅', en: 'Video Chat' } },
			{ src: '/screenshots/winection/translate.png', label: { ko: '수어 번역', en: 'Translation' } },
		],
		logoText: 'WINECTION',
		logoColor: '#3b82f6',
		glowColor: '#3b82f6',
		category: 'other',
	},
	{
		id: '3',
		period: '2024.05 ~ 2024.07',
		title: {
			ko: 'WHSCA',
			en: 'WHSCA',
		},
		type: 'CLI / Web',
		scale: {
			ko: '팀 프로젝트',
			en: 'Team Project',
		},
		mainTech: 'Python',
		library: 'FastAPI',
		features: {
			ko: [
				'서버 단위 실시간 종속성 분석으로 보안 취약점을 탐지합니다.',
				'Dead Code를 자동으로 식별하고 제거를 권장합니다.',
				'CI/CD 파이프라인에 통합 가능한 SCA 솔루션입니다.',
				'PostgreSQL 기반으로 분석 이력을 관리합니다.',
				'직관적인 웹 대시보드로 분석 결과를 제공합니다.',
			],
			en: [
				'Detects security vulnerabilities through server-level real-time dependency analysis.',
				'Automatically identifies Dead Code and recommends removal.',
				'SCA solution integrable with CI/CD pipelines.',
				'Manages analysis history with PostgreSQL.',
				'Provides analysis results through intuitive web dashboard.',
			],
		},
		technologies: ['Python', 'FastAPI', 'PostgreSQL', 'React'],
		githubUrl: 'https://github.com/orgs/WhiteHatSchool',
		liveUrl: 'https://whsca.com',
		screenshots: [
			{ src: '/screenshots/whsca/main.png', label: { ko: '메인 화면', en: 'Main' } },
			{ src: '/screenshots/whsca/scan.png', label: { ko: '스캔 결과', en: 'Scan Result' } },
			{ src: '/screenshots/whsca/report.png', label: { ko: '리포트', en: 'Report' } },
		],
		logoText: 'WHSCA',
		logoColor: '#f59e0b',
		glowColor: '#f59e0b',
		category: 'security',
	},
	{
		id: '4',
		period: '2025.06',
		title: {
			ko: 'Pokeface',
			en: 'Pokeface',
		},
		type: 'Web',
		scale: {
			ko: '토이 프로젝트',
			en: 'Toy Project',
		},
		mainTech: 'React',
		library: 'Vite',
		features: {
			ko: [
				'AI 얼굴 분석을 통해 닮은 포켓몬을 추천합니다.',
				'Framer Motion으로 부드러운 애니메이션을 구현했습니다.',
				'반응형 디자인으로 모바일에서도 최적화되어 있습니다.',
				'TypeScript로 타입 안정성을 확보했습니다.',
				'SCSS 모듈로 스타일을 체계적으로 관리합니다.',
			],
			en: [
				'Recommends similar Pokémon through AI face analysis.',
				'Implemented smooth animations with Framer Motion.',
				'Optimized for mobile with responsive design.',
				'Ensured type safety with TypeScript.',
				'Systematically manages styles with SCSS modules.',
			],
		},
		technologies: ['React', 'TypeScript', 'SCSS', 'Framer Motion', 'Vite'],
		githubUrl: 'https://github.com/woodong-222/pokeface-api',
		liveUrl: 'https://pokeface.kro.kr',
		screenshots: [
			{ src: '/screenshots/pokeface/main.png', label: { ko: '메인 화면', en: 'Main' } },
			{ src: '/screenshots/pokeface/upload.png', label: { ko: '사진 업로드', en: 'Upload' } },
			{ src: '/screenshots/pokeface/result.png', label: { ko: '결과 화면', en: 'Result' } },
		],
		logoText: 'POKEFACE',
		logoColor: '#eab308',
		glowColor: '#eab308',
		category: 'web',
	},
	{
		id: '5',
		period: '2025.11',
		title: {
			ko: 'Portfolio',
			en: 'Portfolio',
		},
		type: 'Web',
		scale: {
			ko: '개인 프로젝트',
			en: 'Personal Project',
		},
		mainTech: 'React',
		library: 'Vite',
		features: {
			ko: [
				'React와 TypeScript 기반의 현대적인 포트폴리오입니다.',
				'i18next로 다국어(한/영)를 지원합니다.',
				'Framer Motion으로 스크롤 기반 애니메이션을 구현했습니다.',
				'SCSS로 체계적인 스타일 관리를 합니다.',
				'반응형 디자인으로 모든 디바이스에서 최적화되어 있습니다.',
			],
			en: [
				'Modern portfolio based on React and TypeScript.',
				'Supports multiple languages (KO/EN) with i18next.',
				'Implemented scroll-based animations with Framer Motion.',
				'Systematic style management with SCSS.',
				'Optimized for all devices with responsive design.',
			],
		},
		technologies: ['React', 'TypeScript', 'SCSS', 'Framer Motion', 'Vite'],
		githubUrl: 'https://github.com/woodong-222/woo-portfolio',
		liveUrl: 'https://woo-portfolio.vercel.app',
		screenshots: [
			{ src: '/screenshots/portfolio/main.png', label: { ko: '메인 화면', en: 'Main' } },
			{ src: '/screenshots/portfolio/about.png', label: { ko: '소개', en: 'About' } },
			{ src: '/screenshots/portfolio/projects.png', label: { ko: '프로젝트', en: 'Projects' } },
		],
		logoText: 'PORTFOLIO',
		logoColor: '#facc15',
		glowColor: '#facc15',
		category: 'web',
	},
];

export const getProjectsByCategory = (category: Project['category']) => {
	return projects.filter((project) => project.category === category);
};
