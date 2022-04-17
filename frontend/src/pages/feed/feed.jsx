import './feed.css';
import React from 'react';
import * as _ from 'lodash';
import ReactModal from 'react-modal';

import { deleteDocument, getCollection } from '../../services/fb-generic';
import { modifyListing } from '../../services/fb-listing-functions';
import { getFromUID } from '../../services/fb-user-functions';
import ModalEntry from './modal-entry';

ReactModal.setAppElement('#root');
const modalStyles = {
  overlay: {
    backgroundColor: '#bab6c0'
  }
}

class Feed extends React.Component {
  constructor(props) {
    super(props);
    
    this.employeeFilter = (doc) => doc.dislikes.indexOf(this.props.user.uid) === -1;
    this.employerFilter = (doc) => doc.employerID === this.props.user.uid;
    this._filter = this.props.user.employee ? this.employeeFilter : this.employerFilter;

    this.state = { 
      feeds: [],
      showAll: false,
      user: this.props.user,
      likeModal: null,
      loading: true,
      imageURL: null,
      deleteClicked: false
    };
  }

  async componentDidMount() {
    this.setState({
      feeds: await getCollection('listings', this._filter),
      showAll: false,
      user: this.props.user
    }, () => {
      this.setState({
        loading: false
      })
    });
  }

  filter = () => {
    if(this.state.showAll || !this.state.user.employee)
      return this.state.feeds;
    return this.state.feeds.filter(feed => _.intersection(feed.skills, this.state.user.skills).length);
  }

  toggle = () => {
    this.setState({
      showAll: !this.state.showAll
    });
  }

  dislike = async (feed, event) => {
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
    } else {
      if(event.target.className.split(' ').indexOf("confirmDelete") !== -1) {
        const feedID = feed.employerID + '-' + feed.name;
        const success = deleteDocument('listings', feedID);

        // Remove locally
        if(success) {
          this.setState({
            feeds: this.state.feeds.filter(f => !_.isEqual(f, feed))
          });
        }
      } else {
        event.target.className += " confirmDelete"
      }
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
            this.setState({likeModal: users});
          }
        });
      });
    }
  }

  isMatch = (skill) =>  _.intersection([skill], this.state.user.skills).length;

  render() {
    const toDisplay = this.filter(this.state.feeds);

    const emptyFeed = () => 
      <div id='emptyMsg'>
        {this.state.user.employee ? 
          <div> <h4> No listings match your skills!</h4> <h6> Try viewing all listings instead. </h6> </div> 
          : 
          <div> <h4> You haven't published any listings! </h4> <h6> Go to the "Add Listing" tab to create one. </h6> </div>
        } 
      </div>

    let feed = toDisplay.map((f) => {
      let likeClasses = "bi bi-hand-thumbs-up-fill";
      let dislikeClasses = "bi bi-hand-thumbs-down-fill";

      if(f.likes.indexOf(this.state.user.uid) !== -1) likeClasses += " liked";

      if(f.dislikes.indexOf(this.state.user.uid) !== -1) {
        dislikeClasses += " disliked";
      } else if(!this.state.user.employee) {
        dislikeClasses = "bi bi-x-lg delete"; 
      }

      return (
        <div className="entry" key={f.desc}>
          <h4> 
            <i className={dislikeClasses} onClick={(e) => this.dislike(f, e)}></i>
            {f.name} 
            <i className={likeClasses} onClick={() => this.like(f)}><p>{f.likes.length}</p></i>
          </h4>
          <div className="image-container">
            <p> {f.desc} </p>
            <hr/>
            <ul id='skills'><h5>Skills: </h5> {
              f.skills.map(skill => skill ? 
                <li className={this.isMatch(skill) ? "match" : "" } key={skill}>{skill[0].toUpperCase() + skill.slice(1)}</li> 
                : null )  
            }</ul>
          </div>
        </div>
    )});

    if(!feed.length) {
      feed = emptyFeed();
    }

    return (
      <div id="feed-container">
        <h1 className="title"> Hyperlink </h1>

        <div hidden = {!this.state.user.employee}>
          <label> <input type="radio" value="showAll" checked={this.state.showAll} onChange={this.toggle} /> Show All? </label>
          <label> <input type="radio" value="showMine" checked={!this.state.showAll} onChange={this.toggle} /> Show Related? </label>
        </div >  

        { this.state.loading ? <h2 className="loading"> Loading... </h2> : feed }

        <ReactModal 
          isOpen={this.state.likeModal !== null} 
          parentSelector={() => document.querySelector('#root')} 
          style={modalStyles}>
            <i className="bi bi-x-lg" onClick={() => this.setState({likeModal: null})}></i>
            { this.state.likeModal ? this.state.likeModal.map(user => <ModalEntry user={user} likes={this.state.likeModal}/>) : <> </> }
        </ReactModal>
      </div>
    );
  }
}

export default Feed;
