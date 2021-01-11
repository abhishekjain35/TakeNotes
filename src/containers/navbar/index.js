import React, { useState, useEffect } from "react";
import NavBarComponent from "../../components/navbar";
import { auth } from "../../firebase";
import {useHistory} from "react-router-dom"

const NavBarContainer = () => {
    const history = useHistory()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        let user = auth.currentUser;
        if (user) {
            setIsLoggedIn(true);
            setUsername(user.displayName);
        }
    }, []);

    const handleSignOut = () => {
        auth.signOut().then(() => {
            setIsLoggedIn(false);
            history.push('/signin')
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
