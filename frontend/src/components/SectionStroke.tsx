import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface SectionStrokeProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function SectionStroke({ children, className = '', delay = 0.1 }: SectionStrokeProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`section-stroke ${className}`}
    >
      {/* Animated corner accent dots */}
      <span className="corner-accent corner-tl" />
      <span className="corner-accent corner-tr" />
      <span className="corner-accent corner-bl" />
      <span className="corner-accent corner-br" />

      {/* Top & bottom edge glow lines */}
      <span className="edge-glow-top" />
      <span className="edge-glow-bottom" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
