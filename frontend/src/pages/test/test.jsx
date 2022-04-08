import './test.css';
import React from 'react';

import ProfileCard from '../../components/profile-card/profile-card';

class Test extends React.Component {
  render() {
    return (
      <div id="test-content" className='row'>
        <div className='col'> <ProfileCard /> </div>
      </div>
    );
  }
}

export default Test;
