import React, { createRef } from 'react';
import { delUser, modifyUser, uploadFileToStorage } from '../../services/fb-user-functions';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { withRouter } from 'react-router-dom';

import InputForm from '../../components/input-form/input-form';
import './profile.css';
import { parseSkills } from '../../services/helper';

class Profile extends React.Component {
	constructor(props) {
		super(props);

		this.employerFields = ['name', 'email', 'company name'];
		this.employerTypes = ['text', 'text', 'text'];
		this.employeeFields = ['name', 'email', 'skills', 'about me', 'github', 'linkedin'];
		this.employeeTypes = ['text', 'text', 'text', 'textarea', 'text', 'text'];

		this.form = createRef();
		this.state = {
			user: this.props.user || null,
			imageURL: null,
			imageFile: null,
			loading: true,
			modifyError: '',
			modifying: false,
			finishModify: false
		};
	}

	componentDidMount() {
		const storage = getStorage()
		const imageFolderRef = ref(storage, this.state.user.uid + '/profile_pic')
		getDownloadURL(imageFolderRef)
			.then((downloadFileURL) => {
				this.setState({
					imageURL: downloadFileURL
				});
			})
			.catch(() => {
				this.setState({
					imageURL: 'https://firebasestorage.googleapis.com/v0/b/hyperlink-5987b.appspot.com/o/Hyperlink%2FDefault_Profile_Pic.jpeg?alt=media&token=7189e8c5-07e0-45fe-a185-17ae79112bde'
				});
			})
			.finally(() => {
				this.setState({
					loading: false
				})
			});
	}

	static getDerivedStateFromProps = (nextProps) => {
		return ({
			user: nextProps.user
		});
	}

	isEmployee = () => this.state.user.employee;

	modifyPressed = () => {
		const form = this.form.current;
		const oldUser = this.state.user;

		let newUser = {};

		const skills = parseSkills(form.state.user.skills);

		if (this.isEmployee()) {
			newUser = {
				...oldUser,
				...form.state.user,
				skills: skills
			};
		} else {
			newUser = {
				...oldUser,
				...form.state.user,
			};
		}

		// update user document 
		this.setState((prevState) => ({
			...prevState,
			modifying: true,
			finishModify: false
		}))
		modifyUser(this.state.user, newUser).then((success) => {
			if (success) {
				this.setState((prevState) => ({
					...prevState,
					modifying: false,
					finishModify: true
				}))
				this.props.login(newUser || {})
			}
		})
	}

	// Deletes the user and re-routes to home page
	deletePressed = () => {
		delUser();
		this.props.login(null);
		this.props.history.push('/');
	}

	// Upload photo. Only change privew of photo if success uploading.
	handleUploadImage = (event) => {
		uploadFileToStorage(this.state.user, event.target.files[0], 'profile_pic').then((success) => {
			if (success) {
				this.setState({
					imageURL: URL.createObjectURL(event.target.files[0]),
					imageFile: event.target.files[0],
					modifyError: 'Success uploading profile picture'
				})
			} else {
				this.setState((prevState) => ({
					...prevState,
					modifyError: 'Error uploading profile picture'
				}))
			}
		})
	}

	handleUploadResume = (event) => {
		uploadFileToStorage(this.state.user, event.target.files[0], 'resume').then((success) => {
			if (success) {
				this.setState((prevState) => ({
					...prevState,
					modifyError: 'Success uploading resume'
				}))
			} else {
				this.setState((prevState) => ({
					...prevState,
					modifyError: 'Error uploading resume'
				}))
			}
		})
	}

	openTab = (url) => {
		const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
		if (newWindow)
			newWindow.opener = null;
	}


	downloadResume = () => {
		const storage = getStorage()
		const imageFolderRef = ref(storage, this.state.user.uid + '/resume')

		getDownloadURL(imageFolderRef).then((downloadFileURL) => {
			this.openTab(downloadFileURL)
		}).catch((error) => {
			this.setState((prevState) => ({
				...prevState,
				modifyError: 'No resume on file'
			}))
		})
	}

	render() {
		const user = {
			...this.state.user,
			skills: this.state.user.skills.join(' ')
		};
		return (
			<>
				<h1 className="title"> Hyperlink </h1>
				<div id='profile'>
					<h3>User Profile</h3>
					<label id='modifyProfile' hidden={this.state.modifyError === ''}> {this.state.modifyError} </label>
					<h6>{this.state.user.name}</h6>
					<div id='profileImageDiv'>
						<input name='title' id='uploadInput' type='file' onChange={this.handleUploadImage} />
						{
							this.state.loading ?
								<h2 className="loading"> Loading... </h2> :
								<img id='profileImage' src={this.state.imageURL} alt={this.state.imageURL} />
						}
					</div>

					<div id='resumeDiv' hidden={!this.isEmployee()}>
						<h6>Resume</h6>
						<input id='resUpload' type='file' accept='' onChange={this.handleUploadResume}></input>
						<button id='downloadResume' onClick={this.downloadResume}> Open resume</button>
					</div>

					<InputForm
						pageType={'PROFILE'}
						inputs={this.isEmployee() ? this.employeeFields : this.employerFields}
						types={this.isEmployee() ? this.employeeTypes : this.employerTypes}
						values={user}
						buttons={[{ name: 'Modify Profile', callback: this.modifyPressed },
						{ name: 'Delete Account', callback: this.deletePressed }]}
						ref={this.form}
					/>
					<label id='modifyProfile' hidden={this.state.modifying === false && this.state.finishModify === false}> {this.state.finishModify === true ? "Profile updated" : "Updating profile..."} </label>

				</div>
			</>
		);
	}
}

export default withRouter(Profile);