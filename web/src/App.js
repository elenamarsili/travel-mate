import { Switch, Route } from 'react-router-dom';
/* import { useContext, useState } from "react"
import { AuthContext } from "./contexts/AuthContext" */
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ChatDetail from './components/chats/chats-detail/ChatsDetail';
import ChatsList from './components/chats/chats-list/ChatsList';
import About from './components/misc/About';
import Home from './components/misc/Home';
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
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile/update" component={UsersForm} />
          <Route exact path="/profile" component={UsersDetail} />
          <Route exact path="/chats" component={ChatsList} />
          <Route exact path="/chats/:id" component={ChatDetail} />
        </Switch>
      </div>
    </>
  );
}

export default App;

