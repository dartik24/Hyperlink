import React from 'react';
import './feed.css';
const Feed = ({author,download_url}) =>{
    return(
        <div className='div-feed' style={{border: '1px solid black', borderRadius: '12px' }}>
            <div style={{padding:'10px 5px',fontWeight:'bold' , backgroundColor: '#948AE3', borderTopLeftRadius: '12px', borderTopRightRadius: '12px'}}>{author}</div>
            <div style={{width:'100%',height:'auto' , backgroundColor: '#948AE3', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px'}}>
                <img src={download_url} alt=''/>
            </div>
        </div>
    )
}

export default Feed;