import React from 'react';
import './profile-card.css';

class ProfileCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      employerView: false,
    };
  }

  render() {
    return (
      <div id="flex-container">
        <div id="container">
          <div id="background">
            <div className="row" id="img-carousel">
              Image Carousel goes here
            </div>

            <div className="row" id="about-me">
              <h1>About Me</h1>
              User data here
            </div>

            <div className="row" id="socials">
              <ul>
                <i className="bi bi-github"></i>
                <i className="bi bi-linkedin"></i>
                <i className="bi bi-file-person-fill"></i>
              </ul>
            </div>
          </div>
          <div id="footer" className="row">
            <ul>
              <i className="bi bi-hand-thumbs-up-fill"></i>
              <i className="bi bi-hand-thumbs-down-fill"></i>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileCard;
