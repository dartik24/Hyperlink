import './feed.css';
import React from 'react';
import axios from 'axios'

class Feed extends React.Component {
  state = { feeds: [] };

  async componentDidMount() {
    axios.get('http://localhost:4201/listing').then(r => {
      const listings = r.data.listings;
      this.setState({
        feeds: listings
      })
      console.log(listings);
    });
    /* const resp = await fetch('https://picsum.photos/v2/list');
    const feeds = await resp.json();
    this.setState({  }); */
  }

  render() {
    //<img src={f.download_url} alt={f.author} />
    const feed = this.state.feeds.map((f) => (
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
        {feed}
      </div>
    );
  }
}

export default Feed;
