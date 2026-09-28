import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionLabel } from "./shared";

const tickerItems = [
    { name: "React", logo: "/react.png" },
    { name: "Next.js", logo: "/next.png" },
    { name: "Postman", logo: "/postman.png" },
    { name: "Illustrator", logo: "/illustrateur.png" },
    { name: "n8n", logo: "/n8n.png" },
    { name: "VS Code", logo: "/vs code.png" },
];

export function AboutSection() {
    return (
        <section id="about" className="noise border-t border-[#deddd8] pt-0 pb-0 lg:pt-0 lg:pb-0">
            <style>{`
                .tool-ticker {
                    position: relative;
                    overflow: hidden;
                    white-space: nowrap;
                    border-top: 1px solid rgba(17, 17, 17, 0.12);
                    border-bottom: 1px solid rgba(17, 17, 17, 0.12);
                    background: rgba(239, 238, 233, 0.8);
                    margin-top: -2px;
                    padding-top: 0;
                    padding-bottom: 0;
                    mask-image: linear-gradient(
                        to right,
                        transparent 0%,
                        black 8%,
                        black 92%,
                        transparent 100%
                    );
                    -webkit-mask-image: linear-gradient(
                        to right,
                        transparent 0%,
                        black 8%,
                        black 92%,
                        transparent 100%
                    );
                }

                .tool-ticker::before,
                .tool-ticker::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 8%;
                    z-index: 2;
                    pointer-events: none;
                }

                .tool-ticker::before {
                    left: 0;
                    background: linear-gradient(to right, rgba(239, 238, 233, 1), rgba(239, 238, 233, 0));
                }

                .tool-ticker::after {
                    right: 0;
                    background: linear-gradient(to left, rgba(239, 238, 233, 1), rgba(239, 238, 233, 0));
                }

                .tool-track {
                    display: inline-flex;
                    width: max-content;
                    animation: tickerScroll 18s linear infinite;
                    will-change: transform;
                    padding: 0;
                    transform: translateY(-1px);
                }

                .tool-track:hover {
                    animation-play-state: paused;
                }

                .tool-item {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.8rem;
                    padding: 0.9rem 1.4rem;
                    min-width: max-content;
                    font-family: "SFMono-Regular", "Consolas", monospace;
                    font-size: 12px;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: #111111;
                    opacity: 0.85;
                    flex-shrink: 0;
                }

                .tool-item img {
                    width: 1.5rem;
                    height: 1.5rem;
                    object-fit: contain;
                    filter: grayscale(1) brightness(0.8);
                    opacity: 0.8;
                    transition: filter 0.25s ease, transform 0.25s ease, opacity 0.25s ease;
                }

                .tool-item:hover {
                    opacity: 1;
                }

                .tool-item:hover img {
                    filter: grayscale(0) saturate(1.2) drop-shadow(0 0 10px rgba(243, 167, 184, 0.45));
                    opacity: 1;
                    transform: scale(1.1);
                }

                @keyframes tickerScroll {
                    from { transform: translateX(0); }
                    to { transform: translateX(-50%); }
                }
            `}</style>

            <div className="tool-ticker" aria-label="Tech stack ticker">
                <div className="tool-track">
                    {[...tickerItems, ...tickerItems].map((item, index) => (
                        <div key={`${item.name}-${index}`} className="tool-item">
                            <img src={item.logo} alt={item.name} />
                            <span>{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mx-auto mt-10 max-w-6xl px-4 text-center sm:px-6 lg:px-8 lg:mt-14">
                <div className="mx-auto max-w-[1100px]">
                    <Reveal delay={0.08}>
                        <h2 className="mx-auto max-w-[950px] font-display text-4xl font-semibold leading-[0.95] tracking-[-0.09em] text-[#111111] sm:text-6xl lg:text-[7rem]">
                            2+ years of experience <span className="text-[#6d5dfb]">Web/design & AI solutions</span> From idea to working product
                        </h2>
                    </Reveal>
                    <div className="mx-auto mt-4 max-w-5xl border-t border-[#deddd8] pt-4">
                        <Reveal delay={0.14}>
                            <p className="mx-auto max-w-[760px] text-lg leading-relaxed text-[#6b6b68]">
                                I’m Ilham — a multidisciplinary designer and developer based in the overlap between visual culture and emerging technology. I work with ambitious people to make complex things feel clear, useful and worth coming back to.
                            </p>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <div className="mx-auto mt-6 max-w-[520px] space-y-5 text-sm leading-relaxed text-[#6b6b68]">
                                <p className="text-center">
                                    <span className="mr-3 text-[#111111]">↳</span>Digital experiences with purpose
                                </p>
                                <p className="text-center">
                                    <span className="mr-3 text-[#111111]">↳</span>AI systems that turn ideas into action
                                </p>
                                <p className="text-center">
                                    <span className="mr-3 text-[#111111]">↳</span>Interfaces built to be used
                                </p>
                                <div className="pt-3 text-center">
                                    <a href="#contact" className="underlined-link inline-flex items-center justify-center gap-2 font-semibold text-[#111111]">
                                        More about the approach <ArrowUpRight className="h-4 w-4" />
                                    </a>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
