/**
 * Format currency in Indian Rupees
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format large numbers with Indian numbering system
 */
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-IN').format(num);
}

/**
 * Get relative time (e.g., "2 hours ago")
 */
export function getRelativeTime(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  return then.toLocaleDateString('en-IN');
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + '...';
}

/**
 * Generate random ID
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Indian phone number
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[+]?91[-\s]?[6-9]\d{9}$/;
  return phoneRegex.test(phone);
}

/**
 * Convert temperature
 */
export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9/5) + 32;
}

export function fahrenheitToCelsius(fahrenheit: number): number {
  return (fahrenheit - 32) * 5/9;
}

/**
 * Calculate percentage
 */
export function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Deep clone object
 */
export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Check if browser supports feature
 */
export function supportsFeature(feature: string): boolean {
  switch (feature) {
    case 'speech':
      return 'speechSynthesis' in window;
    case 'localStorage':
      try {
        const test = '__test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch (e) {
        return false;
      }
    case 'serviceWorker':
      return 'serviceWorker' in navigator;
    default:
      return false;
  }
}

/**
 * Get color based on value range
 */
export function getColorByValue(value: number, min: number = 0, max: number = 100): string {
  const percentage = ((value - min) / (max - min)) * 100;
  
  if (percentage >= 80) return '#2BB673'; // Green
  if (percentage >= 60) return '#FFD166'; // Yellow
  if (percentage >= 40) return '#FF9A00'; // Orange
  return '#EF476F'; // Red
}

/**
 * Capitalize first letter
 */
export function capitalize(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Get season from month
 */
export function getSeasonFromMonth(month: number): string {
  // Indian agricultural seasons
  if (month >= 6 && month <= 9) return 'Kharif'; // June-September
  if (month >= 10 || month <= 3) return 'Rabi'; // October-March
  return 'Zaid'; // April-May
}

/**
 * Calculate days until harvest
 */
export function calculateHarvestDays(plantingDate: Date, cropDuration: number): number {
  const now = new Date();
  const harvestDate = new Date(plantingDate);
  harvestDate.setDate(harvestDate.getDate() + cropDuration);
  
  const diffTime = harvestDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > 0 ? diffDays : 0;
}

/**
 * Get crop icon emoji
 */
export function getCropIcon(crop: string): string {
  const icons: Record<string, string> = {
    'Rice': '🌾',
    'Wheat': '🌾',
    'Cotton': '☁️',
    'Sugarcane': '🎋',
    'Pulses': '🫘',
    'Maize': '🌽',
    'Potato': '🥔',
    'Tomato': '🍅',
  };
  return icons[crop] || '🌱';
}
