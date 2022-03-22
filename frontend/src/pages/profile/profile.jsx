import React, { createRef } from 'react';
import InputForm from '../../components/input-form/input-form'
import axios from 'axios'

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.employerFields = ['name', 'username', 'password', 'company name'];
        this.employerTypes = ['text', 'text', 'password', 'text'];
        this.employeeFields = ['name', 'username', 'password', 'skills'];
        this.employeeTypes = ['text', 'text', 'password', 'text'];

        this.initialUser = this.props.user;

        this.form = createRef()
        this.state = {
            user: this.initialUser || null
        };
    }

    static getDerivedStateFromProps = (nextProps) => {
        return({
            user: nextProps.user
        });  
    }

    isEmployee = () => this.state.user.employee;

    // TODO
    modifyPressed = () => { 
        const form = this.form;
        const oldUser = this.state.user;
        const newUser = {
            ...oldUser,
            ...form.current.state.user
        };

        axios.put('http://localhost:4201/user', {old: oldUser, new: newUser}).then(res => {
            this.props.login(res.data.user || {})
        });
    }
    deletePressed = () => { 
        const user = this.state.user;

        axios.delete('http://localhost:4201/user', {data: {user: user}}).then(res => {
            this.props.login(null);
        });
    }

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