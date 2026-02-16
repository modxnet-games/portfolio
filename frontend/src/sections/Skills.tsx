import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionStroke from '../components/SectionStroke';

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skills: Skill[] = [
  { name: 'React / Next.js', level: 90, category: 'Frontend' },
  { name: 'TypeScript', level: 85, category: 'Frontend' },
  { name: 'Tailwind CSS', level: 92, category: 'Frontend' },
  { name: 'HTML5 / CSS3', level: 95, category: 'Frontend' },
  { name: 'JavaScript (ES6+)', level: 92, category: 'Frontend' },
  { name: 'Node.js / Express', level: 88, category: 'Backend' },
  { name: 'SQLite / Databases', level: 80, category: 'Backend' },
  { name: 'REST APIs', level: 88, category: 'Backend' },
  { name: 'Authentication (OAuth)', level: 85, category: 'Backend' },
  { name: 'Java / Kotlin', level: 75, category: 'Mobile' },
  { name: 'Android SDK', level: 78, category: 'Mobile' },
  { name: 'Git / GitHub', level: 88, category: 'Tools' },
  { name: 'Docker', level: 70, category: 'Tools' },
  { name: 'Vite / Webpack', level: 82, category: 'Tools' },
  { name: 'AI API Integration', level: 85, category: 'AI' },
];

const techStack = [
  { name: 'React', color: '#61DAFB' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'Node.js', color: '#339933' },
  { name: 'Express', color: '#a78bfa' },
  { name: 'Tailwind', color: '#06B6D4' },
  { name: 'Vite', color: '#646CFF' },
  { name: 'SQLite', color: '#5294E2' },
  { name: 'Java', color: '#ED8B00' },
  { name: 'Android', color: '#3DDC84' },
  { name: 'Git', color: '#F05032' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'Python', color: '#3776AB' },
];

const categories = ['Frontend', 'Backend', 'Mobile', 'Tools', 'AI'];

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="skills" className="py-16 sm:py-20 md:py-24 lg:py-28 relative">
      <div className="section-divider" />

      <div className="absolute top-1/3 -left-40 w-60 sm:w-80 h-60 sm:h-80 bg-accent/8 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-60 sm:w-80 h-60 sm:h-80 bg-primary/8 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-12 md:mb-14"
        >
          <span className="font-mono text-xs sm:text-sm font-medium text-primary-light tracking-[0.2em] uppercase drop-shadow-[0_0_8px_rgba(124,58,237,0.4)]">
            Skills
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold mt-3 mb-4">
            Technologies &{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-primary-light bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradient-shift_6s_ease_infinite]">
              Expertise
            </span>
          </h2>
          <p className="text-text-secondary text-sm sm:text-base md:text-lg max-w-xl mx-auto">
            A toolkit built through real project experience across web, mobile, and AI.
          </p>
        </motion.div>

        <SectionStroke className="p-5 sm:p-7 md:p-8 lg:p-10" delay={0.15}>
          {/* Scrolling tech logos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-8 sm:mb-10 md:mb-12 overflow-hidden relative"
          >
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none" />
            <div className="flex gap-3 sm:gap-4 animate-[scroll-left_25s_linear_infinite] w-max">
              {[...techStack, ...techStack].map((t, i) => (
                <div
                  key={`${t.name}-${i}`}
                  className="flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 glass-card rounded-full whitespace-nowrap hover:shadow-[0_0_15px_rgba(124,58,237,0.12)] transition-shadow"
                >
                  <div
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: t.color, boxShadow: `0 0 8px ${t.color}50` }}
                  />
                  <span className="text-xs sm:text-sm font-medium text-text-secondary">{t.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {categories.map((cat, ci) => {
              const items = skills.filter((s) => s.category === cat);
              if (!items.length) return null;
              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 24 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.08 * ci }}
                  className="p-5 sm:p-6 rounded-2xl glass-card aura-border"
                >
                  <h3 className="font-heading text-sm sm:text-base font-semibold text-text-primary mb-4 sm:mb-5 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary-light shadow-[0_0_6px_rgba(167,139,250,0.6)]" />
                    {cat}
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    {items.map((skill, si) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-1.5">
                          <span className="text-xs sm:text-sm font-medium text-text-secondary">{skill.name}</span>
                          <span className="text-[11px] sm:text-xs font-mono text-text-muted">{skill.level}%</span>
                        </div>
                        <div className="h-2 sm:h-2.5 bg-surface rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : {}}
                            transition={{ duration: 0.8, delay: 0.3 + si * 0.06, ease: 'easeOut' }}
                            className="h-full rounded-full bg-gradient-to-r from-primary via-primary-light to-accent"
                            style={{ boxShadow: '0 0 8px rgba(124,58,237,0.4)' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </SectionStroke>
      </div>

      <div className="section-divider mt-16 sm:mt-20 md:mt-24 lg:mt-28" />
    </section>
  );
}
