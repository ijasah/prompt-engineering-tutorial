// src/components/AuthorCredit.tsx
"use client";

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AuthorCreditProps {
    show: boolean;
}

export const AuthorCredit = ({ show }: AuthorCreditProps) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <AnimatePresence>
            {show && (
                <motion.a
                    href="https://www.linkedin.com/in/ijas-ah/?originalSubdomain=in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden lg:flex fixed bottom-8 left-8 items-center z-50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <motion.div
                        layout
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-muted text-muted-foreground transition-colors duration-300"
                    >
                        <span className="font-bold">IA</span>
                    </motion.div>
                    <motion.div
                        style={{ width: isHovered ? 'auto' : 0, whiteSpace: 'nowrap' }}
                        className="overflow-hidden transition-all duration-300"
                    >
                         <span className="ml-3 font-medium text-muted-foreground">
                            Created by IJAS A H
                        </span>
                    </motion.div>
                </motion.a>
            )}
        </AnimatePresence>
    );
};
