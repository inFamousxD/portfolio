import styled from "styled-components";

export const ArcRootStyled = styled.div`
    width: 100vw;
    height: 100vh;

    .container {
        position: absolute;
        width: 800px;
        height: 800px;
        transform-origin: 50% 50%;
        top: 50px;
        left: 50vw;
        border-radius: 50%;
        background: transparent;
        .dash {
            position: absolute;
            width: 25px;
            height: 2px;
            background-color: #ff4b4b;
        }
    }
`;