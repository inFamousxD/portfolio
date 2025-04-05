import { useEffect } from "react"
import { ArcRootStyled } from "./Arc.styles"
import { createTimeline } from "animejs"
import { stagger } from "animejs"

const Arc = () => {
    useEffect(() => {
        const container = document.querySelector('.container');
        const dashes = document.querySelectorAll('.dash');
        const containerRect = container.getBoundingClientRect();
        const centerX = containerRect.width / 2;
        const centerY = containerRect.height / 2;
        const radius = Math.min(centerX, centerY) * 0.8;
        
        createTimeline()
        .add('.dash', {
            x: stagger('10px')
        })
        .add('.dash', {
            delay: (_, i) => i * 30,
            translateX: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerX + radius * Math.cos(angle);
            },
            translateY: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return centerY + radius * Math.sin(angle);
            },
            rotate: (_, i) => {
                const angle = (i / dashes.length) * Math.PI * 2;
                return (Math.atan2(Math.sin(angle), Math.cos(angle)) * 180 / Math.PI);
            },
            duration: 500,
        })
        .add('.dash', {
            opacity: '0.5',
            ease: 'out',
            duration: 3000
        })
        .add('.container', {
            rotate: '1turn',
            duration: 10000,
            ease: 'linear',
            loop: true,
            delay: 0,
        }, '<<')
        .add('.dash', {
            height: '6px',
            alternate: true,
            loop: true,
            ease: 'out'
        }, '<<')
        
    }, [])

    return (
        <ArcRootStyled>
            <div className="container">
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
                <div className="dash"></div>
            </div>
        </ArcRootStyled>
    )
}

export default Arc