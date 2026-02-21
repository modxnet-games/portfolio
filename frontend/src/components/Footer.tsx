import { Mail, Heart } from 'lucide-react';
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from './SocialIcons';

const socialLinks = [
  { icon: InstagramIcon, href: 'https://www.instagram.com/oussama.hitte?utm_source=qr&igsh=MTQ1MG92MWU3MzN6NA==', label: 'Instagram' },
  { icon: FacebookIcon, href: 'https://www.facebook.com/ipm.kira', label: 'Facebook' },
  { icon: WhatsAppIcon, href: 'https://wa.me/212659404133', label: 'WhatsApp' },
  { icon: () => <Mail size={18} />, href: 'mailto:oussamahitte6@gmail.com', label: 'Email' },
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
    <footer className="relative bg-dark-lighter/50 backdrop-blur-xl border-t border-border">
      {/* Subtle aura glow at top of footer */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10 sm:py-12 md:py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10">
          {/* Brand */}
          <div>
            <a href="#home" onClick={(e) => { e.preventDefault(); handleClick('#home'); }} className="font-heading text-xl sm:text-2xl font-bold tracking-tight inline-block mb-3 sm:mb-4">
              <span className="bg-gradient-to-r from-primary-light to-accent bg-clip-text text-transparent">O</span>
              <span className="text-text-primary">H</span>
              <span className="bg-gradient-to-r from-accent to-primary-light bg-clip-text text-transparent">.</span>
            </a>
            <p className="text-text-muted text-xs sm:text-sm leading-relaxed max-w-[280px]">
              Oussama Hitte — Full Stack Developer building modern web apps, gaming platforms, and AI solutions.
            </p>
          </div>

          {/* Navigation links */}
          <div>
            <h4 className="font-heading text-sm sm:text-base font-semibold text-text-primary mb-3 sm:mb-4">Links</h4>
            <ul className="space-y-2 sm:space-y-2.5">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                    className="text-text-muted text-xs sm:text-sm hover:text-primary-light transition-colors py-0.5 inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social links */}
          <div>
            <h4 className="font-heading text-sm sm:text-base font-semibold text-text-primary mb-3 sm:mb-4">Connect</h4>
            <div className="flex gap-2.5 sm:gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl glass-card flex items-center justify-center text-text-muted hover:text-primary-light hover:shadow-[0_0_12px_rgba(0,255,204,0.15)] transition-all duration-300"
                >
                  <s.icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="py-5 sm:py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-muted text-[11px] sm:text-xs flex items-center gap-1">
            &copy; {year} Oussama Hitte. Made with{' '}
            <Heart size={12} className="text-rose fill-rose" /> and code.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-text-muted text-[11px] sm:text-xs hover:text-primary-light transition-colors py-1 px-2"
          >
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
