import React, { useEffect, useRef, DependencyList } from 'react';
import { animate, onScroll, Timeline, createTimeline, AnimationParams } from 'animejs';
import { useAnimationSpeed } from '../context/AnimationContext';
import { ANIMATION } from '../config/constants';

/**
 * Hook to create and manage anime.js timeline with speed control
 */
export const useTimeline = (delay = 0): React.MutableRefObject<Timeline | null> => {
    const timelineRef = useRef<Timeline | null>(null);
    const { getAdjustedDuration } = useAnimationSpeed();

    useEffect(() => {
        timelineRef.current = createTimeline({
            delay: getAdjustedDuration(delay)
        });

        return () => {
            if (timelineRef.current) {
                timelineRef.current.pause();
            }
        };
    }, [delay, getAdjustedDuration]);

    return timelineRef;
};

interface ScrollAnimationConfig {
    selector: string;
    animationProps: AnimationParams;
    enter?: string;
    leave?: string;
    sync?: number;
    deps?: DependencyList;
}

/**
 * Hook for scroll-triggered animations with speed control
 */
export const useScrollAnimation = ({
    selector,
    animationProps,
    enter = 'bottom-=10vh top',
    leave = 'top+=90vh top',
    sync = ANIMATION.scroll.syncFactor,
    deps = [],
}: ScrollAnimationConfig) => {
    const { getAdjustedDuration } = useAnimationSpeed();

    useEffect(() => {
        const adjustedProps = {
            ...animationProps,
            ...(animationProps.duration && {
                duration: getAdjustedDuration(animationProps.duration as number),
            }),
            autoplay: onScroll({
                container: 'body',
                enter,
                leave,
                sync,
            }),
        };

        const animation = animate(selector, adjustedProps);

        return () => {
            animation.pause();
        };
    }, [selector, getAdjustedDuration, ...deps]);
};

interface TypedTextConfig {
    selector: string;
    targetSelector?: string;
    charDelay?: number;
    enter?: string;
    leave?: string;
    sync?: number;
    deps?: DependencyList;
}

/**
 * Hook for typed text reveal animations on scroll
 */
export const useTypedTextScroll = ({
    selector,
    targetSelector,
    charDelay = ANIMATION.intro.textCharDelay,
    enter = 'bottom-=20vh top',
    leave = 'top+=90vh top',
    sync = 0.05,
    deps = [],
}: TypedTextConfig) => {
    const { getAdjustedDuration } = useAnimationSpeed();

    useEffect(() => {
        const animation = animate(`${selector} .typed`, {
            visibility: 'visible',
            delay: (_, i) => i * getAdjustedDuration(charDelay),
            ease: 'out',
            autoplay: onScroll({
                container: 'body',
                target: targetSelector || selector,
                enter,
                leave,
                sync,
            }),
        });

        return () => {
            animation.pause();
        };
    }, [selector, targetSelector, charDelay, getAdjustedDuration, ...deps]);
};

/**
 * Hook to detect if user prefers reduced motion
 */
export const usePrefersReducedMotion = (): boolean => {
    const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => {
            setPrefersReducedMotion(e.matches);
        };

        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    return prefersReducedMotion;
};

/**
 * Hook for responsive breakpoint detection
 */
export const useMediaQuery = (query: string): boolean => {
    const [matches, setMatches] = React.useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(query);
        setMatches(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => {
            setMatches(e.matches);
        };

        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, [query]);

    return matches;
};
