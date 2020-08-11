import React from "react";
import styled from "@emotion/styled";

const Separator = () => {
    return (
        <container>
            <flexdiv>
                <hrtag />
                <separator>or</separator>
                <hrtag />
            </flexdiv>
        </container>
    );
};

const container = styled.div`
    width: 100%;
    margin: 20px 0;
`;

const flexdiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const hrtag = styled.hr`
    width: 80%;
`;

const separator = styled.div`
    margin: 0 10px;
    transform: translateY(-3px);
    min-width: 32px;
`;

export default Separator;
