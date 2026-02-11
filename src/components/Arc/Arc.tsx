import { useEffect, useRef } from "react";
import styled from "styled-components";
import { createTimeline, Timeline } from "animejs";
import { COLORS } from "../../config/constants";
import { useAnimationSpeed } from "../../context/AnimationContext";

const ARC_COUNT = 75;
const MOBILE_ARC_COUNT = 40;
const MOBILE_BREAKPOINT = 768;

// Determine count once at module level — avoids state-driven re-renders
// that kill the timeline on mobile
const getArcCount = () =>
    typeof window !== 'undefined' && window.innerWidth < MOBILE_BREAKPOINT
        ? MOBILE_ARC_COUNT
        : ARC_COUNT;

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

const ArcRootStyled = styled.div`
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow: hidden;

    .arc-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .container {
        position: absolute;
        width: 70vmin;
        height: 70vmin;
        transform-origin: 50% 50%;
        border-radius: 50%;
        background: transparent;
        top: calc(50vh - 35vmin);
        left: calc(50vw - 35vmin);

        .dash, .dash-2 {
            position: absolute;
            width: 2px;
            height: 2px;
            background-color: ${COLORS.foreground};
            color: ${COLORS.foreground};
            top: 0;
            left: 0;
        }
    }

    @media (min-width: ${MOBILE_BREAKPOINT}px) {
        .container {
            width: 40vmin;
            height: 40vmin;
            top: calc(50vh - 20vmin);
            left: calc(77vw - 20vmin);
        }
    }

    @media (min-width: 1200px) {
        .container {
            width: 45vmin;
            height: 45vmin;
            top: calc(50vh - 22.5vmin);
            left: calc(77vw - 22.5vmin);
        }
    }
`;

// ============================================================================
// OFFSET FRACTIONS (relative to base radius)
// ============================================================================

const OFFSET = {
    ring1: 0.20,
    ring2: 0.25,
    dash2_mid: 0.26,
    dash2_inner: 0.32,
    dash2_outer: 0.28,
    dash_deep: 0.72,
    dash_mid: 0.58,
} as const;

// ============================================================================
// COMPONENT
// ============================================================================

