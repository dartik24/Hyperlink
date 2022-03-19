import './home.css';
import InputForm from '../../components/input-form/input-form';
import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();

  }

  handleChange = (event) => {
    const { id, value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // TODO: Should make a call to our backend that validates that the user exists in our database
  // Should login them in if successful, should display errors otherwise
  loginPressed = () => {
    const curForm = this.form.current;
    const userData = {
      username: curForm.state.username,
      password: curForm.state.password
    }
    console.log(userData);
    axios.get('http://localhost:4201/user', { params: { data: userData }}).then(r => {
      const data = r.data;
      if(data.success) {
        this.props.history.push('/feed');
      } 
    });
  };

  // TODO: Should re-route user to signup component
  signupPressed = () => {
    this.props.history.push('/signup');
  };

  render() {
    return (
      <div className="Homepage">
        <h1 className="title"> Hyperlink </h1>
        <InputForm
          ref={this.form} 
          inputs={['username', 'password']}
          types={['text', 'password']}
          buttons={[
            { name: 'Login', callback: this.loginPressed },
            { name: 'Sign Up', callback: this.signupPressed },
          ]}
        />
      </div>
    );
  }
}

export default withRouter(Home);
