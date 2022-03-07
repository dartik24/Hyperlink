import './homepage.css';
import InputForm from '../components/input-form'
import React from 'react'

class Homepage extends React.Component {
  handleChange = (event) => {
    const {id, value} = event.target;
    console.log(id, value);
    this.setState(prevState => ({
      ...prevState,
      [id]: value
    }));
  }

  // TODO: Should make a call to our backend that validates that the user exists in our database
  // Should login them in if successful, should display errors otherwise
  loginPressed = () => { }

  // TODO: Should re-route user to signup component
  signupPressed = () => { }

  render() {
      return (
        <div className="Homepage"> 
          <h1 className = "title" > Hyperlink </h1>
            <div> 
              <InputForm 
                inputs={["username", "password"]}
                buttons={[
                  {name: "Login", callback: this.loginPressed },
                  {name: "Sign Up", callback: this.signupPressed }]}
              />
            </div>
        </div>
      );
  }
}

export default Homepage;
