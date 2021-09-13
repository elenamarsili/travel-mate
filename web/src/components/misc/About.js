import { Link } from 'react-router-dom';
import './About.css';

function About() {
    return (
        <div className="container">
            <div className="background"></div>
            <h1 className="title">New Friends Made Easy</h1>
            <p className="paragraph">Wether you are traveling alone or with others, you might want to enrich your travel experience by meeting new people and getting to know new cultures and customs.</p>
            <p className="paragraph">TravelMate will help you find peope with similar interests as yours and speaking the same language as you do, in the same area where you are currently located.</p>
            <p className="paragraph">This way is super-easy to make new friends and enjoy your travels much more!</p>
            <p className="paragraph par-bold">Join us and discover an all new way of making travle friends!</p>
            <div className="container text-center">
                <Link className="btn btn-signIn btn-primary rounded-pill" to="/login">Sign In</Link>
                <Link className="btn btn-signUp btn-primary rounded-pill" to="/register">Sign Up</Link>
            </div>
        </div>
    )
}
export default About;