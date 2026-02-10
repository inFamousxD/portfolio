import { useEffect, useRef } from "react";
import styled from "styled-components";
import { createTimeline, Timeline } from "animejs";
import { COLORS } from "../../config/constants";
import { useAnimationSpeed } from "../../context/AnimationContext";

const ARC_COUNT = 75;

// ============================================================================
// STYLED COMPONENTS (from your original)
// ============================================================================

const ArcRootStyled = styled.div`
    width: 100vw;
    height: 100vh;

    .container {
        position: absolute;
        width: 40vw;
        height: 40vw;
        transform-origin: 50% 50%;
        top: 0vh;
        left: 50vw;
        border-radius: 50%;
        background: transparent;
        .dash, .dash-2 {
            position: absolute;
            width: 2px;
            height: 2px;
            background-color: ${COLORS.foreground};
            color: ${COLORS.foreground};
        }
    }
`;

// ============================================================================
// COMPONENT
// ============================================================================

const Arc = () => {
    const arcTimeline = useRef<Timeline | null>(null);
    const { getAdjustedDuration } = useAnimationSpeed();

    useEffect(() => {
        const container = document.querySelector('.container');
        const dashes = document.querySelectorAll('.dash');
        if (!container || !dashes.length) return;

        const containerRect = container.getBoundingClientRect();
        const centerX = containerRect.width / 2;
        const centerY = containerRect.height / 2;
        const radius = Math.min(centerX, centerY) * 0.8;
        
        let dashWidth = 25;
        let dashHeight = 2;
        
        arcTimeline.current = createTimeline()
        .add(['.dash', '.dash-2'], {
            x: centerX,
            y: centerY,
            duration: getAdjustedDuration(1000),
        })
        .add(['.dash', '.dash-2'], {
            width: '25px',
            duration: getAdjustedDuration(100)
        })
        .add(['.dash', '.dash-2'], {
            delay: (_, i) => i * getAdjustedDuration(10),
            translateX: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerX + radius * Math.cos(angle) - (dashWidth / 2);
            },
            translateY: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerY + radius * Math.sin(angle) - (dashHeight / 2);
            },
            rotate: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return (Math.atan2(Math.sin(angle), Math.cos(angle)) * 180 / Math.PI);
            },
            duration: getAdjustedDuration(200),
            ease: 'out'
        })
        .add(['.dash', '.dash-2'], {
            opacity: '0.75',
            ease: 'out',
            duration: getAdjustedDuration(2500)
        })
        .add('.container', {
            rotate: '1turn',
            duration: getAdjustedDuration(30000),
            ease: 'linear',
            loop: true,
            delay: 0
        }, '<<')
        .add(['.dash', '.dash-2'], {
            translateX: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerX + (radius - ((7 * window.innerHeight)/100)) * Math.cos(angle) - (dashWidth / 2);
            },
            translateY: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerY + (radius - ((7 * window.innerHeight)/100)) * Math.sin(angle) - (dashHeight / 2);
            },
            duration: getAdjustedDuration(1000),
            ease: 'inOut'
        }, `<<+=${getAdjustedDuration(1300)}`)
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
                return centerX + (radius - ((14 * window.innerHeight)/100)) * Math.cos(angle) - (40 / 2);
            },
            translateY: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerY + (radius - ((14 * window.innerHeight)/100)) * Math.sin(angle) - (3 / 2);
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
                return centerX + (radius - ((10 * window.innerHeight)/100)) * Math.cos(angle) - (40 / 2);
            },
            translateY: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerY + (radius - ((10 * window.innerHeight)/100)) * Math.sin(angle) - (3 / 2);
            },
            duration: getAdjustedDuration(1000),
            ease: 'inOut',
        }, `<<+=${getAdjustedDuration(1400)}`)
        .add(['.dash'], {
            translateX: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerX + (radius - ((24 * window.innerHeight)/100)) * Math.cos(angle) - (40 / 2);
            },
            translateY: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerY + (radius - ((24 * window.innerHeight)/100)) * Math.sin(angle) - (3 / 2);
            },
            duration: getAdjustedDuration(2000),
            ease: 'inOutQuad',
        }, `<<+=${getAdjustedDuration(10)}`)
        .add(['.dash'], {
            translateX: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerX + (radius - ((19.5 * window.innerHeight)/100)) * Math.cos(angle) - (40 / 2);
            },
            translateY: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerY + (radius - ((19.5 * window.innerHeight)/100)) * Math.sin(angle) - (3 / 2);
            },
            duration: getAdjustedDuration(3000),
            ease: 'inOutQuad',
            loop: 5,
            alternate: true,
        }, `<<+=${getAdjustedDuration(3000)}`)
        .add(['.dash-2'], {
            translateX: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerX + (radius - ((12.5 * window.innerHeight)/100)) * Math.cos(angle) - (40 / 2);
            },
            translateY: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerY + (radius - ((12.5 * window.innerHeight)/100)) * Math.sin(angle) - (3 / 2);
            },
            duration: getAdjustedDuration(1000),
            ease: 'inOut',
        }, `<<+=${getAdjustedDuration(200)}`)
        .add(['.dash-2'], {
            translateX: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerX + (radius - ((10.25 * window.innerHeight)/100)) * Math.cos(angle) - (40 / 2);
            },
            translateY: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerY + (radius - ((10.25 * window.innerHeight)/100)) * Math.sin(angle) - (3 / 2);
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
    }, [getAdjustedDuration]);

    return (
        <ArcRootStyled>
            <div className="container">
                {
                    Array.from({ length: ARC_COUNT }, (_, index) => index + 1).map((_, i) => (
                        <div key={i} className="dash"></div>
                    ))
                }
                {
                    Array.from({ length: ARC_COUNT }, (_, index) => index + 1).map((_, i) => (
                        <div key={i} className="dash-2"></div>
                    ))
                }
            </div>
        </ArcRootStyled>
    );
};

export default Arc;