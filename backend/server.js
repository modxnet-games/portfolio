const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const isProd = process.env.NODE_ENV === 'production';

app.set('trust proxy', true);
app.use(cors());
app.use(express.json());

// ─── IP-based Chat Rate Limiter (3 messages per IP) ─────────────────
const chatLimits = new Map();
const CHAT_LIMIT = 3;

function getClientIP(req) {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip || req.socket?.remoteAddress || 'unknown';
}

function isChatLimited(ip) {
  const count = chatLimits.get(ip) || 0;
  return count >= CHAT_LIMIT;
}

function incrementChat(ip) {
  const count = chatLimits.get(ip) || 0;
  chatLimits.set(ip, count + 1);
}

// ─── Serve Frontend in Production ───────────────────────────────────
if (isProd) {
  app.use(express.static(path.join(__dirname, 'public')));
}

// ─── Gmail Transporter ──────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Verify transporter on startup
transporter.verify((error) => {
  if (error) {
    console.error('SMTP connection error:', error.message);
  } else {
    console.log('SMTP server ready to send emails');
  }
});

// ─── Contact Form Endpoint ──────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
    to: process.env.CONTACT_RECEIVER,
    replyTo: email,
    subject: `[Portfolio] ${subject}`,
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f1f5f9; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #7c3aed, #06b6d4); padding: 28px 24px; text-align: center;">
          <h1 style="margin: 0; font-size: 22px; color: white;">New Portfolio Message</h1>
        </div>
        <div style="padding: 28px 24px;">
          <div style="margin-bottom: 16px; padding: 14px; background: #1e293b; border-radius: 8px; border-left: 3px solid #7c3aed;">
            <p style="margin: 0 0 2px; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">From</p>
            <p style="margin: 0; font-size: 15px; font-weight: 600;">${name}</p>
          </div>
          <div style="margin-bottom: 16px; padding: 14px; background: #1e293b; border-radius: 8px; border-left: 3px solid #06b6d4;">
            <p style="margin: 0 0 2px; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">Email</p>
            <p style="margin: 0; font-size: 15px;"><a href="mailto:${email}" style="color: #a78bfa; text-decoration: none;">${email}</a></p>
          </div>
          <div style="margin-bottom: 16px; padding: 14px; background: #1e293b; border-radius: 8px; border-left: 3px solid #7c3aed;">
            <p style="margin: 0 0 2px; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">Subject</p>
            <p style="margin: 0; font-size: 15px; font-weight: 600;">${subject}</p>
          </div>
          <div style="padding: 14px; background: #1e293b; border-radius: 8px; border-left: 3px solid #06b6d4;">
            <p style="margin: 0 0 2px; font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px;">Message</p>
            <p style="margin: 0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
        <div style="padding: 14px 24px; background: #1e293b; text-align: center; font-size: 11px; color: #64748b;">
          Oussama Hitte's Portfolio
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Email error:', error.message);
    res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
});

// ─── DeepSeek AI Chat Endpoint ──────────────────────────────────────
const SYSTEM_PROMPT = `You are a professional AI assistant integrated inside a developer's portfolio website.

IDENTITY:
Act as a real freelance web developer assistant. Speak professionally, clearly, and concisely. Never mention being an AI model.

MAIN PURPOSE:
Help visitors understand the developer's services, skills, and projects, and guide them toward collaboration or hiring.

SPECIALIZATION:
- Web Development
- Gaming websites and landing pages
- Business websites and company platforms
- E-commerce stores
- Admin panels and dashboards
- UI/UX improvement
- Mobile-first responsive design
- API integrations and AI tools
- Performance optimization

TECH STACK:
HTML, CSS, JavaScript, Node.js, modern frontend structure, optimization techniques.

STRICT BEHAVIOR RULES:
- Keep answers SHORT and focused to reduce token usage.
- Maximum 4–6 lines per reply unless user asks for details.
- If question is unrelated to web development, politely redirect to development topics.
- Do NOT invent skills or experiences.
- Prefer structured answers using bullet points.
- Encourage project discussion naturally without aggressive marketing.

TOKEN OPTIMIZATION:
- Avoid long explanations.
- Avoid storytelling or unnecessary text.
- Provide direct, practical answers.

GOAL:
Build trust, present services professionally, and assist visitors efficiently inside the portfolio.`;

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;
  const clientIP = getClientIP(req);

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Messages array is required.' });
  }

  if (isChatLimited(clientIP)) {
    return res.json({ limited: true, reply: null });
  }

  incrementChat(clientIP);

  try {
    const response = await fetch('https://api.deepseek.com/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
        temperature: 0.7,
        max_tokens: 150,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('DeepSeek API error:', response.status, errorData);
      return res.status(500).json({ error: 'AI service unavailable. Please try again.' });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';

    res.json({ reply });
  } catch (error) {
    console.error('Chat error:', error.message);
    res.status(500).json({ error: 'Failed to get AI response. Please try again.' });
  }
});

// ─── Health Check ───────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── SPA Fallback (production) ──────────────────────────────────────
if (isProd) {
  app.get('/{*splat}', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.json({
      name: 'Oussama Hitte Portfolio API',
      status: 'running',
      endpoints: {
        health: 'GET /api/health',
        contact: 'POST /api/contact',
        chat: 'POST /api/chat',
      },
    });
  });
}

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT} [${isProd ? 'production' : 'development'}]`);
});
