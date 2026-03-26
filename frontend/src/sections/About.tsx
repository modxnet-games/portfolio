import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Server, Smartphone, Brain, Target, Zap } from 'lucide-react';
import SectionStroke from '../components/SectionStroke';

const highlights = [
  {
    icon: Code2,
    title: 'Frontend Engineering',
    description: 'High-performance, accessible interfaces built with React, TypeScript, and modern CSS.',
    gradient: 'from-violet-500/80 to-purple-600/80',
    glow: 'rgba(139, 92, 246, 0.15)',
  },
  {
    icon: Server,
    title: 'Backend Architecture',
    description: 'Scalable server-side solutions with Node.js, REST APIs, databases, and secure auth.',
    gradient: 'from-cyan-500/80 to-blue-600/80',
    glow: 'rgba(6, 182, 212, 0.15)',
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Native Android applications using Java, Kotlin, and modern mobile practices.',
    gradient: 'from-emerald-500/80 to-teal-600/80',
    glow: 'rgba(16, 185, 129, 0.15)',
  },
  {
    icon: Brain,
    title: 'AI Integration',
    description: 'Smart AI-powered features, API orchestration, and intelligent automation.',
    gradient: 'from-amber-500/80 to-orange-600/80',
    glow: 'rgba(245, 158, 11, 0.15)',
  },
];

const stats = [
  { value: '3+', label: 'Projects Delivered', icon: Target },
  { value: '10+', label: 'Technologies', icon: Code2 },
  { value: '5+', label: 'Years Experience', icon: Zap },
  { value: '100%', label: 'Client Dedication', icon: Target },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" className="py-20 sm:py-24 md:py-28 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-14 md:mb-16"
        >
          <span className="font-mono text-[11px] sm:text-xs font-medium text-primary-light/70 tracking-[0.2em] uppercase">
            About Me
          </span>
          <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] font-bold mt-3 mb-4">
            Engineering{' '}
            <span className="bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradient-shift_6s_ease_infinite]">
              Digital Solutions
            </span>
          </h2>
          <p className="text-text-secondary text-sm sm:text-[15px] md:text-base max-w-xl mx-auto leading-relaxed">
            I'm Oussama Hitte — a full stack software engineer specializing in building complete, production-ready applications from concept to deployment.
          </p>
        </motion.div>

        <SectionStroke className="p-6 sm:p-8 md:p-10 lg:p-12">
          {/* Service cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.06 * i }}
                className="group relative p-5 sm:p-6 rounded-xl glass-card overflow-hidden"
              >
                <div className="relative z-10">
                  <div
                    className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4`}
                  >
                    <item.icon className="text-white" size={20} />
                  </div>
                  <h3 className="font-heading text-sm sm:text-[15px] font-semibold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-text-muted text-xs sm:text-[13px] leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-8 sm:mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center p-4 sm:p-5 rounded-xl glass-card group transition-all duration-300">
                <div className="font-heading text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent transition-all">
                  {s.value}
                </div>
                <div className="text-text-muted text-[10px] sm:text-[11px] mt-1.5 font-medium tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </SectionStroke>
      </div>
    </section>
  );
}
