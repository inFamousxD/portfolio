import styled, { css } from 'styled-components';
import { COLORS, TYPOGRAPHY, SPACING, BREAKPOINTS, MEDIA_QUERIES } from '../../config/constants';
import { ButtonStyledProps, TextStyledProps, SpacingProps } from '../../types';
import { getSpacing, getFontSize, getColor } from '../../utils/helpers';

// ============================================================================
// BUTTON
// ============================================================================

export const Button = styled.button<ButtonStyledProps>`
  font-family: ${TYPOGRAPHY.fontFamily.primary};
  border: 1px solid ${COLORS.border};
  background: transparent;
  color: ${COLORS.foreground};
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 0.25rem;

  ${({ $variant = 'primary' }) => {
        switch ($variant) {
            case 'primary':
                return css`
          border-color: ${COLORS.foreground};
          &:hover {
            background: ${COLORS.foreground};
            color: ${COLORS.background};
          }
        `;
            case 'secondary':
                return css`
          border-color: ${COLORS.muted};
          color: ${COLORS.muted};
          &:hover {
            border-color: ${COLORS.foreground};
            color: ${COLORS.foreground};
          }
        `;
            case 'ghost':
                return css`
          border-color: transparent;
          &:hover {
            border-color: ${COLORS.border};
          }
        `;
        }
    }}

  ${({ $size = 'md' }) => {
        switch ($size) {
            case 'sm':
                return css`
          padding: ${SPACING.sm} ${SPACING.md};
          font-size: ${TYPOGRAPHY.fontSize.sm};
        `;
            case 'md':
                return css`
          padding: ${SPACING.md} ${SPACING.lg};
          font-size: ${TYPOGRAPHY.fontSize.base};
        `;
            case 'lg':
                return css`
          padding: ${SPACING.lg} ${SPACING.xl};
          font-size: ${TYPOGRAPHY.fontSize.lg};
        `;
        }
    }}

  ${({ $fullWidth }) => $fullWidth && css`
    width: 100%;
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media ${MEDIA_QUERIES.reducedMotion} {
    transition: none;
  }
`;

// ============================================================================
// TEXT
// ============================================================================

const applySpacing = (props: SpacingProps) => css`
  ${props.$margin && `margin: ${getSpacing(props.$margin)};`}
  ${props.$marginTop && `margin-top: ${getSpacing(props.$marginTop)};`}
  ${props.$marginRight && `margin-right: ${getSpacing(props.$marginRight)};`}
  ${props.$marginBottom && `margin-bottom: ${getSpacing(props.$marginBottom)};`}
  ${props.$marginLeft && `margin-left: ${getSpacing(props.$marginLeft)};`}
  ${props.$padding && `padding: ${getSpacing(props.$padding)};`}
  ${props.$paddingTop && `padding-top: ${getSpacing(props.$paddingTop)};`}
  ${props.$paddingRight && `padding-right: ${getSpacing(props.$paddingRight)};`}
  ${props.$paddingBottom && `padding-bottom: ${getSpacing(props.$paddingBottom)};`}
  ${props.$paddingLeft && `padding-left: ${getSpacing(props.$paddingLeft)};`}
`;

export const Text = styled.span<TextStyledProps & SpacingProps>`
  color: ${({ $color = 'foreground' }) => getColor($color)};
  font-size: ${({ $fontSize = 'base' }) => getFontSize($fontSize)};
  font-family: ${TYPOGRAPHY.fontFamily.primary};
  text-align: ${({ $align = 'left' }) => $align};
  line-height: ${({ $lineHeight = 'normal' }) => TYPOGRAPHY.lineHeight[$lineHeight]};
  
  ${({ $fontWeight = 'normal' }) => {
        const weights = {
            normal: 400,
            medium: 500,
            semibold: 600,
            bold: 700,
        };
        return css`font-weight: ${weights[$fontWeight]};`;
    }}

  ${applySpacing}
`;

// ============================================================================
// CONTAINER
// ============================================================================

export const Container = styled.div<SpacingProps>`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${SPACING.md};

  @media (min-width: ${BREAKPOINTS.md}px) {
    padding: 0 ${SPACING.xl};
  }

  ${applySpacing}
`;

// ============================================================================
// SECTION
// ============================================================================

export const Section = styled.section<SpacingProps>`
  padding: ${SPACING['3xl']} 0;

  @media (min-width: ${BREAKPOINTS.md}px) {
    padding: ${SPACING['5xl']} 0;
  }

  ${applySpacing}
`;

// ============================================================================
// GRID
// ============================================================================

interface GridProps extends SpacingProps {
    $columns?: number;
    $gap?: keyof typeof SPACING;
    $responsive?: boolean;
}

export const Grid = styled.div<GridProps>`
  display: grid;
  gap: ${({ $gap = 'md' }) => SPACING[$gap]};

  ${({ $columns = 1, $responsive = true }) => {
        if ($responsive) {
            return css`
        grid-template-columns: 1fr;

        @media (min-width: ${BREAKPOINTS.sm}px) {
          grid-template-columns: repeat(${Math.min($columns, 2)}, 1fr);
        }

        @media (min-width: ${BREAKPOINTS.lg}px) {
          grid-template-columns: repeat(${$columns}, 1fr);
        }
      `;
        }
        return css`
      grid-template-columns: repeat(${$columns}, 1fr);
    `;
    }}

  ${applySpacing}
`;

// ============================================================================
// FLEX
// ============================================================================

interface FlexProps extends SpacingProps {
    $direction?: 'row' | 'column';
    $align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
    $justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around';
    $gap?: keyof typeof SPACING;
    $wrap?: boolean;
}

export const Flex = styled.div<FlexProps>`
  display: flex;
  flex-direction: ${({ $direction = 'row' }) => $direction};
  align-items: ${({ $align = 'flex-start' }) => $align};
  justify-content: ${({ $justify = 'flex-start' }) => $justify};
  gap: ${({ $gap }) => $gap ? SPACING[$gap] : '0'};
  flex-wrap: ${({ $wrap = false }) => $wrap ? 'wrap' : 'nowrap'};

  ${applySpacing}
`;

// ============================================================================
// LINK
// ============================================================================

export const Link = styled.a`
  color: ${COLORS.foreground};
  text-decoration: none;
  transition: color 0.2s ease;
  cursor: pointer;
  border-bottom: 1px solid transparent;

  &:hover {
    color: ${COLORS.muted};
    border-bottom-color: ${COLORS.muted};
  }

  &:visited {
    color: ${COLORS.accentDim};
  }

  @media ${MEDIA_QUERIES.reducedMotion} {
    transition: none;
  }
`;

// ============================================================================
// CARD
// ============================================================================

interface CardProps extends SpacingProps {
    $variant?: 'default' | 'outlined' | 'elevated';
}

export const Card = styled.div<CardProps>`
  background: ${COLORS.background};
  border-radius: 0.5rem;
  padding: ${SPACING.xl};

  ${({ $variant = 'default' }) => {
        switch ($variant) {
            case 'outlined':
                return css`
          border: 1px solid ${COLORS.border};
        `;
            case 'elevated':
                return css`
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
        `;
            default:
                return '';
        }
    }}

  ${applySpacing}
`;
