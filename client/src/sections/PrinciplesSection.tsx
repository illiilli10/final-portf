import { Check } from "lucide-react";
import { Reveal } from "./shared";

export function PrinciplesSection() {
    const items = [
        ["01", "Clarity is generous", "A good idea should not need a user manual."],
        ["02", "Useful can still be beautiful", "The interface is part of the feeling, not a wrapper around it."],
        ["03", "Technology is a material", "Use the new stuff when it makes the work more human."],
    ];

    return (
        <section className="border-b border-[#deddd8] py-20 sm:py-24 lg:py-36">
            <div className="grid gap-8 text-center md:grid-cols-3 md:gap-8 md:text-left">
                {items.map(([number, title, text], index) => (
                    <Reveal key={number} delay={index * 0.07}>
                        <div className="border-t border-[#deddd8] pt-6 md:pt-7">
                            <h3 className="font-display text-2xl font-bold leading-none tracking-[-0.07em] md:text-[2rem]">{title}</h3>
                            <p className="mt-4 text-sm leading-relaxed text-[#6b6b68]">{text}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    );
}
