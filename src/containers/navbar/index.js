import React, { useState } from "react";
import NavBarComponent from "../../components/navbar";
import { auth } from "../../firebase";

const NavBar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    auth.onAuthStateChanged((user) => {
        if (user) {
            setIsLoggedIn(true);
            setUsername(user.displayName);
        }
    });

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

export default NavBar;
