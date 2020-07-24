import styled from "@emotion/styled";

export const NavContainer = styled.div`
    width: 100%;
    background-color: #90caf9;
    display: flex;
    justify-content: space-between;
    @media (min-width: 600px) {
        min-height: 64px;
    }
    align-items: center;
    padding: 10px;
`;

export const Button = styled.button`
    background-color: inherit;
    outline: none;
    border: none;
    font-size: 1.25em;
    text-decoration: none;
    &:hover {
        background-color: rgba(255, 255, 255, 0.08);
        height: 60%;
    }
    &:focus{
        background-color: inherit;
    }
    padding: 6px 8px;
    cursor: pointer;
    margin: 0 10px;
`;

export const FormDiv = styled.div`
    display: flex;
    /* width: 10%; */
    margin: 0 20px;
    justify-content: space-around;
`;
