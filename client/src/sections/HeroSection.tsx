import { useEffect, useRef, useState } from "react";
import {
    ArrowRight,
    ArrowUpRight,
    Github,
    Instagram,
    Menu,
    MessageCircle,
    MousePointer2,
    X,
} from "lucide-react";
import {
    motion,
    useMotionValue,
    useReducedMotion,
    useSpring,
    useTransform,
} from "framer-motion";
import { Reveal } from "./shared";

function SignalField() {
    const reduceMotion = useReducedMotion();
    const fieldRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 120, damping: 26, mass: 0.8 });
    const springY = useSpring(y, { stiffness: 120, damping: 26, mass: 0.8 });
    const coreX = useTransform(springX, [-1, 1], [-20, 20]);
    const coreY = useTransform(springY, [-1, 1], [-20, 20]);
    const ringX = useTransform(springX, [-1, 1], [16, -16]);
    const ringY = useTransform(springY, [-1, 1], [12, -12]);

    const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
        if (reduceMotion || !fieldRef.current) return;
        const rect = fieldRef.current.getBoundingClientRect();
        x.set(((event.clientX - rect.left) / rect.width) * 2 - 1);
        y.set(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };

    const onPointerLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div
            ref={fieldRef}
            onPointerMove={onPointerMove}
            onPointerLeave={onPointerLeave}
            className="relative mx-auto aspect-square w-full max-w-[540px] overflow-hidden rounded-full border border-[#deddd8] bg-[#f0efe9]"
            aria-label="Interactive DESIGN, CODE, AI visual system"
            role="img"
        >
            <div className="grid-fade absolute inset-0" />
            <motion.div className="absolute inset-[12%] signal-ring" style={{ x: ringX, y: ringY }} />
            <motion.div className="absolute inset-[25%] signal-ring" style={{ x: coreX, y: coreY }} />
            <motion.div className="absolute inset-[38%] signal-ring" style={{ x: ringX, y: ringY }} />
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    style={{ x: coreX, y: coreY }}
                    className="relative flex h-32 w-32 items-center justify-center rounded-full border border-[#111111] bg-[#f7f6f2] shadow-[0_18px_50px_rgba(17,17,17,0.10)]"
                >
                    <div className="absolute inset-2 rounded-full border border-[#deddd8]" />
                    <motion.div
                        animate={{ y: [0, -2, 0], rotate: [-1, 1, -1] }}
                        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                        className="relative flex flex-col items-center text-center"
                    >
                        <div className="mb-1 font-mono text-[8px] uppercase tracking-[0.18em] text-[#6b6b68]">signal / 01</div>
                        <div className="relative mb-2 h-10 w-14 rounded-[14px] border border-[#111111] bg-[#efeee9] shadow-[0_5px_12px_rgba(17,17,17,0.10)]">
                            <span className="absolute -top-3 left-1/2 h-3 w-px -translate-x-1/2 bg-[#111111]" />
                            <span className="absolute -top-4 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#6d5dfb]" />
                            <span className="robot-eye absolute left-3 top-3 h-2.5 w-2.5 rounded-full bg-[#6d5dfb]" />
                            <span className="robot-eye absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-[#6d5dfb]" />
                            <span className="absolute bottom-2 left-1/2 h-px w-5 -translate-x-1/2 bg-[#111111]" />
                        </div>
                        <div className="font-display text-[13px] font-bold leading-[0.86] tracking-[-0.08em]">
                            BUILD WITH
                            <br />
                            INTENT
                        </div>
                    </motion.div>
                </motion.div>
            </div>
            <motion.div style={{ x: ringX, y: ringY }} className="absolute left-[16%] top-[20%] flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#6b6b68]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#6d5dfb]" /> DESIGN
            </motion.div>
            <motion.div style={{ x: coreX, y: coreY }} className="absolute bottom-[20%] right-[14%] flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#6b6b68]">
                CODE <span className="h-1.5 w-1.5 rounded-full bg-[#111111]" />
            </motion.div>
            <motion.div style={{ x: ringX, y: ringY }} className="absolute bottom-[14%] left-[20%] flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[#6b6b68]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#6d5dfb]" /> AI
            </motion.div>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.16em] text-[#6b6b68]">
                move your cursor through the system
            </div>
        </div>
    );
}

