import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import './Home.css';

function Home() {
    const auth = useContext(AuthContext)

    return (
        <>
        {!auth.user && (
            <div className="container logged-out text-center">
                <a className="btn btn-signIn btn-primary rounded-pill" href="/login">Sign In</a>
                <a className="btn btn-signUp btn-primary rounded-pill" href="/register">Sign Up</a>
            </div>
        )}
        {auth.user && (
            <div>
                <h1>Reccommendations</h1>
            </div>
        )}
        </>
    )
}
export default Home;