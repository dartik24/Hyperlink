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
		// <img src={this.state.image} alt="<profile-picture>" /> /* BUG: Doesn't display picture! */
        return (
            <div className='userData col' key={u.email}>
                <div className='userInfo'> 
                    <p><b>Name:      </b> {u.name}</p>
                    <p><b>Email:      </b> {u.email}</p>
                    <p><b>Skills:      </b> {u.skills.join(' ')}</p>
                    <p><b>Github:    </b> {u.github || "No link provided by the employee."}</p>
                    <p><b>LinkedIn: </b> {u.linked || "No link provided by the employee."}</p>
                </div>
            </div>
        );
    }
}

export default ModalEntry;