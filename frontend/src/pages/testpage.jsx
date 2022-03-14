import './testpage.css';
import React from 'react'

import BigCard from '../components/big-card.jsx'

class TestPage extends React.Component {
  render() {
      return (
        <div id="content">
            <BigCard />
        </div>
      );
  }
}

export default TestPage;
