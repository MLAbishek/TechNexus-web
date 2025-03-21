// components.js

// Navigation Menu Component
class NavigationMenu {
    constructor(menuSelector) {
        this.menu = document.querySelector(menuSelector);
        this.init();
    }

    init() {
        this.menu.addEventListener('click', (event) => {
            if (event.target.tagName === 'A') {
                this.handleMenuClick(event.target);
            }
        });
    }

    handleMenuClick(link) {
        const targetSection = document.querySelector(link.getAttribute('href'));
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }
    }
}

// Modal Component
class Modal {
    constructor(modalSelector) {
        this.modal = document.querySelector(modalSelector);
        this.closeButton = this.modal.querySelector('.close');
        this.init();
    }

    init() {
        this.closeButton.addEventListener('click', () => this.close());
    }

    open() {
        this.modal.style.display = 'block';
    }

    close() {
        this.modal.style.display = 'none';
    }
}

class UIComponents {
    constructor() {
        this.initializeComponents();
    }

    initializeComponents() {
        this.initializeEventSlider();
        this.initializeScrollProgress();
        this.initializeAnimatedCounters();
        this.initializeTooltips();
    }

    // Event Slider Component
    initializeEventSlider() {
        const slider = {
            container: document.querySelector('.events-slider'),
            cards: Array.from(document.querySelectorAll('.event-card')),
            currentIndex: 0,

            init() {
                if (!this.container || this.cards.length < 2) return;

                this.addNavigationButtons();
                this.startAutoSlide();
            },

            addNavigationButtons() {
                const prevBtn = document.createElement('button');
                const nextBtn = document.createElement('button');

                prevBtn.className = 'slider-nav prev';
                nextBtn.className = 'slider-nav next';
                prevBtn.innerHTML = '&#8592;';
                nextBtn.innerHTML = '&#8594;';

                prevBtn.addEventListener('click', () => this.slide('prev'));
                nextBtn.addEventListener('click', () => this.slide('next'));

                this.container.parentElement.appendChild(prevBtn);
                this.container.parentElement.appendChild(nextBtn);
            },

            slide(direction) {
                this.currentIndex = direction === 'next'
                    ? (this.currentIndex + 1) % this.cards.length
                    : (this.currentIndex - 1 + this.cards.length) % this.cards.length;

                this.updateSlider();
            },

            updateSlider() {
                const offset = -this.currentIndex * 100;
                this.container.style.transform = `translateX(${offset}%)`;
            },

            startAutoSlide() {
                setInterval(() => this.slide('next'), 5000);
            }
        };

        slider.init();
    }

    // Scroll Progress Indicator
    initializeScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = `${scrolled}%`;
        });
    }

    // Animated Counters
    initializeAnimatedCounters() {
        const counters = document.querySelectorAll('.counter');

        const animateCounter = (counter) => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / 200;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => animateCounter(counter), 1);
            } else {
                counter.innerText = target;
            }
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, {
            threshold: 0.5
        });

        counters.forEach(counter => observer.observe(counter));
    }

    // Custom Tooltips
    initializeTooltips() {
        const tooltips = document.querySelectorAll('[data-tooltip]');

        tooltips.forEach(element => {
            const tooltipText = element.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = tooltipText;

            element.addEventListener('mouseenter', (e) => {
                document.body.appendChild(tooltip);
                const rect = element.getBoundingClientRect();
                tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
                tooltip.style.left = `${rect.left + (rect.width - tooltip.offsetWidth) / 2}px`;
                tooltip.style.opacity = '1';
            });

            element.addEventListener('mouseleave', () => {
                tooltip.remove();
            });
        });
    }
}

// Initialize components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new UIComponents();
});

// Exporting components for use in main.js
export { NavigationMenu, Modal, UIComponents };