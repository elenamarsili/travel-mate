import { Switch, Route } from 'react-router-dom';
import About from './components/misc/About';
import Home from './components/misc/Home';
import Navbar from './components/misc/Navbar';


function App() {
  return (
    <>
      <Navbar></Navbar>

      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
        </Switch>
      </div>
    </>
  );
}

export default App;

