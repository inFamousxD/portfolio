import styled from "styled-components";

interface IntroGreetingContainerProps {
    $display?: string;
}

export const IntroGreetingContainer = styled.div<IntroGreetingContainerProps>`
    display: ${(props) => props.$display || 'inherit' };
`;

export const ArcContainer = styled.div`
`;