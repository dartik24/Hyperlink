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
      feeds: await getCollection(this.props.user, 'listings', false),
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
    })
  }

  dislike = (feed) => {
    const user = this.state.user;
    // prevent duplicate entires
    if(feed.dislikes.indexOf(user.uid) === -1) {
      feed.dislikes.push(user.uid)
      modifyListing(feed)
    }
  }

  like = (feed) => {
    const user = this.state.user;
    // prevent duplicate entries
    if(feed.likes.indexOf(user.uid) === -1) {
      feed.likes.push(user.uid)
      modifyListing(feed)
    }
  }

  render() {
    const toDisplay = this.filter(this.state.feeds);

    const feed = toDisplay.map((f) => (
        <div className="entry" key={f.desc}>
          <h4> 
            <i className="bi bi-hand-thumbs-down-fill" onClick={() => this.dislike(f)}></i>
            {f.name} 
            <i className="bi bi-hand-thumbs-up-fill" onClick={() => this.like(f)}></i> </h4>
          <div className="image-container">
            <p> {f.desc} </p>
            <hr/>
            <ul>Skills: {
              f.skills.map(skill => <li key={skill}>{skill}</li>)  
            }</ul>
          </div>
        </div>
    ));

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
