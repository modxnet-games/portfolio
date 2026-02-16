import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ChevronRight, Layers, Monitor, Gamepad2, CheckCircle2, ArrowRight } from 'lucide-react';
import SectionStroke from '../components/SectionStroke';

const projects = [
  {
    id: 1,
    title: 'Klingmotionai',
    subtitle: 'AI-Powered Video Generation Platform',
    description:
      'Engineered a production-ready AI video generation platform that enables users to create synchronized character animations. Built with a scalable full-stack architecture handling file uploads, real-time processing, and secure authentication.',
    impact: 'End-to-end AI product with secure auth, multi-model support, and production-grade UX.',
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'Tailwind CSS', 'Vite', 'Google OAuth'],
    category: 'Full Stack',
    icon: Layers,
    features: [
      'Secure Google OAuth 2.0 authentication flow',
      'Multi-model AI video generation pipeline',
      'Chunked file uploads with real-time progress',
      'Configurable quality output (720p / 1080p)',
      'Motion precision controls (Exact / Partial)',
      'Fully responsive UI with smooth animations',
    ],
    gradient: 'from-violet-500 to-purple-600',
    glow: 'rgba(139,92,246,0.25)',
    accentColor: '#8b5cf6',
  },
  {
    id: 2,
    title: 'ModXnet.com',
    subtitle: 'Full-Scale Gaming Distribution Platform',
    description:
      'Designed and developed a comprehensive gaming distribution platform serving a complete content management ecosystem. Features include user authentication, game catalogs with advanced filtering, community engagement tools, and a full admin dashboard.',
    impact: 'Complete platform with admin panel, user system, and content management for scale.',
    tags: ['Node.js', 'Express', 'SQLite', 'HTML/CSS/JS', 'Passport.js', 'Nodemailer'],
    category: 'Web Platform',
    icon: Monitor,
    features: [
      'Dual authentication (Email + Google OAuth)',
      'Searchable game catalog with filters & sorting',
      'Community reviews and rating system',
      'Full admin panel for content management',
      'Customizable user profiles with avatars',
      'Automated newsletter and email system',
    ],
    gradient: 'from-cyan-500 to-blue-600',
    glow: 'rgba(6,182,212,0.25)',
    accentColor: '#06b6d4',
  },
  {
    id: 3,
    title: 'Streaming App',
    subtitle: 'Cross-Platform Game Streaming Client',
    description:
      'Developed a high-performance Android client for PC game streaming with sub-frame latency. Features native hardware decoding, on-screen virtual controllers, and seamless network device discovery for a console-like experience on mobile.',
    impact: 'Low-latency native performance with hardware decoding and intuitive controller UI.',
    tags: ['Java', 'Kotlin', 'Android SDK', 'C/C++ (NDK)', 'Gradle', 'JNI'],
    category: 'Mobile App',
    icon: Gamepad2,
    features: [
      'Hardware-accelerated video decoding pipeline',
      'Responsive virtual on-screen controller',
      'Full physical controller mapping support',
      'Automatic network discovery via mDNS',
      'Optimized for sub-frame streaming latency',
      'Localized in multiple languages',
    ],
    gradient: 'from-emerald-500 to-teal-600',
    glow: 'rgba(16,185,129,0.25)',
    accentColor: '#10b981',
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section id="projects" className="py-16 sm:py-20 md:py-24 lg:py-28 relative">
      <div className="section-divider" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-primary/6 rounded-full blur-[120px] sm:blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14 md:mb-16"
        >
          <span className="font-mono text-xs sm:text-sm font-medium text-primary-light tracking-[0.2em] uppercase drop-shadow-[0_0_8px_rgba(124,58,237,0.4)]">
            Portfolio
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold mt-3 mb-4 sm:mb-5">
            Featured{' '}
            <span className="bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradient-shift_6s_ease_infinite]">
              Projects
            </span>
          </h2>
          <p className="text-text-secondary text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Production-grade applications built with modern architectures, clean code practices, and a focus on performance, scalability, and user experience.
          </p>
        </motion.div>

        <SectionStroke className="p-4 sm:p-6 md:p-8 lg:p-10" delay={0.15}>
          <div className="space-y-5 sm:space-y-6 md:space-y-8">
            {projects.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.12 * i }}
                className="group relative rounded-2xl glass-card aura-border overflow-hidden"
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${p.accentColor}, transparent)` }}
                />
                {/* Corner glow */}
                <div
                  className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl pointer-events-none"
                  style={{ background: p.glow }}
                />

                <div className="relative p-5 sm:p-7 md:p-8 lg:p-10">
                  <div className="flex items-start gap-4 sm:gap-5 mb-5 sm:mb-6">
                    <div
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${p.gradient} flex items-center justify-center flex-shrink-0`}
                      style={{ boxShadow: `0 0 24px ${p.glow}` }}
                    >
                      <p.icon className="text-white" size={24} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5 flex-wrap mb-1">
                        <h3 className="font-heading text-xl sm:text-2xl md:text-[1.7rem] font-bold text-text-primary leading-tight">{p.title}</h3>
                        <span
                          className="px-3 py-1 text-[10px] sm:text-[11px] font-semibold rounded-full uppercase tracking-wider"
                          style={{ background: `${p.accentColor}15`, color: p.accentColor }}
                        >
                          {p.category}
                        </span>
                      </div>
                      <p className="text-text-secondary text-sm sm:text-base font-medium">{p.subtitle}</p>
                    </div>
                    <span className="hidden lg:block font-heading text-6xl xl:text-7xl font-black leading-none select-none opacity-[0.04] group-hover:opacity-[0.08] transition-opacity">
                      {String(p.id).padStart(2, '0')}
                    </span>
                  </div>

                  <p className="text-text-secondary text-sm sm:text-[15px] md:text-base leading-relaxed mb-5 sm:mb-6 max-w-3xl">
                    {p.description}
                  </p>

                  <div className="flex items-start gap-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl mb-5 sm:mb-6"
                    style={{ background: `${p.accentColor}08`, border: `1px solid ${p.accentColor}15` }}
                  >
                    <CheckCircle2 size={18} className="flex-shrink-0 mt-0.5" style={{ color: p.accentColor }} />
                    <p className="text-text-secondary text-xs sm:text-sm leading-relaxed">
                      <span className="font-semibold text-text-primary">Key Result: </span>
                      {p.impact}
                    </p>
                  </div>

                  <div className="mb-5 sm:mb-6">
                    <p className="text-text-muted text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold mb-2.5">Tech Stack</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {p.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1.5 text-[10px] sm:text-xs font-medium glass-card text-text-secondary rounded-lg sm:rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-5 sm:mb-6">
                    <button
                      onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
                      className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold transition-colors py-1"
                      style={{ color: p.accentColor }}
                    >
                      <ChevronRight size={16} className={`transition-transform duration-200 ${expandedId === p.id ? 'rotate-90' : ''}`} />
                      {expandedId === p.id ? 'Hide' : 'View'} Key Features
                    </button>

                    {expandedId === p.id && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mt-4 pl-1"
                      >
                        {p.features.map((f) => (
                          <li key={f} className="flex items-start gap-2.5 text-xs sm:text-sm text-text-secondary leading-relaxed">
                            <div className="w-1.5 h-1.5 mt-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.accentColor, boxShadow: `0 0 6px ${p.accentColor}80` }} />
                            {f}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a
                      href="#contact"
                      onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-white text-xs sm:text-sm font-semibold rounded-full transition-all duration-300"
                      style={{ background: `linear-gradient(135deg, ${p.accentColor}, ${p.accentColor}cc)`, boxShadow: `0 0 0 rgba(0,0,0,0)` }}
                      onMouseEnter={(e) => (e.currentTarget.style.boxShadow = `0 0 25px ${p.accentColor}40`)}
                      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = `0 0 0 rgba(0,0,0,0)`)}
                    >
                      <ExternalLink size={15} />
                      View Live
                      <ArrowRight size={14} />
                    </a>
                    <a
                      href="#contact"
                      onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 glass-card text-text-secondary hover:text-text-primary text-xs sm:text-sm font-semibold rounded-full hover:!border-primary/30 transition-all duration-300"
                    >
                      <Github size={15} />
                      Source Code
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </SectionStroke>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-10 sm:mt-14"
        >
          <p className="text-text-muted text-sm sm:text-base mb-4">
            Interested in seeing more or discussing a custom project?
          </p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-primary to-primary-dark text-white text-sm sm:text-base font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_35px_rgba(124,58,237,0.4)] hover:-translate-y-0.5"
          >
            Let's Discuss Your Project
            <ArrowRight size={16} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
