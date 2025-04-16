import styled from "styled-components";
import { ACCENT_RED } from "../../../constants";

// Define prop types interface
interface GridProps {
  $cellSize?: string;
  $backgroundColor?: string;
  $accentColor?: string;
  $lightColor?: string;
  $mediumColor?: string;
  $minHeight?: string;
  $overflow?: string;
}

interface TextBoxProps {
  $top?: string;
  $left?: string;
  $color?: string;
  $fontSize?: string;
  $padding?: string;
  $margin?: string;
}

export const GridStyled = styled.div<GridProps>`
  /* CSS Variables */
  --one-cell: ${(props) => props.$cellSize || "100px"};
  --grid-color-light: ${(props) =>
    props.$lightColor || "rgba(255,255,255,.05)"};
  --grid-color-medium: ${(props) =>
    props.$mediumColor || "rgba(255,255,255,.04)"};
  --grid-color-heavy: ${(props) => props.$accentColor || "#FF4B4B"};
  --grid-bg: ${(props) => props.$backgroundColor || "#252423"};

  position: relative;

  &::before {
    content: "";
    pointer-events: none;
    position: absolute;
    z-index: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: 
      /* Small grid lines */ linear-gradient(
        -90deg,
        var(--grid-color-light) 1px,
        transparent 1px
      ),
      linear-gradient(var(--grid-color-light) 1px, transparent 1px),
      /* Medium grid lines */
        linear-gradient(-90deg, var(--grid-color-medium) 1px, transparent 1px),
      linear-gradient(var(--grid-color-medium) 1px, transparent 1px),
      /* Large grid cells - horizontal lines */
        linear-gradient(
          transparent 3px,
          var(--grid-bg) 3px,
          var(--grid-bg) calc(var(--one-cell) - 2px),
          transparent calc(var(--one-cell) - 2px)
        ),
      /* Large grid cells - vertical lines with accent color */
        linear-gradient(-90deg, var(--grid-color-heavy) 1px, transparent 1px),
      /* Large grid cells - horizontal lines */
        linear-gradient(
          -90deg,
          transparent 3px,
          var(--grid-bg) 3px,
          var(--grid-bg) calc(var(--one-cell) - 2px),
          transparent calc(var(--one-cell) - 2px)
        ),
      /* Large grid cells - horizontal lines with accent color */
        linear-gradient(var(--grid-color-heavy) 1px, transparent 1px),
      /* Background color */ var(--grid-bg);

    background-size:
      /* Small grid size */ calc(var(--one-cell) / 10)
        calc(var(--one-cell) / 10),
      calc(var(--one-cell) / 10) calc(var(--one-cell) / 10),
      /* Large grid size */ var(--one-cell) var(--one-cell),
      var(--one-cell) var(--one-cell), var(--one-cell) var(--one-cell),
      var(--one-cell) var(--one-cell), var(--one-cell) var(--one-cell),
      var(--one-cell) var(--one-cell);

    background-position: calc(var(--one-cell) * 0.25) -1px;
  }
`;

// Extend the base grid with container properties
export const GridContainer = styled(GridStyled)<GridProps>`
  width: 100%;
  height: 100%;
  min-height: ${(props) => props.$minHeight || "100vh"};
  overflow: ${(props) => props.$overflow || "hidden"};
`;

export const Square = styled.div`
  margin: 1vh;
  width: 5vh;
  height: 5vh;
  border: 2px solid white;
  border-radius: 1vh;
  box-shadow: 0px 0px 4px ${() => ACCENT_RED};
`;

export const Gear = styled.path`
  color: red;
`;

export const AbsoluteTextBoxTitle = styled.div<TextBoxProps>`
  position: absolute;
  /* font-size: 32px; */
  /* padding: 12px; */
  /* margin-left: 200px; */
  width: 100%;
  /* text-align: center; */
  visibility: hidden;
  top: ${(props) => `${props.$top}` || "inherit"};
  left: ${(props) => `${props.$left}` || "inherit"};
  color: ${(props) => `${props.$color}` || "inherit"};
  font-size: ${(props) => `${props.$fontSize}` || "inherit"};
  padding: ${(props) => `${props.$padding}` || "inherit"};
  margin: ${(props) => `${props.$margin}` || "inherit"};

  text-shadow: 0 0 32px black;

  span {
    background: transparent;
  }
`;
