import React from 'react';
import './iframe-card.css';

class IFrameCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            url: this.props.url
        };
    }

    setURL(url) {
        this.setState({
            url: url
        })
    }

    render() {
        return(
            <div id="iframe-flex-container">
                <div id="iframe-container">
                    <>why no iframe</>
                </div>
            </div>
        );
    }
}

export default IFrameCard;