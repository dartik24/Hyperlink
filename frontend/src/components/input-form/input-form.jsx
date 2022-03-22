import './input-form.css';
import React from 'react';

// Accepts props: Array<InputNames>
class InputForm extends React.Component {
  constructor(props) {
    super(props);

    // Handle optional placeholder prop
    this.placeholders = this.props.placeholders || this.props.inputs.map(el => el);

    // Setup the state to map each input to its current value
    const vals = this.props.values || {};
    let _state = {
      validPrimaryButton: false
    };
    for (const input of props.inputs) {
      _state[input] = vals[input] || '';
    }
    
    this.state = _state;
  }

  handleChange = (event) => {
    const { id, value } = event.target;

    this.setState({
      validPrimaryButton: true,
      [id]: value,
    }, () => {
      for(var i = 0; i < this.props.inputs.length; i++) {
        console.log(this.props.inputs[i]) //': ' + this.state[this.props.inputs[i]])
        if(this.state[this.props.inputs[i]] === '') {
          this.setState({ 
            validPrimaryButton: false
          })
          break
        }
      }      
    });

  };

  render() {
    // Creates markup for inputs
    const inputs = this.props.inputs.map((input, i) => (
      this.props.types[i] !== 'textarea' ?
      <input
        className="input"
        label={input}
        id={input}
        placeholder={this.placeholders[i]}
        key={input}
        value={this.state[input]}
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
        value={this.state[input]}
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

    var onSignUp = false
    if(this.props.buttons.length === 1) {
      onSignUp = true
    }

    // Creates markup for buttons
    const buttons = this.props.buttons.map((button) => (
      <button id={button.name} onClick={onclickGen(button.callback)} key={button.name} disabled={(onSignUp ? !(this.state.validPrimaryButton) : false) || (button.name === 'Login' ?  !(this.state.validPrimaryButton) : false)}>
        {button.name}
      </button>
    ));

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
