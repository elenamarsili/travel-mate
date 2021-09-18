import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";
import service from '../../services/users-service';


function GoogleCB() {
  const history = useHistory();
  const auth = useContext(AuthContext);
  useEffect(() => {
    service.profile()
      .then(user => {
        auth.login(user);
        history.push('/');
      })
  }, [history, auth])

  return null;
}

export default GoogleCB;