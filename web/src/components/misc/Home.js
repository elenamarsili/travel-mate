import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import './Home.css';

function Home() {
    const auth = useContext(AuthContext)

    return (
        <>
        {!auth.user && (
            <div className="container logged-out text-center">
                <a className="btn btn-signIn btn-primary rounded-pill">Sign In</a>
                <a className="btn btn-signUp btn-primary rounded-pill">Sign Up</a>
            </div>
        )}
        {auth.user && (
            <div>

            </div>
        )}
        </>
    )
}
export default Home;