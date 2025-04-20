import { useEffect, useRef } from "react"
import { ArcRootStyled } from "./Arc.styles"
import { createTimeline, Timeline } from "animejs"
import { ACCENT_GREEN, ACCENT_RED } from "../../../constants";

const ARC_COUNT = 75;

// TODO: Change circle radius changing calc from px to screenratio
const Arc = () => {
    const arcTimeline = useRef<Timeline>(null);
    useEffect(() => {
        const container = document.querySelector('.container');
        const dashes = document.querySelectorAll('.dash');
        const containerRect = container.getBoundingClientRect();
        const centerX = containerRect.width / 2;
        const centerY = containerRect.height / 2;
        const radius = Math.min(centerX, centerY) * 0.8;
        
        // Get dash dimensions for centering calculations
        let dashWidth = 25; // Width of dash from CSS
        let dashHeight = 2; // Height of dash from CSS
        
        arcTimeline.current = createTimeline()
        .add(['.dash', '.dash-2'], {
            // x: `${(40 * window.innerHeight) / 100}px`,
            // y: `${(20 * window.innerWidth) / 100}px`,
            x: centerX,
            y: centerY,
            duration: 1000,
        }).
        add(['.dash', '.dash-2'], {
            width: '25px',
            duration: 100
        })
        .add(['.dash', '.dash-2'], {
            delay: (_, i) => i * 10,
            translateX: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                // Subtract half the dash width to center it
                return centerX + radius * Math.cos(angle) - (dashWidth / 2);
            },
            translateY: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                // Subtract half the dash height to center it
                return centerY + radius * Math.sin(angle) - (dashHeight / 2);
            },
            rotate: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return (Math.atan2(Math.sin(angle), Math.cos(angle)) * 180 / Math.PI);
            },
            duration: 200,
            ease: 'out'
        })
        .add(['.dash', '.dash-2'], {
            opacity: '0.75',
            ease: 'out',
            duration: 2500
        })
        .add('.container', {
            rotate: '1turn',
            duration: 30000,
            ease: 'linear',
            loop: true,
            delay: 0
        }, '<<')
        .add(['.dash', '.dash-2'], {
            translateX: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                // Reduce radius by 20px to bring dashes closer to center
                return centerX + (radius - ((7 * window.innerHeight)/100)) * Math.cos(angle) - (dashWidth / 2);
            },
            translateY: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                // Reduce radius by 20px to bring dashes closer to center
                return centerY + (radius - ((7 * window.innerHeight)/100)) * Math.sin(angle) - (dashHeight / 2);
            },
            duration: 1000,
            ease: 'inOut'
        }, '<<+=2500')
        .add('.container', {
            // scale: '0.65',
            duration: 2000,
            delay: 3000,
        }, '<<')
        .add(['.dash', '.dash-2'], {
            onBegin: () => { dashWidth=40; dashHeight=3; },
            width: '40px',
            height: '3px',
            ease: 'out',
            duration: 1000,
            borderRadius: '10px',
        }, '<<')
        .add(['.dash', '.dash-2'], {
            backgroundColor: ACCENT_GREEN
        }, '<<+=300')
        .add(['.dash', '.dash-2'], {
            onBegin: () => { console.log('dashw', dashWidth) },
            translateX: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                // Reduce radius by 20px to bring dashes closer to center
                // IMP 40 here is DASHWIDTH *************************************
                return centerX + (radius - ((14 * window.innerHeight)/100)) * Math.cos(angle) - (40 / 2);
            },
            translateY: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                // Reduce radius by 20px to bring dashes closer to center
                // IMP 4 here is DASHHEIGHT *************************************
                return centerY + (radius - ((14 * window.innerHeight)/100)) * Math.sin(angle) - (3 / 2);
            },
            duration: 1000,
            ease: 'inOut'
        }, '<<+=1400')
        .add(['.dash', '.dash-2'], {
            backgroundColor: ACCENT_RED,
            rotate: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return (Math.atan2(Math.sin(angle), Math.cos(angle)) * 180 / Math.PI)+45;
            },
        }, '<<+=200')
        .add('.dash-2', {
            backgroundColor: ACCENT_GREEN,
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
        }, '<<+=2000')
        .add('.dash', {
            rotate: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return (Math.atan2(Math.sin(angle), Math.cos(angle)) * 180 / Math.PI)-45;
            },
        }, '<<')
        .add(['.dash'], {
            // opacity: '0',
            loop: true,
            ease: 'outCirc',
            alternate: true,
            duration: 1800
        }, '<<+=1000')
        .add(['.dash-2'], {
            translateX: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                // Reduce radius by 20px to bring dashes closer to center
                // IMP 40 here is DASHWIDTH *************************************
                return centerX + (radius - ((10 * window.innerHeight)/100)) * Math.cos(angle) - (40 / 2);
            },
            translateY: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                // Reduce radius by 20px to bring dashes closer to center
                // IMP 4 here is DASHHEIGHT *************************************
                return centerY + (radius - ((10 * window.innerHeight)/100)) * Math.sin(angle) - (3 / 2);
            },
            duration: 1000,
            ease: 'inOut',
        }, '<<+=1400')
        .add(['.dash'], {
            translateX: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                // Reduce radius by 20px to bring dashes closer to center
                // IMP 40 here is DASHWIDTH *************************************
                return centerX + (radius - ((24 * window.innerHeight)/100)) * Math.cos(angle) - (40 / 2);
            },
            translateY: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                // Reduce radius by 20px to bring dashes closer to center
                // IMP 4 here is DASHHEIGHT *************************************
                return centerY + (radius - ((24 * window.innerHeight)/100)) * Math.sin(angle) - (3 / 2);
            },
            duration: 2000,
            ease: 'inOutQuad',
            // loop: true,
            // alternate: true,
        }, '<<+=10')
        .add(['.dash'], {
            translateX: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                // Reduce radius by 20px to bring dashes closer to center
                // IMP 40 here is DASHWIDTH *************************************
                return centerX + (radius - ((19.5 * window.innerHeight)/100)) * Math.cos(angle) - (40 / 2);
            },
            translateY: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                // Reduce radius by 20px to bring dashes closer to center
                // IMP 4 here is DASHHEIGHT *************************************
                return centerY + (radius - ((19.5 * window.innerHeight)/100)) * Math.sin(angle) - (3 / 2);
            },
            duration: 3000,
            ease: 'inOutQuad',
            loop: true,
            alternate: true,
        }, '<<+=3000')
        .add(['.dash-2'], {
            translateX: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                // Reduce radius by 20px to bring dashes closer to center
                // IMP 40 here is DASHWIDTH *************************************
                return centerX + (radius - ((12.5 * window.innerHeight)/100)) * Math.cos(angle) - (40 / 2);
            },
            translateY: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                // Reduce radius by 20px to bring dashes closer to center
                // IMP 4 here is DASHHEIGHT *************************************
                return centerY + (radius - ((12.5 * window.innerHeight)/100)) * Math.sin(angle) - (3 / 2);
            },
            duration: 1000,
            ease: 'inOut',
        }, '<<+=200')
        .add(['.dash-2'], {
            translateX: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                // Reduce radius by 20px to bring dashes closer to center
                // IMP 40 here is DASHWIDTH *************************************
                return centerX + (radius - ((10.25 * window.innerHeight)/100)) * Math.cos(angle) - (40 / 2);
            },
            translateY: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                // Reduce radius by 20px to bring dashes closer to center
                // IMP 4 here is DASHHEIGHT *************************************
                return centerY + (radius - ((10.25 * window.innerHeight)/100)) * Math.sin(angle) - (3 / 2);
            },
            duration: 1000,
            ease: 'inOut',
        }, '<<+=1000')
        .add('.dash-2', {
            rotate: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return (Math.atan2(Math.sin(angle), Math.cos(angle)) * 180 / Math.PI) + 280;
            },
            duration: 3000,
            ease: 'inOut'
        }, '<<')
        .add('.dash-2', {
            rotate: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return (Math.atan2(Math.sin(angle), Math.cos(angle)) * 180 / Math.PI) + 45;
            },
            duration: 2500,
            ease: 'inOutExpo',
        }, '<<+=3000')
    }, [])

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
    )
}

export default Arc