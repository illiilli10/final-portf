import { Bot, Code2, Layers3 } from "lucide-react";
import { Reveal } from "./shared";

const capabilities = [
    {
        number: "01",
        title: "Design direction",
        detail: "Identity, art direction, product language",
        icon: Layers3,
    },
    {
        number: "02",
        title: "Digital development",
        detail: "React interfaces, systems, interactions",
        icon: Code2,
    },
    {
        number: "03",
        title: "AI solutions",
        detail: "Useful automations, agents, intelligent tools",
        icon: Bot,
    },
];

export function CapabilitiesSection() {
    return (
        <section className="relative left-1/2 w-screen -ml-[50vw] overflow-hidden bg-[#161616] py-20 text-[#f7f6f2] sm:py-24 lg:py-36">
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage:
                        "linear-gradient(to right, rgba(247,246,242,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(247,246,242,0.08) 1px, transparent 1px)",
                    backgroundSize: "72px 72px",
                }}
            />
            <div className="relative z-10 w-full px-4 sm:px-6 lg:px-10">
                <Reveal>
                    <div className="flex items-center justify-between border-b border-white/15 pb-3">
                        <div className="flex items-center gap-2">
                            <span className="flex h-3.5 w-3.5 items-center justify-center text-[#a39aff]">✦</span>
                            <span className="eyebrow text-[#f7f6f2]">Capabilities / 03</span>
                        </div>
                        <span className="eyebrow hidden text-white/45 sm:block">How I can help</span>
                    </div>
                </Reveal>
                <div className="mt-12 grid gap-10 text-center lg:mt-16 lg:grid-cols-[1.4fr_1.1fr] lg:items-end lg:gap-8 lg:text-left">
                    <Reveal delay={0.08}>
                        <div className="lg:pl-20">
                            <h2 className="font-display text-[4.2rem] font-semibold leading-[0.75] tracking-[-0.11em] text-[#f7f6f2] sm:text-[5.5rem] lg:text-[9.5rem]">
                                Make
                                <br />
                                <span className="text-[#a39aff]">better</span>
                                <br />
                                things.
                            </h2>
                            <p className="mx-auto mt-8 max-w-[380px] text-sm leading-relaxed text-white/55 lg:mx-0 lg:mt-10 lg:max-w-[420px] lg:text-base">
                                A small, senior practice for teams that care about the details — and the feeling those details create.
                            </p>
                        </div>
                    </Reveal>
                    <div className="border-t border-white/15 lg:mt-0">
                        {capabilities.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <Reveal key={item.number} delay={0.12 + index * 0.06}>
                                    <div className="group grid grid-cols-[42px_1fr_auto] items-start gap-4 border-b border-white/15 py-6 transition-colors duration-300 hover:bg-white/[0.04] sm:grid-cols-[56px_1fr_auto] sm:gap-6 sm:py-7">
                                        <span className="font-mono text-[10px] text-white/40">{item.number}</span>
                                        <div>
                                            <h3 className="font-display text-2xl font-semibold tracking-[-0.07em] sm:text-4xl">{item.title}</h3>
                                            <p className="mt-2 text-sm text-white/50">{item.detail}</p>
                                        </div>
                                        <Icon className="mt-1 h-5 w-5 text-[#a39aff] transition-transform duration-300 group-hover:rotate-12" strokeWidth={1.3} />
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
