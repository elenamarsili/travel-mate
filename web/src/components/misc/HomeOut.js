import { Link } from 'react-router-dom';
import './HomeOut.css';

function HomeOut() {

    return (
            <div className="container logged-out text-center">
                <Link className="btn btn-signIn btn-primary rounded-pill" to="/login">Sign In</Link>
                <Link className="btn btn-signUp btn-primary rounded-pill" to="/register">Sign Up</Link>
            </div>
    )
}
export default HomeOut;