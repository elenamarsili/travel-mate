import React from 'react';
import { Link } from 'react-router-dom';
import logo from './../../imgs/1.png';
import './NavbarOut.css';

function NavbarOut() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
            <div className="container">
                <Link className="navbar-brand px-2" to="/"><img src={logo} className="logo" alt="travelmate-logo" width="40px"></img></Link>
                <button className="custom-toggler navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main-navbar" aria-controls="main-navbar" aria-expanded="true" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="navbar-collapse collapse" id="main-navbar">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item px-3"><Link aria-current="page" className="nav-link active" to="/about">Why TravelMate?</Link></li>
                    </ul>
                </div>
            </div>
        </nav>            
    )
}

export default NavbarOut;