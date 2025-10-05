import React, { useEffect } from 'react'
import Arc from './Arc/Arc'
import { ArcContainer, DashboardWrapper, IntroGreetingContainer } from './Dashboard.styles'
import IntroGreeting from './IntroGreeting/IntroGreeting'
import Name from './LandingText/LandingText'
import { GridContainer } from './IntroGreeting/IntroGreeting.styles'
import { StandardTextSpanStyled } from '../../common/common.styles'
import Genscalemin from '../Genscale/Genscale.min'
import WorkExperience from '../WorkExperience/WorkExperience'
import { animate, onScroll } from 'animejs'
import { ACCENT_BLUE, ACCENT_GREEN, ACCENT_RED } from '../../constants'

const Dashboard = () => {
    const [intro, setIntro] = React.useState(true);

    useEffect(() => {
        animate('.square-dash-1', {
            x: '90vw',
            rotate: '3turn',
            ease: 'linear',
            backgroundColor: `${ACCENT_BLUE}`,
            autoplay: onScroll({
                container: 'body',
                enter: 'top+=100vh top',
                leave: 'top+=30vh bottom',
                sync: 0.4,
            })
        });

        animate('.square-dash-2', {
            x: '90vw',
            rotate: '3turn',
            ease: 'linear',
            backgroundColor: `${ACCENT_BLUE}`,
            autoplay: onScroll({
                container: 'body',
                enter: 'top+=100vh top',
                leave: 'top+=30vh bottom',
                sync: 0.4,
            })
        });

        animate('.square-dash-3', {
            x: '-90vw',
            rotate: '3turn',
            ease: 'linear',
            backgroundColor: `${ACCENT_GREEN}`,
            autoplay: onScroll({
                container: 'body',
                enter: 'top+=100vh top',
                leave: 'top+=30vh bottom',
                sync: 0.4,
            })
        });

        animate(['.square-dash-1'], {
            scale: 0,
            ease: 'linear',
            autoplay: onScroll({
                container: 'body',
                enter: 'top+=30vh bottom',
                leave: 'top+=2vh bottom',
                sync: 0.45,
            })
        });

        animate(['.square-dash-2'], {
            scale: 0,
            ease: 'linear',
            autoplay: onScroll({
                container: 'body',
                enter: 'top+=30vh bottom',
                leave: 'top+=2vh bottom',
                sync: 0.45,
            })
        });

        animate(['.square-dash-3'], {
            scale: 0,
            ease: 'linear',
            autoplay: onScroll({
                container: 'body',
                enter: 'top+=30vh bottom',
                leave: 'top+=2vh bottom',
                sync: 0.45,
            })
        });
    })

    return (
        <DashboardWrapper className='dashboard'>
            <GridContainer className='grid'>
                {intro && <IntroGreetingContainer>
                    <IntroGreeting setIntro={setIntro} />
                </IntroGreetingContainer>}
                {
                    !intro && <Name />
                }
                {
                    !intro &&
                    <ArcContainer>
                        <Arc />
                    </ArcContainer>
                }
            </GridContainer>
            <div className='wip'>WorkInProgress</div>

            <div className='projects'>
                <div className='square-dash-1' style={{ height: '70px', width: '70px', backgroundColor: ACCENT_RED, margin: '50px 00px 0px 50px', borderRadius: '12px' }}></div>
                
                <WorkExperience />
                
                <div className='square-dash-2' style={{ height: '10px', width: '70px', backgroundColor: ACCENT_RED, margin: '00px 00px 50px 50px', borderRadius: '12px' }}></div>
                <StandardTextSpanStyled className='last-worked-on' $padding={'10px'} $margin={'10px 30px'} $fontSize={'20px'}>
                    Last worked on <span style={{ fontSize: '13px', paddingLeft: '20px' }}>(...or maybe still am)</span>
                </StandardTextSpanStyled>
                <Genscalemin></Genscalemin>
                <div className='square-dash-3' style={{ height: '70px', width: '70px', backgroundColor: ACCENT_BLUE, margin: '30px 00px 2000px 95vw', borderRadius: '12px' }}></div>
            </div>
        </DashboardWrapper>
    )
}

export default Dashboard