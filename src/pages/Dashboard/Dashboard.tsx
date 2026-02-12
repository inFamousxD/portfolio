import React, { useEffect, Suspense, lazy, useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { COLORS, SPACING } from '../../config/constants';
import { WORK_EXPERIENCES, PROJECTS, SKILLS, CONTACT_INFO, EDUCATION, ACCOMPLISHMENTS } from '../../data/content';

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

// ============================================================================
// SNOWFLAKE
// ============================================================================

const SnowflakeContainer = styled.div`
    position: fixed;
    top: 6rem;
    left: 2rem;
    z-index: 50;
    pointer-events: none;
    will-change: transform, opacity;

    img {
        width: 48px;
        height: 48px;
        display: block;
    }

    @media (max-width: 640px) {
        top: 5rem;
        left: auto;
        right: 1rem;

        img {
            width: 36px;
            height: 36px;
        }
    }

    @media (min-width: 1024px) {
        top: 6rem;
        left: 3rem;

        img {
            width: 56px;
            height: 56px;
        }
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
    
    &#contact {
        span {
            //background: rgba(255, 204, 0, 0.1);
            backdrop-filter: blur(2px);
            -webkit-backdrop-filter: blur(2px);

            padding: 8px 12px;
            border-radius: 4px;
            display: inline-block;
            line-height: 1.4;
        }
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
    padding: 1.5rem 2rem;

    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    border-radius: 12px;

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

    @media (max-width: 640px) {
        padding: 1rem 1.5rem;
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
    padding: 1rem 2rem;

    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
    border-radius: 12px;

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

    @media (max-width: 640px) {
        padding: 0.75rem 1.5rem;
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

const EducationItem = styled.div`
    margin-bottom: ${SPACING['2xl']};

    h3 {
        color: ${COLORS.foreground};
        font-size: clamp(1.125rem, 2vw, 1.5rem);
        margin-bottom: ${SPACING.xs};
    }

    .degree {
        color: ${COLORS.muted};
        font-size: 1rem;
        margin-bottom: ${SPACING.xs};
    }

    .meta {
        color: ${COLORS.muted};
        font-size: 0.9rem;
        margin-bottom: ${SPACING.sm};
    }

    .gpa {
        color: ${COLORS.foreground};
        font-size: 0.95rem;
        margin-bottom: ${SPACING.md};
    }

    .coursework {
        color: ${COLORS.muted};
        font-size: 0.9rem;
        line-height: 1.7;

        strong {
            color: ${COLORS.foreground};
        }
    }
`;

const AccomplishmentItem = styled.div`
    margin-bottom: ${SPACING.lg};
    padding-left: 1.5rem;
    position: relative;

    &::before {
        content: '▹';
        position: absolute;
        left: 0;
        color: ${COLORS.foreground};
    }

    .title {
        color: ${COLORS.foreground};
        font-size: 1rem;
        margin-bottom: ${SPACING.xs};
    }

    .organization {
        color: ${COLORS.muted};
        font-size: 0.9rem;
    }

    a {
        color: ${COLORS.foreground};
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
`;

// ============================================================================
// HAZARDOUS CONCRETE FOOTER
// ============================================================================

const HazardFooter = styled.div`
    position: relative;
    background: #0a0a0a repeating-linear-gradient(
            45deg,
            #0a0a0a,
            #0a0a0a 6px,
            rgba(255, 204, 0, 0.1) 6px,
            rgba(255, 204, 0, 0.1) 12px
    );
    margin-top: ${SPACING['4xl']};
    padding-top: ${SPACING['3xl']};

    -webkit-mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 300px
    );
    mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 300px
    );
`;

const FooterContent = styled.div`
    position: relative;
    z-index: 2;
    padding-top: 10vh;
