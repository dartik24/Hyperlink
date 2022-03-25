import React, { createRef } from 'react';
import InputForm from '../../components/input-form/input-form'
import axios from 'axios'

class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.employerFields = ['name', 'username', 'password', 'company name'];
        this.employerTypes = ['text', 'text', 'password', 'text'];
        this.employeeFields = ['name', 'username', 'password', 'skills', 'aboutme'];
        this.employeeTypes = ['text', 'text', 'password', 'text', 'textarea'];

        this.form = createRef();
        this.state = {
            user: this.props.user || null
        };
    }

    static getDerivedStateFromProps = (nextProps) => {
        return({
            user: nextProps.user
        });  
    }

    isEmployee = () => this.state.user.employee;

    modifyPressed = () => { 
        const form = this.form.current;
        const oldUser = this.state.user;
        console.log(form.state.user.skills);
        const newUser = {
            ...oldUser,
            ...form.state.user,
            skills: form.state.user.skills.split(' ')
        };

        console.log(newUser);

        axios.put(process.env.REACT_APP_BACKEND_URL + '/user', {old: oldUser, new: newUser}).then(res => {
            this.props.login(res.data.user || {});
        });
    }
    
    deletePressed = () => { 
        const user = this.state.user;

        axios.delete(process.env.REACT_APP_BACKEND_URL + '/user', {data: {user: user}}).then(res => {
            this.props.login(null);
        });
    }

    render() {
        console.log(this.state.user);
        const user = {
            ...this.state.user,
            skills: this.state.user.skills.join(' ')
        };
        return(
            <div id='profile'>
            <h3>User Profile</h3>
            <InputForm
                inputs={this.isEmployee() ? this.employeeFields : this.employerFields}
                types={this.isEmployee() ? this.employeeTypes : this.employerTypes}
                values={user}
                buttons={[{ name: 'Modify Profile', callback: this.modifyPressed },
                            { name: 'Delete Account', callback: this.deletePressed }]}
                ref={this.form} 
            />
            </div>
        );
    }
}

export default Profile;