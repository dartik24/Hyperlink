import React from 'react';
import InputForm from '../../components/input-form/input-form'

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.employerFields = ['name', 'username', 'password', 'company name'];
        this.employerTypes = ['text', 'text', 'password', 'text'];
        this.employeeFields = ['name', 'username', 'password', 'skills'];
        this.employeeTypes = ['text', 'text', 'password', 'text'];

        this.initialUser = this.props.user;

        // TODO retrieve users from app.js
        this.state = {
            user: this.initialUser || null
        };
    }

    isEmployee = () => this.state.user.employee === 'employee';

    // TODO
    modifyPressed = () => { }
    deletePressed = () => { }

    render() {
        const profile = () =>
            <>
                <h3>User Profile</h3>
                <InputForm
                    inputs={this.isEmployee() ? this.employeeFields : this.employerFields}
                    types={this.isEmployee() ? this.employeeTypes : this.employerTypes}
                    values={this.state.user}
                    buttons={[{ name: 'Modify Profile', callback: this.modifyPressed },
                                { name: 'Delete Account', callback: this.deletePressed }]}
                    ref={this.form} 
                />
            </>;
        
        const error = () => 
        <>
            <h3>
                You must be logged in to view this content
            </h3>
        </>

        return(
            <div id='profile'>
                {this.state.user !== null ? profile() : error()}
            </div>
        );
    }
}

export default Profile;