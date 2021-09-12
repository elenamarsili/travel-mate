import { useContext, useState } from "react"
import { useHistory } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import service from "../../services/users-service"
import './Login.css';

function Login() {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const [error, setError] = useState()

  function handleChange(ev) {
    setData({
      ...data,
      [ev.target.name]: ev.target.value
    })
  }

  function handleSubmit(ev) {
    ev.preventDefault()

    service.login(data.email, data.password)
      .then((user) => {
        auth.login(user)
        history.push("/")
      })
      .catch((error) => {
        const message = error.response?.data.message || error.message
        setError(message)
      })
  }


  function handleSubmitGoogle(ev) {
    ev.preventDefault()

    service.loginWithGoogle()
      .then((user) => {
        auth.login(user)
        history.push("/")
      })
      .catch(() => {
        setError("Email or password are incorrect")
      })
  }

   return (
    <div className="container logged-out text-center">
        <div className="margin-0 row justify-content-center">             
            <div className="bg-login col-9 mt-5 py-5 m-2">
                <div className="d-grid gap-2 mt-5 mb-2">
                    <a onClick={handleSubmitGoogle} className="btn bg-app-bg mb-2 login-btn rounded-pill"><i className="fa fa-google me-2"></i>Sign In with Google</a>   
                </div>
                <p className="login-text text-center">OR</p>
                {error && <div className="mt-1 alert">{error}</div>} 
                <form  onSubmit={handleSubmit}>
                    <div className="input-group mb-2">
                        <input 
                            name="email" 
                            type="text" 
                            onChange={handleChange} 
                            value={data.email} 
                            className="custom-form-control form-control input-border py-2 ps-4" 
                            placeholder="user@example.org" 
                            aria-label="User email" />
                    </div>

                    <div className="input-group mb-2">
                        <input
                            name="password"
                            type="password"
                            onChange={handleChange}
                            value={data.password}  
                            className="custom-form-control form-control input-border py-2 ps-4" 
                            placeholder="Password" 
                            aria-label="User password" />
                    </div>

                    <div className="d-grid mt-3">
                        <button type="submit" className="btn login-btn rounded-pill">Sign In</button>
                    </div>
                </form>
                <div className="mb-3 mt-2">
                    <p className="login-text">Don't have an account?<a className="link" href="/register">Sign Up</a></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login