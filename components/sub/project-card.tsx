"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaTelegramPlane } from "react-icons/fa";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  tags?: readonly string[];
  index: number;
}

export const ProjectCard = ({
  title,
  description,
  image,
  link,
  tags = ["Next.js", "React", "Tailwind CSS"],
  index,
}: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -6 }}
      className="glass-card rounded-3xl overflow-hidden border border-white/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
    >
      {/* Project Image Box */}
      <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-slate-100">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
      </div>

      {/* Project Body */}
      <div className="p-6 sm:p-8 flex flex-col justify-between flex-1 gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-200/50"
              >
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight group-hover:text-purple-700 transition-colors">
            {title}
          </h3>

          <p className="text-slate-600 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
          <Link
            href={link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-purple-700 hover:text-purple-800 transition-colors"
          >
            <span>Inquire About Project</span>
            <FaTelegramPlane className="w-3.5 h-3.5" />
          </Link>
          <span className="text-xs text-slate-400 font-medium">Custom Work</span>
        </div>
      </div>
    </motion.div>
  );
};
