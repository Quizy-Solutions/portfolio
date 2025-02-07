// Initialize AOS with one-time animation
AOS.init({
    duration: 1000,
    offset: 100,
    once: true, // Only animate once
    mirror: false
});

// Smooth scroll reveal effect
const createSmoothScroll = () => {
    const sections = document.querySelectorAll('section');
    let animatedSections = new Set();

    const revealSection = (section) => {
        if (animatedSections.has(section)) return;

        const slideIn = section.querySelectorAll('.slide-in');
        const fadeIn = section.querySelectorAll('.fade-in');
        const scaleIn = section.querySelectorAll('.scale-in');

        slideIn.forEach((el, i) => {
            el.style.animation = `slideInRight 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.1}s forwards`;
        });

        fadeIn.forEach((el, i) => {
            el.style.animation = `fadeIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.1}s forwards`;
        });

        scaleIn.forEach((el, i) => {
            el.style.animation = `scaleIn 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.1}s forwards`;
        });

        animatedSections.add(section);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                revealSection(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    sections.forEach(section => observer.observe(section));
};

// Initialize smooth scroll
createSmoothScroll();

// Smooth navigation with progress indicator
const smoothScroll = (target) => {
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;

    const animation = (currentTime) => {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        
        const easeInOutCubic = progress => {
            return progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
        };
        
        window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));
        
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        }
    };

    requestAnimationFrame(animation);
};

// Navigation click handler
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        smoothScroll(target);
    });
});

// Progress bar animation
const updateProgress = () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    requestAnimationFrame(() => {
        document.querySelector('.scroll-progress').style.setProperty('--scroll', `${scrolled}%`);
    });
};

window.addEventListener('scroll', updateProgress);

// Smooth parallax effect for hero section
const heroSection = document.querySelector('#home');
const heroContent = heroSection.querySelector('.text-center');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * 0.5;
    
    heroContent.style.transform = `translate3d(0, ${rate}px, 0)`;
    heroContent.style.opacity = 1 - Math.max(0, Math.min(1, scrolled / window.innerHeight));
});

// Smooth reveal animation for skill cards
const skillCards = document.querySelectorAll('.skill-card');

const revealSkills = () => {
    skillCards.forEach((card, index) => {
        card.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
        card.classList.add('reveal');
    });
};

// Intersection Observer for skill cards
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            revealSkills();
        }
    });
}, {
    threshold: 0.2
});

document.querySelector('#skills').querySelectorAll('.skill-card').forEach(card => {
    skillsObserver.observe(card);
});

// Navbar scroll effect
const navbar = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Parallax effect for hero section
document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    document.querySelector('.hero-text').style.transform = 
        `translate(${moveX}px, ${moveY}px)`;
});

// Typing effect for skills
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        item.style.transition = 'all 0.5s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
    }, index * 200);
});

// Magnetic effect for buttons
document.querySelectorAll('.magnetic-wrap').forEach(wrap => {
    const area = wrap.querySelector('.magnetic-area');
    const button = wrap.querySelector('button');
    
    wrap.addEventListener('mousemove', e => {
        const position = wrap.getBoundingClientRect();
        const x = e.pageX - position.left - position.width / 2;
        const y = e.pageY - position.top - position.height / 2;
        
        button.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
    });
    
    wrap.addEventListener('mouseout', () => {
        button.style.transform = 'translate(0px, 0px)';
    });
});

// Scroll indicator
const sections = document.querySelectorAll('section');
const scrollDots = document.querySelectorAll('.scroll-dot');

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const index = Array.from(sections).indexOf(entry.target);
            scrollDots.forEach(dot => dot.classList.remove('active'));
            scrollDots[index].classList.add('active');
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

// Glitch effect intensity on scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const glitch = document.querySelector('.glitch');
    const intensity = Math.min(scrolled / 1000, 1);
    glitch.style.setProperty('--glitch-intensity', intensity);
});

// Particle system
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';
canvas.style.pointerEvents = 'none';

const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.reset();
        }
    }

    draw() {
        ctx.fillStyle = `rgba(0, 127, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Create particles
for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animate);
}

animate();

// Add more cool effects here...

const initSkillProgress = () => {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        const progress = item.querySelector('.skill-progress');
        const progressValue = progress.dataset.progress;
        progress.style.setProperty('--progress', `${progressValue}%`);
    });
};

// Initialize skill progress bars
initSkillProgress();

// Add hover effect for skill cards
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        const items = card.querySelectorAll('.skill-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateX(5px)';
            }, index * 100);
        });
    });

    card.addEventListener('mouseleave', () => {
        const items = card.querySelectorAll('.skill-item');
        items.forEach((item, index) => {
            setTimeout(() => {
                item.style.transform = 'translateX(0)';
            }, index * 100);
        });
    });
}); 