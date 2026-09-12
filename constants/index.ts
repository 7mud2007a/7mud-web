import { FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";

export const SKILL_DATA = [
  {
    skill_name: "HTML",
    image: "html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    image: "css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Tailwind CSS",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React",
    image: "react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Redux",
    image: "redux.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React Query",
    image: "reactquery.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "TypeScript",
    image: "ts.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Next.js",
    image: "next.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Framer Motion",
    image: "framer.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Figma",
    image: "figma.png",
    width: 50,
    height: 50,
  },
] as const;

export const SOCIALS = [
  {
    name: "Telegram",
    icon: FaTelegramPlane,
    link: "https://t.me/DanielXdev",
  },
  {
    name: "WhatsApp",
    icon: FaWhatsapp,
    link: "https://wa.me/?text=Hey%20Daniel%2C%20I%20wanted%20to%20ask%20you%20about%20building%20a%20website.",
  },
] as const;

export const FRONTEND_SKILL = [
  {
    skill_name: "HTML",
    image: "html.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "CSS",
    image: "css.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "JavaScript",
    image: "js.png",
    width: 65,
    height: 65,
  },
  {
    skill_name: "Tailwind CSS",
    image: "tailwind.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Material UI",
    image: "mui.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "React",
    image: "react.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "TypeScript",
    image: "ts.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Next.js",
    image: "next.png",
    width: 80,
    height: 80,
  },
] as const;

export const BACKEND_SKILL = [
  {
    skill_name: "Node.js",
    image: "node.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Express.js",
    image: "express.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "MongoDB",
    image: "mongodb.png",
    width: 40,
    height: 40,
  },
  {
    skill_name: "Firebase",
    image: "firebase.png",
    width: 55,
    height: 55,
  },
] as const;

export const FULLSTACK_SKILL = [
  {
    skill_name: "Framer Motion",
    image: "framer.png",
    width: 80,
    height: 80,
  },
  {
    skill_name: "Figma",
    image: "figma.png",
    width: 50,
    height: 50,
  },
] as const;

export const OTHER_SKILL = [] as const;

export const PROJECTS = [
  {
    title: "Interactive Modern Portfolio",
    description:
      "A high-performance, responsive portfolio showcasing cutting-edge 3D space visuals, smooth Framer Motion animations, and custom interactive UI components.",
    image: "/projects/project-1.png",
    link: "https://t.me/DanielXdev",
  },
  {
    title: "Futuristic Web Experience",
    description:
      "Custom website built with Next.js, React Three Fiber, and Tailwind CSS designed to deliver immersive digital experiences and high conversions.",
    image: "/projects/project-2.png",
    link: "https://t.me/DanielXdev",
  },
  {
    title: "High-Performance Web App",
    description:
      "Modern full-stack web application designed for fast render speeds, fluid interactive cards, and elegant responsive layouts.",
    image: "/projects/project-3.png",
    link: "https://t.me/DanielXdev",
  },
] as const;

export const FOOTER_DATA = [
  {
    title: "Connect",
    data: [
      {
        name: "Telegram (@DanielXdev)",
        icon: FaTelegramPlane,
        link: "https://t.me/DanielXdev",
      },
      {
        name: "WhatsApp",
        icon: FaWhatsapp,
        link: "https://wa.me/?text=Hey%20Daniel%2C%20I%20wanted%20to%20ask%20you%20about%20building%20a%20website.",
      },
    ],
  },
  {
    title: "Services",
    data: [
      {
        name: "Web Development",
        icon: null,
        link: "https://t.me/DanielXdev",
      },
      {
        name: "Website Design",
        icon: null,
        link: "https://t.me/DanielXdev",
      },
      {
        name: "Interactive Frontend",
        icon: null,
        link: "https://t.me/DanielXdev",
      },
    ],
  },
] as const;

export const NAV_LINKS = [
  {
    title: "About me",
    link: "#about-me",
  },
  {
    title: "Skills",
    link: "#skills",
  },
  {
    title: "Projects",
    link: "#projects",
  },
] as const;

export const LINKS = {
  telegram: "https://t.me/DanielXdev",
  whatsapp: "https://wa.me/?text=Hey%20Daniel%2C%20I%20wanted%20to%20ask%20you%20about%20building%20a%20website.",
};
