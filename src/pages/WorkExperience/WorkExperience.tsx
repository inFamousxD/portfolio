import { useEffect } from "react";
import { WorkExperienceContainerStyled } from "./WorkExperience.styles";
import { animate, onScroll } from "animejs";

const WorkExperience: React.FC = () => {
    useEffect(() => {
        // Section title animation
        animate(".section-title", {
            y: -50,
            ease: "linear",
            opacity: 1,
            autoplay: onScroll({
                container: "body",
                enter: "bottom-=10vh top",
                leave: "top+=90vh top",
                sync: 0.25,
            }),
        });

        // Qualitia animations
        animate([".qualitia-title"], {
            y: -100,
            ease: "linear",
            opacity: 1,
            autoplay: onScroll({
                container: "body",
                enter: "bottom-=1vh top",
                leave: "top+=90vh top",
                sync: 0.25,
            }),
        });

        animate(".qualitia-title .typed", {
            visibility: "visible",
            delay: (_, i) => i * 15,
            ease: "out",
            autoplay: onScroll({
                container: "body",
                target: ".qualitia-title",
                enter: "bottom-=20vh top",
                leave: "top+=90vh top",
                sync: 0.05,
            }),
        });

        animate([".qualitia-desc", ".qualitia-tech"], {
            y: -100,
            ease: "linear",
            opacity: 1,
            autoplay: onScroll({
                container: "body",
                enter: "bottom-=10vh top",
                leave: "top+=90vh top",
                sync: 0.15,
            }),
        });

        animate(".qualitia-desc .typed", {
            visibility: "visible",
            delay: (_, i) => i * 8,
            ease: "out",
            autoplay: onScroll({
                container: "body",
                target: ".qualitia-desc",
                enter: "bottom-=30vh top",
                leave: "top+=90vh top",
                sync: 0.03,
            }),
        });

        // Persistent animations
        animate([".persistent-title"], {
            y: -100,
            ease: "linear",
            opacity: 1,
            autoplay: onScroll({
                container: "body",
                enter: "bottom-=1vh top",
                leave: "top+=90vh top",
                sync: 0.25,
            }),
        });

        animate(".persistent-title .typed", {
            visibility: "visible",
            delay: (_, i) => i * 15,
            ease: "out",
            autoplay: onScroll({
                container: "body",
                target: ".persistent-title",
                enter: "bottom-=20vh top",
                leave: "top+=90vh top",
                sync: 0.05,
            }),
        });

        animate([".persistent-desc", ".persistent-tech"], {
            y: -100,
            ease: "linear",
            opacity: 1,
            autoplay: onScroll({
                container: "body",
                enter: "bottom-=10vh top",
                leave: "top+=90vh top",
                sync: 0.15,
            }),
        });

        animate(".persistent-desc .typed", {
            visibility: "visible",
            delay: (_, i) => i * 8,
            ease: "out",
            autoplay: onScroll({
                container: "body",
                target: ".persistent-desc",
                enter: "bottom-=30vh top",
                leave: "top+=90vh top",
                sync: 0.03,
            }),
        });
    }, []);

    const renderTypedText = (text: string) => {
        return text.split("").map((char, i) => (
            <span key={i} className="typed" style={{ visibility: "hidden" }}>
                {char}
            </span>
        ));
    };

    return (
        <WorkExperienceContainerStyled>
            <div className="section-title">Work Experience</div>

            {/* Qualitia Software */}
            <div className="work-item qualitia">
                <div className="title qualitia-title">
                    <div className="main">
                        {renderTypedText("Qualitia Software | Software Engineer, Fullstack/UI Developer")}
                    </div>
                    <div className="sub period">
                        {renderTypedText("November 2022 - July 2023 | Pune, India")}
                    </div>
                </div>
                <div className="desc qualitia-desc">
                    <ul>
                        <li>
                            <strong>{renderTypedText("Zero-to-One Product Development:")}</strong>{" "}
                            {renderTypedText("Architected and delivered a cross-platform ElectronJS application for automating web/native/android testing in a test-driven development environment")}
                        </li>
                        <li>
                            <strong>{renderTypedText("Performance Optimization:")}</strong>{" "}
                            {renderTypedText("Leveraged ReactJS, Redux, and data streaming algorithms to achieve a 300% improvement in scroll and navigation performance")}
                        </li>
                        <li>
                            <strong>{renderTypedText("Advanced Code Editor:")}</strong>{" "}
                            {renderTypedText("Built an in-app code editor with unified UI language, enabling seamless switching between Tabular (Easy) and Code-based (Advanced) modes, featuring O(log n) keyword recommendation with nested search")}
                        </li>
                    </ul>
                </div>
                <div className="tech-stack qualitia-tech">
                    Tech Stack: TypeScript, ReactJS, NodeJS, SQL, ElectronJS, PostgreSQL, REST APIs
                </div>
            </div>

            {/* Persistent Systems */}
            <div className="work-item persistent">
                <div className="title persistent-title">
                    <div className="main">
                        {renderTypedText("Persistent Systems | Software Engineer")}
                    </div>
                    <div className="sub period">
                        {renderTypedText("January 2021 - November 2022 | Pune, India")}
                    </div>
                </div>
                <div className="desc persistent-desc">
                    <ul>
                        <li>
                            <strong>{renderTypedText("Enterprise Salesforce Development:")}</strong>{" "}
                            {renderTypedText("Built comprehensive Salesforce system from the ground up, collaborating with multiple teams in an agile environment")}
                        </li>
                        <li>
                            <strong>{renderTypedText("Custom Architecture Design:")}</strong>{" "}
                            {renderTypedText("Worked closely with Salesforce Architects to develop efficient application flows, custom interfaces, and scalable solutions")}
                        </li>
                        <li>
                            <strong>{renderTypedText("Performance Engineering:")}</strong>{" "}
                            {renderTypedText("Created scalable Apex library for batch processing that improved performance by 80%")}
                        </li>
                    </ul>
                </div>
                <div className="tech-stack persistent-tech">
                    Tech Stack: Salesforce Developer, Apex, Lightning Web Components, SOQL, Java, SpringBoot
                </div>
            </div>
        </WorkExperienceContainerStyled>
    );
};

export default WorkExperience;