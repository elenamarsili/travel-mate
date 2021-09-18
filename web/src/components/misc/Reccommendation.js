import { useState, useEffect } from "react"
import service from "../../services/users-service"
import './Reccommendation.css';

function Reccommendation() {

    const [state, setState] = useState({reccommendation: undefined, isLoading: true});
    const [page, setPage] = useState(0)
 
    useEffect(() => {
        console.log("page:", page)
        let isMount = true;
        service.reccommendation(page)
            .then(reccommendation => {
                if (isMount) {
                    if (reccommendation) setState({reccommendation, isLoading:false})
                    else {
                        console.log("no quedan mas reccommendaciones")
                        setPage(0)
                        setState({...state, isLoading:false})
                    }
                }
            })
            .catch(error => console.log(error))
        return () => isMount = false;
    }, [page])

    const handleLike = (id) => {
        service.like(id)
            .then(() =>  setPage(page + 1))
            .catch(error => console.error(error))
    } 

    const getAge = () => {
        var today = new Date();
        var birthDate = new Date(reccommendation.dateOfBirth);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    const handleNextPageClick = () => setPage(page + 1)
    const { isLoading, reccommendation } = state;

    if (isLoading) return  <i className="fa fa-gear fa-spin"></i>
    else if (!reccommendation) return (
        <div className="container">
            <img className="profile-picture" src="../../imgs/about.png" alt="friends"/>
            <h1 className="mt-1 px-3 profile-title">Wow! You have already liked everybody!</h1> 
            <p className="px-3 profile-text">Select more interests in order to have more reccommendations!</p>
        </div>
    )
    else return (
        <div className="container">
            <img className="profile-picture" src={reccommendation.avatar} alt={reccommendation.name}/>
            <h1 className="mt-3 px-3 profile-title">{reccommendation.name}, {reccommendation.pronouns}, {getAge()}yo</h1> 
            <h2 className="px-3 profile-subtitle">I speak: {reccommendation.languages.join(", ")}</h2>
            <h2 className="px-3 profile-subtitle">I like: {reccommendation.interests.join(", ")}</h2>
            <p className="px-3 profile-text">{reccommendation.bio}</p>
            <div className="d-flex btns">
                <button aria-current="page" onClick={() => handleLike(reccommendation.id)} className="btn btn-yellow rounded-circle te"><i className="fa fa-heart-o" aria-hidden="true"></i></button>
                <button aria-current="page" onClick={handleNextPageClick} className="btn btn-blue rounded-circle"><i className="fa fa-times" aria-hidden="true"></i></button>
            </div>
        </div>
    )
}

export default Reccommendation;