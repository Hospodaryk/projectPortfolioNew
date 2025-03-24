// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Here you would typically send the data to a server
    console.log('Form submitted:', data);

    // Show success message
    alert('Дякуємо за ваше повідомлення! Ми зв\'яжемося з вами найближчим часом.');

    // Reset form
    this.reset();
  });
}

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    navbar.classList.remove('scroll-up');
    return;
  }

  if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
    // Scroll Down
    navbar.classList.remove('scroll-up');
    navbar.classList.add('scroll-down');
  } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
    // Scroll Up
    navbar.classList.remove('scroll-down');
    navbar.classList.add('scroll-up');
  }
  lastScroll = currentScroll;
});

// Add animation to project cards on scroll
const projectCards = document.querySelectorAll('.project-card');

const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

projectCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(card);
});

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const icon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateIcon(newTheme);
});

function updateIcon(theme) {
  icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Scroll spy for navigation
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

// Language toggle functionality
const languageToggle = document.querySelector('.language-toggle');
const html = document.documentElement;

// Check for saved language preference
const savedLang = localStorage.getItem('language') || 'uk';
html.setAttribute('data-lang', savedLang);

languageToggle.addEventListener('click', () => {
  const currentLang = html.getAttribute('data-lang');
  const newLang = currentLang === 'uk' ? 'en' : 'uk';

  html.setAttribute('data-lang', newLang);
  localStorage.setItem('language', newLang);

  // Update aria-label
  languageToggle.setAttribute('aria-label', newLang === 'uk' ? 'Змінити мову' : 'Change language');
  themeToggle.setAttribute('aria-label', newLang === 'uk' ? 'Перемкнути тему' : 'Toggle theme');
});

// Мобільне меню
const menuToggle = document.querySelector('.menu-toggle');
const mobileNavLinks = document.querySelector('.nav-links');
const menuOverlay = document.querySelector('.menu-overlay');

function toggleMenu() {
  mobileNavLinks.classList.toggle('active');
  menuOverlay.classList.toggle('active');
  menuToggle.classList.toggle('active');
  menuToggle.setAttribute('aria-label',
    mobileNavLinks.classList.contains('active') ? 'Закрити меню' : 'Відкрити меню'
  );
}

menuToggle.addEventListener('click', toggleMenu);
menuOverlay.addEventListener('click', toggleMenu);

// Закриваємо меню при кліку на посилання
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (mobileNavLinks.classList.contains('active')) {
      toggleMenu();
    }
  });
});

// Закриваємо меню при зміні розміру вікна
window.addEventListener('resize', () => {
  if (window.innerWidth > 768 && mobileNavLinks.classList.contains('active')) {
    toggleMenu();
  }
}); 