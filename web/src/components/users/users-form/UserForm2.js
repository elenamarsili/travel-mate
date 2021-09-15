import { Component } from 'react';
import { useHistory } from "react-router-dom"
import { useForm } from 'react-hook-form';
import service from "../../../services/users-service"
import pronouns from "../../../data/pronouns"
import languages from "../../../data/languages"
import interests from "../../../data/interests"
import './UsersForm.css';
  
  function UserForm2(){
    const history = useHistory()
    const { register, handleSubmit, setError, setValue, watch, reset, formState: { errors, isValid, isDirty } } = useForm({
        mode: 'all', 
      });
  
    const onUpdateProfileFormSubmit = user => {
        service.updateProfile(user)
            .then(user => history.push("/profile"))
            .catch(error => {
                const { message, errors} = error.response?.data || error;
                if (errors) {
                    Object.keys(errors).forEach(input => {
                        setError(input, { type: 'manual', message: errors[input] });
                      }) 
                } else {
                    setError('name', { type: 'manual', message: message });
                }
            })
        }
  
    return (
          <div className="container">
            <form className="px-4" onSubmit={handleSubmit(onUpdateProfileFormSubmit)}>
              <h1 className="update-title text-center">Update Profile</h1>
              <div className="form-group">
                <label className="form-check-label" htmlFor="avatar">My Profile Picture</label>
                <input type="file" {...register("avatar")}/>
                {errors.avatar && <div className="invalid-feedback">{errors.avatar.message}</div>}
              </div>
  
              <div className="mb-1">
                <label className="form-check-label" htmlFor="pronouns">My Preferred Pronouns</label>
                <select className="form-select" {...register("pronouns")}>
                  <option key="they/them" value="they/them">Choose your preferred pronouns</option>
                  { pronouns.map(pron => {
                  return <option key={pron} value={pron}>{pron}</option>
                  })}
                </select>
                {errors.pronouns && <div className="invalid-feedback">{errors.pronouns.message}</div>}
              </div>

              <div className="mb-1">
                <label className="form-check-label" htmlFor="dateOfBirth">Date of Birth</label>
                <input type="date" {...register("dateOfBirth")}/>
                {errors.dateOfBirth && <div className="invalid-feedback">{errors.dateOfBirth.message}</div>}
              </div>
  
              <div className="mb-1">
                <label className="form-check-label" htmlFor="bio">About me</label>
                <textarea type="text-area" {...register("name", { required: 'User name is required' })} rows="2" maxLength="200"/>
                {errors.bio && <div className="invalid-feedback">{errors.bio.message}</div>}
              </div>
  
              <div className="mb-1">
                <label className="form-check-label" htmlFor="languages">Languages I speak - choose at least one</label>
                    <select className="form-select" {...register("languages")} multiple  size="3">
                    { languages.map(language => {
                    return <option key={language} value={language}>{language}</option>
                    })}
                    </select>
                    {errors.languages && <div className="invalid-feedback">{errors.languages.message}</div>}
              </div>

              <div className="mb-1">
                <label className="form-check-label" htmlFor="interests">My interests - choose between 2 and 5</label>
                    <select className="form-select" {...register("interests")} multiple  size="3">
                    { interests.map(interest => {
                    return <option key={interest} value={interest}>{interest}</option>
                    })}
                    </select>
                    {errors.interests && <div className="invalid-feedback">{errors.interests.message}</div>}
              </div>

              <div className="mt-4 row justify-content-center">
                <div className="text-center">
                <button className="btn rounded-pill update-btn" disabled={!isDirty || !isValid}>Update Profile</button>
                </div>
              </div>
            </form>              
          </div>
    );
  }
  
  export default UserForm2;