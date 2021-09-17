import { useState, useEffect } from "react"
import service from "../../services/users-service"
import ReccommendationItem from "../users/reccommendations/ReccommendationItem";
import './HomeIn.css';

function HomeIn() {

    const [reccommendations, setReccommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [needRefresh, setNeedRefresh] = useState(false);
    let [index, setIndex] = useState(0)
    const reccommendationLength = reccommendations.length

    
    
    useEffect(() => {
        service.reccommendations()
            .then((reccommendations) => {
                setReccommendations(reccommendations);
                setIsLoading(false);
            })
            .catch(error => console.error(error))
    }, [needRefresh])

    function handleNext() {
        service.reccommendations()
            .then(() => {
                setIndex((index < reccommendationLength -1) ? (index += 1) : (index = 0))
            })
            .catch(error => console.error(error))
    } 

    function handlePrev() {
        service.reccommendations()
            .then(() => {
                setIndex((index > 0) ? (index -= 1) : (index = reccommendations.length - 1))
            })
            .catch(error => console.error(error))
    } 

return (
         <div className="carousel slide" data-ride="carousel">
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
                <a className="carousel-control-prev" role="button" onClick={() => handlePrev()} data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next mt-2" role="button" onClick={() => handleNext()} data-slide="next">
                    <span className="carousel-control-next-icon"  aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
    )
}

export default HomeIn;