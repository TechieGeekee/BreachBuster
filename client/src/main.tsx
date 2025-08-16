import "./index.css";

// Global variables
let currentPage = 'home';
let isLoading = true;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start loading sequence
    startLoadingSequence();
    
    // Initialize everything after loading
    setTimeout(() => {
        finishLoading();
    }, 4000); // 4 seconds loading time
});

// Loading sequence
function startLoadingSequence() {
    createLoadingParticles();
    
    // Update loading text
    const loadingTexts = [
        'Initializing Security Protocols...',
        'Scanning Network Infrastructure...',
        'Establishing Secure Connection...',
        'Ready to Protect Your Data!'
    ];
    
    const loadingTextElement = document.querySelector('.loading-text') as HTMLElement;
    let textIndex = 0;
    
    const textInterval = setInterval(() => {
        if (loadingTextElement && textIndex < loadingTexts.length - 1) {
            textIndex++;
            loadingTextElement.textContent = loadingTexts[textIndex];
        }
    }, 1000);
    
    // Clear interval after loading
    setTimeout(() => {
        clearInterval(textInterval);
    }, 4000);
}

function createLoadingParticles() {
    const particlesContainer = document.querySelector('.loading-particles');
    if (!particlesContainer) return;
    
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            createLoadingParticle(particlesContainer);
        }, Math.random() * 2000);
    }
}

function createLoadingParticle(container: Element) {
    const particle = document.createElement('div');
    particle.className = 'loading-particle';
    
    // Random positioning
    const x = Math.random() * 100;
    const y = 100 + Math.random() * 50; // Start below screen
    
    particle.style.left = x + '%';
    particle.style.top = y + '%';
    
    // Random animation delay and duration
    const delay = Math.random() * 1;
    const duration = Math.random() * 2 + 2;
    
    particle.style.animationDelay = delay + 's';
    particle.style.animationDuration = duration + 's';
    
    container.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
    }, (duration + delay) * 1000);
    
    // Create new particle if still loading
    if (isLoading) {
        setTimeout(() => {
            createLoadingParticle(container);
        }, Math.random() * 1000 + 500);
    }
}

function finishLoading() {
    isLoading = false;
    const loadingScreen = document.getElementById('loading-screen');
    
    if (loadingScreen) {
        loadingScreen.classList.add('fade-out');
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            
            // Initialize main app
            initializeApp();
        }, 500);
    }
}

function initializeApp() {
    // Initialize page animations
    initializeAnimations();
    
    // Create particles for home page
    createParticles();
    
    // Create cyber particles for security section
    createCyberParticles();
    
    // Add interaction handlers
    addInteractionHandlers();
    
    // Initialize page navigation
    initializePageNavigation();
    
    // Start continuous animations
    startContinuousAnimations();
    
    // Initialize breach check functionality
    initializeBreachCheck();
    
    // Show initial page with animation
    showPage('home');
}

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
    if (!particlesContainer) return;
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(particlesContainer, i);
    }
}

function createParticle(container: Element, index: number): void {
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
        if (particle.parentNode) {
            particle.remove();
        }
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
    
    // Page-specific interactions
    addPageInteractionHandlers();
    
    // Security section interactions
    addSecuritySectionHandlers();
}

