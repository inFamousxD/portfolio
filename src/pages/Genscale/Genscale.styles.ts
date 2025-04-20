import styled from "styled-components";
import { ACCENT_BLUE, ACCENT_GREEN, ACCENT_RED } from "../../constants";

export const GenscaleminContainerStyled = styled.div`
    background: transparent;

    /* min-height: 80vh; */
    /* margin-bottom: 500px; */

    display: flex;
    flex-direction: row;

    .left-col {
        display: flex;
        flex-direction: column;
        /* row-gap: 10px; */
    }
    
    .title, .desc, .source {
        opacity: 0;
        padding: 20px;
        
        border: 2px dashed ${ACCENT_BLUE}50;
        border-radius: 20px;
        
        /* width: fit-content; */
        margin: 10px 0px 0px 5vw;
    }
    
    .title {
        margin-top: 120px;
        .main, .sub {
            color: ${ACCENT_RED};
        }
        .main {
            font-size: 24px;
        }
        .sub {
            color: ${ACCENT_GREEN};
        }
        .tech {
            margin-top: 10px;
        }
    }
    
    .desc {
        flex-grow: 1;
        color: white;
        strong {
            color: ${ACCENT_RED};
        }
        li {
            margin-top: 10px;
        }
    }
    
    .source {
        color: ${ACCENT_RED};

        a {
            color: ${ACCENT_GREEN};
        }
        a:visited {
            color: ${ACCENT_RED};
        }
    }

    .right-col {
        display: flex;
        flex-direction: column;
        .diagram {
            flex-grow: 1;
            border-radius: 20px;
            padding: 20px;
            border: 2px dashed ${ACCENT_BLUE}50;
            margin: 120px 5vw 0px 1vw;
            opacity: 0;
            
            img {
                width: 38vw;
                border-radius: 15px;
            }
        }
    }
`;