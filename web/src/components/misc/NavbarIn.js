import logo from './../../imgs/1.png';
import { Link } from 'react-router-dom';
import { useContext } from "react"
import { useHistory } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import service from "../../services/users-service"
import './NavbarIn.css';

function NavbarIn() {
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
                <Link aria-current="page" className="nav-link active" to="/chats"><i className="nav-icon fa fa-comment" aria-hidden="true"></i></Link>
                <Link aria-current="page" className="nav-link active" to="/profile"><img src={auth.user?.avatar} className="rounded-circle user-picture" alt="user-profile" width="24px"></img></Link>   
                <a role="button" onClick={handleLogout} className="logout nav-link"><i className="nav-icon fa fa-sign-out" aria-hidden="true"></i></a>   
                </div>
                
        </nav>                
    )
}

export default NavbarIn;