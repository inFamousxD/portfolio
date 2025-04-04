import { animate, createScope, createSpring, createDraggable, utils, createTimeline, createTimer } from 'animejs';
import React, { useEffect, useRef } from 'react';
import { GridContainer } from './Dashboard.styles';

function Dashboard() {
    const root = useRef(null);
    const scope = useRef(null);

    const [gridSize, setGridSize] = React.useState('50px');

    useEffect(() => {

        const timer = createTimer({
            playbackRate: 2,
            duration: 1000,
            autoplay: true,
            onUpdate: (time) => { setGridSize(`${time.currentTime/10}px`) },
        });

        timer.speed = 1;

        // scope.current = createScope({ root }).add(scope => {
        //     // Make the logo draggable around its center
        //     createDraggable('.rot-square', {
        //         container: [0, 0, 0, 0],
        //         releaseEase: createSpring({ stiffness: 200 })
        //     });

        //     // Register function methods to be used outside the useEffect
        //     scope.add('rotateSquare', (i) => {
        //         animate('.rot-square', {
        //             rotate: i * 360,
        //             ease: 'out(4)',
        //             duration: 1000,
        //         });
        //     });

        //     const { isSmall, reduceMotion } = scope.matches;

        //     if (isSmall) {
        //         utils.set('.rot-square', { scale: .5 });
        //     }

        //     animate('.rot-square', {
        //         x: 0,
        //         y: ['-40vh', '40vh'],
        //         loop: true,
        //         alternate: true,
        //         duration: reduceMotion ? 0 : isSmall ? 750 : 1250
        //     });
        // });

        // return () => scope.current.revert()

        const circleAnimation = animate('.circle', {
            x: '25rem'
        });

        createTimeline()
            .sync(circleAnimation)
            .add('.triangle', {
                x: '25rem',
                rotate: '1turn',
                duration: 500,
            })
            .add('.square', {
                x: '25rem',
            });
    }, []);

    return (
        <div ref={root}>
            {/* <div className='grid'>
                <div className='circle' style={{ width: '100px', height: '100px', border: '1px solid white' }}></div>
                <div className='triangle' style={{ width: '100px', height: '100px', border: '1px solid white' }}></div>
                <div className='square' style={{ width: '100px', height: '100px', border: '1px solid white' }}></div>
            </div> */}
            <GridContainer
                cellSize="50px"
                backgroundColor="#252423"
                accentColor="#FF4B4B"
                lightColor="rgba(255,255,255,.1)"
                mediumColor="rgba(255,255,255,.08)"
                // minHeight="500px"
                overflow="auto"
            >
                {/* Your content here */}
            </GridContainer>
        </div>
    )
}

export default Dashboard;