import './input-form.css';
import React from 'react'

// Accepts props: Array<InputNames>
class InputForm extends React.Component {
  constructor(props) {
    super(props)
            
    // Setup the state to map each input to its current value
    let _state = {};
    for(const input of props.inputs) {
      _state[input] = ""
    }

    this.state = _state; 
  }

  handleChange = (event) => {
    const {id, value} = event.target;
    this.setState(prevState => ({
      ...prevState,
      [id]: value
    }));
  }

  // TODO: Make want to be able to emit the state to its parent component

  render() {
    const inputs = this.props.inputs.map(input => 
      <input
        className='input'
        label={input}
        id={input}
        placeholder={input}
        key={input}
        value={this.state[input]}
        onChange={this.handleChange}
      />
    );

    const buttons = this.props.buttons.map(button => 
      <button id={button.name} onClick={button.callback} key={button.name}>
        {button.name}
      </button>
    )

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
