import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Header = () => {
    const [hidden, setHidden] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    const links = [
        { name: "SURVIVOR", href: "#about" },
        { name: "TERRITORY", href: "#projects" },
        { name: "SIGNAL", href: "#contact" },
    ];

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 inset-x-0 z-50 mix-blend-difference"
        >
            <nav className="container mx-auto px-6 py-8 flex justify-between items-center bg-transparent">
                <a href="#" className="font-brush text-2xl text-ash z-50">
                    REUBX
                </a>

                <ul className="flex gap-8">
                    {links.map((link) => (
                        <li key={link.name}>
                            <a
                                href={link.href}
                                className="font-tech text-sm tracking-[0.2em] text-ash hover:text-ember transition-colors relative group"
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-ember group-hover:w-full transition-all duration-300"></span>
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </motion.header>
    );
};

export default Header;
