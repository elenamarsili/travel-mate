import { useContext } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import pronouns from "../../../data/pronouns";
import service from "../../../services/users-service"
import './ReccommendationItem.css';

function ReccommendationItem({id, name, dateOfBirth, avatar, interests, languages, bio}) {

    function handleLike() {
        /*        service.like()
                   .then(() => next()) */
           }
           // what to put in the "then" of this function? I want to re-render home with new results
    function getAge(dateString) {
        var today = new Date();
        var birthDate = new Date(dateOfBirth);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    return (
        <>
            <img className="profile-picture" src={avatar}/>
            <h1 className="mt-2 px-3 profile-title">{name}, {pronouns}, {getAge()}yo</h1> 
            <h2 className="px-3 profile-subtitle">{languages.join(", ")}</h2>
            <h2 className="px-3 profile-subtitle">{interests.join(", ")}</h2>
            <p className="px-3 profile-text">{bio}</p>
            <div className="d-flex btns pt-3">
                <a aria-current="page" onClick={handleLike} className="btn btn-yellow rounded-circle te"><i className="fa fa-heart-o" aria-hidden="true"></i></a>
                <a aria-current="page" href="" className="btn btn-blue rounded-circle"><i className="fa fa-times" aria-hidden="true"></i></a> 
                {/* //what to put in the href???? */}
            </div>
        </>
    )

}

export default ReccommendationItem;