import React from "react";
import NavBarComponent from "../../components/navbar";
import { auth } from "../../firebase";

const NavBarContainer = ({ isLoggedIn, setIsLoggedIn }) => {
    const handleSignOut = () => {
        auth.signOut().then(() => {
            setIsLoggedIn(false);
        });
    };

    return (
        <NavBarComponent
            isLoggedIn={isLoggedIn}
            handleSignOut={handleSignOut}
        />
    );
};

export default NavBarContainer;
