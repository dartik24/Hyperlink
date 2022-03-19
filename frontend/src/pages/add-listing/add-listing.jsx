import React from 'react';
import InputForm from '../../components/input-form/input-form';

import './add-listing.css'

class AddListing extends React.Component {
    constructor() {
        super();
        this.form = React.createRef();

    }

    signupPressed() {
        const form = this.form.current;
    }

    render() {
        return(
            <div id='add-listing-form'> 
                <h2> Add a listing </h2>
                <InputForm
                    id='add-listing-form' 
                    inputs={["Team Name", "Title", "Description", "Skills"]}
                    types={["text", "text", "textarea", "text"]}
                    buttons={[{ name: 'Add Listing', callback: this.signupPressed }]}
                    ref={this.form} 
                />
            </div>
            
        )
    }
}

export default AddListing;