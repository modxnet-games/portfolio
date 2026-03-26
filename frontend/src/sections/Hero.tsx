import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react';
import SectionStroke from '../components/SectionStroke';

const trustedBy = ['React', 'Node.js', 'TypeScript', 'Tailwind', 'AI APIs'];

export default function Hero() {
  const [imgError, setImgError] = useState(false);
  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-20 sm:pt-24 pb-12"
    >
      {/* Subtle aura blasts */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-60 h-60 sm:w-72 sm:h-72 md:w-[420px] md:h-[420px] rounded-full bg-primary/10 blur-[120px] sm:blur-[160px] animate-[aurora-drift_20s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 sm:w-56 sm:h-56 md:w-[320px] md:h-[320px] rounded-full bg-accent/8 blur-[100px] sm:blur-[140px] animate-[aurora-drift-2_22s_ease-in-out_infinite]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <SectionStroke className="p-6 sm:p-8 md:p-10 lg:p-14" delay={0.2}>
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_auto] gap-8 sm:gap-10 lg:gap-20 xl:gap-24 items-center">

          {/* Profile — FIRST on mobile, right col on desktop */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="order-first lg:order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 flex justify-center lg:justify-end lg:self-center"
          >
            <div className="hero-profile-block relative">
              {/* Soft glow behind profile */}
              <div className="absolute -inset-6 sm:-inset-8 bg-gradient-to-br from-primary/15 via-accent/8 to-transparent rounded-full blur-3xl animate-[aurora-drift_12s_ease-in-out_infinite]" />
              
              {/* Profile pic wrapper */}
              <div className="hero-profile-wrapper relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-[280px] xl:h-[280px] flex-shrink-0">
                <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-primary/20 shadow-[0_0_50px_rgba(0,255,204,0.12)] bg-dark-lighter flex items-center justify-center">
                  {imgError ? (
                    <span className="font-heading text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent">OH</span>
                  ) : (
                    <img src="/profile_pic.jpg" alt="Oussama Hitte" className="w-full h-full object-cover" onError={() => setImgError(true)} />
                  )}
                </div>
                {/* Subtle badges */}
                <div className="badge-5years absolute -bottom-2 -right-2 px-3 py-1.5 rounded-full bg-dark-lighter/90 border border-primary/15 backdrop-blur-md shadow-lg">
                  <span className="text-[10px] font-semibold text-primary-light">5+ Years</span>
                </div>
                <div className="absolute -top-2 -left-2 px-3 py-1.5 rounded-full bg-dark-lighter/90 border border-accent/15 backdrop-blur-md shadow-lg">
                  <span className="text-[10px] font-semibold text-accent-light">Full Stack</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text content — SECOND on mobile, left col on desktop */}
          <div className="hero-text-block order-2 lg:order-1 lg:col-start-1 lg:row-start-1 lg:row-span-2 text-center lg:text-left">
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald/20 bg-emerald/5 mb-6 sm:mb-8"
            >
              <span className="w-2 h-2 bg-emerald rounded-full animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
              <span className="text-emerald text-[11px] sm:text-xs font-medium tracking-wide">Available for new projects</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading text-[1.75rem] sm:text-3xl md:text-4xl lg:text-[3.25rem] xl:text-[3.5rem] font-bold leading-[1.12] tracking-tight"
            >
              Hi, I'm{' '}
              <span
                className="bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradient-shift_6s_ease_infinite]"
              >
                Oussama Hitte
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg lg:text-xl font-heading font-medium text-text-muted"
            >
              Full Stack Developer & Software Engineer
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-5 sm:mt-6 text-sm sm:text-[15px] md:text-base lg:text-[17px] text-text-secondary max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              I design and build scalable web applications, AI-powered platforms,
              and mobile solutions that help businesses grow. 5+ years of delivering
              production-ready software.
            </motion.p>

            {/* Tech ribbon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="mt-6 flex items-center gap-2.5 flex-wrap justify-center lg:justify-start"
            >
              <span className="text-text-muted text-[10px] sm:text-[11px] font-medium uppercase tracking-wider">Core Stack</span>
              <div className="flex flex-wrap gap-1.5">
                {trustedBy.map((t) => (
                  <span key={t} className="px-2.5 py-1 text-[10px] sm:text-[11px] font-medium rounded-full bg-white/[0.04] border border-white/[0.06] text-text-muted">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* CTA buttons — improved */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="group relative px-7 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-bold bg-gradient-to-r from-primary via-primary-light to-primary-dark text-[#0a0a0a] rounded-full transition-all duration-400 hover:shadow-[0_4px_35px_rgba(0,255,204,0.35)] hover:-translate-y-1 text-center inline-flex items-center justify-center gap-2 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                  View My Work
                  <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform duration-300" />
                </span>
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="group px-7 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold rounded-full border border-white/12 bg-white/[0.04] text-text-primary hover:border-primary/30 hover:bg-primary/5 hover:text-primary-light hover:-translate-y-0.5 transition-all duration-300 text-center inline-flex items-center justify-center gap-2"
              >
                Get In Touch
                <ArrowRight size={15} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </a>
            </motion.div>
          </div>

        </div>
        </SectionStroke>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        onClick={(e) => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }); }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-text-muted hover:text-primary-light transition-colors"
      >
        <span className="text-[10px] font-medium tracking-[0.2em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={14} />
        </motion.div>
      </motion.a>
    </section>
  );
}
