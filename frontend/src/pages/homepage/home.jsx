import './home.css';
import InputForm from '../../components/input-form/input-form';
import axios from 'axios';
import React from 'react';
import { withRouter } from 'react-router-dom';
import firebase from '../../firebase'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

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
      username: curForm.state.user.username,
      password: curForm.state.user.password
    }
    const auth = getAuth(firebase.app)

    signInWithEmailAndPassword(auth, userData.username, userData.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      // Push feed page or add-listing page
      this.props.login(user)
      // This will always goto add-listing since firebase user is different structure. fix it later
      if(curForm.state.user.employee) {
        this.props.history.push('/feed');
      } else { 
        this.props.history.push('/add-listing');
      }
    })
    .catch((error) => {
      // Couldn't sign in, so show alert with error message
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
    });

    // axios.get(process.env.REACT_APP_BACKEND_URL + '/user', { params: { data: userData }}).then(r => {
      // const data = r.data;
      // if(data.success) {
        // this.props.login(data.user)
        // if(data.user.employee)
          // this.props.history.push('/feed');
        // else 
          // this.props.history.push('/add-listing');
      // } 
    // });
  };

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
