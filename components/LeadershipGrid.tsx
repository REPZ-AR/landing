"use client";

import { motion } from "framer-motion";
import LeaderCard from "./LeadershipCard";

const leaders = [
    {
        image: "/images/gym1.jpg",
        name: "Michael Rodriguez",
        role: "Founder & CEO",
        bio: "With over 20 years in the fitness industry, Michael founded REPZ to merge technology with training.",
        skills: ["Leadership", "Fitness Strategy", "Community Building"],
    },
    {
        image: "/images/gym2.jpg",
        name: "Sarah Johnson",
        role: "Head of Training",
        bio: "ACSM certified trainer specializing in strength training and performance programs.",
        skills: ["Strength Training", "Coaching", "Program Design"],
    },
    {
        image: "/images/gym3.jpg",
        name: "David Chen",
        role: "Nutrition Director",
        bio: "Registered dietitian focused on sports nutrition and sustainable wellness habits.",
        skills: ["Sports Nutrition", "Meal Planning", "Health Coaching"],
    },
    {
        image: "/images/gym2.jpg",
        name: "Emily Davis",
        role: "Wellness Coordinator",
        bio: "Certified yoga and mindfulness instructor promoting holistic wellness.",
        skills: ["Yoga", "Mindfulness", "Mental Wellness"],
    },
];

export default function LeadershipGrid() {
    return (
        <section className="max-w-6xl mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-16">
                Leadership Team
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {leaders.map((leader, index) => (
                    <motion.div
                        key={index}
                        initial={{
                            opacity: 0,
                            x: index % 2 === 0 ? -120 : 120,
                        }}
                        whileInView={{
                            opacity: 1,
                            x: 0,
                        }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut",
                            delay: index * 0.15,
                        }}
                        viewport={{ once: true }}
                    >
                        <LeaderCard {...leader} />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
