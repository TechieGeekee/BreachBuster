// Breach Buster - Advanced Cyber Security Interface
console.log('🛡️ Breach Buster Security System Initialized');

// Global variables
let isPasswordVisible = false;
let currentPasswordStrength = 0;
let scanInProgress = false;

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 Initializing security systems...');
    
    // Initialize all components
    initializePasswordInput();
    initializePasswordToggle();
    initializeScanButton();
    initializeAnimations();
    
    // Start background animations
    startBackgroundAnimations();
    
    console.log('✅ All systems operational');
});

// Initialize password input with real-time analysis
function initializePasswordInput() {
    const passwordInput = document.getElementById('password-input');
    const passwordAnalysis = document.getElementById('password-analysis');
    
    if (!passwordInput || !passwordAnalysis) {
        console.error('❌ Password input elements not found');
        return;
    }
    
    passwordInput.addEventListener('input', function(e) {
        const password = e.target.value;
        
        if (password.length > 0) {
            passwordAnalysis.style.display = 'block';
            analyzePasswordStrength(password);
            updateTypingCursor(true);
        } else {
            passwordAnalysis.style.display = 'none';
            updateTypingCursor(false);
        }
    });
    
    passwordInput.addEventListener('focus', function() {
        updateTypingCursor(true);
    });
    
    passwordInput.addEventListener('blur', function() {
        updateTypingCursor(false);
    });
    
    console.log('🔐 Password input system initialized');
}

// Initialize password visibility toggle
function initializePasswordToggle() {
    const passwordToggle = document.getElementById('password-toggle');
    const passwordInput = document.getElementById('password-input');
    
    if (!passwordToggle || !passwordInput) {
        console.error('❌ Password toggle elements not found');
        return;
    }
    
    passwordToggle.addEventListener('click', function() {
        isPasswordVisible = !isPasswordVisible;
        
        if (isPasswordVisible) {
            passwordInput.type = 'text';
            passwordToggle.innerHTML = `
                <svg class="eye-icon" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M2,5.27L3.28,4L20,20.72L18.73,22L15.65,18.92C14.5,19.3 13.28,19.5 12,19.5C7,19.5 2.73,16.39 1,12C1.69,10.24 2.79,8.69 4.19,7.46L2,5.27M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9M12,4.5C17,4.5 21.27,7.61 23,12C22.18,14.08 20.79,15.88 19,17.19L17.58,15.76C18.94,14.82 20.06,13.54 20.82,12C19.17,8.64 15.76,6.5 12,6.5C10.91,6.5 9.84,6.68 8.84,7L7.3,5.47C8.74,4.85 10.31,4.5 12,4.5M3.18,12C4.83,15.36 8.24,17.5 12,17.5C12.69,17.5 13.37,17.43 14,17.29L11.72,15C10.29,14.85 9.15,13.71 9,12.28L5.6,8.87C4.61,9.72 3.78,10.78 3.18,12Z"/>
                </svg>
            `;
        } else {
            passwordInput.type = 'password';
            passwordToggle.innerHTML = `
                <svg class="eye-icon" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="currentColor" d="M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17M12,4.5C7,4.5 2.73,7.61 1,12C2.73,16.39 7,19.5 12,19.5C17,19.5 21.27,16.39 23,12C21.27,7.61 17,4.5 12,4.5Z"/>
                </svg>
            `;
        }
        
        // Add visual feedback while preserving vertical centering
        passwordToggle.style.transform = 'translateY(-50%) scale(0.9)';
        setTimeout(() => {
            passwordToggle.style.transform = 'translateY(-50%) scale(1)';
        }, 150);
        
        console.log(`👁️ Password visibility: ${isPasswordVisible ? 'visible' : 'hidden'}`);
    });
    
    console.log('👁️ Password toggle system initialized');
}

// Initialize scan button functionality
function initializeScanButton() {
    const scanButton = document.getElementById('breach-check-btn');
    const passwordInput = document.getElementById('password-input');
    
    if (!scanButton || !passwordInput) {
        console.error('❌ Scan button elements not found');
        return;
    }
    
    scanButton.addEventListener('click', async function() {
        const password = passwordInput.value.trim();
        
        if (!password) {
            showNotification('⚠️ Please enter a password to scan', 'warning');
            return;
        }
        
        if (scanInProgress) {
            console.log('🔍 Scan already in progress');
            return;
        }
        
        await performBreachScan(password);
    });
    
    console.log('🛡️ Scan button system initialized');
}

