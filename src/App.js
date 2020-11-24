import React, {Component} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import MainTemplate from './components/mainLayout/template/mainTemplate';
import Home from './components/home/home';
import Buy from './components/buy/buy';
import Contact from './components/contact/contact';
import ErrorPage from './components/errorPage/errorPage';
import Const from './util/Costanti.js';
import Spinner from './components/spinner/spinner';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      show: true,
    }
    this.isHome = window.location.pathname === Const.PATH_HOME ? true : false;
  }

  disableSpinner(){
    this.setState({
      show: false,
    })
  }

  componentDidMount(){
    if(this.isHome){
      this.timerId = setInterval(
        () => this.disableSpinner(),
        10000);
    }
  }

  componentWillUnmount() {
    if(this.timerId !== undefined){
      clearInterval(this.timerId);
    }
  }

  render(){
      return(
        <BrowserRouter>
          <Spinner isHome={this.isHome} show={this.state.show} />
          <MainTemplate isHome={this.isHome} show={this.state.show}>
               <Switch>
                 <Route exact path='/' component={Home}/>
                 <Route exact path='/buy' component={Buy}/>
                 <Route exact path='/contact' component={Contact}/>
                 <Route exact path='/error' component={ErrorPage}/>
                 <Redirect to="/error" component={ErrorPage}/>
               </Switch>
            </MainTemplate>
        </BrowserRouter>
      )
  }

}

export default App;
