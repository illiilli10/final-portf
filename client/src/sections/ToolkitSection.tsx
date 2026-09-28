"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const experienceGroups = [
    {
        label: "01",
        items: [
            {
                year: "2022",
                title: "International Commerce",
                type: "Education",
                text: "Built my foundation in business, communication and commercial thinking.",
            },
            {
                year: "2024",
                title: "Multimedia Development",
                type: "Education",
                text: "Started building skills in web development, graphic design and digital experiences.",
            },
        ],
    },
    {
        label: "02",
        items: [
            {
                year: "2024",
                title: "Transitair",
                type: "Internship",
                text: "Developed professional experience in commercial operations and communication.",
            },
            {
                year: "2025",
                title: "Cathedis",
                type: "Internship",
                text: "Worked across graphic design, AI automation, marketing and development.",
            },
        ],
    },
    {
        label: "03",
        items: [
            {
                year: "2025",
                title: "FIYO",
                type: "Project",
                text: "Created a chocolate brand combining branding, graphic design and web development.",
            },
            {
                year: "2026",
                title: "Gofer Afric",
                type: "Internship",
                text: "Working on web development, digital design, AI solutions and automation for a growing industrial company.",
            },
        ],
    },
];

export function ToolkitSection() {
    const sectionRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-120%"]);
    const introOpacity = useTransform(scrollYProgress, [0, 0.15, 0.35, 0.6], [1, 1, 0.7, 0]);

    return (
        <section
            ref={sectionRef}
            id="experience"
            className="relative h-[240vh] border-t border-[#deddd8] bg-[#f5f4ef]"
        >
            <div className="sticky top-0 flex h-[100vh] items-center overflow-hidden">
                <motion.div
                    style={{ x }}
                    className="flex min-w-max items-center gap-[3vw] px-[5vw]"
                >
                    <motion.div
                        style={{ opacity: introOpacity }}
                        className="w-[27vw] min-w-[280px] shrink-0"
                    >
                        <div className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6b6b68]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#f3a6c8]" />
                            Experience / 02
                        </div>

                        <h2 className="font-display text-[clamp(3.5rem,6vw,7rem)] font-semibold leading-[0.84] tracking-[-0.09em] text-[#111]">
                            Where
                            <br />
                            I&apos;ve
                            <br />
                            <span className="text-[#e99abd]">been.</span>
                        </h2>

                        <p className="mt-8 max-w-[320px] text-sm leading-relaxed text-[#6b6b68]">
                            A journey across business, design, development and AI — always learning by building.
                        </p>
                    </motion.div>

                    <div className="relative flex shrink-0 items-center gap-[2vw]">
                        <div className="absolute left-[3%] right-[3%] top-1/2 h-px bg-[#111]/15" />

                        {experienceGroups.map((group, groupIndex) => (
                            <div key={group.label} className="relative flex w-[310px] flex-col gap-5">
                                <div className="mb-1 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#6b6b68]">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#f3a6c8]" />
                                    {group.label}
                                </div>

                                {group.items.map((item, index) => (
                                    <motion.article
                                        key={`${group.label}-${item.title}`}
                                        initial={{ opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.3 }}
                                        transition={{ duration: 0.6, delay: groupIndex * 0.1 + index * 0.08 }}
                                        className="group relative h-[200px] rounded-[20px] border border-[#111]/10 bg-[#f8f7f4] px-6 py-5 shadow-[0_12px_30px_rgba(17,17,17,0.03)]"
                                    >
                                        <div className="absolute -left-[10px] top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#f3a6c8] ring-4 ring-[#f5f4ef]" />

                                        <div className="flex items-center justify-between gap-3">
                                            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#6b6b68]">
                                                {item.type}
                                            </span>
                                            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-[#111]/30">
                                                0{groupIndex + 1}.{index + 1}
                                            </span>
                                        </div>

                                        <p className="mt-5 font-mono text-xs text-[#e99abd]">{item.year}</p>

                                        <h3 className="mt-4 font-display text-[2rem] font-semibold leading-[0.9] tracking-[-0.06em] text-[#111]">
                                            {item.title}
                                        </h3>

                                        <p className="mt-3 text-[12px] leading-[1.7] text-[#6b6b68]">
                                            {item.text}
                                        </p>
                                    </motion.article>
                                ))}
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}