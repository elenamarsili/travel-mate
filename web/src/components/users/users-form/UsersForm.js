import { useContext, useState } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import service from "../../../services/users-service"
import pronouns from "../../../data/pronouns"
import languages from "../../../data/languages"
import interests from "../../../data/interests"
import './UsersForm.css';

let isFormValid = false; 

const validations = {
  pronouns: (value) => {
    let message;
    if (!value) {
      message = 'Select you preferred pronouns';
    }
    return message;
  },
  languages: (value) => {
    let message;
    console.log(value)
    if (!value && !value.length) {
      message = 'Select at least one language';
    }
    return message;
  },
  interests: (value) => {
    let message;
    console.log(value)
    if (!value && !value.length) {
      message = 'Select between 2 and 5 interests';
    }
    return message;
  },
  avatar: (value) => {
    let message;
    if (!value) {
      message = 'Insert one picture';
    }
    return message;
  },
  dateOfBirth: (value) => {
    let message;
    if (!value) {
      message = 'Insert dateOfBirth';
    }
    return message;
  },
  bio: (value) => {
    let message;
    if (!value) {
      message = 'Write something about you';
    }
    return message;
  },
}

function UserForm(){
  const auth = useContext(AuthContext)

  const [data, setData] = useState({
    avatar: '',
    pronouns: '',
    dateOfBirth: new Date(),
    bio: '',
    languages: [],
    interests: []
  })

  const [error, setError] = useState({
    avatar: {
      validations: validations.avatar(''),
      touched: false
    }, 
    pronouns: {
      validations: validations.pronouns(''),
      touched: false
    },
    dateOfBirth: {
      validations: validations.dateOfBirth(''),
      touched: false
    },
    bio: {
      validations: validations.bio(''),
      touched: false
    },
    languages: {
      validations: validations.languages([]),
      touched: false
    },
    interests: {
      validations: validations.interests([]),
      touched: false
    },
  })

  function handleBlur(ev) {
    const inputName = ev.target.name;
    error[inputName].touched = true;

    setError({
      ...error
    }) ;
  }

  function handleChangeForSelect (e) {
    let options = e.target.options;
    let values = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        values.push(options[i].value);
      }
    }
    return values
  }

  function handleInputChangeForInterests(event) {

  }

  function handleInputChange(ev) {
    const inputName = ev.target.name;
    const value = inputName === "languages" || inputName === "interests" ? handleChangeForSelect(ev) : ev.target.value;
    error[inputName].validations = validations[inputName](ev.target.value);

    setData((data) => ({
      data: {
        ...data,
        [inputName]: value,
      }
    }));
    setError({
      ...error
    }) ;

    checkIsFormValid();
  };


  function checkIsFormValid() {
    isFormValid = !Object.keys(error).some(key => error[key].validations !== undefined);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (isFormValid()) {
  
      service.profileUpdate(data)
        .then(user => {
          console.log(user)
        })
        .catch(error => {
          const errorFromApi = error.response?.data || error;
          })
    }
  };

    return (
        <div className="container">
          <form className="mt-5 pt-2 px-4" onSubmit={(event) => handleSubmit(event)}>
            <h1 className="update-title text-center">Update Profile</h1>
            <div className="form-group">
              <label className="form-check-label" htmlFor="avatar">My Profile Picture</label>
              <input type="file" name="avatar" className="form-control-file" id="avatar" onChange={(ev) => handleInputChange(ev)} onBlur={(ev) => handleBlur(ev)} />
              {error.avatar.validations && error.avatar.touched && <div className="invalid-feedback">{error.avatar.validations}</div>}
            </div>

            <div className="mb-1">
              <label className="form-check-label" htmlFor="pronouns">My Preferred Pronouns</label>
              <select className="form-select" aria-label="preferred pronouns" id="pronouns" name="pronouns" onChange={(ev) => handleInputChange(ev)} onBlur={(ev) => handleBlur(ev)}>
                { pronouns.map(pron => {
                return <option key={pron} value={pron}>{pron}</option>
                })}
              </select>
              {error.pronouns.validations && error.pronouns.touched && <div className="invalid-feedback">{error.pronouns.validations}</div>}
            </div>

            <div className="mb-1">
              <label className="form-check-label" htmlFor="dateOfBirth">Date of Birth</label>
              <input name="dateOfBirth" type="date" className={`form-control ${error.dateOfBirth.validations && error.dateOfBirth.touched ? 'is-invalid' : ''}`} value={data.dateOfBirth} onChange={(event) => handleInputChange(event)} onBlur={(event) => handleBlur(event)} />
              {error.dateOfBirth.validations && error.dateOfBirth.touched && <div className="invalid-feedback">{error.dateOfBirth.validations}</div>}
            </div>

            <div className="mb-1">
              <label className="form-check-label" htmlFor="bio">About me</label>
              <textarea name="bio" type="text-area" className={`form-control ${error.bio.validations && error.bio.touched ? 'is-invalid' : ''}`} rows="2" value={data.bio}
              onChange={(event) => handleInputChange(event)} onBlur={(event) => handleBlur(event)} />
              {error.bio.validations && error.bio.touched && <div className="invalid-feedback">{error.bio.validations}</div>}
            </div>

            <div className="mb-1">
              <label className="form-check-label" htmlFor="languages">Languages I speak - choose at least one</label>
              <select className="form-select" aria-label="languages" id="languages" name="languages" onChange={(ev) => handleInputChange(ev)} onBlur={(ev) => handleBlur(ev)} multiple  size="3" >
                { languages.map((language) => {
                return <option name={language} key={language} value={language}>{language}</option>
                })}
              </select>
              {error.languages.validations && error.languages.touched && <div className="invalid-feedback">{error.languages.validations}</div>}
            </div>

            <div className="mb-1">
              <label className="form-check-label" htmlFor="languages">My interests - choose between 2 and 5</label>
              <select className="form-select" aria-label="interests" id="interests" name="interests" onChange={(ev) => handleInputChange(ev)} onBlur={(ev) => handleBlur(ev)} multiple  size="3" >
                { interests.map((interest) => {
                return <option name={interest} key={interest} value={interest}>{interest}</option>
                })}
              </select>
              {error.interests.validations && error.interests.touched && <div className="invalid-feedback">{error.interests.validations}</div>}
            </div>

            {/* <div className="mb-1">
              <label className="form-check-label" htmlFor="interests">My interests - choose between 2 and 5</label>
                { interests.map((interest) => {
                return (
                  <div key={interest} className="form-check form-check-inline">
                    <input className="form-check-input"  name={interest} onChange={(event) => handleInputChangeForInterests(event)} type="checkbox" value={interest} id={interest} />
                    <label className="form-check-label" htmlFor={interest}>{interest}</label>
                  </div>
                )
                })}
              {error.interests.validations && error.interests.touched && <div className="invalid-feedback">{error.interests.validations}</div>}
            </div> */}

            <div className="row justify-content-center">
              <div className="text-center">
                <button className="btn rounded-pill update-btn" disabled={!isFormValid}>Update Profile</button>
              </div>
            </div>
          </form>

          <div className="text-center px-4">
               <button className="mt-2 btn rounded-pill delete-btn text-center">Delete Profile</button> 
          </div>
              
        </div>
  );
}




export default UserForm;
