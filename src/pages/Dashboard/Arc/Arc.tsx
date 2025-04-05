import { useEffect } from "react"
import { ArcRootStyled } from "./Arc.styles"
import { createTimeline } from "animejs"
import { ACCENT_GREEN, ACCENT_RED } from "../../../constants";

const ARC_COUNT = 75;

const Arc = () => {
    useEffect(() => {
        const container = document.querySelector('.container');
        const dashes = document.querySelectorAll('.dash');
        const containerRect = container.getBoundingClientRect();
        const centerX = containerRect.width / 2;
        const centerY = containerRect.height / 2;
        const radius = Math.min(centerX, centerY) * 0.8;
        
        // Get dash dimensions for centering calculations
        const dashWidth = 25; // Width of dash from CSS
        const dashHeight = 2; // Height of dash from CSS
        
        createTimeline()
        .add(['.dash', '.dash-2'], {
            x: '400px',
            y: '400px',
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
        .add('.container', {
            scale: '0.65',
            duration: 2000,
            delay: 3000,
        }, '<<')
        .add(['.dash', '.dash-2'], {
            width: '90px',
            height: '8px',
            ease: 'out',
            duration: 1000,
            borderRadius: '10px'
        }, '<<')
        .add(['.dash', '.dash-2'], {
            backgroundColor: ACCENT_GREEN
        }, '<<')
        .add('.container', {
            scale: '0.50',
            duration: 2000,
        }, '<<+=1400')
        .add(['.dash', '.dash-2'], {
            backgroundColor: ACCENT_RED,
            rotate: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return (Math.atan2(Math.sin(angle), Math.cos(angle)) * 180 / Math.PI)+45;
            },
        }, '<<+=100')
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