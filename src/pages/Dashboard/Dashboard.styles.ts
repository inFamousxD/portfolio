import styled from "styled-components";
import { ACCENT_RED } from "../../constants";

interface IntroGreetingContainerProps {
  $display?: string;
}

export const IntroGreetingContainer = styled.div<IntroGreetingContainerProps>`
    display: ${(props) => props.$display || 'inherit'};
`;

export const ArcContainer = styled.div`
`;

export const DashboardWrapper = styled.div`
  .grid {
    mask-image: linear-gradient(to bottom, black 93vh, transparent 99vh);
  }
  .wip {
    position: fixed;
    top: 1vh;
    right: 1vw;
    font-family: monospace;
    color: ${ACCENT_RED};
    z-index: 100;
    font-size: 20px;
    opacity: 0.5;
    background: transparent;
  }

  /* overflow-y: auto;
  height: 100vh !important; */
`;