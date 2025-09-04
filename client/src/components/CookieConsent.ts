import { setCookieConsent, getCookieConsent, setThemePreference, getThemePreference } from '../utils/cookies';

export class CookieConsent {
  private banner: HTMLElement | null = null;
  private isVisible: boolean = false;

  constructor() {
    this.init();
  }

  private init(): void {
    // Check if consent already given
    if (getCookieConsent() !== 'pending') {
      return;
    }

    this.createBanner();
    this.showBanner();
  }

  private createBanner(): void {
    // Create banner container
    this.banner = document.createElement('div');
    this.banner.className = 'cookie-consent-banner';
    this.banner.innerHTML = `
      <div class="cookie-consent-content">
        <div class="cookie-consent-header">
          <div class="cookie-icon">🔒</div>
          <div class="cookie-title">Data Protection Protocol</div>
          <div class="cookie-status">SECURITY ALERT</div>
        </div>
        
        <div class="cookie-message">
          <p>This site uses <span class="highlight">encrypted cookies</span> to enhance your cybersecurity experience and remember your preferences. Our data protection protocols ensure your privacy remains secure.</p>
          <div class="cookie-details">
            <div class="data-category">
              <span class="category-icon">🎨</span>
              <span class="category-name">Theme Preferences</span>
              <span class="category-status">OPTIONAL</span>
            </div>
            <div class="data-category">
              <span class="category-icon">⚙️</span>
              <span class="category-name">Essential Functions</span>
              <span class="category-status">REQUIRED</span>
            </div>
          </div>
        </div>
        
        <div class="cookie-actions">
          <button class="cookie-btn cookie-accept">
            <span class="btn-icon">✓</span>
            <span class="btn-text">Accept All</span>
            <div class="btn-glow"></div>
          </button>
          <button class="cookie-btn cookie-decline">
            <span class="btn-icon">✗</span>
            <span class="btn-text">Essential Only</span>
            <div class="btn-glow"></div>
          </button>
        </div>
        
        <div class="cookie-footer">
          <div class="privacy-link">🛡️ Privacy Policy</div>
          <div class="encryption-status">
            <span class="encryption-icon">🔐</span>
            <span class="encryption-text">AES-256 Encrypted</span>
          </div>
        </div>
      </div>
      
      <div class="cookie-particles">
        ${Array.from({ length: 8 }, () => '<div class="cookie-particle"></div>').join('')}
      </div>
      
      <div class="cookie-scanning-lines">
        <div class="scan-line scan-line-1"></div>
        <div class="scan-line scan-line-2"></div>
        <div class="scan-line scan-line-3"></div>
      </div>
    `;

    // Add styles
    this.addStyles();

    // Add event listeners
    this.addEventListeners();

    // Append to body
    document.body.appendChild(this.banner);
  }

