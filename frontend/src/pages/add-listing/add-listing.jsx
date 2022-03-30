import React from 'react';
import InputForm from '../../components/input-form/input-form';
import axios from 'axios';

import './add-listing.css'
import { addListing } from '../../firebase/fb-listing-functions';

class AddListing extends React.Component {
    constructor() {
        super();
        this.form = React.createRef();
    }

    submitPressed = () => {
        const form = this.form.current;
        const newListing = {
            name: form.state.user.Title,
            desc: form.state.user.Description,
            skills: form.state.user.Skills.split(' '),
            likes: [],
            dislikes:[],
            employerID: this.props.user.uid
        };

        addListing(this.props.user, newListing);
    }

    render() {
        return(
            <div id='add-listing-form'> 
                <h2> Add a listing </h2>
                <InputForm
                    id='add-listing-form' 
                    inputs={["Team", "Title", "Description", "Skills"]}
                    types={["text", "text", "textarea", "text"]}
                    buttons={[{ name: 'Add Listing', callback: this.submitPressed }]}
                    ref={this.form} 
                />
            </div>
            
        )
    }
}

export default AddListing;