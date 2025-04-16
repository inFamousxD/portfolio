import React from 'react'
import Arc from './Arc/Arc'
import { ArcContainer, DashboardWrapper, IntroGreetingContainer } from './Dashboard.styles'
import IntroGreeting from './IntroGreeting/IntroGreeting'
import Name from './LandingText/LandingText'
import { GridContainer } from './IntroGreeting/IntroGreeting.styles'

const Dashboard = () => {

    const [intro, setIntro] = React.useState(false);

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
        </DashboardWrapper>
    )
}

export default Dashboard