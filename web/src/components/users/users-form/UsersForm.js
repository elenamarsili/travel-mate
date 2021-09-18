import { useContext, useState } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import service from "../../../services/users-service"
import pronouns from "../../../data/pronouns"
import languages from "../../../data/languages"
import interests from "../../../data/interests"
import './UsersForm.css';


const validations = {
  pronouns: (value) => {

    let message;
    if (!value || value.length === 0) {
      message = 'Select you preferred pronouns';
    }
    return message;
  },
  languages: (value) => {
    let message;
    if (!value || value.length === 0) {
      message = 'Select at least one language';
    }
    return message;
  },
  interests: (value) => {
    let message;
    if (!value || value.length < 2 || value.length > 5) {
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
  const history = useHistory()

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

  function handleInputChange(ev) {
    const inputName = ev.target.name;
    let value = inputName === "languages" || inputName === "interests" ? handleChangeForSelect(ev) : ev.target.value;
    error[inputName].validations = validations[inputName](ev.target.value);

    if (ev.target.files) {
      value = ev.target.files[0]
    }

    setData({
        ...data,
        [inputName]: value,
    });
    setError({
      ...error
    }) ;
  };

  
  console.log(error.pronouns.validations) 
  console.log(error.pronouns.touched)
  console.log(error.pronouns.validations && error.pronouns.touched)

const isFormValid = () => !Object.keys(error).some(key => error[key].validations !== undefined);

const handleSubmit = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      service.profileUpdate(data)
        .then((user) => {
          auth.login(user)
          history.push("/profile")
        })
        .catch(error => {
          let { message, errors } = error.response?.data || error;
          console.error(message)
          console.error(errors)
          if (errors) {
              errors = Object.keys(errors).reduce((errorsAcc, error)=> {
              errorsAcc[error] = {
              validations: errors[error],
              touched: true
            }
            return errorsAcc
          }, {})
          setError(errors)
        } else {
            setError({name: {validations: "name is required", touched:true}});
        }
        })
        
    }
};

    return (
        <div className="container">
          <form className="px-4" onSubmit={(event) => handleSubmit(event)}>
            <h1 className="update-title text-center">Update Profile</h1>
            <div className="form-group">
              <label className="form-check-label" htmlFor="avatar">My Profile Picture</label>
              <input type="file" name="avatar" className="form-control-file" id="avatar" onChange={(ev) => handleInputChange(ev)} onBlur={(ev) => handleBlur(ev)} />
              {error.avatar.validations && error.avatar.touched && <div className="invalid-feedback">{error.avatar.validations}</div>}
            </div>

            <div className="mb-1">
              <label className="form-check-label" htmlFor="pronouns">My Preferred Pronouns</label>
              <select className="form-select" aria-label="preferred pronouns" id="pronouns" name="pronouns" onChange={(ev) => handleInputChange(ev)} onBlur={(ev) => handleBlur(ev)}>
                <option key="they/them" value="they/them">Choose your preferred pronouns</option>
                { pronouns.map(pron => {
                return <option key={pron} value={pron}>{pron}</option>
                })}
              </select>
              {error.pronouns.validations && error.pronouns.touched && <div className="c-danger">{error.pronouns.validations}</div>}
            </div>

            <div className="mb-1">
              <label className="form-check-label" htmlFor="dateOfBirth">Date of Birth</label>
              <input name="dateOfBirth" type="date" className={`form-control ${error.dateOfBirth.validations && error.dateOfBirth.touched ? 'is-invalid' : ''}`} value={data.dateOfBirth} onChange={(event) => handleInputChange(event)} onBlur={(event) => handleBlur(event)} />
              {error.dateOfBirth.validations && error.dateOfBirth.touched && <div className="invalid-feedback">{error.dateOfBirth.validations}</div>}
            </div>

            <div className="mb-1">
              <label className="form-check-label" htmlFor="bio">About me</label>
              <textarea name="bio" type="text-area" className={`form-control ${error.bio.validations && error.bio.touched ? 'is-invalid' : ''}`} rows="2" maxLength="200" value={data.bio}
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
              {error.languages.validations && error.languages.touched && <div >{error.languages.validations}</div>}
            </div>

            <div className="mb-1">
              <label className="form-check-label" htmlFor="interests">My interests - choose between 2 and 5</label>
              <select className="form-select" aria-label="interests" id="interests" name="interests" onChange={(ev) => handleInputChange(ev)} onBlur={(ev) => handleBlur(ev)} multiple  size="3" >
                { interests.map((interest) => {
                return <option name={interest} key={interest} value={interest}>{interest}</option>
                })}
              </select>
              {error.interests.validations && error.interests.touched && <div >{error.interests.validations}</div>}
            </div>

            <div className="mt-4 row justify-content-center">
              <div className="text-center">
              <button className="btn rounded-pill update-btn" disabled={!isFormValid()}>Update Profile</button>
              </div>
            </div>
          </form>              
        </div>
  );
}

export default UserForm;
