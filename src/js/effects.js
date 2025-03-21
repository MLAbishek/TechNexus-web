class DynamicEffects {
    constructor() {
        this.initParticles();
        this.initMagneticButtons();
        this.initTiltCards();
        this.initFloatingElements();
    }

    initParticles() {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80 },
                color: { value: '#2563eb' },
                shape: { type: 'circle' },
                opacity: {
                    value: 0.5,
                    random: true
                },
                size: {
                    value: 3,
                    random: true
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: true,
                    out_mode: 'out'
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'repulse'
                    }
                }
            }
        });
    }

    initMagneticButtons() {
        document.querySelectorAll('.magnetic-button').forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                button.style.transform = `
                    perspective(800px)
                    rotateX(${y * -0.05}deg)
                    rotateY(${x * 0.05}deg)
                    translateX(${x * 0.5}px)
                    translateY(${y * 0.5}px)
                `;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
            });
        });
    }

    initTiltCards() {
        document.querySelectorAll('.tilt-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) * -0.1;
                const rotateY = (x - centerX) * 0.1;

                card.style.transform = `
                    perspective(1000px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    scale3d(1.02, 1.02, 1.02)
                `;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }

    initFloatingElements() {
        const container = document.createElement('div');
        container.className = 'floating-elements';

        for (let i = 0; i < 10; i++) {
            const element = document.createElement('div');
            element.className = 'floating-element';
            element.style.setProperty('--tx', `${Math.random() * 100 - 50}%`);
            element.style.setProperty('--ty', `${Math.random() * 100 - 50}%`);
            element.style.left = `${Math.random() * 100}%`;
            element.style.top = `${Math.random() * 100}%`;
            element.style.width = `${Math.random() * 50 + 20}px`;
            element.style.height = element.style.width;
            container.appendChild(element);
        }

        document.querySelector('.hero-section').appendChild(container);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DynamicEffects();
});