import { createTimeline } from 'animejs';
import { useEffect } from 'react';
import { AbsoluteTextBoxTitle, Square } from './IntroGreeting.styles';
import { ACCENT_RED } from '../../../constants';

function IntroGreeting(props) {
    const { setIntro } = props;

    useEffect(() => {
        // setIntro(false);
        let introTimeline = createTimeline({ delay: 500 });

        // init
        introTimeline
        .add(['.square1', '.square2', '.square3'], {
            opacity: 0,
            duration: 0
        });
        
        // fade in and translate right
        introTimeline
        .add('.square1', {
            x: '5vw',
            duration: 800,
            ease: 'out',
            opacity: '1'
        })
        .add('.square2', {
            x: '5vw',
            rotate: '360',
            duration: 500,
            ease: 'out',
            opacity: '1'
        }, "-=500")
        .add('.square3', {
            x: '5vw',
            duration: 400,
            ease: 'out',
            opacity: '1'
        }, "-=250");

        // pull down and lower scale: 2, 3
        introTimeline
        .add(['.square2', '.square3'], {
            y: '10vh'
        })
        .add('.square1', {
            // scaleX: '0.9',
            ease: 'out',
        }, '<<')
        .add(['.square1', '.square2', '.square3'], {
            borderColor: ACCENT_RED,
        }, '<<');
        
        // text location prep
        introTimeline
        .set('.text-greet-1', {
        })
        .set('.text-greet-2', {
            y: '17vh'
        })
        .set('.text-greet-3', {
            y: '23vh'
        })
        
        // move right, "hey"
        introTimeline
        .add(['.square1'], {
            delay: 100,
            x: '55vw',
            ease: 'out(4)',
            backgroundColor: ACCENT_RED,
        })
        .add('.text-greet-1>span', {
            visibility: 'visible',
            delay: (_, i) => i * 50,
            ease: 'out',
        }, '<<+=50');

        // move right, "welcome"
        introTimeline
        .add(['.square2'], {
            delay: 100,
            x: '55vw',
            ease: 'out(4)',
            backgroundColor: ACCENT_RED
        })
        .add('.text-greet-2>span', {
            visibility: 'visible',
            delay: (_, i) => i * 30,
            ease: 'out',
        }, '<<');

        // move right, "to the machine"
        introTimeline
        .add(['.square3'], {
            delay: 100,
            x: '55vw',
            ease: 'out(4)',
            backgroundColor: ACCENT_RED
        }, '<<+=200')
        .add('.text-greet-3>span', {
            visibility: 'visible',
            delay: (_, i) => i * 25,
            ease: 'out',
        }, '<<');

        // turn and hide squares
        introTimeline
        .add(['.square1', '.square2', '.square3'], {
            rotate: '1turn',
        })
        .add(['.square1', '.square2', '.square3'], {
            ease: 'out',
            opacity: 0,
            scale: 0
        }, "<<");

        // remove text, finish
        introTimeline
        .add(['.text-greet-1>span', '.text-greet-2>span', '.text-greet-3>span'], {
            visibility: 'hidden',
            delay: (_, i) => i * 25, // Function based value
            ease: 'out',
            onComplete: (() => { console.log('Finished!'); setIntro(false);})
        });
    }, []);

    return (
        <div>
            <div>
                <div className='scope1' style={{ marginTop: '5vh', minHeight: '500px' }}>
                    <AbsoluteTextBoxTitle $color={ACCENT_RED} className='text-greet-1' $fontSize={'3.25vh'} $margin={'0px 0px 0px 12vw'} $padding={'4px'}>
                        {
                            'Hey.'.split('').map(char => <span>{char}</span>)
                        }
                    </AbsoluteTextBoxTitle>
                    <AbsoluteTextBoxTitle $color={ACCENT_RED} className='text-greet-2' $fontSize={'3.25vh'} $margin={'0px 0px 0px 12vw'} $padding={'4px'}>
                        {
                            'Welcome,'.split('').map(char => <span>{char}</span>)
                        }
                    </AbsoluteTextBoxTitle>
                    <AbsoluteTextBoxTitle $color={ACCENT_RED} className='text-greet-3' $fontSize={'3.25vh'} $margin={'0px 0px 0px 12vw'} $padding={'4px'}>
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