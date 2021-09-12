import React from 'react';
import logo from './../../imgs/1.png';
import './NavbarOut.css';

function NavbarOut() {
    return (
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
    )
}

export default NavbarOut;