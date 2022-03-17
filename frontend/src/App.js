import './App.css';

import Homepage from './pages/homepage'
import SignUp from './pages/signup';
import TestPage from './pages/testpage';
import FeedPage from './pages/feedpage';

import SlideOut from './components/slideout';

import { BrowserRouter, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter id='router'>
      <SlideOut/>
      <Route exact path="/"> <Homepage className="Homepage"/> </Route>
      <Route exact path="/signup"> <SignUp className="SignUp"/> </Route>
      <Route exact path="/feedpage"> <FeedPage className="FeedPage"/> </Route>

      <Route exact path="/testpage"> <TestPage className="TestPage"/> </Route>
    </BrowserRouter>
  );
}

export default App;
