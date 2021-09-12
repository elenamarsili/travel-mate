import logo from './../../imgs/1.png';
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
                <a className="col-2 navbar-brand px-3 pr-5" href="/"><img src={logo} className="logo" alt="travelmate-logo" width="40px"></img></a>
                <div className="col-3 nav-links">
                <a aria-current="page" className="nav-link active" href="/chats"><i className="nav-icon fa fa-comment" aria-hidden="true"></i></a>
                <a aria-current="page" className="nav-link active" href="/profile"><img src={auth.user?.avatar} className="rounded-circle user-picture" alt="user-profile" width="30px"></img></a>   
                <a role="button" onClick={handleLogout} className="logout nav-link"><i className="nav-icon fa fa-sign-out" aria-hidden="true"></i></a>   
                </div>
                
        </nav>                
    )
}

export default NavbarIn;