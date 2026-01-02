import { ReactNode } from "react";
import { Globe, ShieldCheck, Cloud } from "lucide-react";

type SkillIconConfig = {
	src?: string;
	bg?: string;
	icon?: ReactNode;
};

const devicon = (path: string) =>
	`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}`;

const skillIconMap: Record<string, SkillIconConfig> = {
	// Languages
	Python: { src: devicon("python/python-original.svg"), bg: "#ffffff" },
	C: { src: devicon("c/c-original.svg"), bg: "#ffffff" },
	"C++": { src: devicon("cplusplus/cplusplus-original.svg"), bg: "#ffffff" },
	Java: { src: devicon("java/java-original.svg"), bg: "#ffffff" },
	JavaScript: { src: devicon("javascript/javascript-original.svg"), bg: "#F7DF1E" },
	TypeScript: { src: devicon("typescript/typescript-original.svg"), bg: "#3178C6" },

	// Frontend
	React: { src: devicon("react/react-original.svg"), bg: "#ffffff" },
	"Next.js": { src: devicon("nextjs/nextjs-original.svg"), bg: "#ffffff" },
	Vue: { src: devicon("vuejs/vuejs-original.svg"), bg: "#ffffff" },

	// Backend & DB
	FastAPI: { src: devicon("fastapi/fastapi-original.svg"), bg: "#ffffff" },
	PostgreSQL: { src: devicon("postgresql/postgresql-original.svg"), bg: "#ffffff" },
	MySQL: { src: devicon("mysql/mysql-original.svg"), bg: "#ffffff" },
	MongoDB: { src: devicon("mongodb/mongodb-original.svg"), bg: "#ffffff" },
	Redis: { src: devicon("redis/redis-original.svg"), bg: "#ffffff" },

	// DevOps & Cloud
	Jenkins: { src: devicon("jenkins/jenkins-original.svg"), bg: "#ffffff" },
	AWS: { src: devicon("amazonwebservices/amazonwebservices-original-wordmark.svg"), bg: "#ffffff" },
	Docker: { src: devicon("docker/docker-original.svg"), bg: "#ffffff" },
	Git: { src: devicon("git/git-original.svg"), bg: "#ffffff" },
	Nginx: { src: devicon("nginx/nginx-original.svg"), bg: "#ffffff" },
	Vercel: { src: devicon("vercel/vercel-original.svg"), bg: "#ffffff" },
	Kubernetes: { src: devicon("kubernetes/kubernetes-original.svg"), bg: "#ffffff" },

	// Security
	Cloud: { icon: <Cloud size={24} />, bg: "#0EA5E9" },
	Web: { icon: <Globe size={24} />, bg: "#6366F1" },
	"Cloud-Security": { icon: <ShieldCheck size={24} />, bg: "#059669" },
	"Web-Hacking": { icon: <Globe size={24} />, bg: "#4F46E5" },

	// OS
	"Windows OS": { src: devicon("windows11/windows11-original.svg"), bg: "#ffffff" },
	"Linux OS": { src: devicon("linux/linux-original.svg"), bg: "#ffffff" },
	MacOS: { src: devicon("apple/apple-original.svg"), bg: "#ffffff" },
	"Mac OS": { src: devicon("apple/apple-original.svg"), bg: "#ffffff" },

	// Collaboration
	Slack: { src: devicon("slack/slack-original.svg"), bg: "#ffffff" },
	Notion: { src: devicon("notion/notion-original.svg"), bg: "#ffffff" },
	Jira: { src: devicon("jira/jira-original.svg"), bg: "#ffffff" },

	// Design
	Figma: { src: devicon("figma/figma-original.svg"), bg: "#ffffff" },
	Photoshop: { src: devicon("photoshop/photoshop-original.svg"), bg: "#ffffff" },
	Premiere: { src: devicon("premierepro/premierepro-original.svg"), bg: "#ffffff" },
	"Premiere Pro": { src: devicon("premierepro/premierepro-original.svg"), bg: "#ffffff" },
};

export const getSkillIcon = (skill: string): SkillIconConfig | undefined =>
	skillIconMap[skill];
