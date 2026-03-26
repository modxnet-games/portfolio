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
    <section id="skills" className="py-20 sm:py-24 md:py-28 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-14 md:mb-16"
        >
          <span className="font-mono text-[11px] sm:text-xs font-medium text-primary-light/70 tracking-[0.2em] uppercase">
            Skills
          </span>
          <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] font-bold mt-3 mb-4">
            Technologies &{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-primary-light bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradient-shift_6s_ease_infinite]">
              Expertise
            </span>
          </h2>
          <p className="text-text-secondary text-sm sm:text-[15px] md:text-base max-w-md mx-auto leading-relaxed">
            A toolkit built through real project experience across web, mobile, and AI.
          </p>
        </motion.div>

        <SectionStroke className="p-6 sm:p-8 md:p-10 lg:p-12" delay={0.15}>
          {/* Scrolling tech logos */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-8 sm:mb-10 overflow-hidden relative"
          >
            <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-r from-[#121212] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-16 bg-gradient-to-l from-[#121212] to-transparent z-10 pointer-events-none" />
            <div className="flex gap-3 animate-[scroll-left_30s_linear_infinite] w-max">
              {[...techStack, ...techStack].map((t, i) => (
                <div
                  key={`${t.name}-${i}`}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/[0.03] border border-white/[0.05] whitespace-nowrap transition-colors hover:border-white/10"
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: t.color, boxShadow: `0 0 6px ${t.color}40` }}
                  />
                  <span className="text-xs sm:text-[13px] font-medium text-text-muted">{t.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {categories.map((cat, ci) => {
              const items = skills.filter((s) => s.category === cat);
              if (!items.length) return null;
              return (
                <motion.div
                  key={cat}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.06 * ci }}
                  className="p-5 sm:p-6 rounded-xl glass-card"
                >
                  <h3 className="font-heading text-xs sm:text-sm font-semibold text-text-primary mb-3.5 flex items-center gap-2 uppercase tracking-wider">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-light/60" />
                    {cat}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill) => (
                      <div key={skill.name} className="px-3 py-1.5 rounded-lg border border-white/[0.05] bg-white/[0.02] text-[11px] sm:text-xs font-medium text-text-muted hover:text-text-secondary hover:border-white/10 transition-colors cursor-default">
                        {skill.name}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </SectionStroke>
      </div>
    </section>
  );
}
