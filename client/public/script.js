// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    
    // Create particles
    createParticles();
    
    // Add interaction handlers
    addInteractionHandlers();
    
    // Start continuous animations
    startContinuousAnimations();
});

// Initialize entrance animations
function initializeAnimations() {
    const elements = [
        { selector: '.header', delay: 0 },
        { selector: '.logo-container', delay: 200 },
        { selector: '.desktop-nav', delay: 400 },
        { selector: '.theme-toggle', delay: 600 },
        { selector: '.main-heading', delay: 800 },
        { selector: '.subtitle', delay: 1200 },
        { selector: '.cta-container', delay: 1600 },
        { selector: '.mobile-nav', delay: 1000 }
    ];
    
    elements.forEach(({ selector, delay }) => {
        const element = document.querySelector(selector);
        if (element) {
            setTimeout(() => {
                element.classList.add('fade-in');
            }, delay);
        }
    });
}

// Create animated particles
function createParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, i);
    }
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    // Random positioning
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    
    particle.style.left = x + '%';
    particle.style.top = y + '%';
    
    // Random animation delay and duration
    const delay = Math.random() * 2;
    const duration = Math.random() * 3 + 2;
    
    particle.style.animationDelay = delay + 's';
    particle.style.animationDuration = duration + 's';
    
    container.appendChild(particle);
    
    // Recreate particle after animation completes
    setTimeout(() => {
        particle.remove();
        createParticle(container, index);
    }, (duration + delay) * 1000);
}

// Add interaction handlers
function addInteractionHandlers() {
    // Navigation links
    addNavigationHandlers();
    
    // CTA button
    addCTAHandler();
    
    // Theme toggle
    addThemeToggleHandler();
    
    // Logo hover
    addLogoHoverHandler();
    
    // Scroll effects
    addScrollEffects();
}

function addNavigationHandlers() {
    // Desktop navigation
    const desktopNavLinks = document.querySelectorAll('.nav-link');
    desktopNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            desktopNavLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Hover effects
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Mobile navigation
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            mobileNavItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

function addCTAHandler() {
    const ctaButton = document.querySelector('.cta-button');
    
    ctaButton.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.95)';
        
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            this.style.transform = '';
            ripple.remove();
        }, 150);
        
        // You can add actual functionality here
        console.log('Check for breach clicked!');
    });
    
    // Hover effects
    ctaButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 20px 40px rgba(52, 41, 211, 0.3)';
    });
    
    ctaButton.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    });
}

function addThemeToggleHandler() {
    const themeToggle = document.querySelector('.theme-toggle');
    
    themeToggle.addEventListener('click', function() {
        // Add rotation animation
        this.style.transform = 'rotate(180deg) scale(0.9)';
        
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
        
        // You can add theme switching logic here
        console.log('Theme toggle clicked!');
    });
    
    // Hover effects
    themeToggle.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.background = 'rgba(255, 255, 255, 0.2)';
    });
    
    themeToggle.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.background = 'rgba(255, 255, 255, 0.1)';
    });
}

function addLogoHoverHandler() {
    const logoContainer = document.querySelector('.logo-container');
    
    logoContainer.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    logoContainer.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
    
    logoContainer.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        console.log('Logo clicked!');
    });
}

function addScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrollY = window.scrollY;
        const header = document.querySelector('.header');
        
        // Add background blur to header on scroll
        if (scrollY > 50) {
            header.style.background = 'rgba(0, 0, 0, 0.8)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'transparent';
            header.style.backdropFilter = 'none';
        }
        
        ticking = false;
    }
    
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestScrollUpdate);
}

function startContinuousAnimations() {
    // Animate text glow effect
    animateTextGlow();
    
    // Animate background orbs with mouse movement
    addMouseMoveEffect();
}

function animateTextGlow() {
    const ctaText = document.querySelector('.cta-text');
    
    setInterval(() => {
        ctaText.style.textShadow = '0 0 20px rgba(255,255,255,0.5)';
        
        setTimeout(() => {
            ctaText.style.textShadow = '0 0 30px rgba(52,41,211,0.8)';
        }, 1000);
        
        setTimeout(() => {
            ctaText.style.textShadow = '0 0 20px rgba(255,255,255,0.5)';
        }, 2000);
    }, 2000);
}

function addMouseMoveEffect() {
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX / window.innerWidth;
        mouseY = e.clientY / window.innerHeight;
        
        // Move background orbs slightly based on mouse position
        const orb1 = document.querySelector('.orb-1');
        const orb2 = document.querySelector('.orb-2');
        
        if (orb1) {
            const moveX = (mouseX - 0.5) * 20;
            const moveY = (mouseY - 0.5) * 20;
            orb1.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
        
        if (orb2) {
            const moveX = (mouseX - 0.5) * -15;
            const moveY = (mouseY - 0.5) * -15;
            orb2.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
}

// Add ripple animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Resize handler for responsive adjustments
window.addEventListener('resize', function() {
    // Adjust particle count based on screen size
    const particlesContainer = document.querySelector('.particles-container');
    const currentParticles = particlesContainer.children.length;
    const targetParticles = window.innerWidth < 768 ? 10 : 20;
    
    if (currentParticles !== targetParticles) {
        // Clear and recreate particles
        particlesContainer.innerHTML = '';
        for (let i = 0; i < targetParticles; i++) {
            createParticle(particlesContainer, i);
        }
    }
});

// Performance optimization for animations
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Preload any heavy animations or effects
        console.log('Animations optimized for performance');
    });
}