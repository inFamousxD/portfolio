import styled from "styled-components";

interface IntroGreetingContainerProps {
    $display?: string;
}

interface TickerContainerProps {
    $gap?: string
}

export const IntroGreetingContainer = styled.div<IntroGreetingContainerProps>`
    display: ${(props) => props.$display || 'inherit' };
`;

export const ArcContainer = styled.div`
`;

export const DashboardWrapper = styled.div`
  .grid {
    mask-image: linear-gradient(to bottom, black 80vh, transparent 95vh);
  }
`;

export const TickerContainer = styled.div<TickerContainerProps>`
  /* Positioning */
  position: absolute; /* Position relative to the nearest positioned ancestor */
  top: 10px;
  bottom: 0;
  left: 3vw; /* Offset from the left edge of the parent */
  width: 25px; /* Width allocated for the ticks */
  height: 100%; /* Stretch vertically to match parent height */
  z-index: 19;

  /* Interaction */
  pointer-events: none; /* Prevent this element from capturing mouse events */

  /*
   * Background Ticks Implementation:
   * Uses two layered repeating linear gradients for visual effect.
   *
   * Gradient 1 (Small Ticks):
   * - Creates short horizontal lines.
   * - Color: Semi-transparent white (rgba(255, 255, 255, 0.7)).
   * - Height: 1px.
   * - Spacing: Repeats every 'gap' pixels (defined by prop).
   * - Width: Controlled by the first value in 'background-size' (5px).
   *
   * Gradient 2 (Long Ticks):
   * - Creates longer horizontal lines.
   * - Color: Semi-transparent white (rgba(255, 255, 255, 0.7)).
   * - Height: 1px.
   * - Spacing: Repeats every 'gap * 5' pixels (defined by prop).
   * - Width: Controlled by the second value in 'background-size' (10px).
   */
  background-image:
    /* Small ticks gradient */
    repeating-linear-gradient(
      to bottom, /* Gradient direction */
      rgba(255, 255, 255, 1), /* Tick color */
      rgba(255, 255, 255, 1) 1px, /* Tick color stops after 1px (tick height) */
      transparent 1px, /* Start of transparent gap */
      transparent ${props => props.$gap || '10px'} /* End of transparent gap (controls spacing) */
    ),
    /* Long ticks gradient */
    repeating-linear-gradient(
      to bottom, /* Gradient direction */
      rgba(255, 255, 255, 1), /* Tick color */
      rgba(255, 255, 255, 1) 1px, /* Tick color stops after 1px (tick height) */
      transparent 1px, /* Start of transparent gap */
      /* End of transparent gap (controls spacing - 5 times the small gap) */
      transparent ${props => (parseInt(props.$gap || '10', 10) * 5)}px
    );

  background-repeat: repeat-y; /* Repeat the gradients vertically */

  /* Position the start of the gradients at the top-left */
  background-position: left top, left top;
  background: transparent;

  /* Define the size of each background gradient layer */
  /* Format: width height */
  /* The height here corresponds to the repeating segment size */
  background-size:
    10px ${props => props.$gap || '10px'}, /* Small ticks: 5px wide, repeat every 'gap' */
    20px ${props => (parseInt(props.$gap || '10', 10) * 5)}px; /* Long ticks: 10px wide, repeat every 'gap * 5' */
`;