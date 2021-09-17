import { useContext } from "react"
import { Redirect } from "react-router";
import { AuthContext } from "../../contexts/AuthContext"
/* import HomeIn from "./HomeIn"; */
import HomeIn3 from "./HomeIn3";
import HomeOut from "./HomeOut";

function HomeRouter() {
    const auth = useContext(AuthContext)
    if (!auth.user) {
        return <HomeOut />
    } else if (auth.user && !auth.user.isProfileCompleted) {
        return <Redirect to="/profile/update" />
    } else  {
        return <HomeIn3 />
    }
}
export default HomeRouter;