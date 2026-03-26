import { Mail, Heart } from 'lucide-react';
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from './SocialIcons';

const socialLinks = [
  { icon: InstagramIcon, href: 'https://www.instagram.com/oussama.hitte?utm_source=qr&igsh=MTQ1MG92MWU3MzN6NA==', label: 'Instagram' },
  { icon: FacebookIcon, href: 'https://www.facebook.com/ipm.kira', label: 'Facebook' },
  { icon: WhatsAppIcon, href: 'https://wa.me/212659404133', label: 'WhatsApp' },
  { icon: () => <Mail size={16} />, href: 'mailto:oussamahitte6@gmail.com', label: 'Email' },
];

const footerLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const handleClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#0a0a0a] border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10 sm:py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
          {/* Brand */}
          <div>
            <a href="#home" onClick={(e) => { e.preventDefault(); handleClick('#home'); }} className="font-heading text-lg font-bold tracking-tight inline-block mb-3">
              <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">O</span>
              <span className="text-text-primary">H</span>
              <span className="text-text-muted">.</span>
            </a>
            <p className="text-text-muted text-xs leading-relaxed max-w-[260px]">
              Oussama Hitte — Full Stack Developer building modern web apps, gaming platforms, and AI solutions.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading text-xs font-semibold text-text-secondary mb-3 uppercase tracking-wider">Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                    className="text-text-muted text-xs hover:text-primary-light/70 transition-colors py-0.5 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading text-xs font-semibold text-text-secondary mb-3 uppercase tracking-wider">Connect</h4>
            <div className="flex gap-2.5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-text-muted hover:text-primary-light/70 hover:border-white/10 transition-all duration-300"
                >
                  <s.icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="py-5 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-muted text-[10px] sm:text-[11px] flex items-center gap-1">
            &copy; {year} Oussama Hitte. Made with{' '}
            <Heart size={10} className="text-rose fill-rose" /> and code.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-text-muted text-[10px] sm:text-[11px] hover:text-primary-light/60 transition-colors py-1 px-2"
          >
            Back to top ↑
          </button>
        </div>
      </div>
    </footer>
  );
}
