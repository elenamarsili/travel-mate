import { useState } from "react"
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom"
import service from "../../services/users-service"
import './Login.css';

function Register() {
  const history = useHistory()
  const [error, setError] = useState()

  function handleSubmit(ev) {
    ev.preventDefault()
    service.register({
      name: ev.target.name.value,
      email: ev.target.email.value,
      password: ev.target.password.value,
    })
      .then(() => {
        history.push("/login")        
      })
      .catch(err => {
        setError(err.response.data.errors)
      })
  }

  return (
    <div className="container logged-out text-center">
        <div className="margin-0 row justify-content-center">             
            <div className="bg-login col-9 mt-5 py-5 m-2">
                <div className="d-grid gap-2 mt-5 mb-2">
                    <Link to="/authenticate/google" className="btn bg-app-bg mb-2 login-btn rounded-pill"><i className="fa fa-google me-2"></i>Sign In with Google</Link>   
                </div>
                <p className="login-text text-center">OR</p>
                {error && <div className="mt-1 alert"></div>} 
                <form  onSubmit={handleSubmit}>
                <div className="input-group mb-2">
                        <input 
                            name="name" 
                            type="text"  
                            className="custom-form-control form-control input-border py-2 ps-4" 
                            placeholder="Your name" 
                            aria-label="User name" />
                        <small style={{color: 'red'}}>{error?.name}</small>
                    </div>

                    <div className="input-group mb-2">
                        <input 
                            name="email" 
                            type="text" 
                            className="custom-form-control form-control input-border py-2 ps-4" 
                            placeholder="user@example.org" 
                            aria-label="User email" />
                        <small style={{color: 'red'}}>{error?.email}</small>
                    </div>

                    <div className="input-group mb-2">
                        <input
                            name="password"
                            type="password"  
                            className="custom-form-control form-control input-border py-2 ps-4" 
                            placeholder="Password" 
                            aria-label="User password" />
                        <small style={{color: 'red'}}>{error?.password}</small>
                    </div>

                    <div className="d-grid mt-3">
                        <button type="submit" className="btn login-btn rounded-pill">Sign Up</button>
                    </div>
                </form>
                <div className="mb-3 mt-2">
                    <p className="login-text">Already have an account?<a className="link" href="/login">Sign In</a></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register
