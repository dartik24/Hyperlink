import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import React from 'react';

class ModalEntry extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            image: null
        };
    }

    componentDidMount = () => {
        const storage = getStorage()
        const imageFolderRef = ref(storage, this.state.user.uid + '/profile_pic')
        getDownloadURL(imageFolderRef).then((downloadFileURL) => {
            this.setState({
                image: downloadFileURL
            });
        });
    }

    render() {
        const u = this.state.user;
        return (
            <div className='userData col' key={u.email}>
                <img src={this.state.image} alt="<profile-picture>" />
                <div className='userInfo'> 
                    <p>Name: {u.name}</p>
                    <p>Email: {u.email}</p>
                    <p>Skills: {u.skills.join(' ')}</p>
                    <p>Github: {u.github || "No link provided by employee"}</p>
                    <p>Linked In: {u.linked || "No link provided by employee"}</p>
                </div>
            </div>
        );
    }
}

export default ModalEntry;