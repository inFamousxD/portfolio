import styled from "styled-components";
import { ACCENT_GREEN, ACCENT_RED } from "../../constants";

export const WorkExperienceContainerStyled = styled.div`
    background: transparent;
    display: flex;
    flex-direction: column;
    font-size: 1.55vh;
    margin-bottom: 100px;

    .section-title {
        opacity: 0;
        padding: 20px;
        border-radius: 20px;
        margin: 120px 20px 40px 20px;
        color: ${ACCENT_RED};
        font-size: 2.5vh;
    }

    .work-item {
        display: flex;
        flex-direction: column;
        margin-bottom: 80px;
    }

    .title,
    .desc,
    .tech-stack {
        opacity: 0;
        padding: 20px;
        border-radius: 20px;
        margin: 10px 0px 0px 20px;
    }

    .title {
        .main,
        .sub {
            color: ${ACCENT_RED};
        }
        .main {
            font-size: 2vh !important;
        }
        .sub {
            color: ${ACCENT_GREEN};
        }
        .period {
            margin-top: 5px;
        }
    }

    .desc {
        color: white;
        strong {
            color: ${ACCENT_RED};
        }
        ul {
            margin-top: 10px;
        }
        li {
            margin-top: 10px;
        }
    }

    .tech-stack {
        color: ${ACCENT_GREEN};
    }
`;