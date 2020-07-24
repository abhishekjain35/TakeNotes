import React from "react";
import { NavContainer, Button, FormDiv } from "./styles/NavContainer.js";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <NavContainer>
            <Link to="/"><Button>KeepNotes</Button></Link>
            <FormDiv>
                <Link to="/login">
                    <Button>Login</Button>
                </Link>
                <Link to="/signup">
                    <Button>Signup</Button>
                </Link>
            </FormDiv>
        </NavContainer>
    );
};

export default Navbar;
