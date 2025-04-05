import styled from "styled-components";

interface IntroGreetingContainerProps {
    $display?: string;
}

export const IntroGreetingContainer = styled.div<IntroGreetingContainerProps>`
    display: ${(props) => props.$display || 'inherit' };
`;

export const ArcContainer = styled.div`
`;

export const DashboardWrapper = styled.div`
  .grid {
    mask-image: linear-gradient(to bottom, black 80%, transparent 95%);
  }
`;