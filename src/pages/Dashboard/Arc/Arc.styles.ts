import styled from "styled-components";

export const ArcRootStyled = styled.div`
    width: 100vw;
    height: 100vh;

    .container {
        width: 500px;
        height: 500px;
        .dash {
            position: absolute;
            width: 25px;
            height: 3px;
            background-color: #ff4b4b;
        }
    }
`;