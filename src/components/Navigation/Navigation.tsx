import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { COLORS, LAYOUT, SPACING, Z_INDEX, MEDIA_QUERIES, TYPOGRAPHY } from '../../config/constants';
// import { useAnimationSpeed } from '../../context/AnimationContext';
import { smoothScrollTo } from '../../utils/helpers';
import { NavItem } from '../../types';
import { animate } from 'animejs';

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: ${LAYOUT.navHeight};
  background: ${COLORS.background};
  border-bottom: 1px solid ${COLORS.border};
  z-index: ${Z_INDEX.nav};
  opacity: 0;
  transform: translateY(-100%);
`;

const NavInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${SPACING.md};

  @media (min-width: 768px) {
    padding: 0 ${SPACING.xl};
  }
`;

const Logo = styled.button`
  font-family: ${TYPOGRAPHY.fontFamily.primary};
  font-size: ${TYPOGRAPHY.fontSize.lg};
  color: ${COLORS.foreground};
  background: transparent;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }

  @media ${MEDIA_QUERIES.reducedMotion} {
    transition: none;
  }
`;

const NavLinks = styled.div`
  display: none;
  gap: ${SPACING.lg};

  @media (min-width: 768px) {
    display: flex;
  }
`;

const NavLink = styled.button`
  font-family: ${TYPOGRAPHY.fontFamily.primary};
  font-size: ${TYPOGRAPHY.fontSize.sm};
  color: ${COLORS.muted};
  background: transparent;
  border: none;
  cursor: pointer;
  padding: ${SPACING.sm} 0;
  border-bottom: 1px solid transparent;
  transition: all 0.2s ease;

  &:hover {
    color: ${COLORS.foreground};
    border-bottom-color: ${COLORS.foreground};
  }

  @media ${MEDIA_QUERIES.reducedMotion} {
    transition: none;
  }
`;

const NavActions = styled.div`
  display: flex;
  gap: ${SPACING.md};
  align-items: center;
`;

// const SpeedButton = styled.button<{ $isActive: boolean }>`
//   font-family: ${TYPOGRAPHY.fontFamily.primary};
//   font-size: ${TYPOGRAPHY.fontSize.xs};
//   color: ${({ $isActive }) => $isActive ? COLORS.foreground : COLORS.muted};
//   background: transparent;
//   border: 1px solid ${({ $isActive }) => $isActive ? COLORS.foreground : COLORS.border};
//   padding: ${SPACING.sm} ${SPACING.md};
//   border-radius: 0.25rem;
//   cursor: pointer;
//   transition: all 0.2s ease;
//   white-space: nowrap;

//   &:hover {
//     color: ${COLORS.foreground};
//     border-color: ${COLORS.foreground};
//   }

//   @media ${MEDIA_QUERIES.reducedMotion} {
//     transition: none;
//   }
// `;

// const MobileMenuButton = styled.button`
//   display: flex;
//   flex-direction: column;
//   gap: 4px;
//   background: transparent;
//   border: none;
//   cursor: pointer;
//   padding: ${SPACING.sm};

//   @media (min-width: 768px) {
//     display: none;
//   }

//   span {
//     width: 20px;
//     height: 2px;
//     background: ${COLORS.foreground};
//     transition: all 0.2s ease;
//   }

//   @media ${MEDIA_QUERIES.reducedMotion} {
//     span {
//       transition: none;
//     }
//   }
// `;

const MobileMenu = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: ${LAYOUT.navHeight};
  left: 0;
  right: 0;
  background: ${COLORS.background};
  border-bottom: 1px solid ${COLORS.border};
  padding: ${SPACING.lg} ${SPACING.md};
  display: flex;
  flex-direction: column;
  gap: ${SPACING.md};
  transform: ${({ $isOpen }) => $isOpen ? 'translateY(0)' : 'translateY(-100%)'};
  opacity: ${({ $isOpen }) => $isOpen ? 1 : 0};
  transition: all 0.3s ease;
  z-index: ${Z_INDEX.nav - 1};

  @media (min-width: 768px) {
    display: none;
  }

  @media ${MEDIA_QUERIES.reducedMotion} {
    transition: none;
  }
`;

const MobileNavLink = styled(NavLink)`
  display: block;
  text-align: left;
`;

// ============================================================================
// COMPONENT
// ============================================================================

const NAV_ITEMS: NavItem[] = [
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

export const Navigation: React.FC = () => {
    // const { toggleSpeed, isHighSpeed } = useAnimationSpeed();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [_, setIsVisible] = useState(false);

    useEffect(() => {
        // Animate nav in on mount
        const timer = setTimeout(() => {
            setIsVisible(true);
            animate('.nav-container', {
                opacity: 1,
                translateY: 0,
                duration: 600,
                easing: 'easeOutQuad',
            });
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleNavClick = (href: string) => {
        setMobileMenuOpen(false);
        smoothScrollTo(href);
    };

    const handleLogoClick = () => {
        smoothScrollTo(0);
    };

    return (
        <>
            <NavContainer className="nav-container">
                <NavInner>
                    <Logo onClick={handleLogoClick}>
                        AM
                    </Logo>

                    <NavLinks>
                        {NAV_ITEMS.map((item) => (
                            <NavLink
                                key={item.href}
                                onClick={() => handleNavClick(item.href)}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </NavLinks>

                    <NavActions>
                        {/* <SpeedButton
                            $isActive={isHighSpeed}
                            onClick={toggleSpeed}
                            title="Toggle animation speed"
                        >
                            {isHighSpeed ? '5x' : '1x'}
                        </SpeedButton>

                        <MobileMenuButton
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            <span />
                            <span />
                            <span />
                        </MobileMenuButton> */}
                    </NavActions>
                </NavInner>
            </NavContainer>

            <MobileMenu $isOpen={mobileMenuOpen}>
                {NAV_ITEMS.map((item) => (
                    <MobileNavLink
                        key={item.href}
                        onClick={() => handleNavClick(item.href)}
                    >
                        {item.label}
                    </MobileNavLink>
                ))}
            </MobileMenu>
        </>
    );
};
