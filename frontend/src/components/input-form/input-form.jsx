import './input-form.css';
import React from 'react';

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
      user: user
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

  render() {
    // Handle optional placeholder prop
    this.placeholders = this.props.placeholders || this.props.inputs.map(el => el);

    // Creates markup for inputs
    const inputs = this.props.inputs.map((input, i) => (
      this.props.types[i] !== 'textarea' ?
      <input autoFocus={i === 0}
        className="input"
        label={input}
        id={input}
        placeholder={this.placeholders[i]}
        key={input}
        value={this.state.user[input]}
        onChange={this.handleChange}
        type={this.props.types[i]}
      />
      : // Allows for creation of multiline text field
      <textarea
        className="input"
        label={input}
        id={input}
        placeholder={input}
        key={input}
        value={this.state.user[input]}
        onChange={this.handleChange}> 
      </textarea>
    ));

    // Function generator that generates onclick functions given a callback
    const onclickGen = (f) => {
      return function(e) {
        e.preventDefault();
        f();
      }
    }

    let onSignUp = false
    if(this.props.buttons.length === 1) {
      onSignUp = true
    }

    // Creates markup for buttons
    const buttons = this.props.buttons.map((button) => {
      const disabled =  false; // (onSignUp ? !(this.state.validPrimaryButton) : false) || (button.name === 'Login' ?  !(this.state.validPrimaryButton) : false);
      
      return(
        <button id={button.name} onClick={onclickGen(button.callback)} key={button.name} disabled={disabled}>
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
