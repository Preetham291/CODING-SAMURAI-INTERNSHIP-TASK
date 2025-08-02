function createParticles() {
    const bg = document.getElementById('animatedBg');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = Math.random() * 5 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';

        bg.appendChild(particle);
    }
}

function createGlowingBoxes() {
    const heroCanvas = document.getElementById('heroCanvas');
    const boxCount = 8;

    for (let i = 0; i < boxCount; i++) {
        const box = document.createElement('div');
        box.className = 'glowing-box';

        const width = Math.random() * 100 + 50;
        const height = Math.random() * 60 + 30;
        box.style.width = width + 'px';
        box.style.height = height + 'px';
        box.style.left = Math.random() * (window.innerWidth - width) + 'px';
        box.style.top = Math.random() * (window.innerHeight - height) + 'px';
        box.style.animationDelay = Math.random() * 8 + 's';
        box.style.animationDuration = (Math.random() * 4 + 6) + 's';

        heroCanvas.appendChild(box);
    }

    setInterval(() => {
        const boxes = heroCanvas.querySelectorAll('.glowing-box');
        if (boxes.length > 0) {
            const randomBox = boxes[Math.floor(Math.random() * boxes.length)];
            randomBox.style.left = Math.random() * (window.innerWidth - 100) + 'px';
            randomBox.style.top = Math.random() * (window.innerHeight - 60) + 'px';
        }
    }, 3000);
}
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

function checkVisibility() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.9)';
    }
}
document.querySelector('.contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! I\'ll get back to you soon.');
    this.reset();
});

window.addEventListener('scroll', () => {
    checkVisibility();
    updateNavbar();
});

window.addEventListener('load', () => {
    createParticles();
    createGlowingBoxes();
    checkVisibility();
});

window.addEventListener('resize', () => {
    const heroCanvas = document.getElementById('heroCanvas');
    const boxes = heroCanvas.querySelectorAll('.glowing-box');
    boxes.forEach(box => {
        const rect = box.getBoundingClientRect();
        if (rect.left + rect.width > window.innerWidth) {
            box.style.left = Math.random() * (window.innerWidth - rect.width) + 'px';
        }
        if (rect.top + rect.height > window.innerHeight) {
            box.style.top = Math.random() * (window.innerHeight - rect.height) + 'px';
        }
    });
});
const navLinks = document.querySelector('.nav-links');

window.addEventListener('resize', () => {
    if (window.innerWidth <= 480) {}
});

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero h1');
    const originalText = heroTitle.textContent;
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 100);
    }, 500);
});