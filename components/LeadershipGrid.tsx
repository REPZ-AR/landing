"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";
import LeaderCard, { LeaderCardProps } from "./LeadershipCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface LeadershipGridProps {
    leaders: LeaderCardProps[];
}

export default function LeadershipGrid({ leaders }: LeadershipGridProps) {
    const trackRef = useRef<HTMLDivElement>(null);
    const isPausedRef = useRef(false);
    const animationRef = useRef<number | null>(null);
    const posRef = useRef(0);

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const speed = 0.8; // px per frame

        const animate = () => {
            if (!isPausedRef.current) {
                posRef.current += speed;

                const halfWidth = track.scrollWidth / 2;
                if (posRef.current >= halfWidth) {
                    posRef.current = 0;
                }

                track.style.transform = `translateX(-${posRef.current}px)`;
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationRef.current) cancelAnimationFrame(animationRef.current);
        };
    }, []);

    const loopedLeaders = [...leaders, ...leaders];

    return (
        <section className="max-w-full px-4">
            <h2 className="text-4xl font-bold text-center mb-16">
                Leadership Team
            </h2>

            <div className="relative flex items-center">
                {/* Left Arrow */}
                <button
                    onClick={() => { posRef.current = Math.max(0, posRef.current - 300); }}
                    className="flex-shrink-0 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 text-white transition mr-4"
                >
                    <ChevronLeft size={20} />
                </button>

                {/* Outer clip container */}
                <div className="overflow-hidden flex-1 py-6">
                    {/* Inner moving track */}
                    <div
                        ref={trackRef}
                        onMouseEnter={() => { isPausedRef.current = true; }}
                        onMouseLeave={() => { isPausedRef.current = false; }}
                        className="flex flex-row gap-10 will-change-transform px-6"
                        style={{ width: "max-content" }}
                    >
                        {loopedLeaders.map((leader, index) => (
                            <motion.div
                                key={index}
                                className="flex-none"
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.6,
                                    ease: "easeOut",
                                    delay: (index % leaders.length) * 0.1,
                                }}
                                viewport={{ once: true }}
                            >
                                <LeaderCard {...leader} />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Arrow */}
                <button
                    onClick={() => { posRef.current += 300; }}
                    className="flex-shrink-0 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-700 hover:bg-gray-600 text-white transition ml-4"
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </section>
    );
}