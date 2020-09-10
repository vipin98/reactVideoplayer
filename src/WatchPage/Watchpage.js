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
        isLike:{},
        isSaved:false,
        
    }
    

    scrollToTop=() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    
     fetchVideoDetails =() =>{
        const videoId = this.props.match.params.videoId;
        console.log(videoId);
        axios.get(`https://5ee248c68b27f3001609488e.mockapi.io/video/${videoId}`)
        .then(response => {
            console.log(response.data.isLiked);
           this.setState({videoData: {...response.data}})
           this.scrollToTop()
          this.hendelLike(response.data.isLiked)
        
          
        })
        .catch(err => {
            console.log("call Failed!!")
        });
     }

     hendelLike =(like) =>{
        this.setState({isLike:like})
     }
    componentDidMount(){
        
        axios.get("https://5ee248c68b27f3001609488e.mockapi.io/playlist")
        .then(response => {
           this.setState({videoList: [...response.data]});
            
        })
        .catch(err => {
            console.log("call Failed!!")
            
        });
        this.fetchVideoDetails();
    }

    componentDidUpdate(){
        const videoId = this.props.match.params.videoId;
        console.log('component updated!!')
        if(this.state.videoData.id !== videoId){
            this.fetchVideoDetails();
            
        }
       
    }
         
    render(){
        return(
            <div className={classes.mainContainer}>
                   <div className={classes.videoPlayer}>
                <Link to={`/`}>Go to Home Page</Link>
                <div className={classes.playerWrapper} >
                    <iframe  className={classes.video} src={`https://player.vimeo.com/video/${this.state.videoData.vimeoId}`}></iframe> 
                     <div className={classes.iconWrapper}> 
                     <p ><span className={classes.para}> {this.state.videoData.views}views </span></p> 
                      
                     <div className={classes.icons}>
                     <FontAwesomeIcon className={ [classes.icon ,this.state.isLike? classes.activIcon :null ].join(' ')} icon={faHeart} />
                     <FontAwesomeIcon className={classes.icon} icon={faCommentAlt} />
                     <FontAwesomeIcon className={[classes.icon ,this.state.isSaved? classes.activIcon : null].join(' ')} icon={faBookmark} />  
                     </div>
                     </div>
               </div>
                <h1 className={classes.title}>{this.state.videoData.title}</h1>
                 <p className={classes.description}>{this.state.videoData.description}</p>
                
            </div>
           
            <div className={classes.playList}>
            {
                    this.state.videoList.map(item =>{
                        return <Videocard  key={item.id} id={item.id} title={item.title} thumbnail={item.thumbnail} isActive={item.id === this.state.videoData.id} />

                    })
                }
            </div>
           
         </div>
        );
    }
}

export default WatchCard;