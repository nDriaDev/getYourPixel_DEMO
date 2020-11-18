import React, {Component} from 'react';

class Navbar extends Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <ul id="navbar">
        <li><a className="active" href="#home">Home</a></li>
        <li><a href="#buy">Buy</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    )
  }
}

export default Navbar;
