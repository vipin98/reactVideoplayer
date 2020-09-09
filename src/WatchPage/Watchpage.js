import React, { Component } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Videocard from "../VideoCard/VideoCard";
import classes from "./Watchpage.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faHeart, faCommentAlt, faBookmark } from '@fortawesome/free-solid-svg-icons'

 

class WatchCard extends React.Component{
     
    state={
        videoList:[],
        videoData:{},
        isAactive:false,
        
    }
       
    componentDidMount(){
        
        axios.get("https://5ee248c68b27f3001609488e.mockapi.io/playlist")
        .then(response => {
           this.setState({videoList: [...response.data]});
        })
        .catch(err => {
            console.log("call Failed!!")
            
        });

        const videoId = this.props.match.params.videoId;
        console.log(videoId);
        axios.get(`https://5ee248c68b27f3001609488e.mockapi.io/video/${videoId}`)
        .then(response => {
            console.log(response.data);
           this.setState({videoData: {...response.data}})
        })
        .catch(err => {
            console.log("call Failed!!")
        });
      
    }
  

    render(){
        return(
            <div className={classes.mainContainer}>
                   <div className={classes.videoPlayer}>
                <Link to={`/`}>Go to Watchpage</Link>
                <div className={classes.playerWrapper} >
                    <iframe  className={classes.video} src={`https://player.vimeo.com/video/${this.state.videoData.vimeoId}`}></iframe> 
                     <div className={classes.iconWrapper}> 
                     <p ><span className={classes.para}> {this.state.videoData.views}views </span></p> 
                      
                     <div className={classes.icons}>
                     <FontAwesomeIcon className={ this.state.videoData.isLiked ? classes.icon :classes.activIcon } icon={faHeart} />
                     <FontAwesomeIcon className={classes.icon} icon={faCommentAlt} />
                     <FontAwesomeIcon className={this.state.videoData.isSaved ? classes.icon : classes.activIcon} icon={faBookmark} />  
                     </div>
                     </div>
               </div>
                <h1 className={classes.title}>{this.state.videoData.title}</h1>
                 <p className={classes.description}>{this.state.videoData.description}</p>
            </div>
            <div className={classes.playList}>
            {
                    this.state.videoList.map(item =>{
                        return <Videocard key={item.id} id={item.id} title={item.title} thumbnail={item.thumbnail} />

                    })
                }
            </div>

         </div>
        );
    }
}

export default WatchCard;