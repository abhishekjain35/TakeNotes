import React from "react";
import { Link } from "react-router-dom";
import Svg from "./404.svg";
import Container from "./style/style";

const NotFoundComponent = () => {
    return (
        <Container>
            <img src={Svg} alt="404" />
            <h4>
                Page not found. Click
                <Link to="/"> here</Link> to go home.
            </h4>
        </Container>
    );
};

export default NotFoundComponent;
