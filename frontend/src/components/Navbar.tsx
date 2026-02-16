import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark/60 backdrop-blur-2xl border-b border-border shadow-[0_4px_30px_rgba(124,58,237,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3-column grid: Logo | Centered Links | CTA */}
        <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] items-center h-[72px]">
          {/* Left: Logo */}
          <div className="flex items-center">
            <motion.a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleClick('#home'); }}
              className="font-heading text-2xl font-bold tracking-tight"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(124,58,237,0.5)]">O</span>
              <span className="text-text-primary">H</span>
              <span className="bg-gradient-to-r from-accent to-primary-light bg-clip-text text-transparent">.</span>
            </motion.a>
          </div>

          {/* Center: Navigation links in a pill */}
          <div
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-full"
            style={{
              background: 'rgba(10, 10, 30, 0.45)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(120, 80, 255, 0.08)',
              boxShadow: '0 0 20px rgba(124,58,237,0.04), inset 0 1px 0 rgba(255,255,255,0.02)',
            }}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                  className={`relative px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? 'text-text-primary'
                      : 'text-text-muted hover:text-text-secondary'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full -z-10"
                      style={{
                        background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(6,182,212,0.08))',
                        border: '1px solid rgba(124,58,237,0.2)',
                        boxShadow: '0 0 12px rgba(124,58,237,0.1), inset 0 1px 0 rgba(255,255,255,0.04)',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right: CTA Button */}
          <div className="flex items-center justify-end">
            <motion.a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleClick('#contact'); }}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="px-6 py-2.5 text-white text-sm font-semibold rounded-full flex items-center gap-2 transition-shadow duration-300"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
                boxShadow: '0 0 20px rgba(124,58,237,0.25), 0 4px 12px rgba(124,58,237,0.2)',
              }}
            >
              Hire Me
              <ArrowUpRight size={15} />
            </motion.a>
          </div>
        </div>

        {/* Mobile header row */}
        <div className="flex md:hidden items-center justify-between h-16">
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); handleClick('#home'); }}
            className="font-heading text-xl font-bold tracking-tight"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(124,58,237,0.5)]">O</span>
            <span className="text-text-primary">H</span>
            <span className="bg-gradient-to-r from-accent to-primary-light bg-clip-text text-transparent">.</span>
          </motion.a>

          <button
            className="w-11 h-11 flex items-center justify-center rounded-xl text-text-secondary hover:text-text-primary hover:bg-glass transition-colors -mr-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 top-16 bg-dark/90 backdrop-blur-3xl z-40"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex flex-col items-center justify-center h-full gap-3 px-6 pb-24"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i }}
                  className={`text-2xl sm:text-3xl font-heading font-semibold py-3 px-4 transition-colors ${
                    activeSection === link.href.slice(1) ? 'text-primary-light drop-shadow-[0_0_10px_rgba(124,58,237,0.5)]' : 'text-text-secondary'
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleClick('#contact'); }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-6 px-10 py-4 bg-gradient-to-r from-primary to-primary-dark text-white text-lg font-semibold rounded-full shadow-[0_0_30px_rgba(124,58,237,0.3)]"
              >
                Hire Me
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
