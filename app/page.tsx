"use client";

import React, { useEffect, useRef, useState } from "react";
import {Dumbbell, Users, Zap} from "lucide-react";
import FitnessHero from "@/app/Hero";
import MobileView from "@/components/MobileView";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Home() {
    const [phoneScreen, setPhoneScreen] = useState(0); // 0..2
    const containerRef = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        // 0 when the top of the section hits 90% of the viewport (almost bottom)
        // 1 when the bottom hits 10% of the viewport (almost top)
        offset: ["start 0.9", "end 0.2"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 80,
        damping: 20,
        mass: 0.2,
    });

    // width in %, between 60% and 100%
    const [featureWidth, setFeatureWidth] = useState(80);
    const lastProgress = useRef(0);
    const hasReachedMax = useRef(false);

    useEffect(() => {
        const MIN = 80;
        const MAX = 100;

        const unsubscribe = smoothProgress.on("change", (value) => {
            if (hasReachedMax.current) return;

            const next = MIN +  (MAX-MIN) * value * 5;

            setFeatureWidth(next);

            // if width is basically max, lock it
            if (next >= MAX - 0.5) {
                hasReachedMax.current = true;
                setFeatureWidth(MAX);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [smoothProgress]);


    return (
        <div className="min-h-screen bg-gradient-hero">
            {/* Hero Section */}
            <FitnessHero/>
            <MobileView images={[
                "/images/screens/SplashScreen.png",
                "/images/screens/WorkoutBuilderScreen.png",
                "/images/screens/StatsScreen.png",
                "/images/screens/ChallengesScreen.png",
            ]}
                        height={"calc(100vh - 4rem)"}/>

            {/* Features Section */}
            <section className="py-24 px-4 bg-background relative overflow-hidden" >
                {/* Ambient background effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

                <motion.div
                    ref={containerRef}
                    className="relative my-1 bg-gradient-to-br from-card via-card to-card/80 dark:from-[hsl(222,47%,15%)] dark:via-[hsl(222,47%,17%)] dark:to-[hsl(222,47%,15%)] text-foreground p-10 md:p-16 rounded-4xl border border-border shadow-2xl backdrop-blur-sm"
                    style={{
                        width: `${featureWidth}%`,
                        margin: "0 auto",
                    }}
                >
                    <div className="text-center mb-16 space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide uppercase mb-4">
                                Features
                            </span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent"
                        >
                            Why Choose AR Workout
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-muted-foreground text-lg max-w-2xl mx-auto"
                        >
                            Experience the next generation of fitness training with cutting-edge AR technology
                        </motion.p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            className="group relative p-8 rounded-2xl bg-gradient-to-br from-card to-card/50 dark:from-[hsl(222,47%,18%)] dark:to-[hsl(222,47%,16%)] border border-border hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative">
                                <motion.div
                                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-lg group-hover:shadow-primary/50 transition-shadow"
                                >
                                    <Dumbbell className="text-white" size={32} />
                                </motion.div>
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">Smart Form Tracking</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Real-time AR overlays analyze your form and provide instant feedback to prevent injuries and maximize results.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            className="group relative p-8 rounded-2xl bg-gradient-to-br from-card to-card/50 dark:from-[hsl(222,47%,18%)] dark:to-[hsl(222,47%,16%)] border border-border hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative">
                                <motion.div
                                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-lg group-hover:shadow-primary/50 transition-shadow"
                                >
                                    <Zap className="text-white" size={32} />
                                </motion.div>
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">Adaptive Workouts</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    AI-powered routines that adapt to your fitness level, goals, and progress in real-time.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            whileHover={{ y: -8, transition: { duration: 0.3 } }}
                            className="group relative p-8 rounded-2xl bg-gradient-to-br from-card to-card/50 dark:from-[hsl(222,47%,18%)] dark:to-[hsl(222,47%,16%)] border border-border hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="relative">
                                <motion.div
                                    whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-lg group-hover:shadow-primary/50 transition-shadow"
                                >
                                    <Users className="text-white" size={32} />
                                </motion.div>
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">Community Driven</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Join thousands of users, compete in challenges, and share your progress with a supportive community.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>
        </div>
    );
}