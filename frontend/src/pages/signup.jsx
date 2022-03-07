import './signup.css';
import InputForm from '../components/input-form'
import React from 'react'

class Signup extends React.Component {
  handleChange = (event) => {
    const {id, value} = event.target;
    console.log(id, value);
    this.setState(prevState => ({
      ...prevState,
      [id]: value
    }));
  }

  // TODO: Should make a call to our backend that attempts to create a new user
  // Should login them in if successful, should display errors otherwise
  signupPressed = () => { }

  render() {
      // TODO: Style the radio buttons
      return (
        <div className="Signup"> 
          <h1 className = "title" > Create a new account </h1>
            <ul> 
              <li> a </li>
              <li> a </li>
            </ul>
            <div> 
              <InputForm 
                inputs={["name", "username", "password"]}
                buttons={[
                  {name: "Sign Up", callback: this.signupPressed }]}
              />
            </div>
        </div>
      );
  }
}

export default Signup;
