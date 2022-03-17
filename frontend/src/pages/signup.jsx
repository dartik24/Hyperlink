import './signup.css';
import InputForm from '../components/input-form'
import React from 'react'

class Signup extends React.Component {
  constructor() { 
    super()
    this.state = {
      selectedOption: 'employee'
    }
  }

  radioButtonPressed = (ev) => { 
    this.setState({
      selectedOption: ev.target.value
    })
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
            <label>
              <input type='radio' value='employee' checked={this.state.selectedOption === 'employee'} onChange={this.radioButtonPressed}/>
              Employee
            </label>
            <label>
              <input type='radio' value='employer' checked={this.state.selectedOption === 'employer'}  onChange={this.radioButtonPressed}/>
              Employer
            </label>
            </ul>
            <div> 
              <InputForm 
                inputs={["name", "username", "password"]}
                buttons={[{name: "Sign Up", callback: this.signupPressed }]}/>
            </div>
        </div>
      );
  }
}

export default Signup;