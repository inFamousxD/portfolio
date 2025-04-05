import { createTimeline } from 'animejs';
import { useEffect } from 'react';
import { AbsoluteTextBoxTitle, Square } from './IntroGreeting.styles';
import { ACCENT_RED } from '../../../constants';

function IntroGreeting(props) {
    const { setIntro } = props;

    useEffect(() => {
        // setIntro(false);
        createTimeline({ delay: 500 })
            .add(['.square1', '.square2', '.square3'], {
                opacity: 0,
                duration: 0
            })
            .add('.square1', {
                x: '180px',
                duration: 800,
                ease: 'out',
                opacity: '1'
            })
            .add('.square2', {
                x: '180px',
                rotate: '360',
                duration: 500,
                ease: 'out',
                opacity: '1'
            }, "-=500")
            .add('.square3', {
                x: '180px',
                duration: 400,
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
                x: '40vw',
                ease: 'out(4)',
                backgroundColor: '#ff4b4b',
            })
            .add('.text-greet-1>span', {
                visibility: 'visible',
                delay: (_, i) => i * 50,
                ease: 'out',
            }, '<<+=50')
            .add(['.square2'], {
                delay: 100,
                x: '40vw',
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
                x: '40vw',
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
    }, []);

    return (
        <div>
            <div>
                <div className='scope1' style={{ marginTop: '50px', minHeight: '500px' }}>
                    <AbsoluteTextBoxTitle $color={ACCENT_RED} className='text-greet-1'>
                        {
                            'Hey.'.split('').map(char => <span>{char}</span>)
                        }
                    </AbsoluteTextBoxTitle>
                    <AbsoluteTextBoxTitle $color={ACCENT_RED} className='text-greet-2' $y={'230'}>
                        {
                            'Welcome,'.split('').map(char => <span>{char}</span>)
                        }
                    </AbsoluteTextBoxTitle>
                    <AbsoluteTextBoxTitle $color={ACCENT_RED} className='text-greet-3' $y={'310'}>
                        {
                            'To The Machine.'.split('').map(char => <span>{char}</span>)
                        }
                    </AbsoluteTextBoxTitle>
                    <Square className='square1'></Square>
                    <Square className='square2'></Square>
                    <Square className='square3'></Square>
                </div>
            </div>
        </div>
    )
}

export default IntroGreeting;