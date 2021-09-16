import { useState, useEffect } from "react"
import service from "../../services/users-service"
import ReccommendationItem from "../users/reccommendations/ReccommendationItem";
import './HomeIn.css';

function HomeIn() {

    const [reccommendations, setReccommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [needRefresh, setNeedRefresh] = useState(false)

    useEffect(() => {
        service.reccommendations()
            .then((reccommendations) => {
                console.log(reccommendations)
                setReccommendations(reccommendations);
                setIsLoading(false);
            })
            .catch(error => console.error(error))
    }, [needRefresh])

    return (
  
            <>
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
            </>   
    )
}

export default HomeIn;