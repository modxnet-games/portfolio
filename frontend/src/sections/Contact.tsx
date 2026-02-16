import { motion, useInView } from 'framer-motion';
import { useRef, useState, type FormEvent } from 'react';
import {
  Send, Mail, MapPin, Clock, CheckCircle, AlertCircle, Loader2,
  Briefcase, MessageSquare, Shield, ArrowRight,
} from 'lucide-react';
import { WhatsAppIcon } from '../components/SocialIcons';
import SectionStroke from '../components/SectionStroke';

const API_URL = '/api/contact';

const workHighlights = [
  { icon: Briefcase, text: '5+ years of professional experience' },
  { icon: Shield, text: 'Clean code & secure architecture' },
  { icon: MessageSquare, text: '1 hour response time guaranteed' },
];

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong.');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const contactChannels: { iconNode: React.ReactNode; label: string; value: string; href: string; description: string }[] = [
    {
      iconNode: <Mail className="text-primary-light" size={18} />,
      label: 'Email',
      value: 'oussamahitte6@gmail.com',
      href: 'mailto:oussamahitte6@gmail.com',
      description: 'Best for project inquiries and proposals',
    },
    {
      iconNode: <WhatsAppIcon size={18} />,
      label: 'WhatsApp',
      value: '+212 659 404 133',
      href: 'https://wa.me/212659404133',
      description: 'Quick questions and real-time chat',
    },
  ];

  const inputCls =
    'w-full px-4 py-3 sm:py-3.5 rounded-xl text-sm sm:text-base text-text-primary placeholder:text-text-muted/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/30 focus:shadow-[0_0_20px_rgba(124,58,237,0.08)] transition-all duration-300';

  const inputBg = 'bg-dark-lighter/60 border border-border-light/10 hover:border-border-light/25';

  return (
    <section id="contact" className="py-16 sm:py-20 md:py-24 lg:py-28 relative">
      <div className="section-divider" />

      <div className="absolute bottom-1/3 -right-40 w-60 sm:w-80 h-60 sm:h-80 bg-primary/8 rounded-full blur-[100px] sm:blur-[150px] pointer-events-none" />
      <div className="absolute top-1/4 -left-40 w-48 sm:w-60 h-48 sm:h-60 bg-accent/6 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14 md:mb-16"
        >
          <span className="font-mono text-xs sm:text-sm font-medium text-primary-light tracking-[0.2em] uppercase drop-shadow-[0_0_8px_rgba(124,58,237,0.4)]">
            Get In Touch
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] font-bold mt-3 mb-4 sm:mb-5">
            Let's Build Something{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-primary-light bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradient-shift_6s_ease_infinite]">
              Great Together
            </span>
          </h2>
          <p className="text-text-secondary text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you need a complete web application, a modern redesign, or technical consulting — I'm ready to deliver results that exceed expectations.
          </p>
        </motion.div>

        <SectionStroke className="p-4 sm:p-6 md:p-8 lg:p-10" delay={0.15}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-10">
            {/* Left: Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-5 space-y-5 sm:space-y-6"
            >
              <div className="p-5 sm:p-7 rounded-2xl glass-card aura-border">
                <h3 className="font-heading text-base sm:text-lg font-bold text-text-primary mb-5 sm:mb-6">
                  Why Work With Me
                </h3>
                <div className="space-y-4 sm:space-y-5">
                  {workHighlights.map((item) => (
                    <div key={item.text} className="flex items-center gap-3.5">
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="text-primary-light" size={18} />
                      </div>
                      <span className="text-sm sm:text-[15px] text-text-secondary font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 sm:p-7 rounded-2xl glass-card aura-border">
                <h3 className="font-heading text-base sm:text-lg font-bold text-text-primary mb-5 sm:mb-6">
                  Direct Contact
                </h3>
                <div className="space-y-4">
                  {contactChannels.map((ch) => (
                    <a
                      key={ch.label}
                      href={ch.href}
                      target={ch.href.startsWith('http') ? '_blank' : undefined}
                      rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-start gap-3.5 group p-3 sm:p-3.5 rounded-xl hover:bg-primary/5 transition-all duration-300 -mx-3 sm:-mx-3.5"
                    >
                      <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:shadow-[0_0_12px_rgba(124,58,237,0.15)] transition-all duration-300">
                        {ch.iconNode}
                      </div>
                      <div className="min-w-0">
                        <div className="text-[10px] sm:text-[11px] text-text-muted uppercase tracking-wider font-semibold">{ch.label}</div>
                        <div className="text-sm sm:text-base text-text-primary font-semibold group-hover:text-primary-light transition-colors mt-0.5 break-all">{ch.value}</div>
                        <div className="text-[11px] sm:text-xs text-text-muted mt-0.5">{ch.description}</div>
                      </div>
                      <ArrowRight size={16} className="text-text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-2.5" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-2xl glass-card !border-emerald/15 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald/5 to-accent/3 pointer-events-none" />
                <div className="relative flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="text-emerald" size={16} />
                    <span className="text-sm sm:text-[15px] font-semibold text-text-primary">Morocco</span>
                  </div>
                  <span className="text-text-muted text-[11px] sm:text-xs">Remote & Worldwide</span>
                </div>
                <div className="relative flex items-center gap-2 mt-2.5">
                  <Clock className="text-emerald" size={14} />
                  <span className="text-xs sm:text-sm text-text-secondary">Currently open for new projects</span>
                  <span className="w-2 h-2 bg-emerald rounded-full animate-pulse shadow-[0_0_6px_rgba(16,185,129,0.5)] ml-auto flex-shrink-0" />
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="lg:col-span-7"
            >
              <form onSubmit={handleSubmit} className="p-5 sm:p-7 md:p-8 rounded-2xl glass-card aura-border">
                <div className="mb-6 sm:mb-8">
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-text-primary mb-1.5">
                    Send a Message
                  </h3>
                  <p className="text-text-muted text-xs sm:text-sm">
                    Fill out the form below and I'll respond within 1 hour.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-text-secondary mb-2">
                      Full Name <span className="text-primary-light">*</span>
                    </label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" className={`${inputCls} ${inputBg}`} />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold text-text-secondary mb-2">
                      Email Address <span className="text-primary-light">*</span>
                    </label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@company.com" className={`${inputCls} ${inputBg}`} />
                  </div>
                </div>

                <div className="mb-4 sm:mb-5">
                  <label className="block text-xs sm:text-sm font-semibold text-text-secondary mb-2">
                    Subject <span className="text-primary-light">*</span>
                  </label>
                  <input type="text" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} placeholder="Project inquiry, collaboration, consulting..." className={`${inputCls} ${inputBg}`} />
                </div>

                <div className="mb-6 sm:mb-7">
                  <label className="block text-xs sm:text-sm font-semibold text-text-secondary mb-2">
                    Project Details <span className="text-primary-light">*</span>
                  </label>
                  <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Describe your project goals, timeline, and any specific requirements..." className={`${inputCls} ${inputBg} resize-none`} />
                </div>

                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-5 p-4 rounded-xl bg-emerald/10 border border-emerald/20 flex items-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.08)]">
                    <CheckCircle size={18} className="text-emerald flex-shrink-0" />
                    <div>
                      <p className="text-emerald text-sm font-semibold">Message sent successfully!</p>
                      <p className="text-emerald/70 text-xs mt-0.5">I'll get back to you within 1 hour.</p>
                    </div>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-5 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3">
                    <AlertCircle size={18} className="text-red-400 flex-shrink-0" />
                    <p className="text-red-400 text-sm">{errorMsg}</p>
                  </motion.div>
                )}

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <button
                    type="submit"
                    disabled={status === 'sending' || status === 'success'}
                    className="w-full sm:w-auto px-8 py-3.5 sm:py-4 bg-gradient-to-r from-primary to-primary-dark disabled:from-primary/30 disabled:to-primary-dark/30 disabled:cursor-not-allowed text-white text-sm sm:text-base font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_35px_rgba(124,58,237,0.4)] hover:-translate-y-0.5 flex items-center justify-center gap-2.5"
                  >
                    {status === 'sending' ? (
                      <><Loader2 size={18} className="animate-spin" /> Sending...</>
                    ) : status === 'success' ? (
                      <><CheckCircle size={18} /> Sent!</>
                    ) : (
                      <><Send size={18} /> Send Message</>
                    )}
                  </button>
                  <p className="text-text-muted text-[11px] sm:text-xs text-center sm:text-left">
                    Your information is secure and will never be shared.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </SectionStroke>
      </div>
    </section>
  );
}
