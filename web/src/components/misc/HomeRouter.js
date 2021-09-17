import { useContext } from "react"
import { Redirect } from "react-router";
import { AuthContext } from "../../contexts/AuthContext"
import HomeOut from "./HomeOut";
import Reccommendation from "./Reccommendation";

function HomeRouter() {
    const auth = useContext(AuthContext)
    if (!auth.user) {
        return <HomeOut />
    } else if (auth.user && !auth.user.isProfileCompleted) {
        return <Redirect to="/profile/update" />
    } else  {
        return <Reccommendation />
    }
}
export default HomeRouter;