import './App.css';

import Homepage from './pages/homepage'
import SignUp from './pages/signup';

import { BrowserRouter, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/"> <Homepage className="Homepage"/> </Route>
      <Route exact path="/signup"> <SignUp className="SignUp"/> </Route>
    </BrowserRouter>
  );
}

export default App;
