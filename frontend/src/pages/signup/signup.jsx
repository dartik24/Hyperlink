import './signup.css';
import React from 'react';
import { withRouter } from 'react-router-dom'

import InputForm from '../../components/input-form/input-form';
import { signup } from '../../services/fb-user-functions';
import { parseSkills } from '../../services/helper';

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
      firebaseError: ''
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
      skills: parseSkills(curForm.state.user.skills),
      employee: this.state.selectedOption === 'employee'
    };
    delete(userData['password'])
    
    const signupData = {
      username: curForm.state.user.email,
      password: curForm.state.user.password
    }

    if(formValid) {
      signup(signupData, userData).then(response => {
        if(response.error) {
          this.setState((prevState) => ({
            ...prevState,
            firebaseError: 'Account already exists'
          }))
        } else { 
          this.props.history.push('/');
        }
      })
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
        <ul id="radioSelector">
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
            firebaseError={this.state.firebaseError}
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
