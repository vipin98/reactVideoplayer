import React from 'react';
import {Route , BrowserRouter} from "react-router-dom";
import  classes from "./App.module.css";
import Watchpage from "./WatchPage/Watchpage";
import Homepage from "./Homepage/Homepage"


 



class App extends React.Component {

  render(){
  return (

    
      <BrowserRouter> 
       <div className={classes.App}> 
    <Route  exact path="/" component={Homepage}/>
    <Route path="/video/watch/:videoId" component={Watchpage}/>
    </div>
    </BrowserRouter>
     
  );
}
}

export default App;
