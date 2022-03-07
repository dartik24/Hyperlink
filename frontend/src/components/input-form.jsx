import './input-form.css';
import React from 'react'

// Accepts props: Array<InputNames>
class InputForm extends React.Component {
  constructor() {
    super();
    
    this.state = {
      username: "",
      password: "",
      type: "password"
    }
  }

  handleChange = (event) => {
    const {id, value} = event.target;
    this.setState(prevState => ({
      ...prevState,
      [id]: value
    }));
  }

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
          <div> 
              <ul> {inputs} </ul>
              <ul> {buttons} </ul> 
          </div>
        </form>
    </div>
    );
  }
}

export default InputForm;
