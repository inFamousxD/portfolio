import styled from "styled-components";
import { ACCENT_RED } from "../constants";

interface StandardButtonProps {
    $color?: string;
    $width?: string;
    $height?: string;
    $borderColor?: string;
    $borderRadius?: string;
    $fontFamily?: string;
    $zIndex?: number;
    $isAbsolute?: boolean;
    $top?: string;
    $left?: string;
    $opacity?: string;
    $origin?: string;
}

export const StandardButtonStyled = styled.button<StandardButtonProps>`
  color: ${props => props.color || ACCENT_RED};
  width: ${props => props.$width || "80px"};
  height: ${props => props.$height || "40px"};
  border: 1px solid ${props => props.$borderColor || ACCENT_RED};
  border-radius: ${props => props.$borderRadius || "10px"};
  font-family: ${props => props.$fontFamily || "Roboto Mono"};
  z-index: ${props => props.$zIndex || 100};
  position: ${props => props.$isAbsolute ? "absolute" : "static"};
  ${props => props.$isAbsolute && props.$top ? `top: ${props.$top};` : ""}
  ${props => props.$isAbsolute && props.$left ? `left: ${props.$left};` : ""}
  cursor: pointer;
  opacity: ${props => props.$opacity || 1};
  transform-origin: ${props => props.$origin || "0% 0%"};
`;

// Default props will be applied when not specified
StandardButtonStyled.defaultProps = {
    $color: ACCENT_RED,
    $width: "80px",
    $height: "40px",
    $borderColor: ACCENT_RED,
    $borderRadius: "10px",
    $fontFamily: "Roboto Mono",
    $zIndex: 100,
    $isAbsolute: false,
    $opacity: '1'
};


// Title Text

interface StandardTextSpanProps {
    $fontFamily?: string;
    $fontSize?: string;
    $color?: string;
    $opacity?: string;
    $margin?: string;
    $padding?: string;
}

export const StandardTextSpanStyled = styled.span<StandardTextSpanProps>`
  color: ${props => props.color || ACCENT_RED};
  font-family: ${props => props.$fontFamily || 'inherit'};
  font-size: ${props => props.$fontSize || 'inherit'};
  opacity: ${props => props.$opacity || 'inherit'};
  margin: ${props => props.$margin || 'inherit'};
  padding: ${props => props.$padding || 'inherit'};
`;
