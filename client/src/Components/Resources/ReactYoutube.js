import React, { Component } from 'react';
import YouTube from 'react-youtube';
// https://youtu.be/TcFGlHUbKgM
//https://www.youtube.com/watch?time_continue=7
//https://www.youtube.com/watch?time_continue=7&v=TcFGlHUbKgM&feature=emb_logo
class YoutubeComponent extends Component{

    videoOnReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
        console.log(event.target);
    }

    render(){
        const opts = {
            height: '220',
            width: '450',
            playerVars: { // https://developers.google.com/youtube/player_parameters
              autoplay: 0
            }
        };

        const {videoId} = this.props

        return(
            <YouTube
                videoId={videoId}
                opts={opts}
                onReady={this.videoOnReady}
            />
        )
    }
}

export default YoutubeComponent;