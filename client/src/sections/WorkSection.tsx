"use client";

import * as React from "react";

import { Reveal } from "./shared";

const projects = [
    {
        index: "01",
        title: "AI WORKFLOW / N8N",
        description:
            "An AI-powered workflow system designed to automate repetitive business processes and connect tools through intelligent automation.",
        category: "AI automation · Workflow design",
        year: "2026",
        video: "workflow.mp4",
        href: "https://example.com/ai-workflow",
    },
    {
        index: "02",
        title: "RIAD / DIGITAL EXPERIENCE",
        description:
            "A refined digital experience for a riad, combining hospitality, visual storytelling, and a seamless booking-focused interface.",
        category: "Web design · Development",
        year: "2026",
        video: "/riad.webm",
        href: "https://example.com/riad",
    },
    {
        index: "03",
        title: "CAR RENTAL ",
        description:
            "A modern car rental platform built around vehicle discovery, availability, lead capture, and AI-powered customer assistance.",
        category: "Web development · AI automation",
        year: "2026",
        video: "/car rental.webm",
        href: "https://example.com/car-rental",
    },
    {
        index: "04",
        title: "BACPROGRESS / SAAS",
        description:
            "A focused learning platform designed to help Moroccan students organize their preparation, track progress, and study more effectively.",
        category: "SaaS · Product design",
        year: "2026",
        video: "/backprogress.mp4",
        href: "https://example.com/bacprogress",
    },
    {
        index: "05",
        title: "REAL ESTATE / DIGITAL PLATFORM",
        description:
            "A modern real estate experience designed to make property discovery, presentation, and lead generation feel effortless.",
        category: "Web design · Development",
        year: "2026",
        video: "/real estat.webm",
        href: "https://example.com/real-estate",
    },
];

const CARD_H = 0.34;
const CARD_MAX_W = 0.31;
const CARD_RATIO = 1.48;

const STEP = 40;
const DRUM = 2.22;
const LENS = 2.7;
const RING_R = 1.14;
const BOW = 1.82;

const TITLE = 0.124;
const INDEX = 0.04;
const CULL = 1.6;

const WHEEL_UNITS = 900;
const DRAG_UNITS = 420;
const SETTLE = 140;
const EASE = 0.12;

const clamp = (v: number, lo: number, hi: number) =>
    Math.min(hi, Math.max(lo, v));

const lerp = (a: number, b: number, t: number) =>
    a + (b - a) * t;

const rad = (deg: number) => (deg * Math.PI) / 180;

const bowAt = (drumDeg: number, bow: number) =>
    -bow * (1 - Math.cos(rad(drumDeg)));

function place(
    ringDeg: number,
    drumDeg: number,
    ringR: number,
    drumR: number,
    bow: number,
    m: number,
) {
    return (
        `translateX(${m * bowAt(drumDeg, bow)}px)` +
        ` rotateZ(${(1 - m) * ringDeg}deg)` +
        ` translateY(${-(1 - m) * ringR}px)` +
        ` rotateX(${m * drumDeg}deg)` +
        ` translateZ(${m * drumR}px)`
    );
}

