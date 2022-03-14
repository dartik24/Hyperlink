import './slideout.css';
import React from 'react'


// TODO: There is padding at the top of the slider that I can't figure out how to get rid of
// Also the icon should probably reverse when the slider is open
class SlideOut extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
        }
    }
    
    render() {
        return(
            <div className="slider-container">
                <div id='slider-content' style={{display: this.state.open ? 'inline-block' : 'none'}}>
                    Put ye content he
                </div>
                <i 
                    onClick={() => this.setState({open: !this.state.open})} 
                    className="bi bi-arrow-bar-right"> 
                </i>
            </div>
        );
    }
}
 
export default SlideOut;
