import './feed.css';
import React from 'react';
import * as _ from 'lodash';
import ReactModal from 'react-modal';

import { getCollection } from '../../firebase/fb-generic';
import { modifyListing } from '../../firebase/fb-listing-functions';
import { getFromUID } from '../../firebase/fb-user-functions';

ReactModal.setAppElement('#root');
const modalStyles = {
  overlay: {
    backgroundColor: '#bab6c0'
  }
}

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      feeds: [],
      showAll: false,
      user: this.props.user,
      likeModal: null
    };
  }

  async componentDidMount() {
    this.setState({
      feeds: await getCollection('listings', (doc) => doc.dislikes.indexOf(this.props.user.uid) === -1),
      showAll: false,
      user: this.props.user
    });
  }

  filter = () => {
    if(this.state.showAll || !this.state.user.employer)
      return this.state.feeds;
    return this.state.feeds.filter(feed => _.intersection(feed.skills, this.state.user.skills).length);
  }

  toggle = () => {
    this.setState({
      showAll: !this.state.showAll
    });
  }

  dislike = async (feed) => {
    const user = this.state.user;

    if(user.employee) {
      const idx = this.state.feeds.indexOf(feed);

      // Allows for dislike & removal of dislike with same button
      if(feed.dislikes.indexOf(user.uid) === -1) {
        feed.dislikes.push(user.uid);
      } else {
        feed.dislikes = feed.likes.filter(id => id !== this.state.user.uid);
      }
  
      // Updates state with current feed, causing a re-render
      this.setState({
        ...this.state.feeds.slice(0, idx),
        feed,
        ...this.state.feeds.slice(idx + 1)
      });
      modifyListing(feed);
    }
  }

  like = (feed) => {
    const user = this.state.user;

    if(user.employee) {
      const idx = this.state.feeds.indexOf(feed);

      // Allows for like & removal of like with same button
      if(feed.likes.indexOf(user.uid) === -1) {
        feed.likes.push(user.uid);
      } else {
        feed.likes = feed.likes.filter(id => id !== this.state.user.uid);
      }

      // Updates state with current feed, causing a re-render
      this.setState({
        ...this.state.feeds.slice(0, idx),
        feed,
        ...this.state.feeds.slice(idx + 1)
      });
      modifyListing(feed);
    } else {
      const uids = feed.likes;
      let users = []
      uids.forEach(uid => {
        getFromUID(uid).then(data => {
          if(data)
            users.push(data);
        }).then(() => {
          if(users.length) {
            console.log(users);
            this.setState({likeModal: users});
          }
        });
      });
    }
  }

  render() {
    const toDisplay = this.filter(this.state.feeds);
    
    const feed = toDisplay.map((f) => {
      let likeClasses = "bi bi-hand-thumbs-up-fill";
      if(f.likes.indexOf(this.state.user.uid) !== -1) {
        likeClasses += " liked";
      }

      let dislikeClasses = "bi bi-hand-thumbs-down-fill";
      if(f.dislikes.indexOf(this.state.user.uid) !== -1) {
        dislikeClasses += " disliked";
      }

      return (
        <div className="entry" key={f.desc}>
          <h4> 
            <i className={dislikeClasses} onClick={() => this.dislike(f)} hidden={!this.state.user.employee}></i>
            {f.name} 
            <i className={likeClasses} onClick={() => this.like(f)}><p>{f.likes.length}</p></i>
          </h4>
          <div className="image-container">
            <p> {f.desc} </p>
            <hr/>
            <ul id='skills'><h5>Skills: </h5> {
              f.skills.map(skill => skill ? <li key={skill}>{skill}</li> : <></>)  
            }</ul>
          </div>
        </div>
    )});

    const userData = () => {
      const users = this.state.likeModal;
      return users.map(u => 
        <div className='userData' key={u.email}>
          <p>Name: {u.name}</p>
          <p>Email: {u.email}</p>
          <p>Skills: {u.skills.join(' ')}</p>
        </div>
      );
    } 

    return (
      <div id="feed-container">
        <h1 className="title"> Hyperlink </h1>
        <div hidden = {!this.state.user.employee}>
          <label> <input type="radio" value="showAll" checked={this.state.showAll} onChange={this.toggle} /> Show All? </label>
          <label> <input type="radio" value="showMine" checked={!this.state.showAll} onChange={this.toggle} /> Show Related? </label>
        </div >  
        {feed}

        <ReactModal 
          isOpen={this.state.likeModal !== null} 
          parentSelector={() => document.querySelector('#root')} 
          style={modalStyles}>
            <i className="bi bi-x-lg" onClick={() => this.setState({likeModal: null})}></i>
            {this.state.likeModal ? userData() : <> </>}
        </ReactModal>
      </div>
    );
  }
}

export default Feed;
