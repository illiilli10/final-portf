import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Asterisk } from "lucide-react";

export function Reveal({
    children,
    delay = 0,
    y = 24,
    className = "",
}: {
    children: ReactNode;
    delay?: number;
    y?: number;
    className?: string;
}) {
    const reduceMotion = useReducedMotion();

    return (
        <motion.div
            className={className}
            initial={reduceMotion ? false : { opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, delay, ease: [0.23, 1, 0.32, 1] }}
        >
            {children}
        </motion.div>
    );
}

export function SectionLabel({ children, detail }: { children: ReactNode; detail?: string }) {
    return (
        <div className="flex items-center justify-between gap-4 border-b border-[#deddd8] pb-3">
            <div className="flex items-center gap-2">
                <Asterisk className="h-3.5 w-3.5 text-[#6d5dfb]" strokeWidth={1.5} />
                <span className="eyebrow">{children}</span>
            </div>
            {detail && <span className="eyebrow hidden sm:block">{detail}</span>}
        </div>
    );
}
