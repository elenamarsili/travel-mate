import { useState, useEffect } from "react"
import service from "../../services/users-service"
import './HomeIn.css';

function HomeIn() {

    const [reccommendation, setReccommendation] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [needRefresh, setNeedRefresh] = useState(false);
    const [pagination, setPagination] = useState({ page: 0, moreResults: true })
 
    useEffect(() => {
        service.reccommendation()
            .then((reccommendations) => {
                setReccommendation(reccommendation);
                setIsLoading(false);
            })
            .catch(error => console.error(error))
    }, [needRefresh])

    useEffect(() => {
        let isMount = true;
        if (pagination.moreResults) {
            service.recommendation(pagination.page)
                .then(recommendation => {
                    if (isMount) {
                        if (reccommendation) setReccommendation(recommendation)
                        else setPagination({...pagination, moreResults: false })
                    }
                })
                .catch(error => console.log(error))
        }
        return () => isMount = false;
    }, [pagination])

    const handleLike = (id) => {
        service.like(id)
            .then(() => {
                setNeedRefresh(!needRefresh)
            })
            .catch(error => console.error(error))
    } 

    function getAge() {
        var today = new Date();
        var birthDate = new Date(reccommendation.dateOfBirth);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const handleNextPageClick = () => setPagination({...pagination, page: pagination.page + 1})

return (
    <div className="container">
        <img className="profile-picture" src={reccommendation.avatar} alt={reccommendation.name}/>
        <h1 className="mt-1 px-3 profile-title">{reccommendation.name}, {reccommendation.pronouns}, {getAge()}yo</h1> 
        <h2 className="px-3 profile-subtitle">I speak: {reccommendation.languages.join(", ")}</h2>
        <h2 className="px-3 profile-subtitle">I like: {reccommendation.interests.join(", ")}</h2>
        <p className="px-3 profile-text">{reccommendation.bio}</p>
        <div className="d-flex btns">
            <a aria-current="page" onClick={() => handleLike(reccommendation.id)} className="btn btn-yellow rounded-circle te"><i className="fa fa-heart-o" aria-hidden="true"></i></a>
            <a aria-current="page" onClick={() => handleNextPageClick()} href="" className="btn btn-blue rounded-circle"><i className="fa fa-times" aria-hidden="true"></i></a>
        </div>
    </div>
    )
}

export default HomeIn;