`;

// ============================================================================
// SNOWFLAKE HOOK
// ============================================================================

/**
 * Manages snowflake visibility, scale, and rotation based on scroll.
 *
 * - Appears (scales from 0 → 1) as scroll enters the "blur zone" (20%–40% of viewport height).
 * - Accumulates rotation: clockwise when scrolling down, counter-clockwise when scrolling up.
 * - Disappears (scales back to 0) when scrolling back above the blur threshold.
 */
const useSnowflakeScroll = () => {
    const snowflakeRef = useRef<HTMLDivElement>(null);
    const rotationRef = useRef(0);
    const lastScrollRef = useRef(0);
    const rafRef = useRef<number | null>(null);

    const SCROLL_THRESHOLD_START = 0.2; // blur begins
    const SCROLL_THRESHOLD_FULL = 0.4;  // snowflake fully visible
    const ROTATION_SPEED = 0.5;         // degrees per pixel scrolled

    const updateSnowflake = useCallback(() => {
        const el = snowflakeRef.current;
        if (!el) return;

        const scrollY = window.scrollY;
        const vh = window.innerHeight;
        const delta = scrollY - lastScrollRef.current;
        lastScrollRef.current = scrollY;

        const thresholdStart = vh * SCROLL_THRESHOLD_START;
        const thresholdFull = vh * SCROLL_THRESHOLD_FULL;

        // Scale: 0 below start, lerp to 1 between start and full, 1 above full
        let scale = 0;
        if (scrollY >= thresholdFull) {
            scale = 1;
        } else if (scrollY > thresholdStart) {
            scale = (scrollY - thresholdStart) / (thresholdFull - thresholdStart);
        }

        // Accumulate rotation based on scroll direction and distance
        if (scale > 0) {
            rotationRef.current += delta * ROTATION_SPEED;
        }

        el.style.transform = `scale(${scale}) rotate(${rotationRef.current}deg)`;
        el.style.opacity = `0.5`;
    }, []);

    useEffect(() => {
        // Set initial state
        lastScrollRef.current = window.scrollY;
        updateSnowflake();

        const handleScroll = () => {
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
            }
            rafRef.current = requestAnimationFrame(updateSnowflake);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [updateSnowflake]);

    return snowflakeRef;
};

// ============================================================================
// COMPONENT
// ============================================================================

const Dashboard: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showScrollButton, setShowScrollButton] = useState(false);
    const snowflakeRef = useSnowflakeScroll();

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
        const educationSection = document.getElementById('education');
        if (educationSection) {
            const navHeight = parseFloat(getComputedStyle(document.documentElement).fontSize) * 4;
            const top = educationSection.getBoundingClientRect().top + window.scrollY - navHeight - 16;
            window.scrollTo({ top, behavior: 'smooth' });
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

                {/* Snowflake — appears on scroll, spins with direction */}
                <SnowflakeContainer ref={snowflakeRef}>
                    <img
                        src="/snowflake-nobackground.png"
                        alt=""
                        draggable={false}
                    />
                </SnowflakeContainer>

                {/* Hero Section */}
                <HeroSection id="about">
                    <Title>I'm Aaditya. It's nice to meet you!</Title>
                    <Subtitle>Here's a few things that I do.</Subtitle>
                </HeroSection>

                {/* Scroll Down Button - outside hero section */}
                <ScrollDownButton $visible={showScrollButton} onClick={handleScrollDown}>
                    Scroll Down
                </ScrollDownButton>

                {/* Education Section */}
                <NonHeroSection id="education">
                    <SectionTitle>Education</SectionTitle>
                    {EDUCATION.map((edu) => (
                        <EducationItem key={edu.id}>
                            <h3>{edu.institution}</h3>
                            <div className="degree">{edu.degree}</div>
                            <div className="meta">
                                {edu.period} | {edu.location}
                            </div>
                            {edu.gpa && <div className="gpa">GPA: {edu.gpa}</div>}
                            {edu.coursework && (
                                <div className="coursework">
                                    <strong>Relevant Coursework:</strong> {edu.coursework.join(', ')}
                                </div>
                            )}
                        </EducationItem>
                    ))}
                </NonHeroSection>

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

                {/* Accomplishments Section */}
                <NonHeroSection id="accomplishments">
                    <SectionTitle>Accomplishments</SectionTitle>
                    {ACCOMPLISHMENTS.map((accomplishment, index) => (
                        <AccomplishmentItem key={index}>
                            <div className="title">
                                {accomplishment.link ? (
                                    <a href={accomplishment.link} target="_blank" rel="noopener noreferrer">
                                        {accomplishment.title}
                                    </a>
                                ) : (
                                    accomplishment.title
                                )}
                            </div>
                            <div className="organization">
                                {accomplishment.organization}
                                {accomplishment.year && ` (${accomplishment.year})`}
                            </div>
                        </AccomplishmentItem>
                    ))}
                </NonHeroSection>

                {/* HAZARDOUS CONCRETE FOOTER SECTION */}
                <HazardFooter>
                    <FooterContent>
                        {/* Contact Section */}
                        <NonHeroSection id="contact">
                            <SectionTitle><span>Contact</span></SectionTitle>
                            {CONTACT_INFO.phone && (
                                <ContactLink href={`tel:${CONTACT_INFO.phone}`}>
                                    <span>Phone: {CONTACT_INFO.phone}</span>
                                </ContactLink>
                            )}
                            <ContactLink href={`mailto:${CONTACT_INFO.email}`}>
                                <span>Email: {CONTACT_INFO.email} </span>
                            </ContactLink>
                            <ContactLink href={CONTACT_INFO.linkedin} target="_blank" rel="noopener noreferrer">
                                <span>LinkedIn: {CONTACT_INFO.linkedin} </span>
                            </ContactLink>
                            <ContactLink href={CONTACT_INFO.github} target="_blank" rel="noopener noreferrer">
                                <span>GitHub: {CONTACT_INFO.github} </span>
                            </ContactLink>
                            <ContactLink href={CONTACT_INFO.resume} target="_blank" rel="noopener noreferrer">
                                <span>Resume: View Resume </span>
                            </ContactLink>
                        </NonHeroSection>

                        {/* Footer */}
                        <NonHeroSection id="contact" style={{ textAlign: 'center', paddingTop: SPACING['2xl'], paddingBottom: SPACING['3xl'] }}>
                            <p style={{ color: COLORS.muted, fontSize: '0.9rem' }}>
                                <span> Built with React, TypeScript, and Anime.js </span>
                            </p>
                        </NonHeroSection>
                    </FooterContent>
                </HazardFooter>
            </GridContainer>
        </DashboardWrapper>
    );
};

export default Dashboard;