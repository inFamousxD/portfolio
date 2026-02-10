// ============================================================================
// THEME & COLORS
// ============================================================================

export const COLORS = {
    background: '#0a0a0a',
    foreground: '#ffffff',
    muted: '#888888',
    accent: '#ffffff',
    accentDim: '#666666',
    border: '#222222',
    gridLight: 'rgba(255, 255, 255, 0.03)',
    gridMedium: 'rgba(255, 255, 255, 0.05)',
    gridHeavy: 'rgba(255, 255, 255, 0.1)',
} as const;

// ============================================================================
// TYPOGRAPHY
// ============================================================================

export const TYPOGRAPHY = {
    fontFamily: {
        primary: "'Roboto Mono', monospace",
        secondary: "'Inter', sans-serif",
    },
    fontSize: {
        xs: '0.75rem',    // 12px
        sm: '0.875rem',   // 14px
        base: '1rem',     // 16px
        lg: '1.125rem',   // 18px
        xl: '1.25rem',    // 20px
        '2xl': '1.5rem',  // 24px
        '3xl': '1.875rem',// 30px
        '4xl': '2.25rem', // 36px
        '5xl': '3rem',    // 48px
    },
    lineHeight: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75,
    },
} as const;

// ============================================================================
// SPACING (using rem for better scalability)
// ============================================================================

export const SPACING = {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem',   // 96px
    '5xl': '8rem',   // 128px
} as const;

// ============================================================================
// BREAKPOINTS (mobile-first)
// ============================================================================

export const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
} as const;

export const MEDIA_QUERIES = {
    sm: `(min-width: ${BREAKPOINTS.sm}px)`,
    md: `(min-width: ${BREAKPOINTS.md}px)`,
    lg: `(min-width: ${BREAKPOINTS.lg}px)`,
    xl: `(min-width: ${BREAKPOINTS.xl}px)`,
    '2xl': `(min-width: ${BREAKPOINTS['2xl']}px)`,
    reducedMotion: '(prefers-reduced-motion: reduce)',
} as const;

// ============================================================================
// ANIMATION CONSTANTS
// ============================================================================

export const ANIMATION = {
    // Base animation speed (can be multiplied by speed multiplier)
    duration: {
        instant: 0,
        fast: 200,
        normal: 400,
        slow: 800,
        verySlow: 1600,
    },

    // Easing functions
    easing: {
        linear: 'linear',
        easeIn: 'easeInQuad',
        easeOut: 'easeOutQuad',
        easeInOut: 'easeInOutQuad',
        spring: 'spring(1, 80, 10, 0)',
    },

    // Arc animation specific
    arc: {
        dashCount: 75,
        initialRadius: 0.8, // percentage of container
        rotationDuration: 30000,
        reducedDashCount: 30, // for mobile
    },

    // Intro animation
    intro: {
        totalDuration: 8000, // Total intro sequence duration
        squareFadeDelay: 500,
        squareMoveDuration: 800,
        textCharDelay: 50,
        skipThreshold: 3000, // Auto-skip after this if no interaction
    },

    // Scroll animations
    scroll: {
        enterOffset: 0.2, // Enter when element is 20% visible
        leaveOffset: 0.8, // Leave when element is 80% past viewport
        syncFactor: 0.25,
    },
} as const;

// ============================================================================
// Z-INDEX LAYERS
// ============================================================================

export const Z_INDEX = {
    base: 0,
    grid: 1,
    content: 10,
    nav: 100,
    modal: 1000,
    tooltip: 2000,
} as const;

// ============================================================================
// LAYOUT
// ============================================================================

export const LAYOUT = {
    navHeight: '4rem',
    maxContentWidth: '1200px',
    sectionSpacing: {
        mobile: SPACING['2xl'],
        desktop: SPACING['5xl'],
    },
} as const;

// ============================================================================
// FEATURE FLAGS
// ============================================================================

export const FEATURES = {
    enableIntro: true,
    enableArcAnimation: true,
    enableScrollAnimations: true,
    autoSkipIntro: true, // Auto-skip intro after threshold
} as const;

// ============================================================================
// EXTERNAL LINKS
// ============================================================================

export const LINKS = {
    email: 'aaditya.mankar.x7@gmail.com',
    linkedin: 'https://www.linkedin.com/in/aaditya-mankar-x7/',
    github: 'https://github.com/inFamousxD',
    resume: 'https://drive.google.com/file/d/1W4NaQrrWpivMRdiTns_uS9yUvxbGmj9C/view?usp=sharing',
    chameleonBlog: 'https://chameleoncloud.org/blog/2024/12/30/minimizing-out-of-memory-failures-in-genomics-workflow-execution/',
} as const;

// ============================================================================
// TYPE EXPORTS
// ============================================================================

export type ColorKey = keyof typeof COLORS;
export type SpacingKey = keyof typeof SPACING;
export type BreakpointKey = keyof typeof BREAKPOINTS;
