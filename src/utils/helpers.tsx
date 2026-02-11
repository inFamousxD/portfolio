import React from 'react';
import { SPACING, TYPOGRAPHY, COLORS } from '../config/constants';

/**
 * Get spacing value from config or return custom value
 */
export const getSpacing = (value: keyof typeof SPACING | string): string => {
    if (value in SPACING) {
        return SPACING[value as keyof typeof SPACING];
    }
    return value;
};

/**
 * Get font size value from config or return custom value
 */
export const getFontSize = (value: keyof typeof TYPOGRAPHY.fontSize | string): string => {
    if (value in TYPOGRAPHY.fontSize) {
        return TYPOGRAPHY.fontSize[value as keyof typeof TYPOGRAPHY.fontSize];
    }
    return value;
};

/**
 * Get color value from config or return custom value
 */
export const getColor = (value: keyof typeof COLORS | string): string => {
    if (value in COLORS) {
        return COLORS[value as keyof typeof COLORS];
    }
    return value;
};

/**
 * Smooth scroll to element or position
 */
export const smoothScrollTo = (targetOrOffset: string | number) => {
    if (typeof targetOrOffset === 'number') {
        window.scrollTo({
            top: targetOrOffset,
            behavior: 'smooth',
        });
    } else {
        const element = document.querySelector(targetOrOffset);
        if (element) {
            const navHeight = parseFloat(getComputedStyle(document.documentElement).fontSize) * 4; // 4rem
            const elementTop = element.getBoundingClientRect().top + window.scrollY - navHeight - 12;
            window.scrollTo({
                top: elementTop,
                behavior: 'smooth',
            });
        }
    }
};

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
): ((...args: Parameters<T>) => void) => {
    let timeout: number | null = null;

    return (...args: Parameters<T>) => {
        if (timeout !== null) {
            clearTimeout(timeout);
        }
        timeout = window.setTimeout(() => func(...args), wait);
    };
};

/**
 * Throttle function for performance optimization
 */
export const throttle = <T extends (...args: any[]) => any>(
    func: T,
    limit: number
): ((...args: Parameters<T>) => void) => {
    let inThrottle = false;

    return (...args: Parameters<T>) => {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            window.setTimeout(() => (inThrottle = false), limit);
        }
    };
};

/**
 * Clamp a value between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
};

/**
 * Linear interpolation between two values
 */
export const lerp = (start: number, end: number, t: number): number => {
    return start + (end - start) * t;
};

/**
 * Map a value from one range to another
 */
export const mapRange = (
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
): number => {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

/**
 * Check if element is in viewport
 */
export const isInViewport = (element: Element): boolean => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

/**
 * Get viewport dimensions
 */
export const getViewportDimensions = () => ({
    width: window.innerWidth,
    height: window.innerHeight,
});

/**
 * Format text for typed animation
 */
export const createTypedSpans = (text: string, className = 'typed'): React.ReactElement[] => {
    return text.split('').map((char, i) => (
        <span key={i} className={className} style={{ visibility: 'hidden' }}>
            {char}
        </span>
    ));
};