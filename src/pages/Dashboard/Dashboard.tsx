import React, { useEffect, Suspense, lazy, useState } from 'react';
import styled from 'styled-components';
import { COLORS, SPACING } from '../../config/constants';
import { WORK_EXPERIENCES, PROJECTS, SKILLS, CONTACT_INFO } from '../../data/content';

// Lazy load Arc
const Arc = lazy(() => import('../../components/Arc/Arc'));

const DashboardWrapper = styled.div`
  min-height: 100vh;
  position: relative;
  z-index: 10;
`;

const GridContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
`;

const ArcContainer = styled.div<{ $scrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  pointer-events: none;
  opacity: ${props => props.$scrolled ? 0.4 : 1};
  filter: ${props => props.$scrolled ? 'blur(8px)' : 'blur(0px)'};
  transition: opacity 0.4s ease, filter 0.4s ease;
  
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    filter: none;
  }
`;

const ContentSection = styled.section`
  position: relative;
  z-index: 10;
  padding: 3rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  color: ${COLORS.foreground};
`;

const HeroSection = styled(ContentSection)`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 2rem 1rem;
  max-width: 100%;
  
  @media (min-width: 768px) {
    padding-left: 8vw;
    padding-right: 2rem;
  }
`;

const NonHeroSection = styled(ContentSection)`
  padding-left: 1rem;
  padding-right: 1rem;
  
  @media (min-width: 768px) {
    margin-left: 8vw;
    padding-left: ${SPACING.xl};
    padding-right: ${SPACING.xl};
  }
`;

const Title = styled.h1`
  font-size: clamp(1.5rem, 5vw, 3rem);
  margin-bottom: ${SPACING.lg};
  color: ${COLORS.foreground};
  line-height: 1.3;
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  opacity: 0;
  animation: fadeIn 1s ease-out forwards;
  animation-delay: 0.3s;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    animation: fadeIn 0.3s ease-out forwards;
    animation-delay: 0.1s;
  }
`;

const Subtitle = styled.h2`
  font-size: clamp(1rem, 3vw, 1.75rem);
  margin-bottom: ${SPACING.xl};
  color: ${COLORS.muted};
  line-height: 1.4;
  max-width: 100%;
  word-wrap: break-word;
  overflow-wrap: break-word;
  opacity: 0;
  animation: fadeIn 1s ease-out forwards;
  animation-delay: 0.6s;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    animation: fadeIn 0.3s ease-out forwards;
    animation-delay: 0.2s;
  }
`;

const ScrollDownButton = styled.button<{ $visible: boolean }>`
  position: fixed;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  background: transparent;
  border: 1px solid ${COLORS.border};
  color: ${COLORS.muted};
  padding: ${SPACING.md} ${SPACING.lg};
  border-radius: 0.25rem;
  font-family: 'Roboto Mono', monospace;
  font-size: 0.875rem;
  cursor: pointer;
  z-index: 50;
  opacity: ${props => props.$visible ? 1 : 0};
  pointer-events: ${props => props.$visible ? 'auto' : 'none'};
  transition: opacity 0.3s ease, border-color 0.2s ease, color 0.2s ease;
  
  &:hover {
    color: ${COLORS.foreground};
    border-color: ${COLORS.foreground};
    transform: translateX(-50%) translateY(-3px);
  }
  
  &::after {
    content: '↓';
    margin-left: ${SPACING.sm};
    display: inline-block;
    animation: bounce 2s infinite;
  }
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0);
    }
    40% {
      transform: translateY(-5px);
    }
    60% {
      transform: translateY(-3px);
    }
  }
  
  @media (prefers-reduced-motion: reduce) {
    transition: opacity 0.1s ease;
    
    &::after {
      animation: none;
    }
    
    &:hover {
      transform: translateX(-50%) translateY(0);
    }
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.5rem, 3vw, 2.5rem);
  margin-bottom: ${SPACING['2xl']};
  color: ${COLORS.foreground};
`;

