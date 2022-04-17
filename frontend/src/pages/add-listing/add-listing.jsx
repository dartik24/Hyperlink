import React from 'react';
import InputForm from '../../components/input-form/input-form';

import './add-listing.css'
import { addListing } from '../../services/fb-listing-functions';

class AddListing extends React.Component {
    constructor() {
        super();
        this.form = React.createRef();
        this.state = {
            clearInputForm: false
        }
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

        if(addListing(this.props.user, newListing)) {
            this.setState((prevState) => ({
                ...prevState,
                clearInputForm: true
            }))
        }
    }

    render() {
        return(
            <div id='add-listing-form'> 
                <h2> Add a listing </h2>
                <InputForm
                    clearInputForm = {this.state.clearInputForm}
                    id='add-listing-form' 
                    inputs={["Team", "Title", "Description", "Skills"]}
                    types={["text", "text", "textarea", "text"]}
                    buttons={[{ name: 'Add Listing', callback: this.submitPressed }]}
                    ref={this.form} 
                    pageType={'ADD-LISTING'}
                />
            </div>
            
        )
    }
}

export default AddListing;