// Analyze password strength in real-time
function analyzePasswordStrength(password) {
    let strength = 0;
    let strengthLevel = 'WEAK';
    let strengthColor = '#ef4444';
    
    const requirements = {
        length: password.length >= 12,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        numbers: /\d/.test(password),
        symbols: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };
    
    // Calculate strength
    if (requirements.length) strength += 20;
    if (requirements.uppercase) strength += 20;
    if (requirements.lowercase) strength += 20;
    if (requirements.numbers) strength += 20;
    if (requirements.symbols) strength += 20;
    
    // Determine strength level and color
    if (strength >= 80) {
        strengthLevel = 'EXCELLENT';
        strengthColor = '#10b981';
    } else if (strength >= 60) {
        strengthLevel = 'GOOD';
        strengthColor = '#3b82f6';
    } else if (strength >= 40) {
        strengthLevel = 'FAIR';
        strengthColor = '#eab308';
    } else if (strength >= 20) {
        strengthLevel = 'POOR';
        strengthColor = '#f59e0b';
    }
    
    // Update UI
    updateStrengthMeter(strength, strengthLevel, strengthColor);
    updateRequirements(requirements);
    
    currentPasswordStrength = strength;
}

// Update strength meter
function updateStrengthMeter(strength, level, color) {
    const strengthStatus = document.getElementById('strength-status');
    const meterFill = document.getElementById('strength-meter-fill');
    const segments = document.querySelectorAll('.segment');
    
    if (strengthStatus) {
        strengthStatus.textContent = level;
        strengthStatus.style.color = color;
        strengthStatus.style.background = `${color}20`;
        strengthStatus.style.border = `1px solid ${color}40`;
    }
    
    if (meterFill) {
        meterFill.style.width = `${strength}%`;
        meterFill.style.background = `linear-gradient(90deg, ${color}, ${color}80)`;
    }
    
    // Animate segments
    segments.forEach((segment, index) => {
        const segmentStrength = (index + 1) * 20;
        if (strength >= segmentStrength) {
            segment.style.background = color;
            segment.style.boxShadow = `0 0 10px ${color}40`;
        } else {
            segment.style.background = 'rgba(55, 65, 81, 0.6)';
            segment.style.boxShadow = 'none';
        }
    });
}

// Update requirements checklist
function updateRequirements(requirements) {
    Object.keys(requirements).forEach(req => {
        const element = document.getElementById(`req-${req}`);
        if (element) {
            if (requirements[req]) {
                element.classList.add('satisfied');
                element.querySelector('.req-icon').textContent = '✓';
            } else {
                element.classList.remove('satisfied');
                element.querySelector('.req-icon').textContent = '○';
            }
        }
    });
}

// Update typing cursor visibility
function updateTypingCursor(show) {
    const cursor = document.querySelector('.typing-cursor');
    if (cursor) {
        cursor.style.opacity = show ? '1' : '0';
    }
}

