import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Server, Smartphone, Brain, Target, Zap } from 'lucide-react';
import SectionStroke from '../components/SectionStroke';

const highlights = [
  {
    icon: Code2,
    title: 'Frontend Engineering',
    description: 'High-performance, accessible interfaces built with React, TypeScript, and modern CSS frameworks.',
    gradient: 'from-violet-500 to-purple-600',
    glow: 'rgba(0,255,204,0.3)',
  },
  {
    icon: Server,
    title: 'Backend Architecture',
    description: 'Scalable server-side solutions with Node.js, REST APIs, databases, and secure authentication systems.',
    gradient: 'from-cyan-500 to-blue-600',
    glow: 'rgba(6,182,212,0.3)',
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    description: 'Native Android applications using Java, Kotlin, and modern mobile development practices.',
    gradient: 'from-emerald-500 to-teal-600',
    glow: 'rgba(16,185,129,0.3)',
  },
  {
    icon: Brain,
    title: 'AI Integration',
    description: 'Smart AI-powered features, third-party API orchestration, and intelligent automation solutions.',
    gradient: 'from-amber-500 to-orange-600',
    glow: 'rgba(245,158,11,0.3)',
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
    <section id="about" className="py-16 sm:py-20 md:py-24 lg:py-28 relative">
      <div className="section-divider" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14 md:mb-16"
        >
          <span className="font-mono text-xs sm:text-sm lg:text-[15px] font-medium text-primary-light tracking-[0.2em] uppercase drop-shadow-[0_0_8px_rgba(0,255,204,0.4)]">
            About Me
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] xl:text-[3rem] font-bold mt-3 mb-4 sm:mb-5">
            Engineering{' '}
            <span className="bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradient-shift_6s_ease_infinite]">
              Digital Solutions
            </span>
          </h2>
          <p className="text-text-secondary text-sm sm:text-base md:text-lg lg:text-[17px] xl:text-lg max-w-2xl mx-auto leading-relaxed">
            I'm Oussama Hitte — a full stack software engineer specializing in building complete, production-ready applications. From concept to deployment, I deliver solutions that combine clean architecture with exceptional user experience.
          </p>
        </motion.div>

        <SectionStroke className="p-5 sm:p-7 md:p-8 lg:p-10">
          {/* Service cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.08 * i }}
                className="group relative p-5 sm:p-6 md:p-7 rounded-2xl glass-card aura-border overflow-hidden"
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${item.glow}, transparent 70%)` }}
                />
                <div className="relative z-10">
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 sm:mb-5`}
                    style={{ boxShadow: `0 0 24px ${item.glow}` }}
                  >
                    <item.icon className="text-white" size={24} />
                  </div>
                  <h3 className="font-heading text-base sm:text-lg lg:text-xl font-bold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-text-muted text-xs sm:text-sm lg:text-[15px] xl:text-base leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-8 sm:mt-10 md:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center p-4 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl glass-card group hover:shadow-[0_0_25px_rgba(0,255,204,0.1)] transition-all duration-300">
                <div className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent group-hover:drop-shadow-[0_0_12px_rgba(0,255,204,0.5)] transition-all">
                  {s.value}
                </div>
                <div className="text-text-muted text-[11px] sm:text-xs md:text-sm lg:text-[15px] xl:text-base mt-1 sm:mt-1.5 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </SectionStroke>
      </div>
    </section>
  );
}
