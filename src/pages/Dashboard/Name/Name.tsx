import { useEffect } from "react"
import { AbsoluteTextBoxTitle } from "../IntroGreeting/IntroGreeting.styles"
import { createTimeline } from "animejs"
import { ACCENT_GREEN, ACCENT_RED } from "../../../constants"

const Name = () => {
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
        }, '+=800')
        .add('.greet-1 > .--2', {
            visibility: 'hidden',
            delay: (_, i) => i * 20,
            ease: 'out',
        }, '+=1500')
        .add('.name > .--1-2', {
            visibility: 'visible',
            delay: (_, i) => i * 20,
            ease: 'out',
        }, '<<+=200')
        .add('.things-i-do > .--1', {
            visibility: 'visible',
            delay: (_, i) => i * 20,
            ease: 'out',
        }, '<<')
        .add(['.name', '.things-i-do', 'greet-1'], {
            y: -200
        })
        .add(['.web > .--1'], {
            visibility: 'visible',
            delay: (_, i) => i * 20,
            ease: 'out',
        }, '<<')
        .add(['.system > .--1'], {
            visibility: 'visible',
            delay: (_, i) => i * 20,
            ease: 'out',
        }, '<<+=250')
        .add(['.databases > .--1'], {
            visibility: 'visible',
            delay: (_, i) => i * 17,
            ease: 'out',
        }, '<<+=500')
        .add(['.research > .--1'], {
            visibility: 'visible',
            delay: (_, i) => i * 10,
            ease: 'out',
        }, '<<+=100')
    }, [])

    return (
        <div>
            <AbsoluteTextBoxTitle $color={ACCENT_RED} $y={'300'} className='name'>
                {
                    'I\'m Aaditya. '.split('').map(char => <span className="--1">{char}</span>)
                }
                {
                    'It\'s nice to meet you!'.split('').map(char => <span className="--1-2">{char}</span>)
                }
            </AbsoluteTextBoxTitle>
            <AbsoluteTextBoxTitle $color={ACCENT_RED} $y={'400'} className='greet-1'>
                {
                    'It\'s nice to meet you!'.split('').map(char => <span className="--2">{char}</span>)
                }
            </AbsoluteTextBoxTitle>
            <AbsoluteTextBoxTitle $color={ACCENT_GREEN} $fontSize={'24px'} $y={'400'} className='things-i-do'>
                {
                    'Here\'s a few things that I do.'.split('').map(char => <span className="--1">{char}</span>)
                }
            </AbsoluteTextBoxTitle>
            <AbsoluteTextBoxTitle $color={ACCENT_RED} $fontSize={'20px'} $y={'400'} className='web'>
                {
                    'WEB // ReactJS. NodeJS. AngularJS. TypeScript. JavaScript.'.split('').map(char => <span className="--1">{char}</span>)
                }
            </AbsoluteTextBoxTitle>
            <AbsoluteTextBoxTitle $color={ACCENT_RED} $fontSize={'20px'} $y={'475'} className='system'>
                {
                    'LANGUAGES // C/C++. Assembly. Linux/UNIX. Java. Python'.split('').map(char => <span className="--1">{char}</span>)
                }
            </AbsoluteTextBoxTitle>
            <AbsoluteTextBoxTitle $color={ACCENT_RED} $fontSize={'20px'} $y={'550'} className='databases'>
                {
                    'DB // MySQL. MongoDB. PostgreSQL. SQLite. Redis. Cassandra'.split('').map(char => <span className="--1">{char}</span>)
                }
            </AbsoluteTextBoxTitle>
            <AbsoluteTextBoxTitle $color={ACCENT_GREEN} $fontSize={'20px'} $y={'750'} className='research'>
                {
                    'RESEARCH // High Performance Computing. Optimization. Cloud. Schedulers. Operating Systems. Scalability'.split('').map(char => <span className="--1">{char}</span>)
                }
            </AbsoluteTextBoxTitle>
        </div>
    )
}

export default Name