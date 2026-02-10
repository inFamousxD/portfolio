import React, { useEffect, Suspense, lazy } from 'react';
import styled from 'styled-components';
import { COLORS, SPACING } from '../../config/constants';
import { animate, onScroll } from 'animejs';
import { WORK_EXPERIENCES, PROJECTS, SKILLS, CONTACT_INFO } from '../../data/content';

// Lazy load Arc
const Arc = lazy(() => import('../../components/Arc/Arc'));

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

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

const ArcContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  pointer-events: none;
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
`;

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3rem);
  margin-bottom: ${SPACING.lg};
  color: ${COLORS.foreground};
  
  .typed {
    visibility: hidden;
  }
`;

const Subtitle = styled.h2`
  font-size: clamp(1.25rem, 3vw, 2rem);
  margin-bottom: ${SPACING.xl};
  color: ${COLORS.muted};
  
  .typed {
    visibility: hidden;
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

    useEffect(() => {
        // Animate typed text on hero
        animate('.hero-title .typed', {
            visibility: 'visible',
            delay: (_, i) => i * 20,
            ease: 'out',
            autoplay: onScroll({
                container: 'body',
                enter: 'top top',
                leave: 'top+=90vh top',
                sync: 0.05,
            }),
        });

        animate('.hero-subtitle .typed', {
            visibility: 'visible',
            delay: (_, i) => i * 15,
            ease: 'out',
            autoplay: onScroll({
                container: 'body',
                enter: 'top top',
                leave: 'top+=90vh top',
                sync: 0.05,
            }),
        });
    }, []);

    return (
        <DashboardWrapper>
            <GridContainer className="grid">
                {/* Arc background animation */}
                <ArcContainer>
                    <Suspense fallback={null}>
                        <Arc />
                    </Suspense>
                </ArcContainer>

                {/* Hero Section */}
                <HeroSection id="about">
                    <Title className="hero-title">
                        {`I'm Aaditya. It's nice to meet you!`.split('').map((char, i) => (
                            <span key={i} className="typed">{char}</span>
                        ))}
                    </Title>
                    <Subtitle className="hero-subtitle">
                        {`Here's a few things that I do.`.split('').map((char, i) => (
                            <span key={i} className="typed">{char}</span>
                        ))}
                    </Subtitle>
                </HeroSection>

                {/* Skills Section */}
                <ContentSection id="skills">
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
                </ContentSection>

                {/* Work Experience Section */}
                <ContentSection id="experience">
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
                </ContentSection>

                {/* Projects Section */}
                <ContentSection id="projects">
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
                </ContentSection>

                {/* Contact Section */}
                <ContentSection id="contact">
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
                </ContentSection>

                {/* Footer */}
                <ContentSection style={{ textAlign: 'center', paddingTop: SPACING['2xl'], paddingBottom: SPACING['3xl'] }}>
                    <p style={{ color: COLORS.muted, fontSize: '0.9rem' }}>
                        Built with React, TypeScript, and Anime.js
                    </p>
                </ContentSection>
            </GridContainer>
        </DashboardWrapper>
    );
};

export default Dashboard;