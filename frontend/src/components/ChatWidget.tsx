import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from './SocialIcons';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const API_URL = '/api/chat';
const WHATSAPP_URL = 'https://wa.me/212659404133';

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);
  const [limited, setLimited] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open && inputRef.current && !limited) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open, limited]);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (open && !hasGreeted && messages.length === 0) {
      setHasGreeted(true);
      setMessages([
        {
          role: 'assistant',
          content:
            "Hey! I'm Oussama. Welcome to my portfolio. Ask me anything about my services, projects, or let's discuss working together!",
        },
      ]);
    }
  }, [open, hasGreeted, messages.length]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading || limited) return;

    const userMsg: Message = { role: 'user', content: text };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      });
      const data = await res.json();

      if (data.limited) {
        setLimited(true);
        setLoading(false);
        return;
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply || 'Sorry, something went wrong.' },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Connection issue. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button with aura glow */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] flex items-center justify-center"
          >
            <MessageCircle size={22} />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald rounded-full border-2 border-dark animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel - aura glass theme */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed z-50 inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[360px] sm:h-[500px] sm:rounded-2xl flex flex-col overflow-hidden"
            style={{
              background: 'rgba(10, 10, 30, 0.85)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(120, 80, 255, 0.1)',
              boxShadow: '0 0 40px rgba(124,58,237,0.1), 0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border flex-shrink-0" style={{ background: 'rgba(5, 5, 20, 0.6)' }}>
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                    <Bot size={16} className="text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald rounded-full border-2 border-dark shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                </div>
                <div>
                  <h3 className="text-[13px] font-semibold text-text-primary font-heading">Oussama Hitte</h3>
                  <p className="text-[10px] text-emerald font-medium">Online</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-glass text-text-muted hover:text-text-primary transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 relative">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === 'assistant'
                        ? 'bg-gradient-to-br from-primary to-accent shadow-[0_0_10px_rgba(124,58,237,0.2)]'
                        : 'bg-surface'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <Bot size={13} className="text-white" />
                    ) : (
                      <User size={13} className="text-text-muted" />
                    )}
                  </div>
                  <div
                    className={`max-w-[80%] px-3 py-2 text-[13px] leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl rounded-br-sm shadow-[0_0_15px_rgba(124,58,237,0.2)]'
                        : 'bg-glass text-text-primary border border-border/40 rounded-2xl rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-[0_0_10px_rgba(124,58,237,0.2)]">
                    <Bot size={13} className="text-white" />
                  </div>
                  <div className="px-3 py-2 bg-glass border border-border/40 rounded-2xl rounded-bl-sm flex items-center gap-1.5">
                    <Loader2 size={12} className="text-primary-light animate-spin" />
                    <span className="text-[11px] text-text-muted">Typing...</span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />

              {/* WhatsApp Limit Modal */}
              <AnimatePresence>
                {limited && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 z-20 flex items-center justify-center p-4"
                    style={{ background: 'rgba(3, 0, 20, 0.85)', backdropFilter: 'blur(12px)' }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full max-w-[300px] rounded-2xl overflow-hidden border border-border-light/30 shadow-[0_0_40px_rgba(37,211,102,0.1)]"
                      style={{ background: 'rgba(15,15,35,0.9)' }}
                    >
                      <div className="bg-gradient-to-br from-[#25D366]/20 to-[#25D366]/5 px-5 pt-6 pb-4 text-center">
                        <div className="w-14 h-14 mx-auto rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_0_25px_rgba(37,211,102,0.3)] mb-3">
                          <WhatsAppIcon size={26} />
                        </div>
                        <h3 className="font-heading text-base font-bold text-text-primary">
                          Let's Continue on WhatsApp
                        </h3>
                      </div>
                      <div className="px-5 pb-5 pt-3">
                        <p className="text-text-secondary text-xs text-center leading-relaxed mb-5">
                          You've reached the chat limit here. For a deeper conversation about your project, let's connect directly on WhatsApp — I reply fast!
                        </p>
                        <a
                          href={WHATSAPP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#1ebe5a] text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:-translate-y-0.5"
                        >
                          <WhatsAppIcon size={18} />
                          Chat on WhatsApp
                          <ArrowRight size={15} />
                        </a>
                        <button
                          onClick={() => setOpen(false)}
                          className="w-full mt-2.5 py-2.5 text-text-muted hover:text-text-secondary text-xs font-medium rounded-xl transition-colors text-center"
                        >
                          Maybe later
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input */}
            <div className="px-3 py-2.5 border-t border-border flex-shrink-0" style={{ background: 'rgba(5, 5, 20, 0.6)' }}>
              {limited ? (
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#25D366] text-white text-xs font-semibold rounded-full transition-colors hover:bg-[#1ebe5a] hover:shadow-[0_0_15px_rgba(37,211,102,0.25)]"
                >
                  <WhatsAppIcon size={15} />
                  Continue on WhatsApp
                </a>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask me anything..."
                      disabled={loading}
                      className="flex-1 px-3 py-2 bg-glass border border-border rounded-full text-[13px] text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-1 focus:ring-primary/30 focus:border-primary/20 focus:shadow-[0_0_15px_rgba(124,58,237,0.1)] transition-all disabled:opacity-40"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!input.trim() || loading}
                      className="w-9 h-9 bg-gradient-to-r from-primary to-primary-dark hover:shadow-[0_0_15px_rgba(124,58,237,0.3)] disabled:from-primary/25 disabled:to-primary-dark/25 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all flex-shrink-0"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                  <p className="text-[9px] text-text-muted text-center mt-1.5 tracking-wide">
                    AI assistant &middot; Replies as Oussama Hitte
                  </p>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
