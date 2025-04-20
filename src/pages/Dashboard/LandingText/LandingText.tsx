import { useEffect } from "react"
import { AbsoluteTextBoxTitle } from "../IntroGreeting/IntroGreeting.styles"
import { createTimeline } from "animejs"
import { ACCENT_BLUE, ACCENT_GREEN, ACCENT_RED } from "../../../constants"
import { StandardButtonStyled } from "../../../common/common.styles"

const Name = () => {
    const handleMoreBtnClicked = () => {
        window.scrollTo({
            top: window.innerHeight * 0.95,
            behavior: 'smooth'
        });
    }

    useEffect(() => {
        let scrollButtonTimeline = createTimeline();
        scrollButtonTimeline
        .add('.button-more', {
            opacity: 0.9
        }, '+2000')
        .add('.button-more', {
            y: -10,
            alternate: true,
            loop: true
        }, '<<')
    })

    useEffect(() => {
        createTimeline({
            delay: 2000
        })
        .add('.name > .--1', {
            visibility: 'visible',
            delay: (_, i) => i * 50,
            ease: 'out',
        })
        .add('.greet-1 > .--2', {
            visibility: 'visible',
            delay: (_, i) => i * 20,
            ease: 'out',
        }, '<<+=800')
        .add('.greet-1 > .--2', {
            visibility: 'hidden',
            delay: (_, i) => i * 20,
            ease: 'out',
        }, '+=1500')
        .add('.name > .--1-2', {
            visibility: 'visible',
            delay: (_, i) => i * 20,
            ease: 'out',
        }, '<<')
        .add('.things-i-do > .--1', {
            visibility: 'visible',
            delay: (_, i) => i * 20,
            ease: 'out',
        }, '<<')
        .add(['.name', '.things-i-do', 'greet-1'], {
            y: '-24vh',
            x: '-2vw',
            duration: 800,
            ease: 'out'
        })
        .add(['.web > .--1'], {
            visibility: 'visible',
            delay: (_, i) => i * 20,
            ease: 'out',
        }, '<<+=200')
        .add(['.system > .--1'], {
            visibility: 'visible',
            delay: (_, i) => i * 20,
            ease: 'out',
        }, '<<+=250')
        .add(['.databases > .--1'], {
            visibility: 'visible',
            delay: (_, i) => i * 17,
            ease: 'out',
        }, '<<+=300')
        .add(['.research > .--1'], {
            visibility: 'visible',
            delay: (_, i) => i * 10,
            ease: 'out',
        }, '<<+=100')
    }, [])

    return (
        <div className="test">
            <AbsoluteTextBoxTitle $color={ACCENT_RED} $fontSize={'2.75vh'} $left={'6vw'} $top={'30vh'} className='name'>
                {
                    'I\'m Aaditya. '.split('').map((char, i) => <span key={i} className="--1">{char}</span>)
                }
                {
                    'It\'s nice to meet you!'.split('').map((char, i) => <span key={i} className="--1-2">{char}</span>)
                }
            </AbsoluteTextBoxTitle>
            <AbsoluteTextBoxTitle $color={ACCENT_RED} $fontSize={'2.75vh'} $left={'6vw'} $top={'36vh'} className='greet-1'>
                {
                    'It\'s nice to meet you!'.split('').map((char, i) => <span key={i} className="--2">{char}</span>)
                }
            </AbsoluteTextBoxTitle>
            <AbsoluteTextBoxTitle $color={ACCENT_GREEN} $fontSize={'2.75vh'} $left={'6vw'} $top={'36vh'} className='things-i-do'>
                {
                    'Here\'s a few things that I do.'.split('').map((char, i) => <span key={i} className="--1">{char}</span>)
                }
            </AbsoluteTextBoxTitle>
            <AbsoluteTextBoxTitle $color={ACCENT_BLUE} $fontSize={'1.95vh'} $left={'6vw'} $top={'27.5vh'} className='web'>
                {
                    'WEB //'.split('').map((char, i) => <span key={i} className="--1">{char}</span>)
                }
            </AbsoluteTextBoxTitle>
            <AbsoluteTextBoxTitle $color={ACCENT_RED} $fontSize={'1.95vh'} $left={'6vw'} $top={'30.5vh'} className='web'>
                {
                    'ReactJS. NodeJS. AngularJS. TypeScript. JavaScript.'.split('').map((char, i) => <span key={i} className="--1">{char}</span>)
                }
            </AbsoluteTextBoxTitle>
            <AbsoluteTextBoxTitle $color={ACCENT_BLUE} $fontSize={'1.95vh'} $left={'6vw'} $top={'37.5vh'} className='system'>
                {
                    'LANGUAGES //'.split('').map((char, i) => <span key={i} className="--1">{char}</span>)
                }
            </AbsoluteTextBoxTitle>
            <AbsoluteTextBoxTitle $color={ACCENT_RED} $fontSize={'1.95vh'} $left={'6vw'} $top={'40.5vh'} className='system'>
                {
                    'C/C++. Assembly. Linux/UNIX. Java. Python'.split('').map((char, i) => <span key={i} className="--1">{char}</span>)
                }
            </AbsoluteTextBoxTitle>
            <AbsoluteTextBoxTitle $color={ACCENT_BLUE} $fontSize={'1.95vh'} $left={'6vw'} $top={'47.5vh'} className='databases'>
                {
                    'DB //'.split('').map((char, i) => <span key={i} className="--1">{char}</span>)
                }
            </AbsoluteTextBoxTitle>
            <AbsoluteTextBoxTitle $color={ACCENT_RED} $fontSize={'1.95vh'} $left={'6vw'} $top={'50.5vh'} className='databases'>
                {
                    'MySQL. MongoDB. PostgreSQL. SQLite. Redis. Cassandra'.split('').map((char, i) => <span key={i} className="--1">{char}</span>)
                }
            </AbsoluteTextBoxTitle>
            <AbsoluteTextBoxTitle $color={ACCENT_BLUE} $fontSize={'1.95vh'} $left={'6vw'} $top={'57.5vh'} className='research'>
                {
                    'RESEARCH //'.split('').map((char, i) => <span key={i} className="--1">{char}</span>)
                }
            </AbsoluteTextBoxTitle>
            <AbsoluteTextBoxTitle $color={ACCENT_GREEN} $fontSize={'1.95vh'} $left={'6vw'} $top={'60.5vh'} className='research'>
                {
                    'High Performance Computing. Optimization. Cloud. Schedulers. Operating Systems. Scalability'.split('').map((char, i) => <span key={i} className="--1">{char}</span>)
                }
            </AbsoluteTextBoxTitle>
            <StandardButtonStyled onClick={handleMoreBtnClicked} className="button-more" $isAbsolute={true} $top={'90vh'} $left={'45vw'} $width={'200px'} $height={'50px'} $opacity={'0'}>Find out More</StandardButtonStyled>
        </div>
    )
}

export default Name