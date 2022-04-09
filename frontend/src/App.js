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

  componentDidMount() {
    let user = localStorage.getItem('user');
    if(user) {
      user = JSON.parse(user);
      this.setState({user})
    }
  }

  setUser = (user) => {
    this.setState({user: user});
    localStorage.setItem('user', JSON.stringify(user));
  }

  links = () => {
    if(!this.state.user)
      return <></>

    return (
      <div id="navbar">
        <Link to='feed'> <i className="bi bi-rss"> <p> Feed </p> </i> </Link>
        {!this.state.user.employee ? <Link to='add-listing'> <i className="bi bi-plus-lg"> <p> Add Listing </p> </i> </Link>: <> </> }
        <Link className='right' to='/'> <i onClick={() => this.setUser(null) } className="bi bi-door-closed"> <p> Log Out </p> </i> </Link>
        <Link className='right' to='profile'> <i className="bi bi-person"> <p> Profile </p> </i> </Link>
      </div>
    );
  }

  // <SlideOut />
  render() {
    return (
      <BrowserRouter id="router">
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
