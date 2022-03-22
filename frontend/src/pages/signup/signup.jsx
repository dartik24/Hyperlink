import './signup.css';
import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

import InputForm from '../../components/input-form/input-form';

class Signup extends React.Component {
  constructor() {
    super();
    this.form = React.createRef();
    this.employerFields = ['name', 'username', 'password', 'company name'];
    this.employerTypes = ['text', 'text', 'password', 'text'];
    this.employeeFields = ['name', 'username', 'password', 'skills'];
    this.employeeTypes = ['text', 'text', 'password', 'text'];
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
      skills: curForm.state.skills.split(' '),
      employee: this.state.selectedOption === 'employee'
    };
    //console.log(userData);

    if(formValid) {
      axios.post('http://localhost:4201/user', { data: userData }).then(r => {
        if(r.data.success) {
          this.props.history.push('/'); // Back to login
        }
      });
    }
  };

  isEmployee() {
    return this.state.selectedOption === 'employee';
  }

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
              checked={this.isEmployee()}
              onChange={this.radioButtonPressed}
            />
            Employee
          </label>
          <label>
            <input
              type="radio"
              value="employer"
              checked={!this.isEmployee()}
              onChange={this.radioButtonPressed}
            />
            Employer
          </label>
        </ul>
        <div>
          <InputForm
            inputs={this.isEmployee() ? this.employeeFields : this.employerFields}
            types={this.isEmployee() ? this.employeeTypes : this.employerTypes}
            buttons={[{ name: 'Sign Up', callback: this.signupPressed }]}
            ref={this.form} 
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);