  private addStyles(): void {
    const style = document.createElement('style');
    style.textContent = `
      .cookie-consent-banner {
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 420px;
        max-width: calc(100vw - 40px);
        background: linear-gradient(135deg, 
          rgba(15, 23, 42, 0.95) 0%,
          rgba(30, 41, 59, 0.95) 50%,
          rgba(15, 23, 42, 0.95) 100%);
        border: 2px solid #3b82f6;
        border-radius: 16px;
        padding: 24px;
        backdrop-filter: blur(20px);
        box-shadow: 
          0 20px 40px rgba(59, 130, 246, 0.1),
          0 8px 32px rgba(0, 0, 0, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 0.1);
        z-index: 10000;
        transform: translateX(450px) scale(0.8);
        opacity: 0;
        transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        overflow: hidden;
        font-family: 'Courier New', monospace;
      }

      .cookie-consent-banner.visible {
        transform: translateX(0) scale(1);
        opacity: 1;
      }

      .cookie-consent-banner.hiding {
        transform: translateX(450px) scale(0.8);
        opacity: 0;
      }

      .cookie-consent-content {
        position: relative;
        z-index: 2;
      }

      .cookie-consent-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 16px;
        padding-bottom: 12px;
        border-bottom: 1px solid rgba(59, 130, 246, 0.3);
      }

      .cookie-icon {
        font-size: 24px;
        animation: pulse 2s infinite;
      }

      .cookie-title {
        flex: 1;
        color: #ffffff;
        font-size: 16px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      .cookie-status {
        color: #ef4444;
        font-size: 10px;
        font-weight: bold;
        background: rgba(239, 68, 68, 0.2);
        padding: 4px 8px;
        border-radius: 4px;
        border: 1px solid #ef4444;
        animation: blink 1.5s infinite;
      }

      .cookie-message p {
        color: #e2e8f0;
        font-size: 14px;
        line-height: 1.6;
        margin: 0 0 16px 0;
      }

      .cookie-message .highlight {
        color: #3b82f6;
        font-weight: bold;
        text-shadow: 0 0 8px rgba(59, 130, 246, 0.6);
      }

      .cookie-details {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 20px;
      }

      .data-category {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 8px 12px;
        background: rgba(59, 130, 246, 0.1);
        border: 1px solid rgba(59, 130, 246, 0.3);
        border-radius: 8px;
        font-size: 12px;
      }

      .category-icon {
        font-size: 16px;
      }

      .category-name {
        flex: 1;
        color: #e2e8f0;
        font-weight: 500;
      }

      .category-status {
        color: #10b981;
        font-size: 10px;
        font-weight: bold;
        background: rgba(16, 185, 129, 0.2);
        padding: 2px 6px;
        border-radius: 3px;
        border: 1px solid #10b981;
      }

      .data-category:last-child .category-status {
        color: #f59e0b;
        background: rgba(245, 158, 11, 0.2);
        border-color: #f59e0b;
      }

      .cookie-actions {
        display: flex;
        gap: 12px;
        margin-bottom: 16px;
      }

      .cookie-btn {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 12px 16px;
        border: 2px solid;
        border-radius: 8px;
        background: transparent;
        font-family: inherit;
        font-size: 14px;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        transition: all 0.3s ease;
      }

      .cookie-accept {
        border-color: #10b981;
        color: #10b981;
      }

      .cookie-accept:hover {
        background: rgba(16, 185, 129, 0.1);
        box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
        transform: translateY(-2px);
      }

      .cookie-decline {
        border-color: #6b7280;
        color: #6b7280;
      }

      .cookie-decline:hover {
        background: rgba(107, 114, 128, 0.1);
        box-shadow: 0 0 20px rgba(107, 114, 128, 0.3);
        transform: translateY(-2px);
      }

      .btn-icon {
        font-size: 16px;
        transform: none !important;
        animation: none !important;
      }

      .btn-glow {
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, 
          transparent, 
          rgba(255, 255, 255, 0.1), 
          transparent);
        transition: left 0.6s ease;
      }

      .cookie-btn:hover .btn-glow {
        left: 100%;
      }

      .cookie-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 12px;
        border-top: 1px solid rgba(59, 130, 246, 0.3);
        font-size: 11px;
      }

      .privacy-link {
        color: #3b82f6;
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .privacy-link:hover {
        text-shadow: 0 0 8px rgba(59, 130, 246, 0.8);
      }

      .encryption-status {
        display: flex;
        align-items: center;
        gap: 4px;
        color: #10b981;
      }

      .encryption-icon {
        animation: rotate 3s linear infinite;
      }

      .cookie-particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
      }

      .cookie-particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: #3b82f6;
        border-radius: 50%;
        opacity: 0.6;
        animation: float 4s infinite ease-in-out;
      }

      .cookie-particle:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
      .cookie-particle:nth-child(2) { top: 60%; left: 20%; animation-delay: 0.5s; }
      .cookie-particle:nth-child(3) { top: 30%; left: 80%; animation-delay: 1s; }
      .cookie-particle:nth-child(4) { top: 80%; left: 70%; animation-delay: 1.5s; }
      .cookie-particle:nth-child(5) { top: 40%; left: 90%; animation-delay: 2s; }
      .cookie-particle:nth-child(6) { top: 70%; left: 30%; animation-delay: 2.5s; }
      .cookie-particle:nth-child(7) { top: 15%; left: 60%; animation-delay: 3s; }
      .cookie-particle:nth-child(8) { top: 85%; left: 50%; animation-delay: 3.5s; }

      .cookie-scanning-lines {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
      }

      .scan-line {
        position: absolute;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, 
          transparent, 
          rgba(59, 130, 246, 0.8), 
          transparent);
        animation: scan 3s linear infinite;
      }

      .scan-line-1 { animation-delay: 0s; }
      .scan-line-2 { animation-delay: 1s; }
      .scan-line-3 { animation-delay: 2s; }

      @keyframes pulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.7; transform: scale(1.1); }
      }

      @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0.3; }
      }

      @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
        25% { transform: translateY(-10px) rotate(90deg); opacity: 1; }
        50% { transform: translateY(-5px) rotate(180deg); opacity: 0.8; }
        75% { transform: translateY(-15px) rotate(270deg); opacity: 1; }
      }

      @keyframes rotate {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
      }

      @keyframes scan {
        0% { top: -2px; opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { top: 100%; opacity: 0; }
      }

      /* Mobile responsiveness */
      @media (max-width: 768px) {
        .cookie-consent-banner {
          bottom: 10px;
          right: 10px;
          left: 10px;
          width: auto;
          max-width: none;
          padding: 20px;
        }

        .cookie-actions {
          flex-direction: column;
        }

        .cookie-footer {
          flex-direction: column;
          gap: 8px;
          text-align: center;
        }
      }

      /* Light mode support */
      .light-mode .cookie-consent-banner {
        background: linear-gradient(135deg, 
          rgba(255, 255, 255, 0.95) 0%,
          rgba(248, 250, 252, 0.95) 50%,
          rgba(255, 255, 255, 0.95) 100%);
        border-color: #3b82f6;
        box-shadow: 
          0 20px 40px rgba(59, 130, 246, 0.1),
          0 8px 32px rgba(0, 0, 0, 0.1),
          inset 0 1px 0 rgba(0, 0, 0, 0.05);
      }

      .light-mode .cookie-title,
      .light-mode .category-name {
        color: #1e293b;
      }

      .light-mode .cookie-message p {
        color: #475569;
      }

      .light-mode .data-category {
        background: rgba(59, 130, 246, 0.05);
        border-color: rgba(59, 130, 246, 0.2);
      }
    `;

    document.head.appendChild(style);
  }