const SkillCategory = styled.div`
  margin-bottom: ${SPACING.xl};
  
  h3 {
    color: ${COLORS.foreground};
    font-size: 1rem;
    margin-bottom: ${SPACING.sm};
    opacity: 0.8;
  }
  
  p {
    color: ${COLORS.muted};
    line-height: 1.8;
    font-size: 0.95rem;
  }
`;

const WorkItem = styled.div`
  margin-bottom: ${SPACING['3xl']};
  padding-bottom: ${SPACING['2xl']};
  border-bottom: 1px solid ${COLORS.border};
  
  &:last-child {
    border-bottom: none;
  }
`;

const WorkTitle = styled.h3`
  color: ${COLORS.foreground};
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  margin-bottom: ${SPACING.xs};
  line-height: 1.4;
`;

const WorkMeta = styled.p`
  color: ${COLORS.muted};
  font-size: 0.9rem;
  margin-bottom: ${SPACING.lg};
`;

const WorkDescription = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: ${SPACING.lg};
  
  li {
    color: ${COLORS.muted};
    margin-bottom: ${SPACING.md};
    padding-left: 1.5rem;
    position: relative;
    line-height: 1.7;
    font-size: 0.95rem;
    
    &::before {
      content: '▹';
      position: absolute;
      left: 0;
      color: ${COLORS.foreground};
    }
    
    strong {
      color: ${COLORS.foreground};
    }
  }
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${SPACING.sm};
  
  span {
    font-size: 0.85rem;
    color: ${COLORS.muted};
    padding: 0.25rem 0.75rem;
    border: 1px solid ${COLORS.border};
    border-radius: 0.25rem;
  }
`;

const ContactLink = styled.a`
  display: block;
  color: ${COLORS.foreground};
  text-decoration: none;
  margin-bottom: ${SPACING.md};
  font-size: 1rem;
  transition: color 0.2s ease;
  word-wrap: break-word;
  
  &:hover {
    color: ${COLORS.muted};
  }
  
  span {
    color: ${COLORS.muted};
    margin-right: 0.5rem;
  }
