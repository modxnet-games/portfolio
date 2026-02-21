import { useState, useRef, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from './SocialIcons';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

/** Formats AI reply: paragraphs, lists, spacing */
function formatMessageContent(content: string) {
  const text = content.trim();
  if (!text) return <span className="text-text-muted">—</span>;

  const lines = text.split(/\n/);
  const elements: ReactNode[] = [];
  let key = 0;
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      elements.push(<div key={key++} className="h-3" aria-hidden />);
      i++;
      continue;
    }

    const isBullet = /^[-•*]\s/.test(trimmed) || /^\d+\.\s/.test(trimmed);
    const bulletText = trimmed.replace(/^[-•*]\s|^\d+\.\s/, '').trim();

    if (isBullet && bulletText) {
      const listItems: string[] = [];
      while (i < lines.length) {
        const l = lines[i].trim();
        const bullet = /^[-•*]\s/.test(l) || /^\d+\.\s/.test(l);
        if (!bullet) break;
        const item = l.replace(/^[-•*]\s|^\d+\.\s/, '').trim();
        if (item) listItems.push(item);
        i++;
      }
      if (listItems.length > 0) {
        elements.push(
          <ul key={key++} className="list-none mt-2.5 space-y-1.5 pl-0 first:mt-0">
            {listItems.map((item, j) => (
              <li key={j} className="flex gap-2.5 items-start">
                <span className="text-accent flex-shrink-0 mt-1" aria-hidden>•</span>
                <span className="leading-relaxed text-[13px]">{item}</span>
              </li>
            ))}
          </ul>
        );
      }
      continue;
    }

    const paragraphLines: string[] = [];
    while (i < lines.length) {
      const l = lines[i];
      const t = l.trim();
      if (!t) break;
      if (/^[-•*]\s/.test(t) || /^\d+\.\s/.test(t)) break;
      paragraphLines.push(t);
      i++;
    }
    if (paragraphLines.length > 0) {
      elements.push(
        <p key={key++} className="mt-2.5 leading-relaxed first:mt-0 text-[13px]">
          {paragraphLines.join(' ')}
        </p>
      );
    }
  }

  return <>{elements}</>;
}

const API_URL = import.meta.env.DEV
  ? 'http://localhost:5000/api/chat'
  : '/api/chat';
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
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white shadow-[0_0_35px_rgba(0,255,204,0.4)] flex items-center justify-center"
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
              background: 'rgba(26, 26, 26, 0.9)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(0, 255, 204, 0.12)',
              boxShadow: '0 0 50px rgba(0,255,204,0.08), 0 24px 64px rgba(0,0,0,0.45)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 flex-shrink-0" style={{ background: 'rgba(26, 26, 26, 0.7)' }}>
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[0_0_15px_rgba(0,255,204,0.3)]">
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
            <div className="chat-messages flex-1 overflow-y-auto px-4 py-4 relative scroll-smooth">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`chat-row flex gap-3.5 mb-5 last:mb-0 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`chat-avatar w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 self-end ${
                      msg.role === 'assistant'
                        ? 'bg-gradient-to-br from-primary to-accent shadow-[0_0_12px_rgba(0,255,204,0.3)]'
                        : 'bg-surface/80 border border-border/50'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <Bot size={14} className="text-white" />
                    ) : (
                      <User size={14} className="text-text-secondary" />
                    )}
                  </div>
                  <div
                    className={`chat-bubble max-w-[68%] min-w-[100px] px-5 py-3.5 text-[13px] leading-relaxed ${
                      msg.role === 'user'
                        ? 'chat-bubble-user bg-gradient-to-r from-primary to-primary-dark text-[#1a1a1a] rounded-2xl rounded-br-md'
                        : 'chat-bubble-assistant bg-dark-card/80 text-text-primary rounded-2xl rounded-bl-md'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <div className="chat-message-content [&>*:first-child]:mt-0 [&>p]:mt-2 [&>ul]:mt-2 [&>ul:first-child]:mt-0">
                        {formatMessageContent(msg.content)}
                      </div>
                    ) : (
                      <span className="whitespace-pre-wrap break-words">{msg.content}</span>
                    )}
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="chat-row flex gap-3.5 mb-5">
                  <div className="chat-avatar w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 self-end shadow-[0_0_12px_rgba(0,255,204,0.3)]">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="chat-bubble chat-bubble-assistant max-w-[68%] min-w-[100px] px-5 py-3.5 bg-dark-card/80 rounded-2xl rounded-bl-md flex items-center gap-2">
                    <Loader2 size={14} className="text-accent animate-spin flex-shrink-0" />
                    <span className="text-[12px] text-text-muted">Thinking...</span>
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
                    style={{ background: 'rgba(26, 26, 26, 0.85)', backdropFilter: 'blur(12px)' }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full max-w-[300px] rounded-2xl overflow-hidden border border-border-light/30 shadow-[0_0_40px_rgba(37,211,102,0.1)]"
                      style={{ background: 'rgba(26,26,26,0.9)' }}
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
            <div className="px-4 py-3 border-t border-border/50 flex-shrink-0" style={{ background: 'rgba(26, 26, 26, 0.7)' }}>
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
                      placeholder="Ask about projects, skills, or collaboration..."
                      disabled={loading}
                      className="flex-1 px-4 py-2.5 bg-dark-card/60 border border-border/60 rounded-full text-[13px] text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/30 focus:shadow-[0_0_20px_rgba(0,255,204,0.12)] transition-all disabled:opacity-40"
                    />
                    <button
                      onClick={sendMessage}
                      disabled={!input.trim() || loading}
                      className="w-9 h-9 bg-gradient-to-r from-primary to-primary-dark hover:shadow-[0_0_15px_rgba(0,255,204,0.3)] disabled:from-primary/25 disabled:to-primary-dark/25 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center transition-all flex-shrink-0"
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
