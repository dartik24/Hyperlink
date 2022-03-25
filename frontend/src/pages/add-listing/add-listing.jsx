import React from 'react';
import InputForm from '../../components/input-form/input-form';
import axios from 'axios';

import './add-listing.css'

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
            likes: []
        };

        if(!this.props.user.employee) {
            axios.post(process.env.REACT_APP_BACKEND_URL + '/listing', { data: newListing }).then(r => {
                if(r.data.success) {
                    console.log('request succeeded');
                }
            });
        }
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