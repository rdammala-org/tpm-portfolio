// Mobile navigation toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile nav when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// Scroll reveal animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply reveal animation to sections
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Theme toggle: persist choice in localStorage and apply on load
(function(){
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const saved = localStorage.getItem('theme') || 'light';
    if (saved === 'dark') {
        html.setAttribute('data-theme','dark');
        if (themeToggle) themeToggle.textContent = '☀️';
    } else {
        html.removeAttribute('data-theme');
        if (themeToggle) themeToggle.textContent = '🌙';
    }
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = html.getAttribute('data-theme') === 'dark';
            if (isDark) {
                html.removeAttribute('data-theme');
                localStorage.setItem('theme','light');
                themeToggle.textContent = '🌙';
            } else {
                html.setAttribute('data-theme','dark');
                localStorage.setItem('theme','dark');
                themeToggle.textContent = '☀️';
            }
        });
    }
})();
