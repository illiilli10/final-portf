import { ArrowUpRight, Instagram, Mail, MessageCircle } from "lucide-react";
import { Reveal } from "./shared";

export function FooterSection() {
    return (
        <footer id="contact" className="relative isolate overflow-hidden bg-[#6d5dfb] px-5 py-24 text-[#111111] sm:px-8 lg:px-14 lg:py-32">
            <video
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.5] mix-blend-multiply"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-hidden="true"
            >
                <source src="/manus-storage/ilham-footer-ambient_58160b4d.mp4" type="video/mp4" />
            </video>
            <div className="pointer-events-none absolute inset-0 bg-[#6d5dfb]/55" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#6d5dfb]/75 via-transparent to-[#6d5dfb]/85" />
            <div className="relative z-10 mx-auto max-w-[1400px]">
                <Reveal>
                    <div className="flex items-center justify-between border-b border-[#111111]/20 pb-3">
                        <div className="flex items-center gap-2">
                            <span className="flex h-3.5 w-3.5 items-center justify-center">✦</span>
                        </div>

                    </div>
                </Reveal>
                <div className="grid gap-16 pt-16 lg:grid-cols-[1fr_0.48fr] lg:gap-24 lg:pt-24">
                    <Reveal delay={0.08}>
                        <h2 className="font-display text-[18vw] font-bold leading-[0.78] tracking-[-0.11em] sm:text-[13vw] lg:text-[10.8rem]">
                            Let’s
                            <br />
                            build
                            <br />
                            <span className="text-[#f7f6f2]">something.</span>
                        </h2>
                    </Reveal>
                    <Reveal delay={0.16}>
                        <div className="flex flex-col justify-end">
                            <p className="max-w-[340px] text-lg leading-relaxed">
                                Have a sharp idea, a messy system or a future you want to make tangible? I’d love to hear about it.
                            </p>
                            <a
                                href="mailto:ilhambentounssi1.com?subject=Let's build something"
                                className="cta-pill mt-8 inline-flex w-fit items-center gap-5 border border-[#111111] px-5 py-4 text-sm font-semibold"
                            >
                                <span className="text-hover">
                                    <span>Start a conversation</span>
                                    <span aria-hidden="true">Let’s make it real</span>
                                </span>
                                <ArrowUpRight className="h-4 w-4" />
                            </a>
                        </div>
                    </Reveal>
                </div>
                <div className="mt-24 grid gap-8 border-t border-[#111111]/20 pt-6 sm:grid-cols-2 lg:grid-cols-3">
                    <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.16em]">Email</div>
                        <a className="underlined-link mt-3 inline-block text-sm" href="mailto:hello@ilhambentounssi.com">
                            hello@ilhambentounssi.com
                        </a>
                    </div>
                    <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.16em]">Elsewhere</div>
                        <div className="mt-3 flex items-center gap-4">
                            <a href="https://www.instagram.com/ilham.ai_dev/" target="_blank" rel="noreferrer" aria-label="Instagram" className="magnetic-link text-[#111111] transition-colors duration-200 hover:text-white">
                                <Instagram className="h-4 w-4" />
                            </a>
                            <a href="mailto:ilhambentounssi1.com" aria-label="Email" className="magnetic-link text-[#111111] transition-colors duration-200 hover:text-white">
                                <Mail className="h-4 w-4" />
                            </a>
                            <a href="https://wa.me/0763334609" target="_blank" rel="noreferrer" aria-label="WhatsApp" className="magnetic-link text-[#111111] transition-colors duration-200 hover:text-white">
                                <MessageCircle className="h-4 w-4" />
                            </a>
                        </div>
                    </div>
                    <div className="sm:text-right">
                        <div className="font-mono text-[10px] uppercase tracking-[0.16em]">© 2026 Ilham Bentounssi</div>
                        <div className="mt-3 text-sm">Made with intent in the web.</div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
