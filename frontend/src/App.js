import './App.css';

import Homepage from './pages/homepage'
import SignUp from './pages/signup';
import SlideOut from './components/slideout'

import { BrowserRouter, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <SlideOut/>
      <Route exact path="/"> <Homepage className="Homepage"/> </Route>
      <Route exact path="/signup"> <SignUp className="SignUp"/> </Route>
    </BrowserRouter>
  );
}

export default App;