  private addEventListeners(): void {
    if (!this.banner) return;

    const acceptBtn = this.banner.querySelector('.cookie-accept');
    const declineBtn = this.banner.querySelector('.cookie-decline');

    acceptBtn?.addEventListener('click', () => this.handleAccept());
    declineBtn?.addEventListener('click', () => this.handleDecline());
  }

  private handleAccept(): void {
    setCookieConsent('accepted');
    
    // Apply current theme preference if any
    const currentTheme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
    setThemePreference(currentTheme);
    
    this.hideBanner();
    this.showSuccessMessage('Cookies accepted! Your preferences will be saved.');
  }

  private handleDecline(): void {
    setCookieConsent('declined');
    this.hideBanner();
    this.showSuccessMessage('Essential cookies only. Theme preferences will not be saved.');
  }

  private showBanner(): void {
    if (!this.banner) return;
    
    setTimeout(() => {
      this.banner?.classList.add('visible');
      this.isVisible = true;
    }, 100);
  }

  private hideBanner(): void {
    if (!this.banner || !this.isVisible) return;

    this.banner.classList.add('hiding');
    this.isVisible = false;

    setTimeout(() => {
      this.banner?.remove();
      this.banner = null;
    }, 800);
  }

  private showSuccessMessage(message: string): void {
    const successBanner = document.createElement('div');
    successBanner.className = 'cookie-success-message';
    successBanner.innerHTML = `
      <div class="success-content">
        <span class="success-icon">✓</span>
        <span class="success-text">${message}</span>
      </div>
    `;

    const successStyle = document.createElement('style');
    successStyle.textContent = `
      .cookie-success-message {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, rgba(16, 185, 129, 0.95), rgba(5, 150, 105, 0.95));
        border: 2px solid #10b981;
        border-radius: 12px;
        padding: 16px 20px;
        color: white;
        font-family: 'Courier New', monospace;
        font-size: 14px;
        font-weight: bold;
        z-index: 10001;
        transform: translateX(100%);
        transition: all 0.5s ease;
        backdrop-filter: blur(10px);
        box-shadow: 0 10px 30px rgba(16, 185, 129, 0.3);
      }

      .cookie-success-message.visible {
        transform: translateX(0);
      }

      .success-content {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .success-icon {
        font-size: 18px;
        animation: pulse 1s ease infinite;
      }

      @media (max-width: 768px) {
        .cookie-success-message {
          bottom: 10px;
          right: 10px;
          left: 10px;
          text-align: center;
        }
      }
    `;

    document.head.appendChild(successStyle);
    document.body.appendChild(successBanner);

    setTimeout(() => successBanner.classList.add('visible'), 100);
    setTimeout(() => {
      successBanner.style.transform = 'translateX(100%)';
      setTimeout(() => {
        successBanner.remove();
        successStyle.remove();
      }, 500);
    }, 3000);
  }
}

// Auto-initialize when imported
export function initializeCookieConsent(): void {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new CookieConsent());
  } else {
    new CookieConsent();
  }
}