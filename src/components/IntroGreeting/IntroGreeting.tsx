import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { createTimeline, Timeline } from 'animejs';
import { COLORS } from '../../config/constants';
import { useAnimationSpeed } from '../../context/AnimationContext';

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

const IntroContainer = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  z-index: 100;
`;

const Square = styled.div`
  margin: 1vh;
  width: 5vh;
  height: 5vh;
  border: 2px solid ${COLORS.foreground};
  border-radius: 1vh;
  box-shadow: 0 0 4px ${COLORS.foreground};
  background: transparent;
`;

const TextBox = styled.div`
  position: absolute;
  font-size: 32px;
  padding: 12px;
  width: 100%;
  visibility: hidden;
  color: ${COLORS.foreground};
  text-shadow: 0 0 32px ${COLORS.background};

  span {
    background: transparent;
  }
`;

const SkipButton = styled.button`
  z-index: 110;
  color: ${COLORS.foreground};
  padding: 0.5rem 1rem;
  border: 1px solid ${COLORS.border};
  position: fixed;
  border-radius: 0.25rem;
  opacity: 0.6;
  right: 1vw;
  top: 3.5vh;
  cursor: pointer;
  background: transparent;
  font-family: 'Roboto Mono', monospace;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
    border-color: ${COLORS.foreground};
  }
`;

const Scope = styled.div`
  margin-top: 5vh;
  min-height: 500px;
`;

// ============================================================================
// COMPONENT
// ============================================================================

interface IntroGreetingProps {
    onComplete: () => void;
}

export const IntroGreeting: React.FC<IntroGreetingProps> = ({ onComplete }) => {
    const introTimeline = useRef<Timeline | null>(null);
    const { getAdjustedDuration } = useAnimationSpeed();

    useEffect(() => {
        const timeline = createTimeline({ delay: getAdjustedDuration(500) });

        // Initialize opacity
        timeline.add(['.square1', '.square2', '.square3'], {
            opacity: 0,
            duration: 0,
        });

        // Fade in and translate squares right
        timeline
            .add('.square1', {
                x: '5vw',
                duration: getAdjustedDuration(800),
                ease: 'out',
                opacity: 1,
            })
            .add('.square2', {
                x: '5vw',
                rotate: '360',
                duration: getAdjustedDuration(500),
                ease: 'out',
                opacity: 1,
            }, `-=${getAdjustedDuration(500)}`)
            .add('.square3', {
                x: '5vw',
                duration: getAdjustedDuration(400),
                ease: 'out',
                opacity: 1,
            }, `-=${getAdjustedDuration(250)}`);

        // Pull down squares 2 and 3
        timeline
            .add(['.square2', '.square3'], {
                y: '10vh',
            })
            .add('.square1', {
                ease: 'out',
            }, '<<')
            .add(['.square1', '.square2', '.square3'], {
                borderColor: COLORS.foreground,
            }, '<<');

        // Set text positions
        timeline
            .set('.text-greet-1', {
                top: '0vh',
                left: '200px',
            })
            .set('.text-greet-2', {
                top: '15vh',
                left: '200px',
            })
            .set('.text-greet-3', {
                top: '21vh',
                left: '200px',
            });

        // Move square 1 right and show "Hey"
        timeline
            .add('.square1', {
                delay: getAdjustedDuration(100),
                x: '55vw',
                ease: 'out(4)',
                backgroundColor: COLORS.foreground,
            })
            .add('.text-greet-1>span', {
                visibility: 'visible',
                delay: (_, i) => i * getAdjustedDuration(50),
                ease: 'out',
            }, `<<+=${getAdjustedDuration(50)}`);

        // Move square 2 right and show "Welcome"
        timeline
            .add('.square2', {
                delay: getAdjustedDuration(100),
                x: '55vw',
                ease: 'out(4)',
                backgroundColor: COLORS.foreground,
            })
            .add('.text-greet-2>span', {
                visibility: 'visible',
                delay: (_, i) => i * getAdjustedDuration(30),
                ease: 'out',
            }, '<<');

        // Move square 3 right and show "To the machine"
        timeline
            .add('.square3', {
                delay: getAdjustedDuration(100),
                x: '55vw',
                ease: 'out(4)',
                backgroundColor: COLORS.foreground,
            }, `<<+=${getAdjustedDuration(200)}`)
            .add('.text-greet-3>span', {
                visibility: 'visible',
                delay: (_, i) => i * getAdjustedDuration(25),
                ease: 'out',
            }, '<<');

        // Hide squares
        timeline
            .add(['.square1', '.square2', '.square3'], {
                rotate: '1turn',
            })
            .add(['.square1', '.square2', '.square3'], {
                ease: 'out',
                opacity: 0,
                scale: 0,
            }, '<<');

        // Remove text and complete
        timeline.add(['.text-greet-1>span', '.text-greet-2>span', '.text-greet-3>span'], {
            visibility: 'hidden',
            delay: (_, i) => i * getAdjustedDuration(25),
            ease: 'out',
            onComplete: () => {
                onComplete();
            },
        });

        introTimeline.current = timeline;

        return () => {
            if (introTimeline.current) {
                introTimeline.current.pause();
            }
        };
    }, [onComplete, getAdjustedDuration]);

    const handleSkip = () => {
        if (introTimeline.current) {
            introTimeline.current.complete();
        }
    };

    return (
        <IntroContainer>
            <SkipButton onClick={handleSkip}>SKIP</SkipButton>
            <Scope>
                <TextBox className="text-greet-1">
                    {'Hey.'.split('').map((char, i) => (
                        <span key={i}>{char}</span>
                    ))}
                </TextBox>
                <TextBox className="text-greet-2">
                    {'Welcome,'.split('').map((char, i) => (
                        <span key={i}>{char}</span>
                    ))}
                </TextBox>
                <TextBox className="text-greet-3">
                    {'To The Machine.'.split('').map((char, i) => (
                        <span key={i}>{char}</span>
                    ))}
                </TextBox>
                <Square className="square1" />
                <Square className="square2" />
                <Square className="square3" />
            </Scope>
        </IntroContainer>
    );
};