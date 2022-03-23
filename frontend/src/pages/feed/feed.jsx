import './feed.css';
import React from 'react';
import axios from 'axios'
import * as _ from 'lodash';
class Feed extends React.Component {
  state = { feeds: [] };

  async componentDidMount() {
    axios.get('http://localhost:4201/listing').then(r => {
      const listings = r.data.listings;
      this.setState({
        feeds: listings,
        showAll: false,
        user: this.props.user
      })
    });
    /* const resp = await fetch('https://picsum.photos/v2/list');
    const feeds = await resp.json();
    this.setState({  }); */
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


  render() {
    //<img src={f.download_url} alt={f.author} />
    const toDisplay = this.filter(this.state.feeds);

    const feed = toDisplay.map((f) => (
      <div className="entry" key={f.download_url}>
        <h4> {f.name} </h4>
        <div className="image-container">
          <p> {f.desc} </p>
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
