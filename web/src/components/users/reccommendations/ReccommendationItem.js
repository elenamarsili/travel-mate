import { useHistory } from "react-router-dom"
import service from "../../../services/users-service"
import './ReccommendationItem.css';

function ReccommendationItem({id, name, pronouns, dateOfBirth, avatar, interests, languages, bio, needRefresh, setNeedRefresh}) {
    const history = useHistory();

    const handleLike = (id) => {
        service.like(id)
            .then(() => {
                setNeedRefresh(!needRefresh)
            })
            .catch(error => console.error(error))
    } 



    function getAge() {
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
            <img className="profile-picture" src={avatar} alt={name}/>
            <h1 className="mt-1 px-3 profile-title">{name}, {pronouns}, {getAge()}yo</h1> 
            <h2 className="px-3 profile-subtitle">I speak: {languages.join(", ")}</h2>
            <h2 className="px-3 profile-subtitle">I like: {interests.join(", ")}</h2>
            <p className="px-3 profile-text">{bio}</p>
            <div className="d-flex btns">
                <a aria-current="page" onClick={() => handleLike(id)} className="btn btn-yellow rounded-circle te"><i className="fa fa-heart-o" aria-hidden="true"></i></a>
                <a aria-current="page" href="" className="btn btn-blue rounded-circle"><i className="fa fa-times" aria-hidden="true"></i></a> 
                {/* //what to put in the href???? */}
            </div>
        </>
    )

}

export default ReccommendationItem;