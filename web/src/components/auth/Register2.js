import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom"
import { useForm } from "react-hook-form"
import service from "../../services/users-service"
import './Login.css';

function Register2() {

  const history = useHistory()
  const { register, handleSubmit, setError, formState: { errors } } = useForm({ mode: 'all' });
  const onRegisterFormSubmit = user => {
    service.register(user)
      .then(() => history.push("/login"))
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
                <div className="d-grid gap-2 mt-5 mb-2">
                    <Link to="/authenticate/google" className="btn bg-app-bg mb-2 login-btn rounded-pill"><i className="fa fa-google me-2"></i>Sign In with Google</Link>   
                </div>
                <p className="login-text text-center">OR</p>
                <form  onSubmit={handleSubmit(onRegisterFormSubmit)}>
                <div className="input-group mb-2">
                        <input 
                            name="name" 
                            type="text" {...register("name", { required: 'User name is required' })}
                            className="custom-form-control form-control input-border py-2 ps-4" 
                            placeholder="Your name" 
                            aria-label="User name" />
                        { errors.name && <small style={{color: 'red'}}>{errors.name.message}</small>}
                    </div>

                    <div className="input-group mb-2">
                        <input 
                            type="email" {...register("email", { required: 'Email is required' })}
                            className="custom-form-control form-control input-border py-2 ps-4" 
                            placeholder="user@example.org" 
                            aria-label="User email" />
                        { errors.email && <small style={{color: 'red'}}>{errors.email.message}</small>}
                    </div>

                    <div className="input-group mb-2">
                        <input
                            type="password" {...register("password", { required: 'Password is required' })}
                            className="custom-form-control form-control input-border py-2 ps-4" 
                            placeholder="Password" 
                            aria-label="User password" />
                        { errors.password && <small style={{color: 'red'}}>{errors.password.message}</small>}
                    </div>

                    <div className="d-grid mt-3">
                        <button type="submit" className="btn login-btn rounded-pill" disabled={Object.keys(errors).length !== 0}>Sign Up</button>
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

export default Register2
