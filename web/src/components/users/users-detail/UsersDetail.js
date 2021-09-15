import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import './UsersDetail.css';

function UsersDetail() {
  const auth = useContext(AuthContext)

  function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(auth.user?.dateOfBirth);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }

  return (
    <div className="container mt-1">
      <img src={auth.user?.avatar} className="profile-picture" alt="profile-picture"/>
      <h1 className="mt-2 px-3 profile-title">{auth.user?.name}, {auth.user?.pronouns}, {getAge()}yo</h1> 
      <h2 className="px-3 profile-subtitle">I speak: {auth.user?.languages.join(", ")}</h2>
      <h2 className="px-3 profile-subtitle">I like: {auth.user?.interests.join(", ")}</h2>
      <p className="px-3 profile-text">{auth.user?.bio}</p>
      <div className="text-center px-3">
        <Link to="/profile/update" className="btn rounded-pill update-btn text-center">Update Profile</Link> 
      </div>
    </div>
    )
  }
  
export default UsersDetail