// Perform breach scan
async function performBreachScan(password) {
    console.log('🔍 Initiating breach scan...');
    
    scanInProgress = true;
    const scanButton = document.getElementById('breach-check-btn');
    const buttonText = document.getElementById('button-text');
    const scanningLine = document.getElementById('scanning-line');
    const resultsTerminal = document.getElementById('results-terminal');
    
    try {
        // Update button state
        scanButton.classList.add('scanning');
        scanButton.disabled = true;
        buttonText.textContent = 'SCANNING DATABASE...';
        
        // Show scanning animation
        if (scanningLine) {
            scanningLine.style.left = '100%';
        }
        
        // Simulate scan process with progress updates
        await simulateScanProgress();
        
        // Make API request
        const response = await fetch('/api/check-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: password })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('📊 Scan results:', result);
        
        // Display results
        displayScanResults(result, password);
        
    } catch (error) {
        console.error('❌ Scan failed:', error);
        displayScanResults({
            isBreached: false,
            count: 0,
            error: 'Scan failed. Please try again.',
            message: 'Unable to connect to breach database.'
        });
    } finally {
        // Reset button state
        scanInProgress = false;
        scanButton.classList.remove('scanning');
        scanButton.disabled = false;
        buttonText.textContent = 'INITIATE BREACH SCAN';
        
        if (scanningLine) {
            scanningLine.style.left = '-100%';
        }
    }
}

// Simulate scan progress with updates
async function simulateScanProgress() {
    const buttonText = document.getElementById('button-text');
    const steps = [
        'CONNECTING TO DATABASE...',
        'HASHING PASSWORD...',
        'QUERYING BREACH DATA...',
        'ANALYZING RESULTS...'
    ];
    
    for (let i = 0; i < steps.length; i++) {
        if (buttonText) {
            buttonText.textContent = steps[i];
        }
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

// Display scan results
function displayScanResults(result, password = '') {
    const resultsTerminal = document.getElementById('results-terminal');
    const resultsIcon = document.getElementById('results-icon');
    const resultsTimestamp = document.getElementById('results-timestamp');
    const resultsContent = document.getElementById('results-content');
    
    if (!resultsTerminal || !resultsContent) {
        console.error('❌ Results elements not found');
        return;
    }
    
    // Show results terminal
    resultsTerminal.style.display = 'block';
    
    // Update timestamp
    if (resultsTimestamp) {
        resultsTimestamp.textContent = new Date().toLocaleString();
    }
    
    // Update icon based on result
    if (resultsIcon) {
        if (result.error) {
            resultsIcon.textContent = '⚠️';
        } else if (result.isBreached) {
            resultsIcon.textContent = '🚨';
        } else {
            resultsIcon.textContent = '✅';
        }
    }
    
    // Generate results HTML
    let resultsHTML = '';
    
    if (result.error) {
        resultsHTML = `
            <div class="scan-result error" style="
                padding: 1.5rem;
                background: rgba(239, 68, 68, 0.1);
                border: 1px solid rgba(239, 68, 68, 0.3);
                border-radius: 8px;
                color: #fca5a5;
            ">
                <div class="result-status" style="
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 1rem;
                    font-family: 'Ubuntu Mono', monospace;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                ">
                    <span class="status-icon" style="font-size: 1.5rem;">⚠️</span>
                    <span class="status-text">SCAN ERROR</span>
                </div>
                <div class="result-message" style="
                    font-family: 'Ubuntu', sans-serif;
                    line-height: 1.5;
                ">
                    ${result.message || result.error}
                </div>
            </div>
        `;
    } else if (result.isBreached) {
        resultsHTML = `
            <div class="scan-result breached" style="
                padding: 1.5rem;
                background: rgba(239, 68, 68, 0.1);
                border: 1px solid rgba(239, 68, 68, 0.3);
                border-radius: 8px;
                animation: slideInUp 0.4s ease-out;
            ">
                <div class="result-status" style="
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 1rem;
                    font-family: 'Ubuntu Mono', monospace;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: #fca5a5;
                ">
                    <span class="status-icon" style="font-size: 1.5rem; animation: pulse 1s infinite;">🚨</span>
                    <span class="status-text">BREACH DETECTED</span>
                </div>
                <div class="result-details" style="
                    display: grid;
                    gap: 0.75rem;
                    margin-bottom: 1rem;
                    font-family: 'Ubuntu Mono', monospace;
                    font-size: 0.9rem;
                ">
                    <div class="detail-item" style="display: flex; justify-content: space-between; align-items: center;">
                        <span class="detail-label" style="color: #94a3b8;">EXPOSURE COUNT:</span>
                        <span class="detail-value danger" style="color: #ef4444; font-weight: 700;">${result.count.toLocaleString()}</span>
                    </div>
                    <div class="detail-item" style="display: flex; justify-content: space-between; align-items: center;">
                        <span class="detail-label" style="color: #94a3b8;">RISK LEVEL:</span>
                        <span class="detail-value danger" style="color: #ef4444; font-weight: 700;">HIGH</span>
                    </div>
                    <div class="detail-item" style="display: flex; justify-content: space-between; align-items: center;">
                        <span class="detail-label" style="color: #94a3b8;">RECOMMENDATION:</span>
                        <span class="detail-value" style="color: #f59e0b; font-weight: 700;">CHANGE IMMEDIATELY</span>
                    </div>
                </div>
                <div class="result-message danger" style="
                    padding: 1rem;
                    background: rgba(239, 68, 68, 0.2);
                    border-radius: 6px;
                    color: #fca5a5;
                    font-family: 'Ubuntu', sans-serif;
                    line-height: 1.5;
                    margin-bottom: 1.5rem;
                ">
                    ⚠️ This password has been found in ${result.count.toLocaleString()} data breaches. 
                    <strong>Change it immediately</strong> and never use it again.
                </div>
                <div class="breach-action-container" style="display: flex; justify-content: center;">
                    <button onclick="scrollToPasswordGenerator()" class="generate-strong-password-btn" style="
                        background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
                        border: 2px solid #22c55e;
                        color: white;
                        padding: 1rem 2rem;
                        border-radius: 8px;
                        font-family: 'Ubuntu Mono', monospace;
                        font-weight: 700;
                        font-size: 1rem;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
                        position: relative;
                        overflow: hidden;
                    " onmouseover="
                        this.style.background = 'linear-gradient(135deg, #15803d 0%, #16a34a 100%)';
                        this.style.boxShadow = '0 0 30px rgba(34, 197, 94, 0.5)';
                        this.style.transform = 'translateY(-2px)';
                    " onmouseout="
                        this.style.background = 'linear-gradient(135deg, #16a34a 0%, #15803d 100%)';
                        this.style.boxShadow = '0 0 20px rgba(34, 197, 94, 0.3)';
                        this.style.transform = 'translateY(0)';
                    ">
                        <span style="display: flex; align-items: center; gap: 0.5rem;">
                            generate a strong password
                        </span>
                    </button>
                </div>
            </div>
        `;
    } else {
        resultsHTML = `
            <div class="scan-result clean" style="
                padding: 1.5rem;
                background: rgba(16, 185, 129, 0.1);
                border: 1px solid rgba(16, 185, 129, 0.3);
                border-radius: 8px;
                animation: slideInUp 0.4s ease-out;
            ">
                <div class="result-status" style="
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin-bottom: 1rem;
                    font-family: 'Ubuntu Mono', monospace;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: #6ee7b7;
                ">
                    <span class="status-icon" style="font-size: 1.5rem;">✅</span>
                    <span class="status-text">NO BREACHES FOUND</span>
                </div>
                <div class="result-details" style="
                    display: grid;
                    gap: 0.75rem;
                    margin-bottom: 1rem;
                    font-family: 'Ubuntu Mono', monospace;
                    font-size: 0.9rem;
                ">
                    <div class="detail-item" style="display: flex; justify-content: space-between; align-items: center;">
                        <span class="detail-label" style="color: #94a3b8;">EXPOSURE COUNT:</span>
                        <span class="detail-value safe" style="color: #10b981; font-weight: 700;">0</span>
                    </div>
                    <div class="detail-item" style="display: flex; justify-content: space-between; align-items: center;">
                        <span class="detail-label" style="color: #94a3b8;">RISK LEVEL:</span>
                        <span class="detail-value safe" style="color: ${currentPasswordStrength >= 60 ? '#10b981' : '#f59e0b'}; font-weight: 700;">${currentPasswordStrength >= 60 ? 'LOW' : 'MEDIUM'}</span>
                    </div>
                    <div class="detail-item" style="display: flex; justify-content: space-between; align-items: center;">
                        <span class="detail-label" style="color: #94a3b8;">PASSWORD STRENGTH:</span>
                        <span class="detail-value ${currentPasswordStrength >= 60 ? 'safe' : 'warning'}" style="color: ${currentPasswordStrength >= 60 ? '#10b981' : '#f59e0b'}; font-weight: 700;">${getStrengthLabel(currentPasswordStrength)}</span>
                    </div>
                </div>
                <div class="result-message safe" style="
                    padding: 1rem;
                    background: rgba(16, 185, 129, 0.2);
                    border-radius: 6px;
                    color: #6ee7b7;
                    font-family: 'Ubuntu', sans-serif;
                    line-height: 1.5;
                ">
                    ✅ This password has not been found in any known data breaches.
                    ${currentPasswordStrength < 60 ? ' However, consider strengthening it further.' : ' <strong>Good job on password security!</strong>'}
                </div>
            </div>
        `;
    }
    
    resultsContent.innerHTML = resultsHTML;
    
    // Scroll to results
    setTimeout(() => {
        resultsTerminal.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
    
    console.log('📊 Results displayed successfully');
}

// Get strength label from score
function getStrengthLabel(strength) {
    if (strength >= 80) return 'EXCELLENT';
    if (strength >= 60) return 'GOOD';
    if (strength >= 40) return 'FAIR';
    if (strength >= 20) return 'POOR';
    return 'WEAK';
}

// Initialize background animations
function initializeAnimations() {
    // Animate neural nodes
    const nodes = document.querySelectorAll('.neural-node');
    nodes.forEach((node, index) => {
        const delay = index * 1000;
        setTimeout(() => {
            node.style.animation = `nodePulse 3s ease-in-out infinite ${delay}ms`;
        }, delay);
    });
    
    // Animate data streams
    const streams = document.querySelectorAll('.stream');
    streams.forEach((stream, index) => {
        const delay = index * 2000;
        setTimeout(() => {
            stream.style.animation = `streamFlow 8s linear infinite ${delay}ms`;
        }, delay);
    });
    
    console.log('🎨 Background animations initialized');
}

// Start continuous background animations
function startBackgroundAnimations() {
    // Animate loading dots
    const dots = document.querySelectorAll('.loading-dots span');
    dots.forEach((dot, index) => {
        dot.style.animationDelay = `${index * 0.2}s`;
    });
    
    // Start grid pulse
    const grid = document.querySelector('.scanning-grid');
    if (grid) {
        grid.style.animation = 'gridPulse 4s ease-in-out infinite';
    }
    
    console.log('🌟 Continuous animations started');
}

// Show notification
function showNotification(message, type = 'info') {
    console.log(`📢 ${type.toUpperCase()}: ${message}`);
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'warning' ? '#f59e0b' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        font-family: 'Ubuntu', sans-serif;
        font-weight: 600;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add notification animations to CSS
const notificationCSS = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;

// Inject notification CSS
const style = document.createElement('style');
style.textContent = notificationCSS;
document.head.appendChild(style);

console.log('🛡️ Breach Buster Security System fully loaded and operational!');

// Function to scroll to password generator section
function scrollToPasswordGenerator() {
    console.log('🔐 Navigating to password generator...');
    console.log('🔍 Looking for password generator section');
    
    // Try multiple selectors to find the password generator, prioritizing the actual visible section
    let passwordGeneratorSection = document.querySelector('.generator-heading'); // Target the heading with "STRONG PASSWORD GENERATOR"
    if (!passwordGeneratorSection) {
        passwordGeneratorSection = document.querySelector('.generator-title'); // Backup: "Secure Password Generator"
    }
    if (!passwordGeneratorSection) {
        passwordGeneratorSection = document.querySelector('#password-generator-section');
    }
    if (!passwordGeneratorSection) {
        passwordGeneratorSection = document.querySelector('.password-generator-section');
    }
    
    console.log('📍 Found element:', passwordGeneratorSection);
    console.log('📍 Element position:', passwordGeneratorSection ? passwordGeneratorSection.getBoundingClientRect() : 'N/A');
    
    if (passwordGeneratorSection) {
        console.log('✅ Element found, scrolling...');
        
        // Try multiple scroll methods for better compatibility
        try {
            // Method 1: scrollIntoView
            passwordGeneratorSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start',
                inline: 'nearest'
            });
            
            // Method 2: Alternative scroll with better offset
            setTimeout(() => {
                const rect = passwordGeneratorSection.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const targetY = rect.top + scrollTop - 20; // Much smaller offset - only 20px from top
                
                window.scrollTo({
                    top: targetY,
                    behavior: 'smooth'
                });
                console.log('📍 Scrolling to position:', targetY);
            }, 100);
            
        } catch (error) {
            console.error('❌ Scroll error:', error);
        }
        
        // Add a subtle highlight effect to draw attention directly to the found element
        passwordGeneratorSection.style.transition = 'all 0.5s ease';
        passwordGeneratorSection.style.boxShadow = '0 0 50px rgba(34, 197, 94, 0.4)';
        passwordGeneratorSection.style.borderColor = 'rgba(34, 197, 94, 0.6)';
        
        // Reset after 3 seconds
        setTimeout(() => {
            passwordGeneratorSection.style.boxShadow = '';
            passwordGeneratorSection.style.borderColor = '';
        }, 3000);
        
        console.log('✅ Scrolled to password generator section');
    } else {
        console.warn('⚠️ Password generator section not found');
        console.log('🔍 Available elements with "generator":', document.querySelectorAll('[class*="generator"]'));
        console.log('🔍 Available elements with "password":', document.querySelectorAll('[class*="password"]'));
        console.log('🔍 Document height:', document.body.scrollHeight);
    }
}