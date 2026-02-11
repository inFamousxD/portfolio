import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { createTimeline, Timeline } from "animejs";
import { COLORS } from "../../config/constants";
import { useAnimationSpeed } from "../../context/AnimationContext";

// Responsive arc count based on screen size
const getArcCount = () => {
    const width = window.innerWidth;
    if (width < 640) return 40; // Mobile
    if (width < 1024) return 55; // Tablet
    return 75; // Desktop
};

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

const ArcRootStyled = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    position: relative;

    .container {
        position: absolute;
        /* Use vmin for consistent sizing across orientations */
        width: min(80vmin, 600px);
        height: min(80vmin, 600px);
        transform-origin: 50% 50%;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        border-radius: 50%;
        background: transparent;
        
        .dash, .dash-2 {
            position: absolute;
            width: 2px;
            height: 2px;
            background-color: ${COLORS.foreground};
            color: ${COLORS.foreground};
            will-change: transform;
        }
    }
    
    /* Mobile adjustments */
    @media (max-width: 640px) {
        .container {
            width: min(70vmin, 400px);
            height: min(70vmin, 400px);
        }
    }
`;

// ============================================================================
// COMPONENT
// ============================================================================

const Arc = () => {
    const arcTimeline = useRef<Timeline | null>(null);
    const { getAdjustedDuration } = useAnimationSpeed();
    const [arcCount] = useState(getArcCount());
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const dashes = container.querySelectorAll('.dash');
        // const dashes2 = container.querySelectorAll('.dash-2');
        if (!dashes.length) return;

        // Use actual rendered dimensions
        const containerRect = container.getBoundingClientRect();
        const centerX = containerRect.width / 2;
        const centerY = containerRect.height / 2;
        const baseRadius = Math.min(centerX, centerY) * 0.75;
        
        // Use percentages of baseRadius for consistent scaling
        let dashWidth = 25;
        let dashHeight = 2;
        
        arcTimeline.current = createTimeline()
        // Start dashes already in circle formation
        .add(['.dash', '.dash-2'], {
            translateX: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerX + baseRadius * Math.cos(angle) - (dashWidth / 2);
            },
            translateY: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerY + baseRadius * Math.sin(angle) - (dashHeight / 2);
            },
            rotate: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return (Math.atan2(Math.sin(angle), Math.cos(angle)) * 180 / Math.PI);
            },
            width: '2px',
            opacity: 0,
            duration: 0,
        })
        .add(['.dash', '.dash-2'], {
            width: `${dashWidth}px`,
            opacity: 0.75,
            delay: (_, i) => i * getAdjustedDuration(10),
            duration: getAdjustedDuration(200),
            ease: 'out'
        })
        .add('.container', {
            rotate: '1turn',
            duration: getAdjustedDuration(30000),
            ease: 'linear',
            loop: true,
            delay: 0
        }, `<<+=${getAdjustedDuration(100)}`)
        .add(['.dash', '.dash-2'], {
            translateX: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerX + (baseRadius * 0.85) * Math.cos(angle) - (dashWidth / 2);
            },
            translateY: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerY + (baseRadius * 0.85) * Math.sin(angle) - (dashHeight / 2);
            },
            duration: getAdjustedDuration(1000),
            ease: 'inOut'
        }, `<<+=${getAdjustedDuration(500)}`)
        .add('.container', {
            duration: getAdjustedDuration(2000),
            delay: getAdjustedDuration(3000),
        }, '<<')
        .add(['.dash', '.dash-2'], {
            onBegin: () => { dashWidth=40; dashHeight=3; },
            width: '40px',
            height: '3px',
            ease: 'out',
            duration: getAdjustedDuration(1000),
            borderRadius: '10px',
        }, '<<')
        .add(['.dash', '.dash-2'], {
            backgroundColor: COLORS.muted
        }, `<<+=${getAdjustedDuration(300)}`)
        .add(['.dash', '.dash-2'], {
            translateX: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerX + (baseRadius * 0.7) * Math.cos(angle) - (40 / 2);
            },
            translateY: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerY + (baseRadius * 0.7) * Math.sin(angle) - (3 / 2);
            },
            duration: getAdjustedDuration(1000),
            ease: 'inOut'
        }, `<<+=${getAdjustedDuration(1400)}`)
        .add(['.dash', '.dash-2'], {
            backgroundColor: COLORS.foreground,
            rotate: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return (Math.atan2(Math.sin(angle), Math.cos(angle)) * 180 / Math.PI)+45;
            },
        }, `<<+=${getAdjustedDuration(200)}`)
        .add('.dash-2', {
            backgroundColor: COLORS.muted,
            rotate: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return (Math.atan2(Math.sin(angle), Math.cos(angle)) * 180 / Math.PI)-45;
            },
        }, '<<')
        .add('.dash-2', {
            rotate: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return (Math.atan2(Math.sin(angle), Math.cos(angle)) * 180 / Math.PI)+45;
            },
        }, `<<+=${getAdjustedDuration(2000)}`)
        .add('.dash', {
            rotate: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return (Math.atan2(Math.sin(angle), Math.cos(angle)) * 180 / Math.PI)-45;
            },
        }, '<<')
        .add(['.dash'], {
            loop: true,
            ease: 'outCirc',
            alternate: true,
            duration: getAdjustedDuration(1800)
        }, `<<+=${getAdjustedDuration(1000)}`)
        .add(['.dash-2'], {
            translateX: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerX + (baseRadius * 0.8) * Math.cos(angle) - (40 / 2);
            },
            translateY: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerY + (baseRadius * 0.8) * Math.sin(angle) - (3 / 2);
            },
            duration: getAdjustedDuration(1000),
            ease: 'inOut',
        }, `<<+=${getAdjustedDuration(1400)}`)
        .add(['.dash'], {
            translateX: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerX + (baseRadius * 0.5) * Math.cos(angle) - (40 / 2);
            },
            translateY: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerY + (baseRadius * 0.5) * Math.sin(angle) - (3 / 2);
            },
            duration: getAdjustedDuration(2000),
            ease: 'inOutQuad',
        }, `<<+=${getAdjustedDuration(10)}`)
        .add(['.dash'], {
            translateX: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerX + (baseRadius * 0.6) * Math.cos(angle) - (40 / 2);
            },
            translateY: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerY + (baseRadius * 0.6) * Math.sin(angle) - (3 / 2);
            },
            duration: getAdjustedDuration(3000),
            ease: 'inOutQuad',
            loop: 5,
            alternate: true,
        }, `<<+=${getAdjustedDuration(3000)}`)
        .add(['.dash-2'], {
            translateX: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerX + (baseRadius * 0.75) * Math.cos(angle) - (40 / 2);
            },
            translateY: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerY + (baseRadius * 0.75) * Math.sin(angle) - (3 / 2);
            },
            duration: getAdjustedDuration(1000),
            ease: 'inOut',
        }, `<<+=${getAdjustedDuration(200)}`)
        .add(['.dash-2'], {
            translateX: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerX + (baseRadius * 0.78) * Math.cos(angle) - (40 / 2);
            },
            translateY: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerY + (baseRadius * 0.78) * Math.sin(angle) - (3 / 2);
            },
            duration: getAdjustedDuration(1000),
            ease: 'inOut',
        }, `<<+=${getAdjustedDuration(1000)}`)
        .add('.dash-2', {
            rotate: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return (Math.atan2(Math.sin(angle), Math.cos(angle)) * 180 / Math.PI) + 280;
            },
            duration: getAdjustedDuration(3000),
            ease: 'inOut'
        }, '<<')
        .add('.dash-2', {
            rotate: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return (Math.atan2(Math.sin(angle), Math.cos(angle)) * 180 / Math.PI) + 45;
            },
            duration: getAdjustedDuration(2500),
            ease: 'inOutExpo',
        }, `<<+=${getAdjustedDuration(3000)}`);

        return () => {
            if (arcTimeline.current) {
                arcTimeline.current.pause();
            }
        };
    }, [getAdjustedDuration, arcCount]);

    return (
        <ArcRootStyled>
            <div className="container" ref={containerRef}>
                {
                    Array.from({ length: arcCount }, (_, index) => index + 1).map((_, i) => (
                        <div key={i} className="dash"></div>
                    ))
                }
                {
                    Array.from({ length: arcCount }, (_, index) => index + 1).map((_, i) => (
                        <div key={i} className="dash-2"></div>
                    ))
                }
            </div>
        </ArcRootStyled>
    );
};

export default Arc;