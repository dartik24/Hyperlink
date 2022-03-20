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

    static getDerivedStateFromProps = (nextProps) => {
        console.log('gdsfp', nextProps);
        return({
            user: nextProps.user
        });  
    }

    isEmployee = () => this.state.user && this.state.user.employee === 'employee';

    // TODO
    modifyPressed = () => { }
    deletePressed = () => { }

    render() {
        return(
            <div id='profile'>
            <h3>User Profile</h3>
            <InputForm
                inputs={this.isEmployee() ? this.employeeFields : this.employerFields}
                types={this.isEmployee() ? this.employeeTypes : this.employerTypes}
                values={this.state.user}
                buttons={[{ name: 'Modify Profile', callback: this.modifyPressed },
                            { name: 'Delete Account', callback: this.deletePressed }]}
                ref={this.form} 
            />
            </div>
        );
    }
}

export default Profile;