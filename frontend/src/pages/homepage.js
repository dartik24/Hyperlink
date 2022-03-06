import './homepage.css';
import React from 'react'

class Homepage extends React.Component {
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
    console.log(id, value);
    this.setState(prevState => ({
      ...prevState,
      [id]: value
    }));
  }

  render() {
    const { username, password, type } = this.state;

      return (
        <div className="Homepage"> 
          <h1 className = "title" > Hyperlink </h1>
          <form> 
            <div> 
              <input
                className='input'
                label="Username"
                id="username"
                placeholder="Username"
                value={username}
                onChange={this.handleChange}
              />

              <input
                className='input'
                type={type}
                label="Password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={this.handleChange}
              />

              <button type="submit" id ='login' className="btn btn-primary">
                    Login
              </button>

              <button type="submit" id ='signup' className="btn btn-primary">
                    Sign up
              </button>
            </div>
          </form>
        </div>
      );
  }
}

export default Homepage;
