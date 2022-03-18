import './signup.css';
import React from 'react';
import axios from 'axios';

import InputForm from '../../components/input-form/input-form';

class Signup extends React.Component {
  constructor() {
    super();
    this.form = React.createRef();
    this.state = {
      selectedOption: 'employee',
    };
  }

  radioButtonPressed = (ev) => {
    this.setState({
      selectedOption: ev.target.value,
    });
  };

  signupPressed = () => {
    // TODO: Form Validation
    let formValid = true;

    // Gets reference to form
    const curForm = this.form.current;
    const userData = {
      ...curForm.state,
      employee: this.state.selectedOption === 'employee'
    };
    console.log(userData);

    if(formValid) {
      axios.post('http://localhost:4201/user', { data: userData }).then(r => {
        console.log(r);
      });
    }
  };

  render() {
    // TODO: Style the radio buttons
    return (
      <div className="Signup">
        <h1 className="title"> Create a new account </h1>
        <ul>
          <label>
            <input
              type="radio"
              value="employee"
              checked={this.state.selectedOption === 'employee'}
              onChange={this.radioButtonPressed}
            />
            Employee
          </label>
          <label>
            <input
              type="radio"
              value="employer"
              checked={this.state.selectedOption === 'employer'}
              onChange={this.radioButtonPressed}
            />
            Employer
          </label>
        </ul>
        <div>
          <InputForm
            inputs={['name', 'username', 'password']}
            buttons={[{ name: 'Sign Up', callback: this.signupPressed }]}
            ref={this.form} 
          />
        </div>
      </div>
    );
  }
}

export default Signup;
