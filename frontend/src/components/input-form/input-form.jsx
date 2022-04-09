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
      inputErrors: {},// dictionary to store errors
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
    let noErrors = true
    let errMessage = ''

    for (const inp of this.props.inputs) {
      let inpValue = this.state.user[inp]
      if(inpValue === undefined) {
        inpValue = ''
      }
      switch(inp){ 
        case 'email': 
          // Regex source: https://stackoverflow.com/questions/39356826/how-to-check-if-it-a-text-input-has-a-valid-email-format-in-reactjs
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
          if(inpValue.length <= 0){ 
            errMessage = 'Company name cannot be blank'
            noErrors = false
          } else {
            errMessage = ''
          }
          this.updateErrorState('company name', errMessage)
          break;

        case 'skills':
          if(inpValue.length <= 0){
            errMessage = 'Skills cannot be blank'
            noErrors = false
          } else { 
            errMessage = ''
          }
          this.updateErrorState('skills', errMessage)
          break;

        case 'Title':
         if(inpValue.length <= 0){
           errMessage = 'Title cannot be blank'
           noErrors = false
         } else { 
           errMessage = ''
         }
         this.updateErrorState('Title', errMessage)
         break;

        case 'Team':
         if(inpValue.length <= 0){
           errMessage = 'Team name cannot be blank'
           noErrors = false
         } else { 
           errMessage = ''
         }
         this.updateErrorState('Team', errMessage)
         break;

        case 'Description':
         if(inpValue.length <= 0){
          errMessage = 'Description cannot be blank'
          noErrors = false
         } else if(inpValue.length < 50) {
          errMessage = 'Description must be more than 50 words'
        } else { 
           errMessage = ''
         }
         this.updateErrorState('Description', errMessage)
         break;

        case 'Skills':
         if(inpValue.length <= 0){
           errMessage = 'Skills cannot be empty'
           noErrors = false
         } else { 
           errMessage = ''
         }
         this.updateErrorState('Skills', errMessage)
         break;

        default:
          break;
      }
    }
    return noErrors
  }

  updateErrorState = (inputType, message) => {
    let newInputErrors = this.state.inputErrors // use to append
    newInputErrors[inputType] = message
    this.setState((prevState) => ({
    ...prevState,
    inputErrors: newInputErrors
    }))
  }

  render() {
    // Handle optional placeholder prop
    this.placeholders = this.props.placeholders || this.props.inputs.map((el) => el.charAt(0).toUpperCase() + el.slice(1));

    // Creates markup for inputs
    const inputs = this.props.inputs.map((input, i) => (
      this.props.types[i] !== 'textarea' ?
      <div key={Math.random()}>
        <input autoFocus={i === 0}
          className="input"
          label={input}
          id={input}
          placeholder={this.placeholders[i]}
          key={input}
          disabled = {(input === 'email' && this.state.pageType === 'PROFILE')}
          value={this.props.clearInputForm ? '' : this.state.user[input]}
          onChange={this.handleChange}
          type={this.props.types[i]}
        />
        {/* Disable error lable if error is empty or key for input doesn't exist in dictionary */}
        <label  key={Math.random()} className="inputError" hidden={this.state.inputErrors[input] === '' || !this.state.inputErrors.hasOwnProperty(input)}>
          {this.state.inputErrors[input]}
        </label>     
      </div>
      : // Allows for creation of multiline text field
      <div  key={Math.random()}>
        <textarea
          className="input"
          label={input}
          id={input}
          placeholder={input}
          key={input}
          value={this.props.clearInputForm ? '' : this.state.user[input]}
          onChange={this.handleChange}> 
        </textarea>
        <label key={Math.random()} className="inputError" hidden={this.state.inputErrors[input] === '' || !this.state.inputErrors.hasOwnProperty(input)} >
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
        if(buttonName === 'Login' || buttonName === 'Modify Profile' || (buttonName === 'Sign Up' && pgType === 'SIGNUP') || (pgType === 'ADD-LISTING')) { 
          if(self.validateForm()) {
            f();
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
