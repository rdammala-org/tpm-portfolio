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

// Theme toggle: use system preference on first load, preserve manual override
(function(){
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const mediaQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

    function applyTheme(theme, persist = false) {
        if (theme === 'dark') {
            html.setAttribute('data-theme', 'dark');
            if (themeToggle) themeToggle.textContent = '☀️';
        } else {
            html.removeAttribute('data-theme');
            if (themeToggle) themeToggle.textContent = '🌙';
        }

        if (persist) {
            localStorage.setItem('theme', theme);
        }
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
        applyTheme(savedTheme);
    } else {
        const systemTheme = mediaQuery && mediaQuery.matches ? 'dark' : 'light';
        applyTheme(systemTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme, true);
        });
    }

    if (mediaQuery) {
        mediaQuery.addEventListener('change', (event) => {
            const hasManualOverride = localStorage.getItem('theme');
            if (!hasManualOverride) {
                applyTheme(event.matches ? 'dark' : 'light');
            }
        });
    }
})();
