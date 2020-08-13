import React from "react";
import styled from "@emotion/styled";

const Separator = () => {
    return (
        <Container>
            <Flexdiv>
                <Hr />
                <Text>or</Text>
                <Hr />
            </Flexdiv>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    margin: 20px 0;
`;

const Flexdiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Hr = styled.hr`
    width: 80%;
`;

const Text = styled.div`
    margin: 0 10px;
    transform: translateY(-3px);
    min-width: 20px;
`;

export default Separator;
