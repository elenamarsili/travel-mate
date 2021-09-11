import React from 'react';
import './Navbar.css';
import logo from './../../imgs/1.png';
import { useContext } from "react"
import { useHistory } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import service from "../../services/users-service"

function Navbar(props) {
    const history = useHistory()
    const auth = useContext(AuthContext)

    function handleLogout() {
        service.logout()
        .then(() => {
            auth.logout()
            history.push("/login")
        })
    }

    return (
        <>
        {auth.user && (
        <nav className="navbar nav-itemnavbar-dark fixed-top">
                <a className="col-2 navbar-brand px-2" href="/"><img src={logo} className="logo" alt="travelmate-logo" width="40px"></img></a>
                <a aria-current="page" className="nav-link active" href="/chats"><i className="fa fa-comment" aria-hidden="true"></i></a>
                <a aria-current="page" className="nav-link active" href="/profile"><img src={auth.user?.avatar} alt="user-profile"></img></a>   
                <a role="button" onClick={handleLogout} className="logout nav-link"><i className="fa fa-sign-out" aria-hidden="true"></i></a>   
        </nav>                
        )}
        {!auth.user && (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
            <div className="container">
                <a className="navbar-brand px-2" href="/"><img src={logo} className="logo" alt="travelmate-logo" width="40px"></img></a>
                <button className="custom-toggler navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-navbar" aria-controls="main-navbar" aria-expanded="true" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse" id="main-navbar">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item px-3"><a aria-current="page" className="nav-link active" href="/about">Why TravelMate?</a></li>
                    </ul>
                </div>
            </div>
        </nav>            
        )}
        </>
    )
}

export default Navbar;