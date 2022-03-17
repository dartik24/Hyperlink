import './App.css';

import Home from './pages/homepage/home';
import SignUp from './pages/signup/signup';
import Test from './pages/test/test';
import Feed from './pages/feed/feed';

import SlideOut from './components/slideout/slideout';

import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter id="router">
      <SlideOut />
      <Route exact path="/">
        <Home className="Homepage" />
      </Route>
      <Route exact path="/signup">
        <SignUp className="SignUp" />
      </Route>
      <Route exact path="/feedpage">
        <Feed className="FeedPage" />
      </Route>

      <Route exact path="/testpage">
        <Test className="TestPage" />
      </Route>
    </BrowserRouter>
  );
}

export default App;
