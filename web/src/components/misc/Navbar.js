import React from 'react';
import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import NavbarIn from './NavbarIn';
import NavbarOut from './NavbarOut';

function Navbar() {
    const auth = useContext(AuthContext)

    return (
        <>
        {auth.user && (
        <NavbarIn></NavbarIn>               
        )}
        {!auth.user && (
        <NavbarOut></NavbarOut>        
        )}
        </>
    )
}

export default Navbar;