function Nav() {
    const [open, setOpen] = useState(false);
    const navItems = [
        ["About", "#about"],
        ["Work", "#work"],
        ["Contact", "#contact"],
    ];

    return (
        <motion.header
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
            className="relative z-30 flex items-center justify-between border-b border-[#deddd8] py-5"
        >
            <a href="#home" className="group flex items-center gap-3" aria-label="Ilham Bentounssi home">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#111111] text-white transition-transform duration-300 group-hover:rotate-45">
                    <span className="font-display text-sm font-bold tracking-[-0.1em]">IB</span>
                </span>

            </a>
            <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
                {navItems.map(([label, href]) => (
                    <a key={label} href={href} className="magnetic-link eyebrow text-[#111111]">
                        <span className="text-hover">
                            <span>{label}</span>
                            <span aria-hidden="true">Open {label}</span>
                        </span>
                    </a>
                ))}
            </nav>
            <div className="hidden items-center gap-3 md:flex">


            </div>
            <button
                className="flex h-9 w-9 items-center justify-center border border-[#deddd8] md:hidden"
                onClick={() => setOpen(!open)}
                aria-label={open ? "Close menu" : "Open menu"}
            >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            {open && (
                <motion.nav
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute left-0 right-0 top-full border-b border-[#deddd8] bg-[#f7f6f2] py-5 md:hidden"
                >
                    {navItems.map(([label, href]) => (
                        <a key={label} href={href} onClick={() => setOpen(false)} className="block px-1 py-3 font-display text-3xl font-semibold tracking-[-0.07em]">
                            {label}
                        </a>
                    ))}
                </motion.nav>
            )}
        </motion.header>
    );
}

const socialLinks = [
    { name: "Instagram", href: "https://www.instagram.com/ilham.ai_dev/", Icon: Instagram },
    { name: "GitHub", href: "https://github.com/illiilli10", Icon: Github },
    { name: "WhatsApp", href: "https://wa.me/0763334609", Icon: MessageCircle },
];

function SocialLinkButton({ name, href, Icon }: { name: string; href: string; Icon: typeof Instagram }) {
    return (
        <a
            key={name}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={name}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#deddd8] bg-[#f7f6f2] text-[#111111] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#111111] hover:bg-[#f3a7b8]"
        >
            <Icon className="h-4 w-4" />
        </a>
    );
}

export function HeroSection() {
    const reduceMotion = useReducedMotion();
    const lineTransition = (delay: number) => ({ duration: 0.9, delay, ease: [0.23, 1, 0.32, 1] as const });
    const roles = [
        { name: "designer", image: "/designer.jpeg" },
        { name: "web dev", image: "/dev.jpeg" },
        { name: "AI solution builder", image: "/ai solution.jpeg" },
    ];
    const [activeRoleIndex, setActiveRoleIndex] = useState(0);
    const activeRole = roles[activeRoleIndex];

    useEffect(() => {
        const interval = window.setInterval(() => {
            setActiveRoleIndex((current) => (current + 1) % roles.length);
        }, 3000);

        return () => window.clearInterval(interval);
    }, [roles.length]);

    return (
        <section id="home" className="relative overflow-hidden pb-0 pt-2 lg:pb-12">
            <div className="hero-grid pointer-events-none absolute inset-0 -mx-5 opacity-70 sm:-mx-8 lg:-mx-14" />
            <Nav />
            <div className="relative z-10 grid min-w-0 gap-8 pt-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.7fr)] lg:items-start lg:gap-10 lg:pt-4">
                <div className="pt-2">
                    <div className="mb-6 flex items-center gap-3">
                        <motion.span initial={{ width: 0 }} animate={{ width: 40 }} transition={{ duration: 0.7, delay: 0.4 }} className="h-px bg-[#f3a7b8]" />
                        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }} className="eyebrow text-[#111111]">
                            Creative Developer & AI Builder / 2026
                        </motion.span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex items-start gap-5 sm:gap-6 lg:gap-7">
                            <h1 className="font-display min-w-0 max-w-[900px] mt-2 text-[11vw] font-bold uppercase leading-[0.76] tracking-[-0.09em] text-[#111111] sm:text-[9vw] md:text-[8vw] lg:text-[5.3rem] xl:text-[5.8rem] 2xl:text-[6.7rem]">
                                <span className="block overflow-hidden">
                                    <motion.span className="block" initial={reduceMotion ? false : { y: "110%" }} animate={{ y: 0 }} transition={lineTransition(0.22)}>
                                        ILHAM
                                    </motion.span>
                                </span>
                            </h1>

                            <motion.img
                                key={activeRole.image}
                                src={activeRole.image}
                                alt={activeRole.name}
                                initial={{ opacity: 0, x: 8, scale: 0.92 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                transition={{ duration: 0.45, ease: "easeInOut" }}
                                className="mr-2 h-14 w-24 rounded-[12px] border border-[#e7e3db] object-cover shadow-[0_10px_24px_rgba(17,17,17,0.06)] sm:mr-4 sm:h-18 sm:w-32 md:h-20 md:w-36 lg:h-22 lg:w-44"
                            />
                        </div>

                        <h1 className="font-display min-w-0 max-w-[900px] text-[11vw] font-bold uppercase leading-[0.75] tracking-[-0.09em] text-[#111111] sm:text-[9vw] md:text-[8vw] lg:text-[5.3rem] xl:text-[5.8rem] 2xl:text-[6.7rem]">
                            <span className="block overflow-hidden text-[#111111]">
                                <motion.span className="block" initial={reduceMotion ? false : { y: "110%" }} animate={{ y: 0 }} transition={lineTransition(0.34)}>
                                    BENTOUNSSI
                                </motion.span>
                            </span>
                        </h1>
                    </div>

                    <div className="mt-4 flex min-h-[52px] items-center text-base font-medium text-[#111111] sm:text-lg">
                        <span className="mr-2">I am</span>
                        <motion.span
                            key={activeRole.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.45, ease: "easeInOut" }}
                            className="inline-block"
                            style={{ color: "#f3a7b8" }}
                        >
                            {activeRole.name}
                        </motion.span>
                    </div>

                    <motion.p initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.72 }} className="mt-6 max-w-[560px] text-base leading-relaxed text-[#6b6b68] sm:text-lg">
                        I design digital experiences, build web products, and create smart AI-powered solutions that turn ideas into useful products.
                    </motion.p>
                    <motion.div initial={reduceMotion ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.88 }} className="mt-8 flex flex-row flex-wrap items-center gap-3">
                        <a
                            href="/cv pdf.pdf"
                            target="_blank"
                            rel="noreferrer noopener"
                            className="cta-pill inline-flex items-center gap-3 border border-[#111111] bg-[#f3a7b8] px-4 py-3 text-sm font-semibold text-[#111111] sm:px-5 sm:py-3.5"
                        >
                            <span>See My CV</span>
                            <ArrowRight className="h-4 w-4" />
                        </a>
                        <a href="mailto:ilhambentounssi1@gmail.com?subject=Let's build something" className="magnetic-link inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold underline decoration-[#deddd8] underline-offset-4 sm:px-3 sm:py-3.5">
                            Let’s build something <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </motion.div>
                </div>

                <motion.div
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.55, ease: [0.23, 1, 0.32, 1] }}
                    className="relative mx-auto w-full max-w-[420px] lg:mt-0"
                >
                    <div className="relative h-[400px] overflow-hidden rounded-[28px] border border-[#deddd8] bg-[#ece6df] shadow-[0_24px_80px_rgba(17,17,17,0.12)]">
                        <img
                            src="img.jpeg"
                            alt="Creative professionals collaborating"
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 via-transparent to-transparent" />
                    </div>

                    <div className="mt-4 flex items-center justify-center gap-3">
                        {socialLinks.map(({ name, href, Icon }) => (
                            <SocialLinkButton key={name} name={name} href={href} Icon={Icon} />
                        ))}
                    </div>
                </motion.div>
            </div>

        </section>
    );
}
