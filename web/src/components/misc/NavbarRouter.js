import React from 'react';
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import NavbarIn from './NavbarIn';
import NavbarIncomplete from './NavbarIncomplete';
import NavbarOut from './NavbarOut';

function NavbarRouter() {
    const auth = useContext(AuthContext)

    if(!auth.user) {
        return <NavbarOut/>
    } else if (auth.user && !auth.user.isProfileCompleted) {
        return <NavbarIncomplete/>
    } else {
        return <NavbarIn/>
    }
}

export default NavbarRouter;