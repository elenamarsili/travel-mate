import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './components/guards/PrivateRoute';
import GoogleCB from './components/auth/GoogleCB';
/* import Login from './components/auth/Login';
import Register from './components/auth/Register'; */
import Register2 from './components/auth/Register2'; 
import Login2 from './components/auth/Login2'; 
import ChatDetail from './components/chats/chats-detail/ChatsDetail';
import ChatsList from './components/chats/chats-list/ChatsList';
import About from './components/misc/About';
import Home from './components/misc/HomeRouter';
import Navbar from './components/misc/Navbar';
import UsersDetail from './components/users/users-detail/UsersDetail';
import UsersForm from './components/users/users-form/UsersForm';


function App() {

  return (
    <>
      <Navbar></Navbar>

      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={Login2} />
          <Route exact path="/google/cb" component={GoogleCB} />
          <Route exact path="/register" component={Register2} />
          <PrivateRoute fullProfile={false} exact path="/profile/update" component={UsersForm} />
          <PrivateRoute fullProfile={true} exact path="/profile" component={UsersDetail} />
          <PrivateRoute fullProfile={true} exact path="/chats" component={ChatsList} />
          <PrivateRoute fullProfile={true} exact path="/chats/:id" component={ChatDetail} />
          <Redirect to="/"/>
        </Switch>
      </div>
    </>
  );
}

export default App;