const Arc = () => {
    const arcTimeline = useRef<Timeline | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const { getAdjustedDuration } = useAnimationSpeed();

    // Compute once on mount — no state, no re-render
    const arcCount = useRef(getArcCount()).current;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const dashes = container.querySelectorAll('.dash');
        if (!dashes.length) return;

        const containerRect = container.getBoundingClientRect();
        const centerX = containerRect.width / 2;
        const centerY = containerRect.height / 2;
        const radius = Math.min(centerX, centerY) * 1.25;

        const containerSize = Math.min(containerRect.width, containerRect.height);
        let dashWidth = Math.max(Math.round(containerSize * 0.06), 12);
        let dashHeight = Math.max(Math.round(containerSize * 0.005), 2);
        const largeDashWidth = Math.max(Math.round(containerSize * 0.09), 20);
        const largeDashHeight = Math.max(Math.round(containerSize * 0.007), 3);

        const totalDashes = dashes.length;

        const ringX = (i: number, rOffset: number, hw: number) => {
            const angle = (i / totalDashes) * Math.PI * 2;
            return centerX + (radius - rOffset) * Math.cos(angle) - hw;
        };
        const ringY = (i: number, rOffset: number, hh: number) => {
            const angle = (i / totalDashes) * Math.PI * 2;
            return centerY + (radius - rOffset) * Math.sin(angle) - hh;
        };
        const tangentDeg = (i: number, extra = 0) => {
            const angle = (i / totalDashes) * Math.PI * 2;
            return (Math.atan2(Math.sin(angle), Math.cos(angle)) * 180 / Math.PI) + extra;
        };

        // Target the container element directly via ref instead of class selector.
        // This avoids issues where anime.js queries the global DOM and may miss
        // or double-target elements, especially on mobile after re-renders.
        const containerEl = container;

        arcTimeline.current = createTimeline()
            // Phase 1: Gather at center
            .add(['.dash', '.dash-2'], {
                translateX: centerX,
                translateY: centerY,
                duration: getAdjustedDuration(1000),
            })
            // Phase 2: Expand width
            .add(['.dash', '.dash-2'], {
                width: `${dashWidth}px`,
                duration: getAdjustedDuration(100),
            })
            // Phase 3: Spread into ring
            .add(['.dash', '.dash-2'], {
                delay: (_, i) => i * getAdjustedDuration(10),
                translateX: (_, i) => ringX(i, 0, dashWidth / 2),
                translateY: (_, i) => ringY(i, 0, dashHeight / 2),
                rotate: (_, i) => tangentDeg(i),
                duration: getAdjustedDuration(200),
                ease: 'out',
            })
            // Phase 4: Fade
            .add(['.dash', '.dash-2'], {
                opacity: '0.75',
                ease: 'out',
                duration: getAdjustedDuration(2500),
            })
            // Continuous container rotation — use the DOM element directly
            .add(containerEl, {
                rotate: '1turn',
                duration: getAdjustedDuration(30000),
                ease: 'linear',
                loop: true,
                delay: 0,
            }, '<<')
            // Phase 5: First contraction
            .add(['.dash', '.dash-2'], {
                translateX: (_, i) => ringX(i, radius * OFFSET.ring1, dashWidth / 2),
                translateY: (_, i) => ringY(i, radius * OFFSET.ring1, dashHeight / 2),
                duration: getAdjustedDuration(1000),
                ease: 'inOut',
            }, `<<+=${getAdjustedDuration(1300)}`)
            .add(containerEl, {
                duration: getAdjustedDuration(2000),
                delay: getAdjustedDuration(3000),
            }, '<<')
            // Phase 6: Enlarge dashes
            .add(['.dash', '.dash-2'], {
                onBegin: () => { dashWidth = largeDashWidth; dashHeight = largeDashHeight; },
                width: `${largeDashWidth}px`,
                height: `${largeDashHeight}px`,
                ease: 'out',
                duration: getAdjustedDuration(1000),
                borderRadius: `${Math.round(containerSize * 0.02)}px`,
            }, '<<')
            // Phase 7: Color shift
            .add(['.dash', '.dash-2'], {
                backgroundColor: COLORS.muted,
            }, `<<+=${getAdjustedDuration(300)}`)
            // Phase 8: Second contraction
            .add(['.dash', '.dash-2'], {
                translateX: (_, i) => ringX(i, radius * OFFSET.ring2, largeDashWidth / 2),
                translateY: (_, i) => ringY(i, radius * OFFSET.ring2, largeDashHeight / 2),
                duration: getAdjustedDuration(1000),
                ease: 'inOut',
            }, `<<+=${getAdjustedDuration(1400)}`)
            // Phase 9: Cross-rotation pattern
            .add(['.dash', '.dash-2'], {
                backgroundColor: COLORS.foreground,
                rotate: (_, i) => tangentDeg(i, 45),
            }, `<<+=${getAdjustedDuration(200)}`)
            .add('.dash-2', {
                backgroundColor: COLORS.muted,
                rotate: (_, i) => tangentDeg(i, -45),
            }, '<<')
            .add('.dash-2', {
                rotate: (_, i) => tangentDeg(i, 45),
            }, `<<+=${getAdjustedDuration(2000)}`)
            .add('.dash', {
                rotate: (_, i) => tangentDeg(i, -45),
            }, '<<')
            // Phase 10: Oscillation
            .add(['.dash'], {
                loop: true,
                ease: 'outCirc',
                alternate: true,
                duration: getAdjustedDuration(1800),
            }, `<<+=${getAdjustedDuration(1000)}`)
            // Phase 11: dash-2 middle ring
            .add(['.dash-2'], {
                translateX: (_, i) => ringX(i, radius * OFFSET.dash2_mid, largeDashWidth / 2),
                translateY: (_, i) => ringY(i, radius * OFFSET.dash2_mid, largeDashHeight / 2),
                duration: getAdjustedDuration(1000),
                ease: 'inOut',
            }, `<<+=${getAdjustedDuration(1400)}`)
            // Phase 12: dash deep inward
            .add(['.dash'], {
                translateX: (_, i) => ringX(i, radius * OFFSET.dash_deep, largeDashWidth / 2),
                translateY: (_, i) => ringY(i, radius * OFFSET.dash_deep, largeDashHeight / 2),
                duration: getAdjustedDuration(2000),
                ease: 'inOutQuad',
            }, `<<+=${getAdjustedDuration(10)}`)
            // Phase 13: dash mid oscillation
            .add(['.dash'], {
                translateX: (_, i) => ringX(i, radius * OFFSET.dash_mid, largeDashWidth / 2),
                translateY: (_, i) => ringY(i, radius * OFFSET.dash_mid, largeDashHeight / 2),
                duration: getAdjustedDuration(3000),
                ease: 'inOutQuad',
                loop: 5,
                alternate: true,
            }, `<<+=${getAdjustedDuration(3000)}`)
            // Phase 14: dash-2 inner/outer
            .add(['.dash-2'], {
                translateX: (_, i) => ringX(i, radius * OFFSET.dash2_inner, largeDashWidth / 2),
                translateY: (_, i) => ringY(i, radius * OFFSET.dash2_inner, largeDashHeight / 2),
                duration: getAdjustedDuration(1000),
                ease: 'inOut',
            }, `<<+=${getAdjustedDuration(200)}`)
            .add(['.dash-2'], {
                translateX: (_, i) => ringX(i, radius * OFFSET.dash2_outer, largeDashWidth / 2),
                translateY: (_, i) => ringY(i, radius * OFFSET.dash2_outer, largeDashHeight / 2),
                duration: getAdjustedDuration(1000),
                ease: 'inOut',
            }, `<<+=${getAdjustedDuration(1000)}`)
            // Phase 15: dash-2 rotation flourish
            .add('.dash-2', {
                rotate: (_, i) => tangentDeg(i, 280),
                duration: getAdjustedDuration(3000),
                ease: 'inOut',
            }, '<<')
            .add('.dash-2', {
                rotate: (_, i) => tangentDeg(i, 45),
                duration: getAdjustedDuration(2500),
                ease: 'inOutExpo',
            }, `<<+=${getAdjustedDuration(3000)}`);

        return () => {
            if (arcTimeline.current) {
                arcTimeline.current.pause();
            }
        };
    }, [getAdjustedDuration]);

    return (
        <ArcRootStyled>
            <div className="arc-wrapper">
                <div className="container" ref={containerRef}>
                    {Array.from({ length: arcCount }, (_, i) => (
                        <div key={`dash-${i}`} className="dash" />
                    ))}
                    {Array.from({ length: arcCount }, (_, i) => (
                        <div key={`dash2-${i}`} className="dash-2" />
                    ))}
                </div>
            </div>
        </ArcRootStyled>
    );
};

export default Arc;