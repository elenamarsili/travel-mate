import { useState, useEffect } from "react"
import service from "../../services/users-service"
import ReccommendationItem from "../users/reccommendations/ReccommendationItem";
import './HomeIn.css';

function HomeIn() {

    const [reccommendations, setReccommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
        service.reccommendations()
            .then((reccommendations) => {
                setReccommendations(reccommendations);
                setIsLoading(false);
            })
    }, [])

    return (
  
            <>
                {isLoading ? (<i className="fa fa-gear fa-spin"></i>) : (
                    <div className="container">
                        {reccommendations.map(reccommendation => (
                            <ReccommendationItem key={reccommendation.id} {...reccommendation}/>
                        ))}
                    </div>
                )}
            </>   
    )
}

export default HomeIn;