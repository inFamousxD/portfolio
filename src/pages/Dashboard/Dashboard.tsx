import React from 'react'
import Arc from './Arc/Arc'
import { ArcContainer, IntroGreetingContainer } from './Dashboard.styles'
import IntroGreeting from './IntroGreeting/IntroGreeting'

const Dashboard = () => {

    const [intro, setIntro] = React.useState(true);

    return (
        <React.Fragment>
            {intro && <IntroGreetingContainer>
                <IntroGreeting setIntro={setIntro} />
            </IntroGreetingContainer>}
            {!intro && <ArcContainer>
                <Arc />
            </ArcContainer>}
        </React.Fragment>
    )
}

export default Dashboard