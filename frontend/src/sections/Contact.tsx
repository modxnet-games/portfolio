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
      iconNode: <Mail className="text-primary-light/70" size={16} />,
      label: 'Email',
      value: 'oussamahitte6@gmail.com',
      href: 'mailto:oussamahitte6@gmail.com',
      description: 'Best for project inquiries and proposals',
    },
    {
      iconNode: <WhatsAppIcon size={16} />,
      label: 'WhatsApp',
      value: '+212 659 404 133',
      href: 'https://wa.me/212659404133',
      description: 'Quick questions and real-time chat',
    },
  ];

  const inputCls =
    'w-full px-3.5 py-3 rounded-xl text-sm text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:ring-1 focus:ring-primary/25 focus:border-primary/25 transition-all duration-300';

  const inputBg = 'bg-white/[0.02] border border-white/[0.06] hover:border-white/10';

  return (
    <section id="contact" className="py-20 sm:py-24 md:py-28 lg:py-32 relative">
      {/* Subtle auras */}
      <div className="absolute bottom-1/3 -right-40 w-48 sm:w-60 h-48 sm:h-60 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 -left-40 w-40 sm:w-48 h-40 sm:h-48 bg-accent/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-14 md:mb-16"
        >
          <span className="font-mono text-[11px] sm:text-xs font-medium text-primary-light/70 tracking-[0.2em] uppercase">
            Get In Touch
          </span>
          <h2 className="font-heading text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] font-bold mt-3 mb-4">
            Let's Build Something{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-primary-light bg-clip-text text-transparent bg-[length:200%_200%] animate-[gradient-shift_6s_ease_infinite]">
              Great Together
            </span>
          </h2>
          <p className="text-text-secondary text-sm sm:text-[15px] md:text-base max-w-lg mx-auto leading-relaxed">
            Whether you need a complete web application, a modern redesign, or technical consulting — I'm ready to deliver.
          </p>
        </motion.div>

        <SectionStroke className="p-4 sm:p-6 md:p-8 lg:p-10" delay={0.15}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            {/* Left: Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="lg:col-span-5 space-y-4"
            >
              <div className="p-5 sm:p-6 rounded-xl glass-card">
                <h3 className="font-heading text-sm sm:text-[15px] font-semibold text-text-primary mb-4">
                  Why Work With Me
                </h3>
                <div className="space-y-3.5">
                  {workHighlights.map((item) => (
                    <div key={item.text} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0">
                        <item.icon className="text-primary-light/60" size={16} />
                      </div>
                      <span className="text-xs sm:text-[13px] text-text-secondary font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 sm:p-6 rounded-xl glass-card">
                <h3 className="font-heading text-sm sm:text-[15px] font-semibold text-text-primary mb-4">
                  Direct Contact
                </h3>
                <div className="space-y-3">
                  {contactChannels.map((ch) => (
                    <a
                      key={ch.label}
                      href={ch.href}
                      target={ch.href.startsWith('http') ? '_blank' : undefined}
                      rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-start gap-3 group p-3 rounded-lg hover:bg-white/[0.02] transition-all duration-300 -mx-3"
                    >
                      <div className="w-9 h-9 rounded-lg bg-primary/8 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/12 transition-all duration-300">
                        {ch.iconNode}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[9px] sm:text-[10px] text-text-muted uppercase tracking-wider font-semibold">{ch.label}</div>
                        <div className="text-xs sm:text-sm text-text-primary font-medium group-hover:text-primary-light transition-colors mt-0.5 break-all">{ch.value}</div>
                        <div className="text-[10px] sm:text-[11px] text-text-muted mt-0.5">{ch.description}</div>
                      </div>
                      <ArrowRight size={14} className="text-text-muted opacity-0 group-hover:opacity-60 group-hover:translate-x-0.5 transition-all duration-300 flex-shrink-0 mt-2" />
                    </a>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl glass-card !border-emerald/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald/3 to-transparent pointer-events-none" />
                <div className="relative flex items-center gap-2.5">
                  <MapPin className="text-emerald/70" size={14} />
                  <span className="text-xs sm:text-[13px] font-medium text-text-primary">Morocco</span>
                  <span className="text-text-muted text-[10px] sm:text-[11px]">· Remote & Worldwide</span>
                </div>
                <div className="relative flex items-center gap-2 mt-2">
                  <Clock className="text-emerald/70" size={12} />
                  <span className="text-[11px] sm:text-xs text-text-muted">Currently open for new projects</span>
                  <span className="w-1.5 h-1.5 bg-emerald rounded-full animate-pulse shadow-[0_0_4px_rgba(16,185,129,0.4)] ml-auto flex-shrink-0" />
                </div>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="lg:col-span-7"
            >
              <form onSubmit={handleSubmit} className="p-5 sm:p-6 md:p-8 rounded-xl glass-card">
                <div className="mb-6">
                  <h3 className="font-heading text-base sm:text-lg font-semibold text-text-primary mb-1">
                    Send a Message
                  </h3>
                  <p className="text-text-muted text-[11px] sm:text-xs">
                    Fill out the form below and I'll respond within 1 hour.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[11px] sm:text-xs font-medium text-text-secondary mb-1.5">
                      Full Name <span className="text-primary-light/60">*</span>
                    </label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Your full name" className={`${inputCls} ${inputBg}`} />
                  </div>
                  <div>
                    <label className="block text-[11px] sm:text-xs font-medium text-text-secondary mb-1.5">
                      Email Address <span className="text-primary-light/60">*</span>
                    </label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="your@email.com" className={`${inputCls} ${inputBg}`} />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-[11px] sm:text-xs font-medium text-text-secondary mb-1.5">
                    Subject <span className="text-primary-light/60">*</span>
                  </label>
                  <input type="text" required value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} placeholder="Project inquiry, collaboration, consulting..." className={`${inputCls} ${inputBg}`} />
                </div>

                <div className="mb-6">
                  <label className="block text-[11px] sm:text-xs font-medium text-text-secondary mb-1.5">
                    Project Details <span className="text-primary-light/60">*</span>
                  </label>
                  <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Describe your project goals, timeline, and any specific requirements..." className={`${inputCls} ${inputBg} resize-none`} />
                </div>

                {status === 'success' && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-4 p-3.5 rounded-xl bg-emerald/8 border border-emerald/15 flex items-center gap-2.5">
                    <CheckCircle size={16} className="text-emerald flex-shrink-0" />
                    <div>
                      <p className="text-emerald text-xs font-semibold">Message sent successfully!</p>
                      <p className="text-emerald/60 text-[10px] mt-0.5">I'll get back to you within 1 hour.</p>
                    </div>
                  </motion.div>
                )}
                {status === 'error' && (
                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-4 p-3.5 rounded-xl bg-red-500/8 border border-red-500/15 flex items-center gap-2.5">
                    <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                    <p className="text-red-400 text-xs">{errorMsg}</p>
                  </motion.div>
                )}

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    type="submit"
                    disabled={status === 'sending' || status === 'success'}
                    className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-primary to-primary-dark disabled:from-primary/25 disabled:to-primary-dark/25 disabled:cursor-not-allowed text-[#0f0f0f] text-sm font-semibold rounded-full transition-all duration-300 hover:shadow-[0_0_25px_rgba(0,255,204,0.3)] hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    {status === 'sending' ? (
                      <><Loader2 size={16} className="animate-spin" /> Sending...</>
                    ) : status === 'success' ? (
                      <><CheckCircle size={16} /> Sent!</>
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </button>
                  <p className="text-text-muted text-[10px] sm:text-[11px] text-center sm:text-left">
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
