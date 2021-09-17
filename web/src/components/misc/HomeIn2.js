import { useState, useEffect } from "react"
import service from "../../services/users-service"
import ReccommendationItem from "../users/reccommendations/ReccommendationItem";
import './HomeIn.css';

function HomeIn2() {

    const [reccommendations, setReccommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [needRefresh, setNeedRefresh] = useState(false);
    const [pagination, setPagination] = useState({ page: 0, moreResults: true })
/*     let [index, setIndex] = useState(0)
    const reccommendationLength = reccommendations.length
 */
    
    
    useEffect(() => {
        service.reccommendations()
            .then((reccommendations) => {
                setReccommendations(reccommendations);
                setIsLoading(false);
            })
            .catch(error => console.error(error))
    }, [needRefresh])

    useEffect(() => {
        let isMount = true;
        if (pagination.moreResults) {
            recommendationService.getRecommendation(pagination.page)
                .then(recommendation => {
                    if (isMount) {
                        if (recommendation) setRecommendation(recommendation)
                        else setPagination({...pagination, moreResults: false })
                    }
                })
                .catch(error => console.log(error))
        }
        return () => isMount = false;
    }, [pagination])

    const handleNextPageClick = () => setPagination({...pagination, page: pagination.page + 1})

/*     function handleNext() {
        service.reccommendations()
            .then(() => {
                setIndex((index < reccommendationLength -1) ? (index = index + 1) : (index = 0))
            })
            .catch(error => console.error(error))
    } 

    function handlePrev() {
        service.reccommendations()
            .then(() => {
                setIndex((index > 0) ? (index = index - 1) : (index = reccommendations.length - 1))
            })
            .catch(error => console.error(error)) */
    } 

return (
    <div className="container">
        <img className="profile-picture" src={avatar} alt={name}/>
        <h1 className="mt-1 px-3 profile-title">{name}, {pronouns}, {getAge()}yo</h1> 
        <h2 className="px-3 profile-subtitle">I speak: {languages.join(", ")}</h2>
        <h2 className="px-3 profile-subtitle">I like: {interests.join(", ")}</h2>
        <p className="px-3 profile-text">{bio}</p>
        <div className="d-flex btns">
        <a aria-current="page" onClick={() => handleLike(id)} className="btn btn-yellow rounded-circle te"><i className="fa fa-heart-o" aria-hidden="true"></i></a>
    </div>
   
{/*              <>
                {isLoading ? (<i className="fa fa-gear fa-spin"></i>) : (
                    <div className="container">
                        {reccommendations.map(reccommendation => (
                            <ReccommendationItem 
                                needRefresh={needRefresh}
                                setNeedRefresh={setNeedRefresh}
                                key={reccommendation.id} 
                                {...reccommendation}
                                />
                        ))}
                    </div>
                )}                 
            </>   */}  

{/* <>
{isLoading ? (<i className="fa fa-gear fa-spin"></i>) : (
    <div className="container">
        {reccommendations.map(reccommendation => (
            <ReccommendationItem 
                needRefresh={needRefresh}
                setNeedRefresh={setNeedRefresh}
                key={reccommendation.id} 
                {...reccommendation}
                />
        ))}
    </div>
)}                 
</>   */} 

{/*           <div className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    {reccommendations.map(reccommendation => (
                        <div key={reccommendation.id}  className={(reccommendations.indexOf(reccommendation) === index) ? "carousel-item active" : "carousel-item"}>
                            <ReccommendationItem 
                                needRefresh={needRefresh}
                                setNeedRefresh={setNeedRefresh}
                                {...reccommendation}
                                />
                        </div>
                    ))}
                    
                </div>
                <a className="carousel-control-prev" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next mt-2" role="button" onClick={() => handleNext()} data-slide="next">
                    <span className="carousel-control-next-icon" onClick={() => handlePrev()} aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>  */}
    )
}

export default HomeIn2;