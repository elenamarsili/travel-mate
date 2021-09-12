import './HomeOut.css';

function HomeOut() {

    return (
            <div className="container logged-out text-center">
                <a className="btn btn-signIn btn-primary rounded-pill" href="/login">Sign In</a>
                <a className="btn btn-signUp btn-primary rounded-pill" href="/register">Sign Up</a>
            </div>
    )
}
export default HomeOut;