export function WorkSection() {
    const stageRef = React.useRef<HTMLDivElement>(null);
    const wheelRef = React.useRef<HTMLDivElement>(null);

    const cardRefs = React.useRef<(HTMLElement | null)[]>([]);
    const faceRefs = React.useRef<(HTMLElement | null)[]>([]);

    const labelRef = React.useRef<HTMLDivElement>(null);
    const titleRef = React.useRef<HTMLDivElement>(null);

    const turn = React.useRef(0);
    const target = React.useRef(0);

    const drag = React.useRef<number | null>(null);
    const settling = React.useRef<ReturnType<typeof setTimeout> | null>(
        null,
    );

    const [active, setActive] = React.useState(0);

    const [stage, setStage] = React.useState({
        w: 0,
        h: 0,
    });

    const [reduced, setReduced] = React.useState(false);

    const count = projects.length;
    const last = Math.max(count - 1, 0);

    /* --------------------------------
       Reduced motion
    -------------------------------- */

    React.useEffect(() => {
        const query = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        );

        const read = () => setReduced(query.matches);

        read();

        query.addEventListener("change", read);

        return () => query.removeEventListener("change", read);
    }, []);

    /* --------------------------------
       Stage size
    -------------------------------- */

    React.useEffect(() => {
        const element = stageRef.current;

        if (!element) return;

        const read = () => {
            setStage({
                w: element.clientWidth,
                h: element.clientHeight,
            });
        };

        read();

        const observer = new ResizeObserver(read);

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    /* --------------------------------
       Wheel measurements
    -------------------------------- */

    const metrics = React.useMemo(() => {
        const { w, h } = stage;

        const cardW = Math.min(
            h * CARD_H * CARD_RATIO,
            w * CARD_MAX_W,
        );

        const cardH = cardW / CARD_RATIO;

        const drumR = cardH * DRUM;
        const ringR = cardH * RING_R;

        const ringScale = count
            ? clamp(
                (((2 * Math.PI * ringR) / count) * 0.82) /
                (cardW || 1),
                0.16,
                1,
            )
            : 1;

        return {
            cardW,
            cardH,
            ringR,
            ringScale,
            drumR,
            bow: cardH * BOW,
            depth: cardH * LENS,
            title: cardH * TITLE,
            index: cardH * INDEX,
        };
    }, [stage, count]);

    /* --------------------------------
       Animation
    -------------------------------- */

    React.useEffect(() => {
        if (!stage.h || !count) return;

        let frame = 0;

        const {
            ringR,
            ringScale,
            drumR,
            bow,
        } = metrics;

        const draw = () => {
            frame = requestAnimationFrame(draw);

            const gap = target.current - turn.current;

            if (Math.abs(gap) < 0.0005) {
                turn.current = target.current;
            } else {
                turn.current += gap * (reduced ? 1 : EASE);
            }

            const t = turn.current;

            const m = clamp(t, 0, 1);
            const pos = Math.max(0, t - 1);

            /* Move whole wheel into perspective */

            if (wheelRef.current) {
                wheelRef.current.style.transform =
                    `translateZ(${-m * drumR}px)`;
            }

            /* Move every project */

            for (let i = 0; i < count; i++) {
                const d = i - pos;

                const drumDeg = d * STEP;

                const card = cardRefs.current[i];
                const face = faceRefs.current[i];

                if (card) {
                    card.style.transform = place(
                        d * (360 / count),
                        drumDeg,
                        ringR,
                        drumR,
                        bow,
                        m,
                    );

                    card.style.opacity =
                        m > 0.5 && Math.abs(d) > CULL
                            ? "0"
                            : "1";

                    card.style.zIndex = String(
                        Math.round(100 - Math.abs(d) * 2),
                    );
                }

                if (face) {
                    face.style.transform = `scale(${lerp(
                        ringScale,
                        1,
                        m,
                    )})`;
                }
            }

            /* Center label */

            if (labelRef.current) {
                labelRef.current.style.opacity = String(1 - m);
            }

            /* Current project title */

            if (titleRef.current) {
                titleRef.current.style.opacity = String(m);
            }

            const near = clamp(
                Math.round(pos),
                0,
                last,
            );

            setActive((previous) =>
                previous === near ? previous : near,
            );
        };

        frame = requestAnimationFrame(draw);

        return () => cancelAnimationFrame(frame);
    }, [
        metrics,
        stage.h,
        count,
        last,
        reduced,
    ]);

    /* --------------------------------
       Navigation
    -------------------------------- */

    const goTo = React.useCallback(
        (next: number) => {
            target.current = clamp(
                next,
                0,
                last + 1,
            );
        },
        [last],
    );

    /* --------------------------------
       Mouse wheel
    -------------------------------- */

    React.useEffect(() => {
        const element = stageRef.current;

        if (!element) return;

        const onWheel = (event: WheelEvent) => {
            const next =
                target.current +
                event.deltaY / WHEEL_UNITS;

            if (
                next > 0 &&
                next < last + 1
            ) {
                event.preventDefault();
            }

            goTo(next);

            if (settling.current) {
                clearTimeout(settling.current);
            }

            settling.current = setTimeout(() => {
                goTo(Math.round(target.current));
            }, SETTLE);
        };

        element.addEventListener(
            "wheel",
            onWheel,
            { passive: false },
        );

        return () => {
            element.removeEventListener(
                "wheel",
                onWheel,
            );

            if (settling.current) {
                clearTimeout(settling.current);
            }
        };
    }, [goTo, last]);

    /* --------------------------------
       Render
    -------------------------------- */

    return (
        <section
            id="work"
            className="
                border-t
                border-[#deddd8]
                bg-[#f4f3ef]
                pt-0
                pb-20
                lg:pb-28
            "
        >
            <Reveal className="w-full">
                <div
                    ref={stageRef}
                    tabIndex={0}
                    role="listbox"
                    aria-label="projects"
                    aria-activedescendant={`works-wheel-${active}`}
                    className="
                        relative
                        min-h-[42rem]
                        w-full
                        overflow-hidden
                        select-none
                        cursor-grab
                        touch-pan-x
                        outline-none
                        active:cursor-grabbing
                        focus-visible:outline-1
                        focus-visible:outline-[#111111]
                        focus-visible:-outline-offset-4
                    "
                    style={{
                        perspective: `${metrics.depth}px`,
                    }}
                    onPointerDown={(event) => {
                        drag.current =
                            event.clientY;

                        event.currentTarget.setPointerCapture(
                            event.pointerId,
                        );
                    }}
                    onPointerMove={(event) => {
                        if (
                            drag.current === null
                        ) {
                            return;
                        }

                        goTo(
                            target.current +
                            (drag.current -
                                event.clientY) /
                            DRAG_UNITS,
                        );

                        drag.current =
                            event.clientY;
                    }}
                    onPointerUp={() => {
                        drag.current = null;

                        if (
                            target.current > 1
                        ) {
                            goTo(
                                Math.round(
                                    target.current,
                                ),
                            );
                        }
                    }}
                    onKeyDown={(event) => {
                        if (
                            event.key ===
                            "ArrowDown"
                        ) {
                            goTo(
                                Math.round(
                                    target.current,
                                ) + 1,
                            );
                        } else if (
                            event.key ===
                            "ArrowUp"
                        ) {
                            goTo(
                                Math.round(
                                    target.current,
                                ) - 1,
                            );
                        } else {
                            return;
                        }

                        event.preventDefault();
                    }}
                >
                    {/* --------------------------------
                        3D wheel
                    -------------------------------- */}

                    <div
                        ref={wheelRef}
                        className="
                            absolute
                            top-[65%]
                            left-1/2
                            [transform-style:preserve-3d]
                        "
                    >
                        {projects.map(
                            (project, index) => {
                                return (
                                    <a
                                        key={
                                            project.title
                                        }
                                        id={`works-wheel-${index}`}
                                        role="option"
                                        aria-selected={
                                            index ===
                                            active
                                        }
                                        href={
                                            project.href
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                        ref={(node) => {
                                            cardRefs.current[
                                                index
                                            ] = node;
                                        }}
                                        className="
                                            group
                                            absolute
                                            [backface-visibility:hidden]
                                        "
                                        style={{
                                            width:
                                                metrics.cardW,
                                            height:
                                                metrics.cardH,
                                            marginLeft:
                                                -metrics.cardW /
                                                2,
                                            marginTop:
                                                -metrics.cardH /
                                                2,
                                        }}
                                    >
                                        <span
                                            ref={(
                                                node,
                                            ) => {
                                                faceRefs.current[
                                                    index
                                                ] = node;
                                            }}
                                            className="
                                                relative
                                                block
                                                size-full
                                                overflow-hidden
                                                rounded-[3px]
                                                bg-[#e7e5df]
                                                shadow-[0_25px_60px_-25px_rgba(0,0,0,0.35)]
                                            "
                                        >
                                            <video
                                                src={
                                                    project.video
                                                }
                                                muted
                                                loop
                                                autoPlay
                                                playsInline
                                                preload="auto"
                                                className="
                                                    size-full
                                                    object-cover
                                                    transition-transform
                                                    duration-700
                                                    ease-out
                                                    group-hover:scale-[1.035]
                                                "
                                            />

                                            {/* Video overlay */}

                                            <span
                                                className="
                                                    absolute
                                                    inset-0
                                                    bg-gradient-to-t
                                                    from-black/50
                                                    via-transparent
                                                    to-transparent
                                                "
                                            />

                                            {/* Number */}

                                            <span
                                                className="
                                                    absolute
                                                    top-4
                                                    left-4
                                                    font-mono
                                                    text-[9px]
                                                    uppercase
                                                    tracking-[0.18em]
                                                    text-white
                                                "
                                            >
                                                {
                                                    project.index
                                                }
                                            </span>

                                            {/* View */}

                                            <span
                                                className="
                                                    absolute
                                                    right-4
                                                    bottom-4
                                                    flex
                                                    items-center
                                                    gap-2
                                                    rounded-full
                                                    border
                                                    border-white/40
                                                    bg-white/10
                                                    px-3
                                                    py-1.5
                                                    font-mono
                                                    text-[9px]
                                                    uppercase
                                                    tracking-[0.12em]
                                                    text-white
                                                    opacity-0
                                                    translate-y-1
                                                    backdrop-blur-md
                                                    transition-all
                                                    duration-300
                                                    group-hover:translate-y-0
                                                    group-hover:opacity-100
                                                "
                                            >
                                                View

                                                <svg
                                                    viewBox="0 0 12 12"
                                                    className="size-3"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        d="M3 9 9 3M4 3h5v5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        strokeWidth="1.4"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </span>
                                        </span>
                                    </a>
                                );
                            },
                        )}
                    </div>

                    {/* --------------------------------
                        Center label
                    -------------------------------- */}

                    <div
                        ref={labelRef}
                        className="
                            pointer-events-none
                            absolute
                            inset-0
                            grid
                            place-items-center
                            font-display
                            text-center
                            font-bold
                            tracking-[-0.07em]
                        "
                        style={{
                            fontSize:
                                metrics.title,
                        }}
                    >
                        PROJECTS
                        <span className="ml-2 font-normal">
                            / 26
                        </span>
                    </div>

                    {/* --------------------------------
                        Current project
                    -------------------------------- */}

                    <div
                        ref={titleRef}
                        className="
                            pointer-events-none
                            absolute
                            top-1/2
                            left-[5%]
                            max-w-[34%]
                            -translate-y-1/2
                            opacity-0
                        "
                        style={{
                            fontSize:
                                metrics.title,
                        }}
                    >
                        <div
                            className="
                                font-display
                                font-bold
                                leading-none
                                tracking-[-0.07em]
                            "
                        >
                            {
                                projects[
                                    active
                                ]?.title
                            }
                        </div>

                        <div
                            className="
                                mt-4
                                font-mono
                                text-[9px]
                                uppercase
                                tracking-[0.14em]
                                text-[#6b6b68]
                            "
                        >
                            {
                                projects[
                                    active
                                ]?.category
                            }
                        </div>
                    </div>

                    {/* --------------------------------
                        Index
                    -------------------------------- */}

                    <ol
                        className="
                            absolute
                            top-[7%]
                            right-[3%]
                            text-right
                            font-mono
                            uppercase
                            leading-[1.8]
                        "
                        style={{
                            fontSize:
                                metrics.index,
                        }}
                    >
                        {projects.map(
                            (
                                project,
                                index,
                            ) => (
                                <li
                                    key={
                                        project.title
                                    }
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            goTo(
                                                index +
                                                1,
                                            )
                                        }
                                        className={`
                                            cursor-pointer
                                            outline-none
                                            transition-colors
                                            focus-visible:outline-1
                                            focus-visible:outline-[#111111]
                                            ${index ===
                                                active
                                                ? "font-medium text-[#111111]"
                                                : "text-[#8b8a85]"
                                            }
                                        `}
                                    >
                                        {
                                            project.index
                                        }
                                        {" / "}
                                        {
                                            project.title
                                        }
                                    </button>
                                </li>
                            ),
                        )}
                    </ol>

                    {/* --------------------------------
                        Current project information
                    -------------------------------- */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            right-[3%]
                            bottom-[7%]
                            max-w-[300px]
                            text-right
                        "
                    >
                        <div
                            className="
                                mb-2
                                font-mono
                                text-[9px]
                                uppercase
                                tracking-[0.15em]
                                text-[#111111]
                            "
                        >
                            {
                                projects[
                                    active
                                ]?.year
                            }
                        </div>

                        <p
                            className="
                                font-mono
                                text-[9px]
                                uppercase
                                leading-relaxed
                                tracking-[0.1em]
                                text-[#777671]
                            "
                        >
                            {
                                projects[
                                    active
                                ]?.description
                            }
                        </p>
                    </div>

                    {/* --------------------------------
                        Scroll hint
                    -------------------------------- */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            bottom-[7%]
                            left-[3%]
                            font-mono
                            text-[9px]
                            uppercase
                            tracking-[0.15em]
                            text-[#777671]
                        "
                    >
                        ↕ Scroll / Drag
                    </div>
                </div>
            </Reveal>
        </section>
    );
}