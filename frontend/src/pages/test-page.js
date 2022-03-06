import './test-page.css';
import React from 'react'

class TestPage extends React.Component {
  constructor() {
    super();
    this.state = { }
  }

  render() {
      return (
        <div className="NotHomepage"> 
          Not the home page
        </div>
      );
  }
}

export default TestPage;
