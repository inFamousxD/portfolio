import { useEffect } from "react"
import { ArcRootStyled } from "./Arc.styles"
import { createTimeline } from "animejs"
import { ACCENT_BLUE, ACCENT_YELLOW } from "../../../constants";

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
        .add('.dash', {
            x: '400px',
            y: '400px',
            duration: 1000,
        })
        .add('.dash', {
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
            duration: 500,
            ease: 'out'
        })
        .add('.dash', {
            opacity: '0.5',
            ease: 'out',
            duration: 3000
        })
        .add('.container', {
            rotate: '1turn',
            duration: 30000,
            ease: 'linear',
            loop: true,
            delay: 0
        }, '<<')
        .add('.container', {
            scale: '0.5',
            duration: 2000,
            delay: 1500,
        }, '<<')
        .add('.dash', {
            width: '90px',
            height: '8px',
            ease: 'out',
            duration: 1000,
            borderRadius: '10px'
        }, '<<')
        .add('.dash', {
            backgroundColor: ACCENT_YELLOW
        }, '<<')
        .add('.container', {
            scale: '0.30',
            duration: 2000,
        }, '<+=4500')
        .add('.dash', {
            backgroundColor: ACCENT_BLUE
        }, '<<+=100')
        
    }, [])

    return (
        <ArcRootStyled>
            <div className="container">
                {
                    Array.from({ length: ARC_COUNT }, (_, index) => index + 1).map((_, i) => (
                        <div key={i} className="dash"></div>
                    ))
                }
            </div>
        </ArcRootStyled>
    )
}

export default Arc