`;

// ============================================================================
// COMPONENT
// ============================================================================

const Dashboard: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);

    useEffect(() => {
        // Show button after initial delay (after other animations)
        const timer = setTimeout(() => {
            setShowScrollButton(true);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Handle arc blur, grid dim, and scroll button visibility on scroll
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            const viewportHeight = window.innerHeight;
            const gridBackground = document.querySelector('.grid-background');
            
            // Apply blur/dim when scrolled past 20% of viewport
            if (scrollPosition > viewportHeight * 0.2) {
                setIsScrolled(true);
                setShowScrollButton(false);
                if (gridBackground) {
                    gridBackground.classList.add('dimmed');
                }
            } else {
                setIsScrolled(false);
                // Only show button if user has scrolled back to top (not on initial load)
                if (scrollPosition === 0 || scrollPosition < viewportHeight * 0.2) {
                    setShowScrollButton(true);
                }
                if (gridBackground) {
                    gridBackground.classList.remove('dimmed');
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScrollDown = () => {
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            skillsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <DashboardWrapper>
            <GridContainer className="grid">
                {/* Arc background animation with glass blur effect */}
                <ArcContainer $scrolled={isScrolled}>
                    <Suspense fallback={null}>
                        <Arc />
                    </Suspense>
                </ArcContainer>

                {/* Hero Section */}
                <HeroSection id="about">
                    <Title>I'm Aaditya. It's nice to meet you!</Title>
                    <Subtitle>Here's a few things that I do.</Subtitle>
                </HeroSection>

                {/* Scroll Down Button - outside hero section */}
                <ScrollDownButton $visible={showScrollButton} onClick={handleScrollDown}>
                    Scroll Down
                </ScrollDownButton>

                {/* Skills Section */}
                <NonHeroSection id="skills">
                    <SectionTitle>Skills</SectionTitle>
                    {SKILLS.map((skill, index) => (
                        <SkillCategory key={index}>
                            <h3>{skill.category} //</h3>
                            <p>
                                {skill.items.map((item, i) => {
                                    const isHighlighted = skill.highlighted?.includes(item);
                                    return (
                                        <span key={i} style={{ color: isHighlighted ? COLORS.foreground : COLORS.muted }}>
                                            {item}{isHighlighted && '*'}
                                            {i < skill.items.length - 1 && '. '}
                                        </span>
                                    );
                                })}
                            </p>
                        </SkillCategory>
                    ))}
                </NonHeroSection>

                {/* Work Experience Section */}
                <NonHeroSection id="experience">
                    <SectionTitle>Work Experience</SectionTitle>
                    {WORK_EXPERIENCES.map((work) => (
                        <WorkItem key={work.id}>
                            <WorkTitle>{work.company} | {work.role}</WorkTitle>
                            <WorkMeta>
                                {work.period} | {work.location}
                            </WorkMeta>
                            <WorkDescription>
                                {work.description.map((desc, i) => {
                                    const parts = desc.split(': ');
                                    if (parts.length > 1) {
                                        return (
                                            <li key={i}>
                                                <strong>{parts[0]}:</strong> {parts.slice(1).join(': ')}
                                            </li>
                                        );
                                    }
                                    return <li key={i}>{desc}</li>;
                                })}
                            </WorkDescription>
                            <TechStack>
                                {work.techStack.map((tech, i) => (
                                    <span key={i}>{tech}</span>
                                ))}
                            </TechStack>
                        </WorkItem>
                    ))}
                </NonHeroSection>

                {/* Projects Section */}
                <NonHeroSection id="projects">
                    <SectionTitle>Projects</SectionTitle>
                    {PROJECTS.map((project) => (
                        <WorkItem key={project.id}>
                            <WorkTitle>{project.title}</WorkTitle>
                            {project.subtitle && <WorkMeta>{project.subtitle}</WorkMeta>}
                            <p style={{ color: COLORS.muted, marginBottom: SPACING.lg, lineHeight: 1.7 }}>
                                {project.description}
                            </p>
                            <WorkDescription>
                                {project.achievements.map((achievement, i) => {
                                    const parts = achievement.split(': ');
                                    if (parts.length > 1) {
                                        return (
                                            <li key={i}>
                                                <strong>{parts[0]}:</strong> {parts.slice(1).join(': ')}
                                            </li>
                                        );
                                    }
                                    return <li key={i}>{achievement}</li>;
                                })}
                            </WorkDescription>
                            <TechStack>
                                {project.techStack.map((tech, i) => (
                                    <span key={i}>{tech}</span>
                                ))}
                            </TechStack>
                            {project.links?.blog && (
                                <p style={{ marginTop: SPACING.md }}>
                                    <ContactLink href={project.links.blog} target="_blank" rel="noopener noreferrer">
                                        Read more →
                                    </ContactLink>
                                </p>
                            )}
                        </WorkItem>
                    ))}
                </NonHeroSection>

                {/* Contact Section */}
                <NonHeroSection id="contact">
                    <SectionTitle>Contact</SectionTitle>
                    <ContactLink href={`mailto:${CONTACT_INFO.email}`}>
                        <span>Email:</span> {CONTACT_INFO.email}
                    </ContactLink>
                    <ContactLink href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer">
                        <span>LinkedIn:</span> {CONTACT_INFO.linkedin}
                    </ContactLink>
                    <ContactLink href={CONTACT_INFO.github} target="_blank" rel="noopener noreferrer">
                        <span>GitHub:</span> {CONTACT_INFO.github}
                    </ContactLink>
                    <ContactLink href={CONTACT_INFO.resume} target="_blank" rel="noopener noreferrer">
                        <span>Resume:</span> View Resume
                    </ContactLink>
                </NonHeroSection>

                {/* Footer */}
                <NonHeroSection style={{ textAlign: 'center', paddingTop: SPACING['2xl'], paddingBottom: SPACING['3xl'] }}>
                    <p style={{ color: COLORS.muted, fontSize: '0.9rem' }}>
                        Built with React, TypeScript, and Anime.js
                    </p>
                </NonHeroSection>
            </GridContainer>
        </DashboardWrapper>
    );
};

export default Dashboard;