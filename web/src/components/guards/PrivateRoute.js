import { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';

function PrivateRoute({ component: Component, fullProfile, ...routeProps }) {
    const { user } = useContext(AuthContext);
    return (
        <Route {...routeProps} component={(componentProps) => {
            if (user) {
                if (!fullProfile || (fullProfile && user.isProfileCompleted)) {
                    return <Component {...componentProps} />
                } else {
                    return <Redirect to="/profile/update" />
                }
            } else {
                return <Redirect to="/login" />
            }
        }
        }/>
    )
}

export default PrivateRoute;