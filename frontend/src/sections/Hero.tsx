import { motion } from 'framer-motion';
import { ArrowDown, Mail, ArrowRight } from 'lucide-react';
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from '../components/SocialIcons';
import SectionStroke from '../components/SectionStroke';

const socialLinks = [
  { icon: InstagramIcon, href: 'https://www.instagram.com/oussama.hitte?utm_source=qr&igsh=MTQ1MG92MWU3MzN6NA==', label: 'Instagram' },
  { icon: FacebookIcon, href: 'https://www.facebook.com/ipm.kira', label: 'Facebook' },
  { icon: WhatsAppIcon, href: 'https://wa.me/212659404133', label: 'WhatsApp' },
  { icon: () => <Mail size={20} />, href: 'mailto:oussamahitte6@gmail.com', label: 'Email' },
];

const trustedBy = ['React', 'Node.js', 'TypeScript', 'Tailwind', 'AI APIs'];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pt-14 sm:pt-16 pb-8"
    >
      {/* Aura blasts */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-60 h-60 sm:w-80 sm:h-80 md:w-[500px] md:h-[500px] rounded-full bg-primary/20 blur-[100px] sm:blur-[150px] animate-[aurora-drift_15s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-[400px] md:h-[400px] rounded-full bg-accent/12 blur-[80px] sm:blur-[130px] animate-[aurora-drift-2_18s_ease-in-out_infinite]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 h-52 sm:w-[300px] sm:h-[300px] md:w-[500px] md:h-[500px] rounded-full bg-rose/6 blur-[80px] sm:blur-[120px] animate-[aurora-drift-3_22s_ease-in-out_infinite]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <SectionStroke className="p-5 sm:p-7 md:p-8 lg:p-10" delay={0.2}>
        <div className="flex flex-col-reverse lg:flex-row items-center gap-8 sm:gap-10 lg:gap-16 xl:gap-20">
          {/* Text */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 glass-card rounded-full text-emerald text-xs sm:text-sm font-medium tracking-wide !border-emerald/20">
                <span className="w-2 h-2 bg-emerald rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                Open to new opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading mt-5 sm:mt-6 text-[2rem] sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-bold leading-[1.1] tracking-tight"
            >
              Hi, I'm{' '}
              <span
                className="bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradient-shift_6s_ease_infinite]"
                style={{ filter: 'drop-shadow(0 0 20px rgba(124,58,237,0.4))' }}
              >
                Oussama
              </span>
              <br className="hidden sm:block" />{' '}
              <span
                className="bg-gradient-to-r from-accent via-primary-light to-primary bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradient-shift_6s_ease_infinite_0.5s]"
                style={{ filter: 'drop-shadow(0 0 20px rgba(6,182,212,0.3))' }}
              >
                Hitte
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl font-heading font-semibold text-text-muted"
            >
              Full Stack Developer & Software Engineer
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 sm:mt-5 text-sm sm:text-base md:text-[17px] text-text-secondary max-w-lg mx-auto lg:mx-0 leading-relaxed"
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
              className="mt-5 flex items-center gap-3 flex-wrap justify-center lg:justify-start"
            >
              <span className="text-text-muted text-[11px] sm:text-xs font-semibold uppercase tracking-wider">Core Stack:</span>
              <div className="flex flex-wrap gap-1.5">
                {trustedBy.map((t) => (
                  <span key={t} className="px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold glass-card rounded-full text-text-secondary">
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-7 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="px-7 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-primary to-primary-dark text-white text-sm sm:text-base font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_35px_rgba(124,58,237,0.4)] hover:-translate-y-0.5 text-center inline-flex items-center justify-center gap-2"
              >
                View My Work
                <ArrowRight size={16} />
              </a>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="px-7 py-3.5 sm:px-8 sm:py-4 glass-card !bg-glass text-text-primary text-sm sm:text-base font-semibold rounded-full hover:!border-primary/30 hover:shadow-[0_0_20px_rgba(124,58,237,0.15)] hover:-translate-y-0.5 text-center"
              >
                Get In Touch
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-8 sm:mt-10 flex gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-11 h-11 sm:w-12 sm:h-12 rounded-full glass-card flex items-center justify-center text-text-muted hover:text-primary-light hover:shadow-[0_0_15px_rgba(124,58,237,0.2)] transition-all duration-300"
                >
                  <s.icon />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Profile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex-shrink-0"
          >
            <div className="relative">
              <div className="absolute -inset-4 sm:-inset-6 bg-gradient-to-br from-primary/30 via-accent/15 to-rose/10 rounded-full blur-2xl sm:blur-3xl animate-[aurora-drift_8s_ease-in-out_infinite]" />
              <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-tr from-accent/20 to-primary/25 rounded-full blur-xl sm:blur-2xl animate-[aurora-drift-2_10s_ease-in-out_infinite]" />
              <div className="absolute -inset-3 rounded-full border border-dashed border-primary/15 animate-[spin_30s_linear_infinite]" />
              <div className="absolute -inset-5 rounded-full border border-dashed border-accent/10 animate-[spin_40s_linear_infinite_reverse]" />
              <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-[340px] xl:h-[340px] rounded-full overflow-hidden border border-border-light/20 shadow-[0_0_50px_rgba(124,58,237,0.15)]">
                <img src="/profile_pic.png" alt="Oussama Hitte" className="w-full h-full object-cover" />
              </div>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 px-3 py-1.5 sm:px-4 sm:py-2 glass-card rounded-full shadow-[0_0_15px_rgba(124,58,237,0.1)]"
              >
                <span className="text-[11px] sm:text-xs font-semibold text-text-primary">5+ Years</span>
              </motion.div>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 px-3 py-1.5 sm:px-4 sm:py-2 glass-card rounded-full shadow-[0_0_15px_rgba(6,182,212,0.15)]"
              >
                <span className="text-[11px] sm:text-xs font-semibold text-accent-light">Full Stack</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
        </SectionStroke>
      </div>

      <motion.a
        href="#about"
        onClick={(e) => { e.preventDefault(); document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' }); }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-text-muted hover:text-primary-light transition-colors"
      >
        <span className="text-[11px] font-medium tracking-[0.2em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  );
}
