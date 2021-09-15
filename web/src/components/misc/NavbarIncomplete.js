import logo from './../../imgs/1.png';
import { Link } from 'react-router-dom';
import { useContext } from "react"
import { useHistory } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import service from "../../services/users-service"
import './NavbarIn.css';

function NavbarIncomplete() {
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
        <nav className="navbar nav-itemnavbar-dark">
                <Link className="col-2 navbar-brand px-3 pr-5" to="/"><img src={logo} className="logo" alt="travelmate-logo" width="24px"></img></Link>
                <div className="col-3 nav-links"> 
                <a role="button" onClick={handleLogout} className="logout nav-link"><i className="nav-icon fa fa-sign-out" aria-hidden="true"></i></a>   
                </div>        
        </nav>                
    )
}

export default NavbarIncomplete;