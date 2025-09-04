// Cookie utility functions for storing user preferences

export interface CookieOptions {
  expires?: number; // Days from now
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

/**
 * Set a cookie with the specified name, value, and options
 */
export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  const defaults: CookieOptions = {
    expires: 365, // Default to 1 year
    path: '/',
    secure: window.location.protocol === 'https:',
    sameSite: 'lax'
  };

  const config = { ...defaults, ...options };
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (config.expires) {
    const date = new Date();
    date.setTime(date.getTime() + (config.expires * 24 * 60 * 60 * 1000));
    cookieString += `; expires=${date.toUTCString()}`;
  }

  if (config.path) {
    cookieString += `; path=${config.path}`;
  }

  if (config.domain) {
    cookieString += `; domain=${config.domain}`;
  }

  if (config.secure) {
    cookieString += `; secure`;
  }

  if (config.sameSite) {
    cookieString += `; SameSite=${config.sameSite}`;
  }

  document.cookie = cookieString;
}

/**
 * Get a cookie value by name
 */
export function getCookie(name: string): string | null {
  const nameEQ = encodeURIComponent(name) + '=';
  const cookies = document.cookie.split(';');

  for (let cookie of cookies) {
    let c = cookie.trim();
    if (c.indexOf(nameEQ) === 0) {
      return decodeURIComponent(c.substring(nameEQ.length));
    }
  }

  return null;
}

/**
 * Delete a cookie by name
 */
export function deleteCookie(name: string, path: string = '/'): void {
  setCookie(name, '', { expires: -1, path });
}

/**
 * Check if cookies are enabled in the browser
 */
export function areCookiesEnabled(): boolean {
  const testCookie = 'cookietest';
  setCookie(testCookie, 'test', { expires: 1 });
  const enabled = getCookie(testCookie) === 'test';
  if (enabled) {
    deleteCookie(testCookie);
  }
  return enabled;
}

/**
 * Get user's cookie consent status
 */
export function getCookieConsent(): 'accepted' | 'declined' | 'pending' {
  const consent = getCookie('cookie_consent');
  if (consent === 'accepted' || consent === 'declined') {
    return consent as 'accepted' | 'declined';
  }
  return 'pending';
}

/**
 * Set user's cookie consent status
 */
export function setCookieConsent(status: 'accepted' | 'declined'): void {
  setCookie('cookie_consent', status, { expires: 365 });
}

/**
 * Theme preference management
 */
export function getThemePreference(): 'light' | 'dark' | null {
  if (getCookieConsent() !== 'accepted') {
    return null; // Don't use cookies if not consented
  }
  
  const theme = getCookie('theme_preference');
  return theme === 'light' || theme === 'dark' ? theme : null;
}

/**
 * Set theme preference (only if cookies are consented)
 */
export function setThemePreference(theme: 'light' | 'dark'): void {
  if (getCookieConsent() === 'accepted') {
    setCookie('theme_preference', theme, { expires: 365 });
  }
}

/**
 * Clear all user preference cookies
 */
export function clearUserPreferences(): void {
  deleteCookie('theme_preference');
  deleteCookie('cookie_consent');
}