"use client";

import { motion, AnimatePresence } from "framer-motion";

// Variantes de animación más profesionales
const pageVariants = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.98,
        filter: "blur(4px)",
    },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
    },
    exit: {
        opacity: 0,
        y: -20,
        scale: 0.98,
        filter: "blur(4px)",
    },
};

// Transición con curvas de easing personalizadas
const pageTransition = {
    type: "spring" as const,
    stiffness: 260,
    damping: 20,
    mass: 0.8,
};

export default function Template({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
            style={{
                width: "100%",
                height: "100%",
                willChange: "opacity, transform, filter",
            }}
        >
            {children}
        </motion.div>
    );
}
