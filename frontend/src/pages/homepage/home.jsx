import './home.css';
import InputForm from '../../components/input-form/input-form';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { login } from '../../firebase/fb-user-functions';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.form = React.createRef();
    this.state =  {
      firebaseError: ''
    }
  }

  handleChange = (event) => {
    const { id, value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  loginPressed = () => {
    const curForm = this.form.current;
    const userData = {
      username: curForm.state.user.email,
      password: curForm.state.user.password
    }

    login(userData).then(user => {
      if(user instanceof Array) { 
        this.setState((prevState) => ({
          ...prevState,
          firebaseError: 'Invalid login information'
        }))
      } else {
        this.props.login(user);
        this.props.history.push('/feed');
      }
    });
  };

  signupPressed = () => {
    this.props.history.push('/signup');
  };

  render() {
    return (
      <div className="Homepage">
        <h1 className="title"> Hyperlink </h1>
        <InputForm
          firebaseError={this.state.firebaseError}
          ref={this.form} 
          inputs={['email', 'password']}
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
