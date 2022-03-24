import './App.css';

import Home from './pages/homepage/home';
import SignUp from './pages/signup/signup';
import AddListing from './pages/add-listing/add-listing';
import Test from './pages/test/test';
import Feed from './pages/feed/feed';
import Profile from './pages/profile/profile';

import SlideOut from './components/slideout/slideout';
import Authenticator from './components/authenticator/authenticator';

import { BrowserRouter, Route, Link } from 'react-router-dom';
import React from 'react';


class App extends React.Component {
  constructor() {
    super();
    this.login = React.createRef();
    document.title = "Hyperlink";

    let user = localStorage.getItem('user');
    if(user) 
      user = JSON.parse(user);
    else 
      user = null;

    this.state = {
      user: null
    };
  }

  setUser = (user) => {
    this.setState({user: user});
    localStorage.setItem('user', JSON.stringify(user));
  }

  links = () => {
    if(!this.state.user)
      return <></>

    const l1 = this.state.user.employee ? 'feed' : 'add-listing';
    
    return (
      <>
        <Link to='profile'> <i className="bi bi-person"></i> </Link>
        <Link to={l1}> <i className="bi bi-rss-fill"></i> </Link>
        <Link to='/'> <i onClick={() => this.setUser(null) } className="bi bi-door-closed"></i> </Link>
      </>
    );
  }

  render() {
    return (
      <BrowserRouter id="router">
        <SlideOut />
        {this.links()}

        <Route exact path="/"> <Home login={this.setUser} className="Homepage" /> </Route>
        <Route exact path="/signup"> <SignUp className="SignUp" /> </Route>
  
        <Authenticator
          routes={["feed", "add-listing", "profile"]}
          user={this.state.user}> 
            <Feed className="FeedPage" />
            <AddListing className="AddListing" />
            <Profile className="Profile" login={this.setUser} />
        </Authenticator>


        <Route exact path="/testpage">
          <Test className="TestPage" />
        </Route>
      </BrowserRouter>
    );
  }
}

export default App;
