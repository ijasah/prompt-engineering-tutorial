// src/components/AuthorCredit.tsx
"use client";

import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { AuthorProfileCard } from './AuthorProfileCard';

interface AuthorCreditProps {
    show: boolean;
}

export const AuthorCredit = ({ show }: AuthorCreditProps) => {
    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="hidden lg:block mt-8"
                >
                    <motion.div
                        className="group relative flex items-center gap-3"
                        whileHover="hover"
                    >
                        <a
                            href="https://www.linkedin.com/in/ijas-ah/?originalSubdomain=in"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Image
                                src="https://media.licdn.com/dms/image/v2/D5603AQFL8j5rGlEe6Q/profile-displayphoto-shrink_800_800/B56ZQW9G2dGQAc-/0/1735551905650?e=1756339200&v=beta&t=E4AWEF93tBYZkh3E3TmomcY9tFXxQVHBMa3mhrxySGs"
                                alt="IJAS A H"
                                width={28}
                                height={28}
                                className="rounded-full"
                            />
                            <span>Author IJAS A H</span>
                        </a>

                        <motion.div
                            className="absolute bottom-full left-0 mb-2 w-max"
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            variants={{
                                hover: { opacity: 1, y: 0, scale: 1 },
                            }}
                            transition={{ duration: 0.2, ease: 'easeOut' }}
                        >
                           <AuthorProfileCard />
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
