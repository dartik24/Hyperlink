import './feed.css';
import React from 'react';
import axios from 'axios'
import * as _ from 'lodash';
import { getListings } from '../../firebase/fb-listing-functions';
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
      feeds: await getListings(),
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

  dislike = (id) => {
    const user = this.state.user;
    axios.post(process.env.REACT_APP_BACKEND_URL + '/dislike', { data: {id, user} }).then(r => {
      console.log(r);
    });
  }

  like = (id) => {
    const user = this.state.user;
    axios.post(process.env.REACT_APP_BACKEND_URL + '/like', { data: {id, user} }).then(r => {
      console.log(r);
    });
  }

  render() {
    const toDisplay = this.filter(this.state.feeds);

    const feed = toDisplay.map((f) => (
      <div className="entry" key={f.desc}>
        <h4> 
          <i className="bi bi-hand-thumbs-down-fill" onClick={() => this.dislike(f.id)}></i>
          {f.name} 
          <i className="bi bi-hand-thumbs-up-fill" onClick={() => this.like(f.id)}></i> </h4>
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
