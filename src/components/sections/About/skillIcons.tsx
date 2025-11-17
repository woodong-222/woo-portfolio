import { ReactNode } from "react";
import { Globe, ShieldCheck } from "lucide-react";

type SkillIconConfig = {
	src?: string;
	bg?: string;
	icon?: ReactNode;
};

const devicon = (path: string) =>
	`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${path}`;

const skillIconMap: Record<string, SkillIconConfig> = {
	Python: { src: devicon("python/python-original.svg"), bg: "#1d4ed8" },
	C: { src: devicon("c/c-original.svg"), bg: "#0f172a" },
	"C++": { src: devicon("cplusplus/cplusplus-original.svg"), bg: "#0f172a" },
	Java: { src: devicon("java/java-original.svg"), bg: "#f97316" },
	JavaScript: {
		src: devicon("javascript/javascript-original.svg"),
		bg: "#facc15",
	},
	React: { src: devicon("react/react-original.svg"), bg: "#06b6d4" },
	FastAPI: { src: devicon("fastapi/fastapi-original.svg"), bg: "#0f766e" },
	PostgreSQL: {
		src: devicon("postgresql/postgresql-original.svg"),
		bg: "#1d4ed8",
	},
	MySQL: { src: devicon("mysql/mysql-original.svg"), bg: "#0d9488" },
	Jenkins: { src: devicon("jenkins/jenkins-original.svg"), bg: "#991b1b" },
	AWS: {
		src: devicon(
			"amazonwebservices/amazonwebservices-original.svg",
		),
		bg: "#ea580c",
	},
	Docker: { src: devicon("docker/docker-original.svg"), bg: "#0ea5e9" },
	Git: { src: devicon("git/git-original.svg"), bg: "#ef4444" },
	Nginx: { src: devicon("nginx/nginx-original.svg"), bg: "#10b981" },
	"Cloud-Security": { icon: <ShieldCheck size={16} />, bg: "#0f766e" },
	"Web-Hacking": { icon: <Globe size={16} />, bg: "#312e81" },
	"Windows OS": {
		src: devicon("windows8/windows8-original.svg"),
		bg: "#047857",
	},
	"Linux OS": { src: devicon("linux/linux-original.svg"), bg: "#facc15" },
	"Mac OS": { src: devicon("apple/apple-original.svg"), bg: "#0f172a" },
	Slack: { src: devicon("slack/slack-original.svg"), bg: "#7c3aed" },
	Notion: { src: devicon("notion/notion-original.svg"), bg: "#1f2937" },
	Figma: { src: devicon("figma/figma-original.svg"), bg: "#ec4899" },
	Photoshop: { src: devicon("photoshop/photoshop-plain.svg"), bg: "#2563eb" },
	"Premiere Pro": {
		src: devicon("premierepro/premierepro-original.svg"),
		bg: "#7c3aed",
	},
};

export const getSkillIcon = (skill: string): SkillIconConfig | undefined =>
	skillIconMap[skill];
