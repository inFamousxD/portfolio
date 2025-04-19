import React from 'react'
import Arc from './Arc/Arc'
import { ArcContainer, DashboardWrapper, IntroGreetingContainer, TickerContainer } from './Dashboard.styles'
import IntroGreeting from './IntroGreeting/IntroGreeting'
import Name from './LandingText/LandingText'
import { GridContainer } from './IntroGreeting/IntroGreeting.styles'

const Dashboard = () => {

    const [intro, setIntro] = React.useState(true);

    return (
        <DashboardWrapper>
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
            <TickerContainer />
                {/* <div style={{ height: '200vh', background: 'transparent' }}></div> */}
        </DashboardWrapper>
    )
}

export default Dashboard