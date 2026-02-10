import { COLORS, SPACING, TYPOGRAPHY } from '../config/constants';

// ============================================================================
// STYLED COMPONENTS PROPS
// ============================================================================

export interface ButtonStyledProps {
    $variant?: 'primary' | 'secondary' | 'ghost';
    $size?: 'sm' | 'md' | 'lg';
    $fullWidth?: boolean;
}

export interface TextStyledProps {
    $color?: keyof typeof COLORS;
    $fontSize?: keyof typeof TYPOGRAPHY.fontSize;
    $fontWeight?: 'normal' | 'medium' | 'semibold' | 'bold';
    $align?: 'left' | 'center' | 'right';
    $lineHeight?: keyof typeof TYPOGRAPHY.lineHeight;
}

export interface SpacingProps {
    $margin?: keyof typeof SPACING | string;
    $marginTop?: keyof typeof SPACING | string;
    $marginRight?: keyof typeof SPACING | string;
    $marginBottom?: keyof typeof SPACING | string;
    $marginLeft?: keyof typeof SPACING | string;
    $padding?: keyof typeof SPACING | string;
    $paddingTop?: keyof typeof SPACING | string;
    $paddingRight?: keyof typeof SPACING | string;
    $paddingBottom?: keyof typeof SPACING | string;
    $paddingLeft?: keyof typeof SPACING | string;
}

// ============================================================================
// COMPONENT PROPS
// ============================================================================

export interface NavItem {
    label: string;
    href: string;
    onClick?: () => void;
}

export interface WorkExperience {
    id: string;
    company: string;
    role: string;
    period: string;
    location: string;
    description: string[];
    techStack: string[];
}

export interface Project {
    id: string;
    title: string;
    subtitle?: string;
    period?: string;
    description: string;
    achievements: string[];
    techStack: string[];
    links?: {
        demo?: string;
        github?: string;
        blog?: string;
    };
    imageSrc?: string;
}

export interface Skill {
    category: string;
    items: string[];
    highlighted?: string[]; // Items to highlight with asterisk
}

// ============================================================================
// ANIMATION TYPES
// ============================================================================

export interface AnimationConfig {
    duration?: number;
    delay?: number;
    easing?: string;
    loop?: boolean;
    alternate?: boolean;
}

export interface ScrollAnimationConfig extends AnimationConfig {
    enter?: string;
    leave?: string;
    sync?: number;
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type ValueOf<T> = T[keyof T];
