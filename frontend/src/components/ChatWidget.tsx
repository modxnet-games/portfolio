import { useState, useRef, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Loader2, ArrowRight, Sparkles } from 'lucide-react';
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
      elements.push(<div key={key++} className="h-2.5" aria-hidden />);
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
          <ul key={key++} className="list-none mt-2 space-y-1.5 pl-0 first:mt-0">
            {listItems.map((item, j) => (
              <li key={j} className="flex gap-2 items-start">
                <span className="text-primary-light/70 flex-shrink-0 mt-0.5 text-[10px]" aria-hidden>▸</span>
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
        <p key={key++} className="mt-2 leading-relaxed first:mt-0 text-[13px]">
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

const quickActions = [
  'What services do you offer?',
  'Show me your projects',
  'How can we work together?',
];

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
            "Hey! 👋 I'm Oussama. Welcome to my portfolio. Ask me anything about my services, projects, or let's discuss working together!",
        },
      ]);
    }
  }, [open, hasGreeted, messages.length]);

  const sendMessage = async (text?: string) => {
    const msgText = text || input.trim();
    if (!msgText || loading || limited) return;

    const userMsg: Message = { role: 'user', content: msgText };
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
      {/* Floating button — premium design */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.06, y: -2 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 group"
          >
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 to-accent/20 blur-xl group-hover:blur-2xl transition-all duration-500 scale-110" />
            {/* Button body */}
            <div className="relative w-14 h-14 sm:w-[60px] sm:h-[60px] rounded-2xl bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] border border-primary/25 flex items-center justify-center shadow-[0_4px_30px_rgba(0,255,204,0.15)] group-hover:border-primary/40 group-hover:shadow-[0_4px_40px_rgba(0,255,204,0.25)] transition-all duration-500">
              <MessageCircle size={22} className="text-primary-light group-hover:scale-110 transition-transform duration-300" />
              {/* Online dot */}
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald rounded-full border-2 border-[#0f0f0f] animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="chat-panel chat-container fixed z-50 inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[380px] sm:h-[520px] sm:rounded-2xl flex flex-col overflow-hidden"
            style={{
              background: 'rgba(15, 15, 15, 0.95)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid rgba(0, 255, 204, 0.1)',
              boxShadow: '0 0 60px rgba(0,255,204,0.06), 0 24px 64px rgba(0,0,0,0.5)',
            }}
          >
            {/* Header */}
            <div className="chat-header flex items-center justify-between px-4 py-3.5 border-b border-white/[0.06] flex-shrink-0" style={{ background: 'rgba(15, 15, 15, 0.8)' }}>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-accent/15 border border-primary/15 flex items-center justify-center">
                    <Sparkles size={18} className="text-primary-light" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald rounded-full border-2 border-[#0f0f0f] shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                </div>
                <div>
                  <h3 className="text-[13px] font-semibold text-text-primary font-heading">Oussama Hitte</h3>
                  <p className="text-[10px] text-emerald font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald rounded-full inline-block" />
                    Online · Replies instantly
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/[0.05] text-text-muted hover:text-text-primary transition-all duration-200"
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
                  className={`chat-row flex gap-3 mb-4 last:mb-0 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`chat-avatar w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 self-end ${
                      msg.role === 'assistant'
                        ? 'bg-gradient-to-br from-primary/15 to-accent/10 border border-primary/15'
                        : 'bg-white/[0.04] border border-white/[0.08]'
                    }`}
                  >
                    {msg.role === 'assistant' ? (
                      <Sparkles size={13} className="text-primary-light" />
                    ) : (
                      <User size={13} className="text-text-secondary" />
                    )}
                  </div>
                  <div
                    className={`chat-bubble max-w-[72%] min-w-[80px] px-4 py-3 text-[13px] leading-relaxed ${
                      msg.role === 'user'
                        ? 'chat-bubble-user bg-gradient-to-r from-primary to-primary-dark text-[#0a0a0a] rounded-2xl rounded-br-md font-medium'
                        : 'chat-bubble-assistant bg-white/[0.04] border border-white/[0.06] text-text-primary rounded-2xl rounded-bl-md'
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

              {/* Quick actions — show only after greeting */}
              {messages.length === 1 && messages[0].role === 'assistant' && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-3 flex flex-wrap gap-2"
                >
                  {quickActions.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="px-3 py-1.5 text-[11px] font-medium text-primary-light/80 border border-primary/15 bg-primary/5 rounded-full hover:bg-primary/10 hover:border-primary/25 transition-all duration-200"
                    >
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}

              {loading && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="chat-row flex gap-3 mb-4">
                  <div className="chat-avatar w-8 h-8 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 border border-primary/15 flex items-center justify-center flex-shrink-0 self-end">
                    <Sparkles size={13} className="text-primary-light" />
                  </div>
                  <div className="chat-bubble chat-bubble-assistant max-w-[72%] min-w-[80px] px-4 py-3 bg-white/[0.04] border border-white/[0.06] rounded-2xl rounded-bl-md flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-primary-light/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 bg-primary-light/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 bg-primary-light/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-[11px] text-text-muted ml-1">Typing...</span>
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
                    style={{ background: 'rgba(15, 15, 15, 0.9)', backdropFilter: 'blur(16px)' }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 12 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="w-full max-w-[300px] rounded-2xl overflow-hidden border border-[#25D366]/20 shadow-[0_0_40px_rgba(37,211,102,0.1)]"
                      style={{ background: 'rgba(20,20,20,0.95)' }}
                    >
                      <div className="bg-gradient-to-br from-[#25D366]/15 to-[#25D366]/5 px-5 pt-6 pb-4 text-center">
                        <div className="w-14 h-14 mx-auto rounded-2xl bg-[#25D366] flex items-center justify-center shadow-[0_0_25px_rgba(37,211,102,0.3)] mb-3">
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

            {/* Input area */}
            <div className="chat-input-area chat-input px-4 py-3 border-t border-white/[0.06] flex-shrink-0" style={{ background: 'rgba(15, 15, 15, 0.85)' }}>
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
                      placeholder="Ask about projects, skills, or hiring..."
                      disabled={loading}
                      className="flex-1 px-4 py-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xl text-[13px] text-text-primary placeholder:text-text-muted/40 focus:outline-none focus:ring-1 focus:ring-primary/20 focus:border-primary/20 transition-all disabled:opacity-40"
                    />
                    <button
                      onClick={() => sendMessage()}
                      disabled={!input.trim() || loading}
                      className="w-10 h-10 bg-gradient-to-br from-primary/20 to-accent/15 border border-primary/20 hover:border-primary/35 hover:from-primary/30 hover:to-accent/25 disabled:opacity-25 disabled:cursor-not-allowed text-primary-light rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0"
                    >
                      <Send size={15} />
                    </button>
                  </div>
                  <p className="text-[9px] text-text-muted/50 text-center mt-1.5 tracking-wide">
                    AI assistant · Replies as Oussama Hitte
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
