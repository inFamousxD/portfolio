import React, { useEffect } from 'react'
import { GenscaleminContainerStyled } from './Genscale.styles'
import { animate, onScroll } from 'animejs';

import genscaleImage from '../../assets/genscale.png';

const Genscalemin: React.FC = () => {
    useEffect(() => {
        animate(['.title', '.diagram'], {
            y: -100,
            ease: 'linear',
            opacity: 1,
            autoplay: onScroll({
                container: 'body',
                enter: 'bottom-=1vh top',
                leave: 'top+=90vh top',
                sync: 1,
                // debug: true,
            })
        });
    })

    useEffect(() => {
        animate(['.desc', '.source'], {
            y: -100,
            ease: 'linear',
            opacity: 1,
            autoplay: onScroll({
                container: 'body',
                enter: 'bottom-=10vh top',
                leave: 'top+=90vh top',
                sync: 1,
                // debug: true,
            })
        });
    })

    return (
        <GenscaleminContainerStyled>
            <div className='left-col'>
                <div className='title'>
                    <div className='main'>GenScale: BioInformatics Benchmark and Portfolio Scheduling Platform</div>
                    <div className='sub tech'>Tech: Kubernetes, NodeJS (BE), ReactJS (FE), Terraform, Docker, Grafana, Loki</div>
                    <div className='sub lang'>Lang: TypeScript, C++ [Metrics], Python, Bash</div>
                </div>
                <div className='desc'>
                    <p className="project-intro">
                        <strong>Engineered a high-performance benchmarking platform</strong> that revolutionized how genomic tools operate at scale on cloud infrastructure through Kubernetes orchestration, delivering significant performance advantages:
                    </p>

                    <ul className="achievements-list">
                        <li>
                            <strong>Advanced Kubernetes Integration:</strong> Developed a custom scheduler paired with a data parallelization engine that reduced processing times by 45-80% for complex genomic workflows
                        </li>

                        <li>
                            <strong>High-Precision Telemetry:</strong> Created a C++ metrics collection system capable of multi-threaded data polling at 500ms intervals, enabling real-time performance monitoring
                        </li>

                        <li>
                            <strong>Comprehensive Visualization Suite:</strong> Implemented data processing and visualization pipeline using Python, D3.js, and Grafana dashboards to transform raw metrics into actionable insights
                        </li>

                        <li>
                            <strong>Intelligent Workload Optimization:</strong> Pioneered machine learning-based resource allocation that prevents cluster crashes with 1.5x greater efficiency than traditional AIMD and MIMD approaches
                        </li>

                        <li>
                            <strong>Enhanced Parallelization Capabilities:</strong> Implemented auto data parallelization and nested parallel workflow execution to maximize computational resource utilization
                        </li>
                    </ul>
                </div>
                <div className='source'>
                    Click <a target="_blank" rel="noopener noreferrer" title='here' href='https://chameleoncloud.org/blog/2024/12/30/minimizing-out-of-memory-failures-in-genomics-workflow-execution/'>here</a> to know more
                    <br />
                    github: /* privated till the research is published */
                </div>
            </div>
            <div className='right-col'>
                <div className='diagram'>
                    <img src={genscaleImage} />
                </div>
            </div>
        </GenscaleminContainerStyled>
    )
}

export default Genscalemin