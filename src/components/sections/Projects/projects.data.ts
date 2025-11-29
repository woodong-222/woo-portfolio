export interface Project {
	id: string;
	period: string;
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
		period: '2025.09 ~ 2025.12',
		title: {
			ko: 'MON47 - 알려지지 않은 URL 분석 및 악성 행위 탐지 시스템',
			en: 'MON47 - Unknown URL Analysis & Malicious Behavior Detection',
		},
		description: {
			ko: '알려지지 않은 URL의 악성 행위를 탐지하고 분석하는 보안 제품 개발',
			en: 'Security product to detect and analyze malicious behavior in unknown URLs',
		},
		detailedDescription: {
			ko: '네트워크/시스템/클라우드 환경에서 알려지지 않은 URL의 악성 행위를 탐지하고 분석하는 시스템. (상세 내용 추후 추가)',
			en: 'Detects malicious behaviors of unknown URLs across network/system/cloud environments. (Details to be added)',
		},
		technologies: ['Python', 'FastAPI', 'SQLAlchemy', 'React', 'Docker'],
		githubUrl: 'https://github.com/woodong-222',
		featured: true,
		category: 'security',
	},
	{
		id: '2',
		period: '2024.09 ~ 2025.06',
		title: {
			ko: 'Winectio n - 농인을 위한 양방향 수어 변환 화상채팅',
			en: 'Winectio n - Sign Language Conversion Video Chat',
		},
		description: {
			ko: '농인을 위한 양방향 수어 변환 화상 채팅 플랫폼',
			en: 'Bidirectional sign-language conversion video chat platform',
		},
		detailedDescription: {
			ko: '농인과 비농인 간 양방향 수어/자막/음성 변환을 제공하는 화상채팅 서비스. (상세 내용 추후 추가)',
			en: 'Video chat service enabling bidirectional sign-language/subtitle/voice conversion. (Details to be added)',
		},
		technologies: ['Python', 'AWS', 'Lambda', 'React', 'Redis'],
		githubUrl: 'https://github.com/woodong-222',
		featured: true,
		category: 'other',
	},
	{
		id: '3',
		period: '2024.05 ~ 2024.07',
		title: {
			ko: 'WHSCA - Dead Code 제거 및 실시간 데이터 기반 SCA',
			en: 'WHSCA - Dead Code Removal & Real-time SCA',
		},
		description: {
			ko: '서버 단위 실시간 데이터 기반 SCA와 Dead Code 제거 도구',
			en: 'Server-side real-time SCA with dead code elimination tooling',
		},
		detailedDescription: {
			ko: '실시간 종속성 분석과 사용되지 않는 코드 제거를 결합한 SCA 솔루션. (상세 내용 추후 추가)',
			en: 'Real-time dependency analysis plus unused code removal for SCA. (Details to be added)',
		},
		technologies: ['Python', 'FastAPI', 'PostgreSQL', 'React'],
		githubUrl: 'https://github.com/woodong-222',
		featured: false,
		category: 'security',
	},
	{
		id: '4',
		period: '2025.06',
		title: {
			ko: 'Pokeface - AI 얼굴 인식 포켓몬 도감',
			en: 'Pokeface - AI Face Recognition Pokédex',
		},
		description: {
			ko: 'AI 얼굴 인식으로 포켓몬을 매칭하는 웹 서비스',
			en: 'Web service matching faces to Pokémon using AI recognition',
		},
		detailedDescription: {
			ko: 'AI 얼굴 분석을 통해 유사한 포켓몬을 추천하는 재미형 서비스. (상세 내용 추후 추가)',
			en: 'Fun app recommending Pokémon based on AI face analysis. (Details to be added)',
		},
		technologies: ['React', 'TypeScript', 'SCSS', 'Framer Motion', 'Vite'],
		githubUrl: 'https://github.com/woodong-222',
		featured: false,
		category: 'web',
	},
	{
		id: '5',
		period: '2025.11',
		title: {
			ko: 'Portfolio - 나를 소개하기 위한 포트폴리오 웹 페이지',
			en: 'Portfolio Website',
		},
		description: {
			ko: '다국어 지원과 반응형 디자인을 갖춘 개인 포트폴리오',
			en: 'Personal portfolio with responsive design and multi-language support',
		},
		detailedDescription: {
			ko: '지금 보고 있는 포트폴리오 웹사이트. React/TypeScript 기반, 다국어·반응형 지원. (상세 내용 추후 추가)',
			en: 'This portfolio site built with React/TS, supporting i18n and responsive design. (Details to be added)',
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
