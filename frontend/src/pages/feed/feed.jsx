import './feed.css';
import React from 'react';

class Feed extends React.Component{
    state = { feeds: [] };

    async componentDidMount(){
        const resp = await fetch('https://picsum.photos/v2/list')
        const feeds = await resp.json()
        this.setState({feeds})
    }

    render(){
        const feed = this.state.feeds.map(f => 
            <div className='entry'>
                <h4> {f.author} </h4>
                <div className="image-container"> <img src={f.download_url} alt={f.author}/> </div>
            </div>
        );

        return (
            <div id="feed-container">
                <h1 className = "title" > Hyperlink </h1>
                { feed }
            </div>
        )
    }
}

export default Feed;