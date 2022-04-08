import './input-form.css';
import React from 'react';
import isURL from 'validator/lib/isURL';


// Accepts props: Array<InputNames>
class InputForm extends React.Component {
  constructor(props) {
    super(props);

    // Setup the state to map each input to its current value
    const vals = this.props.values || {};
    
    let user = { };
    for (const input of props.inputs) {
      user[input] = vals[input] || '';

    }
    this.state ={
      validPrimaryButton: false,
      user: user,
      pageType: this.props.pageType,
      inputErrors: {'password':''}
    };
  }

  handleChange = (event) => {
    const { id, value } = event.target;
    let validButton = true;

    this.props.inputs.forEach(input => {
      if(this.state.user[input] === '') {
        validButton = false;
      }
    });

    this.setState(prevState => ({
      validPrimaryButton: validButton,
      user: {
        ...prevState.user,
        [id]: value
      }
    }));
  };

  validateForm = () => {
    var noErrors = true
    var errMessage = ''

    for (const inp of this.props.inputs) {
      const inpValue = this.state.user[inp]
      
      switch(inp){ 
        case 'email': 
          let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if(inpValue.length <= 0) { // no email typed
            errMessage = 'Email cannot be blank'
            noErrors = false
          } else if (!re.test(inpValue) ) {  // invalid email, maybe show an error to the user.
            errMessage = 'Invalid email format'
            noErrors = false
          } else { 
            errMessage = ''
          }
          this.updateErrorState('email', errMessage)
        break;
       
        case 'password':
          if(inpValue.length <= 0) { // no password typed
            errMessage = 'Password cannot be blank'
            noErrors = false
          } else if(inpValue.length < 6) { // password too short
            errMessage = 'Password must be more than 6 character'
            noErrors = false
          } else {
            errMessage = ''
          }
          this.updateErrorState('password', errMessage)
        break;

        case 'github':
          if(!isURL(inpValue) && inpValue.length > 0) {
            errMessage = 'Invalid github URL'
            noErrors = false
          } else { 
            errMessage = ''
          }     
          
          this.updateErrorState('github', errMessage)
        break;

        case 'linkedin':
          if(!isURL(inpValue) && inpValue.length > 0) {
            errMessage = 'Invalid linkedin URL'
            noErrors = false
          } else { 
            errMessage = ''
          }
          this.updateErrorState('linkedin', errMessage)
        break;

        case 'name':
          if(inpValue.length <= 0) { 
            errMessage = 'Name cannot be blank'
            noErrors = false
          } else { 
            errMessage = ''
          }
          this.updateErrorState('name', errMessage)
          break;

        case 'company name':
          if(inpValue <= 0){ 
            errMessage = 'Company name cannot be blank'
            noErrors = false
          } else {
            errMessage = ''
          }
          this.updateErrorState('company name', errMessage)
          break;

        case 'skills':
          if(inpValue <= 0){
            errMessage = 'Skills cannot be blank'
            noErrors = false
          } else { 
            errMessage = ''
          }
          this.updateErrorState('skills', errMessage)
          break;

        default:
          break;
      }
    }
    return noErrors
  }

  updateErrorState = (inputType, message) => {
    var newInputErrors = this.state.inputErrors // use to append
    newInputErrors[inputType] = message
    this.setState((prevState) => ({
    ...prevState,
    inputErrors: newInputErrors
    }))
  }

  render() {
    // Handle optional placeholder prop
    this.placeholders = this.props.placeholders || this.props.inputs.map(el => el);

    // Creates markup for inputs
    const inputs = this.props.inputs.map((input, i) => (
      this.props.types[i] !== 'textarea' ?
      <div>
        <input autoFocus={i === 0}
          className="input"
          label={input}
          id={input}
          placeholder={this.placeholders[i]}
          key={input}
          disabled = {(input === 'Email' && this.state.pageType === 'PROFILE')}
          value={this.state.user[input]}
          onChange={this.handleChange}
          type={this.props.types[i]}
        />
        {/* Disable error lable if error is empty or key for input doesn't exist in dictionary */}
        <label className="inputError" hidden={this.state.inputErrors[input] === '' || !this.state.inputErrors.hasOwnProperty(input)}>
          {this.state.inputErrors[input]}
        </label>     
      </div>
      : // Allows for creation of multiline text field
      <div>
        <textarea
          className="input"
          label={input}
          id={input}
          placeholder={input}
          key={input}
          value={this.state.user[input]}
          onChange={this.handleChange}> 
        </textarea>
        <label className="inputError" hidden={this.state.inputErrors[input] === '' || !this.state.inputErrors.hasOwnProperty(input)} >
          {this.state.inputErrors[input]}
        </label>     
      </div>
    ));

    // Function generator that generates onclick functions given a callback
    const onclickGen = (f, buttonName) => {
      const self = this
      const pgType = this.state.pageType
  
      return function(e) {
        e.preventDefault();
        if(buttonName === 'Login' || buttonName === 'Modify Profile' || (buttonName === 'Sign Up' && pgType === 'SIGNUP')) { 
          console.log('validate form')
          if(self.validateForm()) {
            console.log('valid entries')
            f();
          } else {
            console.log('invalid entries')
          }
        } else {
          f();
        }
      }
    }
    
    // Creates markup for buttons
    const buttons = this.props.buttons.map((button) => {
      const disabled =  false;
      
      return(
        <button id={button.name} onClick={onclickGen(button.callback, button.name)} key={button.name} disabled={disabled}>
          {button.name}
        </button>
      );
    });

    return (
      <div className="InputForm">
        <form>
          <ul> {inputs} </ul>
          <ul> {buttons} </ul>
        </form>
      </div>
    );
  }
}

export default InputForm;
