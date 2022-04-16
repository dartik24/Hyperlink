import './forgot-password.css'
import InputForm from '../../components/input-form/input-form';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

class ForgotPassword extends React.Component { 

    constructor(props) { 
        super(props)
        this.form = React.createRef()
        this.state = { 
            statusLabel: ''
        }
    }

    goToLogin = () => {
        // send user back to home page
        this.props.history.push('/');
    }

    sendResetLink = () => { 
        const auth = getAuth();
        const email = this.form.current.state.user.email
        sendPasswordResetEmail(auth, email)
          .then(() => {
            this.setState({ 
                statusLabel: 'A password reset link has been sent to ' + email
            })
          })
          .catch((error) => {

            this.setState({ 
                statusLabel: 'Could not find an account with the given email'
            })
          });
    }

    render() {
        return (
          <div className="resetPage">
            <button id='backButton' onClick={this.goToLogin}> Back </button>
            <h1> Forgot password? </h1>
            <h6> Enter the email associated with your account and we will send you a password reset link</h6>
            <label id='status' hidden={this.state.statusLabel === ''}> {this.state.statusLabel} </label>
            <InputForm
              ref={this.form}
              inputs={['email']}
              types={['text']}
              buttons={[
                { name: 'Reset', callback: this.sendResetLink },
              ]}
              pageType={'FORGOT-PASSWORD'}
            />
          </div>
        );
      }
}
export default withRouter(ForgotPassword);
