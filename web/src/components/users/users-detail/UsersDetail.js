import { useContext } from "react"
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
      <h2 className="px-3 profile-subtitle">{auth.user?.languages.join(", ")}</h2>
      <h2 className="px-3 profile-subtitle">{auth.user?.interests.join(", ")}</h2>
      <p className="px-3 profile-text">{auth.user?.bio}</p>
      <div className="text-center px-3">
        <a href="/profile/update" className="mt-2 btn rounded-pill update-btn text-center">Update Profile</a> 
      </div>
    </div>
    )
  }
  
export default UsersDetail