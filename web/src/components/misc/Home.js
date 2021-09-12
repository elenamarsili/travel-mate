import { useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import HomeIn from "./HomeIn";
import HomeOut from "./HomeOut";

function Home() {
    const auth = useContext(AuthContext)

    return (
        <>
        {auth.user && (
            <HomeIn></HomeIn>
        )}
        {!auth.user && (
            <HomeOut></HomeOut>
        )}
        </>
    )
}
export default Home;