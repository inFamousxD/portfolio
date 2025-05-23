import styled from "styled-components";
import { ACCENT_RED } from "../../../constants";

export const ArcRootStyled = styled.div`
    width: 100vw;
    height: 100vh;

    .container {
        position: absolute;
        width: 40vw;
        height: 40vw;
        transform-origin: 50% 50%;
        top: 0vh;
        left: 50vw;
        border-radius: 50%;
        background: transparent;
        .dash, .dash-2, .dash-3 {
            position: absolute;
            width: 2px;
            height: 2px;
            background-color: #ff4b4b;
            color: ${ACCENT_RED}
        }
    }
`;