import React, {Component} from 'react';
import Square from './../square/square';

class Home extends Component {
  // componentDidMount(){
  //   console.log("HOME - RENDER FINISHED");
  // }

  render(){
    return(
      <>
      <div className="display-grid-blank-60 "></div>
      <Square rows="264" cols="152"/>
      </>
    )
  }
}

export default Home;
