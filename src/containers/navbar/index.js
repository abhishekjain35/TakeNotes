import React, { useState, useEffect } from "react";
import NavBarComponent from "../../components/navbar";
import { auth } from "../../firebase";

const NavBarContainer = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        let user = auth.currentUser
        if (user) {
            setIsLoggedIn(true);
            setUsername(user.displayName);
        }
    }, []);

    const handleSignOut = () => {
        auth.signOut().then(() => {
            setIsLoggedIn(false);
        });
    };

    return (
        <NavBarComponent
            isLoggedIn={isLoggedIn}
            handleSignOut={handleSignOut}
            username={username}
        />
    );
};

export default NavBarContainer;
