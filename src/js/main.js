// Main JavaScript entry point for Tech Nexus webpage

// Function to initialize the webpage
function init() {
    console.log("Tech Nexus webpage initialized");
    // Add event listeners or other initialization code here
}

// Event listener for DOMContentLoaded to ensure the DOM is fully loaded before running scripts
document.addEventListener("DOMContentLoaded", init);

// Navigation and Hamburger Menu
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    // Hamburger Menu Toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
        links.forEach(link => {
            link.classList.toggle('fade');
        });
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Active Navigation Link Highlight
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.about-card, .service-card, .event-card');

    const revealOnScroll = () => {
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.classList.add('reveal');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check on load

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Form validation and submission logic
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => formObject[key] = value);

            // Simple form validation feedback
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    // Events Slider
    let currentSlide = 0;
    const slides = document.querySelectorAll('.event-card');
    const slideInterval = 5000; // 5 seconds

    function nextSlide() {
        slides[currentSlide].style.opacity = '0';
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].style.opacity = '1';
    }

    if (slides.length > 1) {
        setInterval(nextSlide, slideInterval);
    }

    // Intersection Observer for Animation Triggers
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-text, .animate-text-delay').forEach(el => {
        observer.observe(el);
    });

    // Magnetic card effect
    const cards = document.querySelectorAll('.about-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;

            card.style.transform = `perspective(1000px) 
                rotateX(${deltaY * 5}deg) 
                rotateY(${deltaX * 5}deg)
                translateZ(10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // Split text animation
    const headings = document.querySelectorAll('h2, h3');
    headings.forEach(heading => {
        const text = heading.textContent;
        heading.innerHTML = '';
        [...text].forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.animationDelay = `${i * 0.05}s`;
            heading.appendChild(span);
        });
    });
});

// Window Resize Handler
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.querySelector('.hamburger');
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
    }
});

// Mouse trail effect with custom shapes
class ParticleTrail {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mousePos = { x: 0, y: 0 };

        this.setupCanvas();
        this.bindEvents();
        this.animate();
    }

    setupCanvas() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        document.body.appendChild(this.canvas);
        this.resizeCanvas();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mousePos.x = e.clientX;
            this.mousePos.y = e.clientY;
            this.addParticle();
        });
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    addParticle() {
        this.particles.push({
            x: this.mousePos.x,
            y: this.mousePos.y,
            size: Math.random() * 15 + 5,
            speedX: Math.random() * 4 - 2,
            speedY: Math.random() * 4 - 2,
            life: 1
        });
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, index) => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.life -= 0.02;

            if (particle.life <= 0) {
                this.particles.splice(index, 1);
                return;
            }

            this.ctx.save();
            this.ctx.translate(particle.x, particle.y);
            this.ctx.rotate(particle.life * Math.PI);
            this.ctx.beginPath();
            this.ctx.moveTo(0, 0 - particle.size);
            for (let i = 0; i < 3; i++) {
                this.ctx.rotate(Math.PI * 2 / 3);
                this.ctx.lineTo(0, 0 - particle.size);
            }
            this.ctx.closePath();
            this.ctx.fillStyle = `rgba(100, 255, 218, ${particle.life})`;
            this.ctx.fill();
            this.ctx.restore();
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Custom cursor
class CustomCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursor.className = 'custom-cursor';
        document.body.appendChild(this.cursor);

        this.cursorTrail = document.createElement('div');
        this.cursorTrail.className = 'cursor-trail';
        document.body.appendChild(this.cursorTrail);

        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
            this.cursorTrail.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
        });

        document.querySelectorAll('a, button, .about-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('cursor-hover');
                this.cursorTrail.classList.add('cursor-hover');
            });

            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('cursor-hover');
                this.cursorTrail.classList.remove('cursor-hover');
            });
        });
    }
}

// Dynamic text scramble effect
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise(resolve => this.resolve = resolve);
        this.queue = [];

        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }

        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;

        for (let i = 0; i < this.queue.length; i++) {
            let { from, to, start, end, char } = this.queue[i];

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="scramble">${char}</span>`;
            } else {
                output += from;
            }
        }

        this.el.innerHTML = output;

        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Initialize custom effects
document.addEventListener('DOMContentLoaded', () => {
    // Initialize particle trail
    new ParticleTrail();

    // Initialize custom cursor
    new CustomCursor();

    // Initialize text scramble effect for headings
    document.querySelectorAll('h1, h2').forEach(heading => {
        const scramble = new TextScramble(heading);
        let counter = 0;
        const nextText = () => {
            scramble.setText(heading.dataset.text || heading.textContent)
                .then(() => {
                    if (counter < 1) {
                        setTimeout(nextText, 3000);
                        counter++;
                    }
                });
        };
        nextText();
    });

    // ...existing code...
});