import './feed.css';
import React from 'react';
import * as _ from 'lodash';
import { getCollection } from '../../firebase/fb-generic';
import { modifyListing } from '../../firebase/fb-listing-functions'
class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      feeds: [],
      showAll: false,
      user: this.props.user
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
    if(this.state.showAll)
      return this.state.feeds;
    return this.state.feeds.filter(feed => _.intersection(feed.skills, this.state.user.skills).length);
  }

  toggle = () => {
    this.setState({
      showAll: !this.state.showAll
    });
  }

  dislike = (feed) => {
    const user = this.state.user;

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

  like = (feed) => {
    const user = this.state.user;

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


      console.log(likeClasses);

      return (
        <div className="entry" key={f.desc}>
          <h4> 
            <i className={dislikeClasses} onClick={() => this.dislike(f)}></i>
            {f.name} 
            <i className={likeClasses} onClick={() => this.like(f)}></i> </h4>
          <div className="image-container">
            <p> {f.desc} </p>
            <hr/>
            <ul id='skills'><h5>Skills: </h5> {
              f.skills.map(skill => <li key={skill}>{skill}</li>)  
            }</ul>
          </div>
        </div>
    )});

    return (
      <div id="feed-container">
        <h1 className="title"> Hyperlink </h1>
        <label> <input type="radio" value="showAll" checked={this.state.showAll} onChange={this.toggle} /> Show All? </label>
        <label> <input type="radio" value="showMine" checked={!this.state.showAll} onChange={this.toggle} /> Show Related? </label>
        {feed}
      </div>
    );
  }
}

export default Feed;
