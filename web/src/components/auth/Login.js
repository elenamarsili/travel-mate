import { useContext } from "react"
import { Link, useHistory } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import service from "../../services/users-service"
import { useForm } from "react-hook-form";
import './Login.css';

function Login() {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const { register, handleSubmit, setError, formState: { errors } } = useForm({ mode: 'all' });
  const onLoginFormSubmit = data => {
    service.login(data.email, data.password)
      .then(user => {
        auth.login(user)
        history.push('/')
      })
      .catch(error => {
        const { message, errors } = error.response?.data || error;
        if (errors) {
          Object.keys(errors).forEach(input => {
            setError(input, { type: 'manual', message: errors[input] });
          })
        } else {
          setError('email', { type: 'manual', message: message });
        }
      })
  };

   return (
    <div className="container logged-out text-center">
        <div className="margin-0 row justify-content-center">             
            <div className="bg-login col-9 mt-5 py-5 m-2">
                {/* <div className="d-grid gap-2 mt-5 mb-2">
                    <a href={`${process.env.REACT_APP_API_BASE_URL}/authenticate/google`} role="button" className="btn bg-app-bg mb-2 login-btn rounded-pill"><i className="fa fa-google me-2"></i>Sign In with Google</a>   
                </div>
                <p className="login-text text-center">OR</p> */}
                {errors.email?.type === "manual" && <div className="mt-1 alert">{errors.email.message}</div>} 
                <form  className="mt-5 pt-5" onSubmit={handleSubmit(onLoginFormSubmit)}>
                    <div className="input-group mb-2">
                        <input  
                            type="email" {...register("email", { required: 'Email is required' })}
                            className="custom-form-control form-control input-border py-2 ps-4" 
                            placeholder="user@example.org" 
                            aria-label="User email" />
                    </div>

                    <div className="input-group mb-2">
                        <input
                            type="password" {...register("password", { required: 'Password is required' })}
                            className="custom-form-control form-control input-border py-2 ps-4" 
                            placeholder="Password" 
                            aria-label="User password" />
                    </div>

                    <div className="d-grid mt-3">
                        <button type="submit" className="btn login-btn rounded-pill">Sign In</button>
                    </div>
                </form>
                <div className="mb-3 mt-2">
                    <p className="login-text">Don't have an account?<Link className="link" to="/register">Sign Up</Link></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login