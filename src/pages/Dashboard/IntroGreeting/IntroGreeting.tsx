import { animate, createTimeline, utils } from 'animejs';
import { useEffect, useRef } from 'react';
import { AbsoluteTextBoxTitle, Square } from './IntroGreeting.styles';

function IntroGreeting(props) {
    const container = useRef(null);
    const { setIntro } = props;

    useEffect(() => {
        setIntro(false);
        createTimeline()
            .add(['.square1', '.square2', '.square3'], {
                opacity: 0,
                duration: 0
            })
            .add('.square1', {
                x: '10vw',
                duration: 1000,
                ease: 'out',
                opacity: '1'
            })
            .add('.square2', {
                x: '10vw',
                rotate: '360',
                duration: 700,
                ease: 'out',
                opacity: '1'
            }, "-=500")
            .add('.square3', {
                x: '10vw',
                duration: 500,
                ease: 'out',
                opacity: '1'
            }, "-=250")
            .add(['.square2', '.square3'], {
                y: '10vh'
            })
            .add('.square1', {
                // scaleX: '0.9',
                ease: 'out',
            }, '<<')
            .add(['.square1', '.square2', '.square3'], {
                borderColor: '#ff4b4b',
            }, '<<')
            .add(['.square1'], {
                delay: 100,
                x: '50vw',
                ease: 'out(4)',
                backgroundColor: '#ff4b4b'

            })
            .add('.text-greet-1>span', {
                visibility: 'visible',
                delay: (_, i) => i * 50,
                ease: 'out',
            }, '<<+=50')
            .add(['.square2'], {
                delay: 100,
                x: '50vw',
                ease: 'out(4)',
                backgroundColor: '#ff4b4b'

            })
            .add('.text-greet-2>span', {
                visibility: 'visible',
                delay: (_, i) => i * 30,
                ease: 'out',
            }, '<<')
            .add(['.square3'], {
                delay: 100,
                x: '50vw',
                ease: 'out(4)',
                backgroundColor: '#ff4b4b'
            }, '<<+=200')
            .add('.text-greet-3>span', {
                visibility: 'visible',
                delay: (_, i) => i * 25,
                ease: 'out',
            }, '<<')
            .add(['.square1', '.square2', '.square3'], {
                rotate: '1turn',
            })
            .add(['.square1', '.square2', '.square3'], {
                ease: 'out',
                opacity: 0,
                scale: 0
            }, "<<")
            .add(['.text-greet-1>span', '.text-greet-2>span', '.text-greet-3>span'], {
                visibility: 'hidden',
                delay: (_, i) => i * 25, // Function based value
                ease: 'out',
                onComplete: (() => { console.log('Finished!'); setIntro(false);})
            })

        if (container.current) {
            for (let i = 0; i < 150; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                container.current.appendChild(particle);
                animate(particle, {
                    x: utils.random(-10, 10, 2) + 'rem',
                    y: utils.random(-3, 3, 2) + 'rem',
                    scale: [{ from: 0, to: 1 }, { to: 0 }],
                    delay: utils.random(0, 1000),
                    loop: true,
                });
            }
        }
    }, []);

    return (
        <div>
            <div>
                <div className='scope1' style={{ marginTop: '50px', minHeight: '500px' }}>
                    <AbsoluteTextBoxTitle className='text-greet-1'>
                        <span>H</span>
                        <span>e</span>
                        <span>y</span>
                        <span>.</span>
                    </AbsoluteTextBoxTitle>
                    <AbsoluteTextBoxTitle className='text-greet-2' $y={'230'}>
                        <span>W</span>
                        <span>e</span>
                        <span>l</span>
                        <span>c</span>
                        <span>o</span>
                        <span>m</span>
                        <span>e</span>
                        <span>,</span>
                    </AbsoluteTextBoxTitle>
                    <AbsoluteTextBoxTitle className='text-greet-3' $y={'310'}>
                        <span>T</span>
                        <span>o</span>
                        <span>{' '}</span>
                        <span>T</span>
                        <span>h</span>
                        <span>e</span>
                        <span>{' '}</span>
                        <span>M</span>
                        <span>a</span>
                        <span>c</span>
                        <span>h</span>
                        <span>i</span>
                        <span>n</span>
                        <span>e</span>
                        <span>.</span>
                    </AbsoluteTextBoxTitle>
                    <Square className='square1'></Square>
                    <Square className='square2'></Square>
                    <Square className='square3'></Square>
                </div>
                <div style={{ width: '100px', height: '100px' }} ref={container} className="large row container"></div>
            </div>
        </div>
    )
}

export default IntroGreeting;