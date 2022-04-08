import './signup.css';
import React from 'react';
import { withRouter } from 'react-router-dom'

import InputForm from '../../components/input-form/input-form';
import { signup } from '../../firebase/fb-user-functions';

class Signup extends React.Component {
  constructor() {
    super();
    this.form = React.createRef();

    // Constants
    this.employerFields = ['name', 'email', 'password', 'company name'];
    this.employerTypes = ['text', 'text', 'password', 'text'];
    this.employeeFields = ['name', 'email', 'password', 'skills'];
    this.employeeTypes = ['text', 'text', 'password', 'text'];

    this.state = {
      selectedOption: 'employee',
    };
  }

  radioButtonPressed = (ev) => {
    this.setState({
      selectedOption: ev.target.value
    });
  };

  signupPressed = () => {
    // TODO: Form Validation
    let formValid = true;

    // Gets reference to form
    const curForm = this.form.current;
    const userData = {
      ...curForm.state.user,
      skills: curForm.state.user.skills.split(' '),
      employee: this.state.selectedOption === 'employee'
    };

    const signupData = {
      username: curForm.state.user.email,
      password: curForm.state.user.password
    }

    if(formValid) {
      signup(signupData, userData).then(() => {
        this.props.history.push('/');
      });
    }
  };

  isEmployee = () => this.state.selectedOption === 'employee';

  render() {
    const employee = this.isEmployee();
    const fields = employee ? this.employeeFields : this.employerFields;
    const types = employee ? this.employeeTypes : this.employerTypes;

    return (
      <div className="Signup">
        <h1 className="title"> Create a new account </h1>
        <ul>
          <label>
            <input
              type="radio"
              value="employee"
              checked={employee}
              onChange={this.radioButtonPressed}
            />
            Employee
          </label>
          <label>
            <input
              type="radio"
              value="employer"
              checked={!employee}
              onChange={this.radioButtonPressed}
            />
            Employer
          </label>
        </ul>
        <div>
          <InputForm
            inputs={fields}
            types={types}
            buttons={[{ name: 'Sign Up', callback: this.signupPressed }]}
            ref={this.form} 
            pageType={'SIGNUP'}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);