function addNavigationHandlers() {
    // Desktop navigation hover effects
    const desktopNavLinks = document.querySelectorAll('.nav-link');
    desktopNavLinks.forEach(link => {
        link.addEventListener('mouseenter', function(this: HTMLElement) {
            this.style.transform = 'scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function(this: HTMLElement) {
            this.style.transform = '';
        });
        
        link.addEventListener('click', function(this: HTMLElement) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Mobile navigation effects
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
        item.addEventListener('click', function(this: HTMLElement) {
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

function addCTAHandler() {
    const ctaButton = document.querySelector('.cta-button');
    if (!ctaButton) return;
    
    ctaButton.addEventListener('click', function(this: HTMLElement) {
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
            if (ripple.parentNode) {
                ripple.remove();
            }
        }, 150);
        
        // You can add actual functionality here
        console.log('Check for breach clicked!');
    });
    
    // Hover effects
    ctaButton.addEventListener('mouseenter', function(this: HTMLElement) {
        this.style.transform = 'scale(1.05)';
        this.style.boxShadow = '0 20px 40px rgba(52, 41, 211, 0.3)';
    });
    
    ctaButton.addEventListener('mouseleave', function(this: HTMLElement) {
        this.style.transform = '';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    });
}

function addThemeToggleHandler() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', function(this: HTMLElement) {
        // Add rotation animation
        this.style.transform = 'rotate(180deg) scale(0.9)';
        
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
        
        // You can add theme switching logic here
        console.log('Theme toggle clicked!');
    });
    
    // Hover effects
    themeToggle.addEventListener('mouseenter', function(this: HTMLElement) {
        this.style.transform = 'scale(1.1)';
        this.style.background = 'rgba(255, 255, 255, 0.2)';
    });
    
    themeToggle.addEventListener('mouseleave', function(this: HTMLElement) {
        this.style.transform = '';
        this.style.background = 'rgba(255, 255, 255, 0.1)';
    });
}

function addLogoHoverHandler() {
    const logoContainer = document.querySelector('.logo-container');
    if (!logoContainer) return;
    
    logoContainer.addEventListener('mouseenter', function(this: HTMLElement) {
        this.style.transform = 'scale(1.05)';
    });
    
    logoContainer.addEventListener('mouseleave', function(this: HTMLElement) {
        this.style.transform = '';
    });
    
    logoContainer.addEventListener('click', function(this: HTMLElement) {
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
        if (!header) return;
        
        // Add background blur to header on scroll
        if (scrollY > 50) {
            (header as HTMLElement).style.background = 'rgba(0, 0, 0, 0.8)';
            (header as HTMLElement).style.backdropFilter = 'blur(10px)';
        } else {
            (header as HTMLElement).style.background = 'transparent';
            (header as HTMLElement).style.backdropFilter = 'none';
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
    if (!ctaText) return;
    
    setInterval(() => {
        (ctaText as HTMLElement).style.textShadow = '0 0 20px rgba(255,255,255,0.5)';
        
        setTimeout(() => {
            (ctaText as HTMLElement).style.textShadow = '0 0 30px rgba(52,41,211,0.8)';
        }, 1000);
        
        setTimeout(() => {
            (ctaText as HTMLElement).style.textShadow = '0 0 20px rgba(255,255,255,0.5)';
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
            (orb1 as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
        
        if (orb2) {
            const moveX = (mouseX - 0.5) * -15;
            const moveY = (mouseY - 0.5) * -15;
            (orb2 as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
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

// Page Navigation System
function initializePageNavigation() {
    // Handle navigation clicks
    document.addEventListener('click', (e: Event) => {
        const target = e.target as HTMLElement;
        const pageAttr = target.getAttribute('data-page');
        
        if (pageAttr) {
            e.preventDefault();
            navigateToPage(pageAttr);
        }
    });
}

function navigateToPage(pageName: string) {
    if (pageName === currentPage) return;
    
    // Update navigation active states
    updateNavigationStates(pageName);
    
    // Show the new page
    showPage(pageName);
    
    currentPage = pageName;
}

function updateNavigationStates(activePage: string) {
    // Update desktop nav
    const desktopNavLinks = document.querySelectorAll('.nav-link');
    desktopNavLinks.forEach(link => {
        const pageAttr = link.getAttribute('data-page');
        if (pageAttr === activePage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Update mobile nav
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
        const pageAttr = item.getAttribute('data-page');
        if (pageAttr === activePage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

function showPage(pageName: string) {
    // Hide all pages
    const allPages = document.querySelectorAll('.page');
    allPages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page with delay for smooth transition
    setTimeout(() => {
        const targetPage = document.getElementById(`${pageName}-page`);
        if (targetPage) {
            targetPage.classList.add('active');
            
            // Trigger page-specific animations
            triggerPageAnimations(pageName);
        }
    }, 100);
}

function triggerPageAnimations(pageName: string) {
    // Re-create particles for home page
    if (pageName === 'home') {
        const particlesContainer = document.querySelector('#home-page .particles-container');
        if (particlesContainer) {
            particlesContainer.innerHTML = '';
            for (let i = 0; i < 20; i++) {
                createParticle(particlesContainer, i);
            }
        }
    }
    
    // Animate feature cards for about page
    if (pageName === 'about') {
        const featureCards = document.querySelectorAll('.feature-card');
        featureCards.forEach((card, index) => {
            (card as HTMLElement).style.animationDelay = `${index * 0.2}s`;
            card.classList.add('scale-in');
        });
    }
    
    // Animate contact items
    if (pageName === 'contact') {
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach((item, index) => {
            (item as HTMLElement).style.animationDelay = `${index * 0.2}s`;
            item.classList.add('slide-in-left');
        });
        
        const contactForm = document.querySelector('.contact-form');
        if (contactForm) {
            contactForm.classList.add('slide-in-right');
        }
    }
    
    // Animate support categories
    if (pageName === 'support') {
        const supportCategories = document.querySelectorAll('.support-category');
        supportCategories.forEach((category, index) => {
            (category as HTMLElement).style.animationDelay = `${index * 0.2}s`;
            category.classList.add('scale-in');
        });
    }
}

// Add handlers for new page interactions
function addPageInteractionHandlers() {
    // Form submission handler
    const securityForm = document.querySelector('.security-form');
    if (securityForm) {
        securityForm.addEventListener('submit', function(e: Event) {
            e.preventDefault();
            
            const submitButton = this.querySelector('.submit-button') as HTMLElement;
            if (submitButton) {
                submitButton.style.transform = 'scale(0.95)';
                submitButton.textContent = 'Sending...';
                
                // Simulate form submission
                setTimeout(() => {
                    submitButton.style.transform = '';
                    submitButton.textContent = 'Message Sent!';
                    
                    setTimeout(() => {
                        submitButton.textContent = 'Send Message';
                    }, 2000);
                }, 1500);
            }
        });
    }
    
    // Support button handlers
    const supportButtons = document.querySelectorAll('.support-button');
    supportButtons.forEach(button => {
        button.addEventListener('click', function(this: HTMLElement) {
            this.style.transform = 'scale(0.95)';
            
            const originalText = this.textContent;
            this.textContent = 'Connecting...';
            
            setTimeout(() => {
                this.style.transform = '';
                this.textContent = originalText;
            }, 1000);
        });
        
        button.addEventListener('mouseenter', function(this: HTMLElement) {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function(this: HTMLElement) {
            this.style.transform = '';
        });
    });
    
    // Feature card interactions
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function(this: HTMLElement) {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function(this: HTMLElement) {
            this.style.transform = '';
        });
    });
    
    // Contact item interactions
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function(this: HTMLElement) {
            this.style.transform = 'translateX(10px)';
        });
        
        item.addEventListener('mouseleave', function(this: HTMLElement) {
            this.style.transform = '';
        });
    });
}

// Resize handler for responsive adjustments
window.addEventListener('resize', function() {
    // Adjust particle count based on screen size
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;
    
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

// Create cyber particles for security section
function createCyberParticles() {
    const cyberContainer = document.querySelector('.cyber-particles');
    if (!cyberContainer) return;
    
    const particleCount = 8;
    
    for (let i = 0; i < particleCount; i++) {
        createCyberParticle(cyberContainer, i);
    }
}

function createCyberParticle(container: Element, index: number): void {
    const particle = document.createElement('div');
    particle.className = 'cyber-particle';
    
    // Random positioning around the shield
    const angle = (index / 8) * 360 + Math.random() * 45;
    const radius = 80 + Math.random() * 40;
    
    const x = Math.cos(angle * Math.PI / 180) * radius;
    const y = Math.sin(angle * Math.PI / 180) * radius;
    
    particle.style.left = `calc(50% + ${x}px)`;
    particle.style.top = `calc(50% + ${y}px)`;
    particle.style.position = 'absolute';
    particle.style.width = '4px';
    particle.style.height = '4px';
    particle.style.background = `hsl(${210 + Math.random() * 60}, 70%, 60%)`;
    particle.style.borderRadius = '50%';
    particle.style.boxShadow = '0 0 10px currentColor';
    
    // Random animation delay and duration
    const delay = Math.random() * 2;
    const duration = 3 + Math.random() * 2;
    
    particle.style.animationDelay = delay + 's';
    particle.style.animationDuration = duration + 's';
    particle.style.animation = 'cyberOrbit 4s linear infinite';
    
    container.appendChild(particle);
    
    // Recreate particle after animation completes
    setTimeout(() => {
        if (particle.parentNode) {
            particle.remove();
        }
        createCyberParticle(container, index);
    }, (duration + delay) * 1000);
}

// Initialize breach check functionality
function initializeBreachCheck() {
    const checkButton = document.getElementById('breach-check-btn') as HTMLButtonElement;
    const emailInput = document.getElementById('email-input') as HTMLInputElement;
    const phoneInput = document.getElementById('phone-input') as HTMLInputElement;
    const resultsContainer = document.getElementById('breach-results') as HTMLElement;
    
    if (!checkButton || !emailInput || !resultsContainer) return;
    
    checkButton.addEventListener('click', function() {
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        
        if (!email) {
            showBreachResults('Please enter a valid email address.', 'error');
            return;
        }
        
        startBreachScan(email, phone);
    });
    
    // Add input validation
    emailInput.addEventListener('input', function() {
        if (this.validity.valid) {
            this.style.borderColor = 'rgba(16, 185, 129, 0.6)';
        } else {
            this.style.borderColor = 'rgba(239, 68, 68, 0.6)';
        }
    });
}

function startBreachScan(email: string, phone: string) {
    const checkButton = document.getElementById('breach-check-btn') as HTMLButtonElement;
    const checkText = checkButton.querySelector('.check-text') as HTMLElement;
    const resultsContainer = document.getElementById('breach-results') as HTMLElement;
    
    // Start scanning animation
    checkButton.classList.add('scanning');
    checkButton.disabled = true;
    checkText.textContent = 'Scanning Databases...';
    
    // Hide previous results
    resultsContainer.classList.remove('show');
    
    // Simulate scanning process
    const scanningSteps = [
        'Connecting to security databases...',
        'Scanning breach records...',
        'Cross-referencing data...',
        'Analyzing results...',
        'Generating report...'
    ];
    
    let stepIndex = 0;
    const stepInterval = setInterval(() => {
        if (stepIndex < scanningSteps.length) {
            checkText.textContent = scanningSteps[stepIndex];
            stepIndex++;
        }
    }, 800);
    
    // Complete scan after 4 seconds
    setTimeout(() => {
        clearInterval(stepInterval);
        completeBreachScan(email, phone);
    }, 4000);
}

function completeBreachScan(email: string, phone: string) {
    const checkButton = document.getElementById('breach-check-btn') as HTMLButtonElement;
    const checkText = checkButton.querySelector('.check-text') as HTMLElement;
    
    // Stop scanning animation
    checkButton.classList.remove('scanning');
    checkButton.disabled = false;
    checkText.textContent = 'Scan for Breaches';
    
    // Simulate results (in real implementation, this would come from HaveIBeenPwned API)
    const mockResults = generateMockResults(email);
    showBreachResults(mockResults.message, mockResults.type, mockResults.details);
}

function generateMockResults(email: string) {
    // Simulate different result scenarios
    const scenarios = [
        {
            type: 'safe',
            message: '✅ Good news! No breaches found for this email address.',
            details: [
                'Your email was not found in any known data breaches',
                'Continue practicing good security habits',
                'Consider enabling two-factor authentication'
            ]
        },
        {
            type: 'warning',
            message: '⚠️ Your email was found in 2 data breaches.',
            details: [
                'LinkedIn breach (2012) - Professional data exposed',
                'Adobe breach (2013) - Account credentials compromised',
                'Recommendation: Change passwords immediately',
                'Enable two-factor authentication on all accounts'
            ]
        },
        {
            type: 'danger',
            message: '🚨 Critical: Your email was found in 5+ data breaches!',
            details: [
                'Multiple high-risk breaches detected',
                'Personal and financial data may be compromised',
                'Immediate action required',
                'Contact our security team for assistance'
            ]
        }
    ];
    
    // Random result for demo (in real app, this would be based on actual API response)
    return scenarios[Math.floor(Math.random() * scenarios.length)];
}

function showBreachResults(message: string, type: string, details?: string[]) {
    const resultsContainer = document.getElementById('breach-results') as HTMLElement;
    
    let backgroundColor = 'rgba(0, 0, 0, 0.3)';
    let borderColor = 'rgba(255, 255, 255, 0.1)';
    
    if (type === 'safe') {
        backgroundColor = 'rgba(16, 185, 129, 0.1)';
        borderColor = 'rgba(16, 185, 129, 0.3)';
    } else if (type === 'warning') {
        backgroundColor = 'rgba(251, 191, 36, 0.1)';
        borderColor = 'rgba(251, 191, 36, 0.3)';
    } else if (type === 'danger') {
        backgroundColor = 'rgba(239, 68, 68, 0.1)';
        borderColor = 'rgba(239, 68, 68, 0.3)';
    }
    
    resultsContainer.style.background = backgroundColor;
    resultsContainer.style.borderColor = borderColor;
    
    let content = `<div class="result-message">${message}</div>`;
    
    if (details && details.length > 0) {
        content += '<div class="result-details">';
        details.forEach(detail => {
            content += `<div class="detail-item">• ${detail}</div>`;
        });
        content += '</div>';
    }
    
    resultsContainer.innerHTML = content;
    resultsContainer.classList.add('show');
}

// Add security section interaction handlers
function addSecuritySectionHandlers() {
    // Add hover effects to security stats
    const statItems = document.querySelectorAll('.security-section .stat-item');
    statItems.forEach(item => {
        item.addEventListener('mouseenter', function(this: HTMLElement) {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        item.addEventListener('mouseleave', function(this: HTMLElement) {
            this.style.transform = '';
        });
    });
    
    // Add click animation to security badges
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
        badge.addEventListener('click', function(this: HTMLElement) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Add cyber orbit animation keyframes
const cyberStyle = document.createElement('style');
cyberStyle.textContent = `
    @keyframes cyberOrbit {
        0% {
            transform: rotate(0deg) translateX(60px) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: rotate(360deg) translateX(60px) rotate(-360deg);
            opacity: 0;
        }
    }
    
    .result-message {
        font-size: 1.1rem;
        font-weight: bold;
        margin-bottom: 1rem;
        color: #fff;
    }
    
    .result-details {
        text-align: left;
        color: rgba(255, 255, 255, 0.9);
    }
    
    .detail-item {
        margin: 0.5rem 0;
        padding-left: 1rem;
    }
`;
document.head.appendChild(cyberStyle);

// Performance optimization for animations
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Preload any heavy animations or effects
        console.log('Animations optimized for performance');
    });
}
