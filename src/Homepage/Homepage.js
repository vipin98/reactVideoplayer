import React, { Component } from 'react';
import axios from "axios";
import Videocard from "../VideoCard/VideoCard";
import classes from "./Homepage.module.css";


 

class Homepage extends React.Component{
     
    state={
        videoList:[],
        
    }
    
    componentDidMount(){
        
        axios.get("https://5ee248c68b27f3001609488e.mockapi.io/playlist")
        .then(response => {
           this.setState({videoList: [...response.data]});
        })
        .catch(err => {
            console.log("call Failed!!")
        });
      
    }
   

    render(){
        return(
            <div className={classes.mainContainer}>
                  <h1>Video listing data!!!</h1>
            <div className={classes.videoGrid}>
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

export default Homepage;