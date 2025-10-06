// Ultra-Modern Portfolio JavaScript - Abhishek Kr. Giri Edition
// 100% Vanilla JavaScript - No External Dependencies

class UltraModernPortfolio {
  constructor() {
    this.initializeEverything();
  }

  initializeEverything() {
    this.setupEventListeners();
    this.initCustomCursor();
    this.initLoadingScreen();
    this.initParticleSystem();
    this.initScrollAnimations();
    this.initMagneticElements();
    this.init3DTiltCards();
    this.initSkillsSystem();
    this.initThemeToggle();
    this.initMobileMenu();
    this.initContactForm();
    this.initFloatingActionButton();
    this.initScrollProgress();
    this.initCounters();
    this.initGlitchEffect();
    this.initTypewriterEffect();
    this.initSmoothScrolling();
    this.initExperienceTimeline();
    
    console.log('🚀 Ultra-Modern Portfolio loaded successfully for Abhishek Kr. Giri!');
  }

  setupEventListeners() {
    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
      this.hideLoadingScreen();
    });

    window.addEventListener('scroll', this.throttle(() => {
      this.updateScrollProgress();
      this.updateFloatingButton();
      this.updateNavbar();
      this.handleScrollAnimations();
    }, 16));

    window.addEventListener('resize', this.debounce(() => {
      this.handleResize();
    }, 250));
  }

  // Custom Cursor System
  initCustomCursor() {
    if (window.innerWidth <= 768) return; // Skip on mobile

    this.cursor = document.getElementById('cursor');
    this.cursorTrail = document.getElementById('cursor-trail');
    
    if (!this.cursor || !this.cursorTrail) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let trailX = 0;
    let trailY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth cursor animation
    const animateCursor = () => {
      const ease = 0.15;
      
      cursorX += (mouseX - cursorX) * ease;
      cursorY += (mouseY - cursorY) * ease;
      
      trailX += (mouseX - trailX) * (ease * 0.5);
      trailY += (mouseY - trailY) * (ease * 0.5);
      
      this.cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
      this.cursorTrail.style.transform = `translate(${trailX - 4}px, ${trailY - 4}px)`;
      
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Cursor states
    document.querySelectorAll('a, button, .magnetic, .project-card, .experience-card').forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.cursor.classList.add('hover');
      });
      
      el.addEventListener('mouseleave', () => {
        this.cursor.classList.remove('hover');
      });
    });

    document.addEventListener('mousedown', () => {
      this.cursor.classList.add('click');
    });

    document.addEventListener('mouseup', () => {
      this.cursor.classList.remove('click');
    });
  }

  // Loading Screen Animation
  initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.getElementById('progress-bar');
    
    if (!loadingScreen) return;

    // Simulate loading progress
    let progress = 0;
    const loadInterval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(loadInterval);
        setTimeout(() => {
          this.hideLoadingScreen();
        }, 500);
      }
      progressBar.style.transform = `translateX(${progress - 100}%)`;
    }, 150);
  }

  hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
      setTimeout(() => {
        loadingScreen.remove();
      }, 1000);
    }
    this.triggerEntryAnimations();
  }

  triggerEntryAnimations() {
    // Trigger hero animations
    const heroElements = document.querySelectorAll('.hero-greeting, .hero-title, .hero-description, .hero-actions, .floating-card');
    heroElements.forEach((el, index) => {
      setTimeout(() => {
        el.style.animationPlayState = 'running';
      }, index * 200);
    });
  }

  // Particle System
  initParticleSystem() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const createParticle = () => {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      const startX = Math.random() * window.innerWidth;
      const endX = startX + (Math.random() - 0.5) * 200;
      const duration = 8000 + Math.random() * 4000;
      
      particle.style.left = startX + 'px';
      particle.style.animationDuration = duration + 'ms';
      particle.style.setProperty('--end-x', endX + 'px');
      
      particlesContainer.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, duration);
    };

    // Create particles periodically
    setInterval(createParticle, 800);
  }

  // Advanced Scroll Animations
  initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -10% 0px'
    };

    this.scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
          if (element.classList.contains('section-title')) {
            this.animateTextReveal(element);
          }
          
          if (element.classList.contains('skill-category') && element.classList.contains('active')) {
            this.animateSkillBars(element);
          }
          
          if (element.classList.contains('project-card')) {
            this.animateProjectCard(element);
          }
          
          if (element.classList.contains('counter')) {
            this.animateCounter(element);
          }
          
          if (element.classList.contains('cert-card')) {
            this.animateCertCard(element);
          }
          
          if (element.classList.contains('achievement-item')) {
            this.animateAchievement(element);
          }

          if (element.classList.contains('experience-item')) {
            this.animateExperienceItem(element);
          }
          
          element.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.section-title, .skill-category, .project-card, .counter, .about-content, .cert-card, .achievement-item, .experience-item').forEach(el => {
      this.scrollObserver.observe(el);
    });
  }

  animateTextReveal(element) {
    element.style.animation = 'revealText 1s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
  }

  animateProjectCard(element) {
    const delay = Array.from(element.parentNode.children).indexOf(element) * 200;
    setTimeout(() => {
      element.style.transform = 'translateY(0)';
      element.style.opacity = '1';
    }, delay);
  }

  animateCertCard(element) {
    const delay = Array.from(element.parentNode.children).indexOf(element) * 100;
    setTimeout(() => {
      element.style.transform = 'translateY(0) scale(1)';
      element.style.opacity = '1';
    }, delay);
  }

  animateAchievement(element) {
    const delay = Array.from(element.parentNode.children).indexOf(element) * 150;
    setTimeout(() => {
      element.style.transform = 'translateX(0)';
      element.style.opacity = '1';
    }, delay);
  }

  animateExperienceItem(element) {
    const delay = Array.from(element.parentNode.children).indexOf(element) * 300;
    setTimeout(() => {
      element.classList.add('animate-in');
    }, delay);
  }

  // Experience Timeline
  initExperienceTimeline() {
    const timelineObserverOptions = {
      threshold: 0.3,
      rootMargin: '0px 0px -20% 0px'
    };

    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const element = entry.target;
          
          if (element.classList.contains('experience-item')) {
            setTimeout(() => {
              element.classList.add('animate-in');
            }, 200);
          }
        }
      });
    }, timelineObserverOptions);

    // Observe experience items
    document.querySelectorAll('.experience-item').forEach(item => {
      timelineObserver.observe(item);
    });

    // Add hover effects to experience cards
    document.querySelectorAll('.experience-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
      });
    });
  }

  // Magnetic Elements
  initMagneticElements() {
    document.querySelectorAll('.magnetic').forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const strength = 0.3;
        element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });

      element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0, 0)';
      });
    });
  }

  // 3D Tilt Cards
  init3DTiltCards() {
    document.querySelectorAll('.tilt-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      });
    });
  }

  // Skills System
  initSkillsSystem() {
    const skillTabs = document.querySelectorAll('.skill-tab');
    const skillCategories = document.querySelectorAll('.skill-category');

    skillTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const category = tab.dataset.category;
        
        // Update active tab
        skillTabs.forEach(t => {
          t.classList.remove('active');
          t.setAttribute('aria-selected', 'false');
        });
        tab.classList.add('active');
        tab.setAttribute('aria-selected', 'true');
        
        // Update active category
        skillCategories.forEach(cat => {
          cat.classList.remove('active');
          if (cat.dataset.category === category) {
            cat.classList.add('active');
            // Animate skill bars in the active category
            setTimeout(() => {
              this.animateSkillBars(cat);
            }, 300);
          }
        });
      });
    });

    // Initialize first category
    const firstCategory = document.querySelector('.skill-category.active');
    if (firstCategory) {
      this.scrollObserver.observe(firstCategory);
    }
  }

  animateSkillBars(container) {
    const skillBars = container.querySelectorAll('.skill-bar');
    
    skillBars.forEach((bar, index) => {
      const progress = bar.dataset.skill;
      const progressElement = bar.querySelector('.skill-progress');
      const glowElement = bar.querySelector('.skill-glow');
      
      setTimeout(() => {
        progressElement.style.transform = `scaleX(${progress / 100})`;
        glowElement.style.transform = `scaleX(${progress / 100})`;
      }, index * 200);
    });
  }

  // Counter Animation
  initCounters() {
    document.querySelectorAll('.counter').forEach(counter => {
      this.scrollObserver.observe(counter);
    });
  }

  animateCounter(element) {
    const target = parseInt(element.dataset.target);
    let current = 0;
    const increment = target / 50;
    const hasPlus = element.textContent.includes('+');
    
    const updateCounter = () => {
      if (current < target) {
        current += increment;
        element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
        setTimeout(updateCounter, 40);
      } else {
        element.textContent = target + (hasPlus ? '+' : '');
      }
    };
    
    updateCounter();
  }

  // Theme Toggle
  initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    // Check for saved theme
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-color-scheme', currentTheme);

    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-color-scheme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-color-scheme', newTheme);
      localStorage.setItem('theme', newTheme);
      
      // Add transition effect
      document.body.style.transition = 'all 0.3s ease';
      setTimeout(() => {
        document.body.style.transition = '';
      }, 300);
    });
  }

  // Mobile Menu
  initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (!mobileMenuToggle) return;

    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  // Contact Form with Advanced Animations
  initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Input focus animations
    form.querySelectorAll('.form-input').forEach(input => {
      input.addEventListener('focus', () => {
        input.parentNode.classList.add('focused');
      });
      
      input.addEventListener('blur', () => {
        if (!input.value) {
          input.parentNode.classList.remove('focused');
        }
      });
    });

    // Form submission
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmission(form);
    });
  }

  async handleFormSubmission(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.querySelector('span').textContent;
    
    // Animate button
    submitBtn.style.transform = 'scale(0.95)';
    submitBtn.querySelector('span').textContent = 'Preparing...';
    
    // Create ripple effect
    this.createRippleEffect(submitBtn);
    
    // Get form data
    const formData = new FormData(form);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Create mailto link
    const mailtoLink = `mailto:mrabhi837@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`From: ${name} (${email})\n\n${message}`)}`;
    
    // Simulate processing delay
    await this.simulateFormSubmission();
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Reset form
    form.reset();
    
    // Reset button
    submitBtn.style.transform = 'scale(1)';
    submitBtn.querySelector('span').textContent = originalText;
    
    // Show success modal
    this.showSuccessModal();
  }

  createRippleEffect(button) {
    const ripple = document.createElement('span');
    ripple.classList.add('btn-ripple');
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (rect.width / 2 - size / 2) + 'px';
    ripple.style.top = (rect.height / 2 - size / 2) + 'px';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  simulateFormSubmission() {
    return new Promise(resolve => {
      setTimeout(resolve, 1500);
    });
  }

  showSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (!modal) return;

    modal.classList.remove('hidden');
    
    // Close modal events
    const closeBtn = document.getElementById('modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');
    
    const closeModal = () => {
      modal.classList.add('hidden');
    };
    
    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeModal();
    });
  }

  // Floating Action Button
  initFloatingActionButton() {
    const fab = document.getElementById('back-to-top');
    if (!fab) return;

    fab.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  updateFloatingButton() {
    const fab = document.getElementById('back-to-top');
    if (!fab) return;

    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    
    if (window.scrollY > 500) {
      fab.classList.add('visible');
    } else {
      fab.classList.remove('visible');
    }

    // Update progress ring
    const progressCircle = fab.querySelector('.progress-circle');
    if (progressCircle) {
      const circumference = 2 * Math.PI * 20; // r = 20
      const offset = circumference - (scrollPercent / 100) * circumference;
      progressCircle.style.strokeDashoffset = offset;
    }
  }

  // Scroll Progress
  initScrollProgress() {
    this.scrollProgress = document.getElementById('scroll-progress');
  }

  updateScrollProgress() {
    if (!this.scrollProgress) return;

    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    this.scrollProgress.style.transform = `scaleX(${scrollPercent / 100})`;
  }

  // Navbar Updates
  updateNavbar() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Update active nav link
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  // Scroll Animations Handler
  handleScrollAnimations() {
    // Parallax effect for background elements
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-shape');
    
    parallaxElements.forEach((element, index) => {
      const speed = 0.5 + (index * 0.2);
      const yPos = -(scrolled * speed);
      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });

    // Hero parallax
    const hero = document.querySelector('.hero');
    if (hero && scrolled < hero.offsetHeight) {
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
  }

  // Glitch Effect
  initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.glitch');
    
    glitchElements.forEach(element => {
      setInterval(() => {
        if (Math.random() > 0.95) {
          element.classList.add('glitch-active');
          setTimeout(() => {
            element.classList.remove('glitch-active');
          }, 200);
        }
      }, 100);
    });
  }

  // Typewriter Effect
  initTypewriterEffect() {
    const typewriterElement = document.querySelector('.typewriter');
    if (!typewriterElement) return;

    const text = typewriterElement.textContent;
    typewriterElement.textContent = '';
    typewriterElement.style.width = '0';
    
    setTimeout(() => {
      let i = 0;
      const typeChar = () => {
        if (i < text.length) {
          typewriterElement.textContent += text.charAt(i);
          i++;
          setTimeout(typeChar, 50);
        }
      };
      typeChar();
      
      // Animate width
      typewriterElement.style.animation = 'typewriter 2.5s steps(40) forwards, blink 1s infinite 3s';
    }, 1500);
  }

  // Smooth Scrolling
  initSmoothScrolling() {
    // Handle navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        
        if (target) {
          const navHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = target.offsetTop - navHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });

    // Handle buttons with data-scroll attribute
    document.querySelectorAll('[data-scroll]').forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const targetSelector = button.dataset.scroll;
        const target = document.querySelector(targetSelector);
        
        if (target) {
          const navHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = target.offsetTop - navHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // Utility Functions
  throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  handleResize() {
    // Reinitialize cursor on resize
    if (window.innerWidth <= 768) {
      if (this.cursor) {
        this.cursor.style.display = 'none';
        this.cursorTrail.style.display = 'none';
      }
    } else {
      if (this.cursor) {
        this.cursor.style.display = 'block';
        this.cursorTrail.style.display = 'block';
      }
    }
  }
}

// Enhanced Button Effects
class ButtonEffects {
  constructor() {
    this.initButtonAnimations();
  }

  initButtonAnimations() {
    document.querySelectorAll('.btn-3d').forEach(button => {
      button.addEventListener('mouseenter', () => {
        this.createParticles(button);
      });
      
      button.addEventListener('click', (e) => {
        this.createClickEffect(button, e);
      });
    });
  }

  createParticles(button) {
    const particlesContainer = button.querySelector('.btn-particles');
    if (!particlesContainer) return;

    for (let i = 0; i < 6; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: currentColor;
        border-radius: 50%;
        pointer-events: none;
        top: 50%;
        left: 50%;
        animation: particleExplode 1s ease-out forwards;
        animation-delay: ${i * 0.1}s;
      `;
      
      particlesContainer.appendChild(particle);
      
      setTimeout(() => particle.remove(), 1000);
    }
  }

  createClickEffect(button, event) {
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const ripple = document.createElement('div');
    ripple.classList.add('btn-ripple');
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  }
}

// Performance Monitor
class PerformanceMonitor {
  constructor() {
    this.initPerformanceTracking();
  }

  initPerformanceTracking() {
    // Monitor FPS
    let lastTime = performance.now();
    let frameCount = 0;
    
    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        
        if (fps < 30) {
          this.enablePerformanceMode();
        }
        
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(measureFPS);
    };
    
    requestAnimationFrame(measureFPS);
  }

  enablePerformanceMode() {
    document.body.classList.add('performance-mode');
    
    // Reduce animation complexity
    document.querySelectorAll('.floating-shape').forEach(shape => {
      shape.style.display = 'none';
    });
    
    // Disable particle system
    const particles = document.getElementById('particles');
    if (particles) particles.style.display = 'none';
    
    console.log('🔧 Performance mode enabled - reducing visual effects');
  }
}

// Keyboard Navigation Enhancement
class KeyboardNavigationEnhancer {
  constructor() {
    this.initKeyboardNavigation();
  }

  initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      const sections = ['home', 'about', 'experience', 'skills', 'projects', 'education', 'achievements', 'contact'];
      const currentHash = window.location.hash.replace('#', '') || 'home';
      const currentIndex = sections.indexOf(currentHash);
      
      let nextIndex = currentIndex;
      
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        nextIndex = Math.min(currentIndex + 1, sections.length - 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        nextIndex = Math.max(currentIndex - 1, 0);
      }
      
      if (nextIndex !== currentIndex) {
        e.preventDefault();
        const targetSection = document.getElementById(sections[nextIndex]);
        if (targetSection) {
          const navHeight = document.querySelector('.navbar').offsetHeight;
          const targetPosition = targetSection.offsetTop - navHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  }
}

// Experience Timeline Effects
class ExperienceTimelineEffects {
  constructor() {
    this.initTimelineEffects();
  }

  initTimelineEffects() {
    this.observeTimelineItems();
    this.addInteractiveEffects();
  }

  observeTimelineItems() {
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const item = entry.target;
          const delay = Array.from(item.parentNode.children).indexOf(item) * 300;
          
          setTimeout(() => {
            item.classList.add('animate-in');
            this.animateTimelineDot(item);
          }, delay);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px'
    });

    document.querySelectorAll('.experience-item').forEach(item => {
      timelineObserver.observe(item);
    });
  }

  animateTimelineDot(item) {
    const dot = item.querySelector('.experience-dot');
    if (dot) {
      dot.style.animation = 'dotPulse 0.6s ease-out';
    }
  }

  addInteractiveEffects() {
    document.querySelectorAll('.experience-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        this.highlightTimelineConnection(card);
      });

      card.addEventListener('mouseleave', () => {
        this.resetTimelineConnection(card);
      });
    });
  }

  highlightTimelineConnection(card) {
    const item = card.closest('.experience-item');
    const dot = item.querySelector('.experience-dot');
    const timelineLine = document.querySelector('.timeline-line');
    
    if (dot) {
      dot.style.transform = 'translateX(-50%) scale(1.3)';
      dot.style.boxShadow = '0 0 30px currentColor';
    }
    
    if (timelineLine) {
      timelineLine.style.opacity = '0.8';
    }
  }

  resetTimelineConnection(card) {
    const item = card.closest('.experience-item');
    const dot = item.querySelector('.experience-dot');
    const timelineLine = document.querySelector('.timeline-line');
    
    if (dot) {
      dot.style.transform = 'translateX(-50%) scale(1)';
      dot.style.boxShadow = '';
    }
    
    if (timelineLine) {
      timelineLine.style.opacity = '0.3';
    }
  }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Main portfolio functionality
  new UltraModernPortfolio();
  
  // Button effects
  new ButtonEffects();
  
  // Performance monitoring
  new PerformanceMonitor();
  
  // Keyboard navigation
  new KeyboardNavigationEnhancer();

  // Experience timeline effects
  new ExperienceTimelineEffects();
  
  // Add dynamic CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes particleExplode {
      0% {
        opacity: 1;
        transform: scale(1);
      }
      100% {
        opacity: 0;
        transform: scale(0) translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
      }
    }
    
    @keyframes dotPulse {
      0% {
        transform: translateX(-50%) scale(1);
      }
      50% {
        transform: translateX(-50%) scale(1.5);
        box-shadow: 0 0 25px currentColor;
      }
      100% {
        transform: translateX(-50%) scale(1);
      }
    }

    @keyframes slideInRight {
      0% {
        opacity: 0;
        transform: translateX(-100px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideInLeft {
      0% {
        opacity: 0;
        transform: translateX(100px);
      }
      100% {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    .performance-mode .floating-shape,
    .performance-mode .particles,
    .performance-mode .cursor-trail {
      display: none !important;
    }
    
    .performance-mode * {
      animation-duration: 0.3s !important;
      transition-duration: 0.3s !important;
    }
    
    .cert-card,
    .achievement-item,
    .experience-item {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    
    .cert-card.animate-in,
    .achievement-item.animate-in {
      opacity: 1;
      transform: translateY(0);
    }

    .current-position.animate-in {
      animation: slideInRight 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }

    .previous-position.animate-in {
      animation: slideInLeft 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
    }

    /* Screen reader only utility */
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `;
  document.head.appendChild(style);

  console.log('✨ Portfolio fully loaded for Abhishek Kr. Giri with enhanced experience timeline!');
});

// Contact information and data for future reference
window.portfolioData = {
  owner: "Abhishek Kr. Giri",
  title: "R&D Full Stack Intern & AI Data Trainer",
  email: "mrabhi837@gmail.com",
  phone: "+91 7814970934",
  location: "Amritsar, Punjab, 143001",
  github: "https://github.com/Developer-boy1",
  linkedin: "https://www.linkedin.com/in/abhi-2512-giri",
  technologies: ["React", "JavaScript", "HTML5", "CSS3", "Java", "Python", "PHP", "AI/ML", "Node.js", "SQL", "Git"],
  projects: 7,
  certifications: 8,
  experience: "1+ years",
  currentPosition: "R&D Full Stack Intern at Sonetel Software Solution Pvt. Ltd",
  previousPosition: "AI Data Trainer at Invisible Technologies"
};

console.log('🎯 Portfolio loaded for:', window.portfolioData.owner);
console.log('🚀 Current Position:', window.portfolioData.currentPosition);