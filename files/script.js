// ============================================
// MOBILE MENU TOGGLE
// ============================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking on a link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
      mobileMenuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });
}

// ============================================
// SMOOTH SCROLLING
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const offset = 80; // Navigation height
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================
// ACTIVE NAVIGATION HIGHLIGHT
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

function highlightNavigation() {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNavigation);

// ============================================
// CONTACT FORM HANDLING
// ============================================
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('.btn-text');
    
    // Get form data
    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      subject: document.getElementById('subject').value.trim(),
      message: document.getElementById('message').value.trim()
    };
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      showFormStatus('Please fill in all fields', 'error');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      showFormStatus('Please enter a valid email address', 'error');
      return;
    }
    
    // Show loading state
    submitButton.classList.add('loading');
    submitButton.disabled = true;
    
    try {
      // Send to backend
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        showFormStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
        contactForm.reset();
      } else {
        showFormStatus(data.error || 'Failed to send message. Please try again.', 'error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      showFormStatus('Network error. Please check your connection and try again.', 'error');
    } finally {
      // Remove loading state
      submitButton.classList.remove('loading');
      submitButton.disabled = false;
    }
  });
}

function showFormStatus(message, type) {
  formStatus.textContent = message;
  formStatus.className = `form-status ${type}`;
  
  // Auto-hide after 5 seconds for success messages
  if (type === 'success') {
    setTimeout(() => {
      formStatus.className = 'form-status';
    }, 5000);
  }
}

// ============================================
// SKILL BAR ANIMATIONS
// ============================================
const observerOptions = {
  threshold: 0.3,
  rootMargin: '0px 0px -100px 0px'
};

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skillBars = entry.target.querySelectorAll('.skill-fill');
      skillBars.forEach(bar => {
        bar.style.width = bar.style.getPropertyValue('--skill-level');
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe skill sections
document.querySelectorAll('.skill-category').forEach(category => {
  // Reset skill bars to 0 initially
  category.querySelectorAll('.skill-fill').forEach(bar => {
    bar.style.width = '0';
  });
  skillObserver.observe(category);
});

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

// Observe elements for reveal animation
document.querySelectorAll('.project-card, .contact-method').forEach(element => {
  revealObserver.observe(element);
});

// ============================================
// NAVIGATION BACKGROUND ON SCROLL
// ============================================
const nav = document.querySelector('.nav-wrapper');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    nav.style.background = 'rgba(10, 10, 15, 0.95)';
    nav.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
  } else {
    nav.style.background = 'rgba(10, 10, 15, 0.8)';
    nav.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// ============================================
// TYPING EFFECT FOR HERO TITLE (Optional Enhancement)
// ============================================
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Uncomment to enable typing effect
// const titleName = document.querySelector('.title-name');
// if (titleName) {
//   const originalText = titleName.textContent;
//   typeWriter(titleName, originalText, 80);
// }

// ============================================
// PARALLAX EFFECT FOR GRADIENT ORBS
// ============================================
window.addEventListener('mousemove', (e) => {
  const orbs = document.querySelectorAll('.gradient-orb');
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;
  
  orbs.forEach((orb, index) => {
    const speed = (index + 1) * 0.05;
    const x = (mouseX - 0.5) * 100 * speed;
    const y = (mouseY - 0.5) * 100 * speed;
    
    orb.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// ============================================
// PERFORMANCE: Reduce Motion for Users Who Prefer It
// ============================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  document.querySelectorAll('*').forEach(element => {
    element.style.animation = 'none';
    element.style.transition = 'none';
  });
}

// ============================================
// LOG READY STATE
// ============================================
console.log('%c🚀 Portfolio Loaded Successfully!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%c✨ Made with passion by Oussama Hitte', 'color: #06b6d4; font-size: 12px;');
