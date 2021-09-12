import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import service from "../../services/users-service"
import './HomeIn.css';

function HomeIn() {
    const auth = useContext(AuthContext)

    function handleLike() {
 /*        service.like()
            .then(() => next()) */
    }
    // what to put in the "then" of this function? I want to re-render home with new results

    return (
            <div className="container mt-4">
                <img src="https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=676&q=80" className="profile-picture" alt="profile-picture"/>
                <h1 className="mt-2 px-3 profile-title">Elena, she/her, 32yo</h1> {/* //how to put here the name, pronouns and age? */}
                <h2 className="px-3 profile-subtitle">Italian, English, Spanish</h2>{/* // how to put here the languages? */}
                <h2 className="px-3 profile-subtitle">Nature, Beach, Art</h2> {/* //how to put here the interests? */}
                <p className="px-3 profile-text">Hey! I am Elena and I can't wait to meet new friends while travelling!</p>{/*  //how to put here the bio? */}
                <div className="d-flex btns pt-3">
                    <a aria-current="page" onClick={handleLike} className="btn btn-yellow rounded-circle te"><i className="fa fa-heart-o" aria-hidden="true"></i></a>
                    <a aria-current="page" href="" className="btn btn-blue rounded-circle"><i className="fa fa-times" aria-hidden="true"></i></a> 
                    {/* //what to put in the href???? */}
                </div>
 
            </div>
    )
}

export default HomeIn;