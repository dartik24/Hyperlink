import './slideout.css';
import React from 'react';

// TODO: There is padding at the top of the slider that I can't figure out how to get rid of
// Also the icon should probably reverse when the slider is open | This works - @Vrej
class SlideOut extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  render() {
    return (
      <div className="slider-container">
        <div
          id="slider-content"
          style={{ display: this.state.open ? 'revert' : 'none' }}
        >
          Content goes here
        </div>
        <i
          id="openClose"
          onClick={() => this.setState({ open: !this.state.open })}
          className={
            this.state.open ? 'bi bi-arrow-bar-left' : 'bi bi-arrow-bar-right'
          }
        ></i>
      </div>
    );
  }
}

export default SlideOut;
