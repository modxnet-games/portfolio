import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, ChevronRight, Monitor, Gamepad2, ShoppingCart, ArrowRight } from 'lucide-react';
import SectionStroke from '../components/SectionStroke';

const projects = [
  {
    id: 1,
    title: 'Madilik.ma',
    subtitle: 'Modern E-Commerce Store & Admin Platform',
    description:
      'A full-stack e-commerce platform featuring a customized storefront, robust shopping cart, and a comprehensive admin dashboard with image uploads, secure order management, and email notifications.',
    tags: ['Next.js', 'React', 'Prisma', 'Tailwind CSS', 'Zustand', 'Node.js'],
    category: 'Full Stack',
    icon: ShoppingCart,
    liveUrl: 'https://madilik.ma',
    githubUrl: '',
    features: [
      'High-performance Next.js Server Components',
      'Secure authentication with Iron Session',
      'Database modeling and management via Prisma',
      'Custom shipping label & order invoice generation',
      'Newsletter subscription and email collection',
      'Automated language detection logic',
    ],
    gradient: 'from-violet-500/80 to-purple-600/80',
    accentColor: '#8b5cf6',
  },
  {
    id: 2,
    title: 'ModXnet.com',
    subtitle: 'Full-Scale Gaming Distribution Platform',
    description:
      'A comprehensive gaming distribution platform with user authentication, game catalogs with advanced filtering, community engagement tools, and a full admin dashboard for content management.',
    tags: ['Node.js', 'Express', 'SQLite', 'HTML/CSS/JS', 'Passport.js', 'Nodemailer'],
    category: 'Web Platform',
    icon: Monitor,
    liveUrl: 'https://modxnet.com',
    githubUrl: '',
    features: [
      'Dual authentication (Email + Google OAuth)',
      'Searchable game catalog with filters & sorting',
      'Community reviews and rating system',
      'Full admin panel for content management',
      'Customizable user profiles with avatars',
      'Automated newsletter and email system',
    ],
    gradient: 'from-cyan-500/80 to-blue-600/80',
    accentColor: '#06b6d4',
  },
  {
    id: 3,
    title: 'Streaming App',
    subtitle: 'Cross-Platform Game Streaming Client',
    description:
      'A high-performance Android client for PC game streaming with sub-frame latency, native hardware decoding, on-screen virtual controllers, and seamless network device discovery.',
    tags: ['Java', 'Kotlin', 'Android SDK', 'C/C++ (NDK)', 'Gradle', 'JNI'],
    category: 'Mobile App',
    icon: Gamepad2,
    liveUrl: '',
    githubUrl: '',
    features: [
      'Hardware-accelerated video decoding pipeline',
      'Responsive virtual on-screen controller',
      'Full physical controller mapping support',
      'Automatic network discovery via mDNS',
      'Optimized for sub-frame streaming latency',
      'Localized in multiple languages',
    ],
    gradient: 'from-emerald-500/80 to-teal-600/80',
    accentColor: '#10b981',
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [expandedId, setExpandedId] = useState<number | null>(null);

  return (
    <section id="projects" className="py-20 sm:py-24 md:py-28 lg:py-32 relative">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-primary/4 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-14 md:mb-16"
        >
          <span className="font-mono text-[11px] sm:text-xs font-medium text-primary-light/70 tracking-[0.2em] uppercase">
            Portfolio
          </span>
          <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] font-bold mt-3 mb-4">
            Featured{' '}
            <span className="bg-gradient-to-r from-primary via-primary-light to-accent bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradient-shift_6s_ease_infinite]">
              Projects
            </span>
          </h2>
          <p className="text-text-secondary text-sm sm:text-[15px] md:text-base max-w-lg mx-auto leading-relaxed">
            Production-grade applications built with modern architectures and a focus on performance and user experience.
          </p>
        </motion.div>

        <SectionStroke className="p-4 sm:p-6 md:p-8 lg:p-10" delay={0.15}>
          <div className="projects-grid flex flex-col gap-4 sm:gap-5">
            {projects.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="group relative rounded-xl glass-card overflow-hidden"
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-0 right-0 h-px opacity-40 group-hover:opacity-70 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${p.accentColor}80, transparent)` }}
                />

                <div className="relative p-5 sm:p-6 md:p-8">
                  {/* Header */}
                  <div className="flex items-start gap-3.5 sm:gap-4 mb-4">
                    <div
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br ${p.gradient} flex items-center justify-center flex-shrink-0`}
                    >
                      <p.icon className="text-white" size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <h3 className="font-heading text-lg sm:text-xl md:text-[1.4rem] font-bold text-text-primary leading-tight">{p.title}</h3>
                        <span
                          className="px-2.5 py-0.5 text-[9px] sm:text-[10px] font-semibold rounded-full uppercase tracking-wider"
                          style={{ background: `${p.accentColor}12`, color: p.accentColor }}
                        >
                          {p.category}
                        </span>
                      </div>
                      <p className="text-text-muted text-xs sm:text-[13px] font-medium">{p.subtitle}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-text-secondary text-xs sm:text-[13px] md:text-sm leading-relaxed mb-4 max-w-2xl">
                    {p.description}
                  </p>

                  {/* Tags */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-1 text-[10px] sm:text-[11px] font-medium bg-white/[0.03] border border-white/[0.06] text-text-muted rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Expandable features */}
                  <div className="mb-4">
                    <button
                      onClick={() => setExpandedId(expandedId === p.id ? null : p.id)}
                      className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold transition-colors py-1"
                      style={{ color: p.accentColor }}
                    >
                      <ChevronRight size={14} className={`transition-transform duration-200 ${expandedId === p.id ? 'rotate-90' : ''}`} />
                      {expandedId === p.id ? 'Hide' : 'View'} Key Features
                    </button>

                    {expandedId === p.id && (
                      <motion.ul
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3 pl-1"
                      >
                        {p.features.map((f) => (
                          <li key={f} className="flex items-start gap-2 text-[11px] sm:text-xs text-text-muted leading-relaxed">
                            <div className="w-1 h-1 mt-1.5 rounded-full flex-shrink-0 opacity-60" style={{ backgroundColor: p.accentColor }} />
                            {f}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-2.5">
                    {p.liveUrl ? (
                      <a
                        href={p.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 px-5 py-2.5 sm:px-6 sm:py-3 text-[11px] sm:text-xs font-bold text-white rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                        style={{ background: `linear-gradient(135deg, ${p.accentColor}, ${p.accentColor}cc)` }}
                      >
                        <ExternalLink size={13} className="group-hover:rotate-12 transition-transform duration-300" />
                        View Live
                        <ArrowRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                      </a>
                    ) : (
                      <a
                        href="#contact"
                        onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                        className="group inline-flex items-center gap-1.5 px-5 py-2.5 sm:px-6 sm:py-3 text-[11px] sm:text-xs font-bold text-white rounded-full transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                        style={{ background: `linear-gradient(135deg, ${p.accentColor}, ${p.accentColor}cc)` }}
                      >
                        <ExternalLink size={13} />
                        Request Demo
                      </a>
                    )}
                    <a
                      href="#contact"
                      onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                      className="group inline-flex items-center gap-1.5 px-5 py-2.5 sm:px-6 sm:py-3 text-[11px] sm:text-xs font-semibold rounded-full border border-white/10 bg-white/[0.03] text-text-muted hover:text-text-secondary hover:border-white/16 hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <Github size={13} />
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
          className="text-center mt-12 sm:mt-14"
        >
          <p className="text-text-muted text-xs sm:text-sm mb-4">
            Interested in seeing more or discussing a custom project?
          </p>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="inline-flex items-center gap-2 px-7 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-primary to-primary-dark text-[#0f0f0f] text-sm sm:text-base font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,204,0.3)] hover:-translate-y-0.5"
          >
            Let's Discuss Your Project
            <ArrowRight size={15} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
