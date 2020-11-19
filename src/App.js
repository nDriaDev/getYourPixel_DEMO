import React, {Component} from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import MainTemplate from './components/mainLayout/template/mainTemplate';
import Home from './components/home/home';
import Buy from './components/buy/buy';
import Contact from './components/contact/contact';

class App extends Component {
  render(){
      return(
        <BrowserRouter>
          <MainTemplate>
               <Switch>
                 <Route exact path='/' component={Home}/>
                 <Route exact path='/buy' component={Buy}/>
                 <Route exact path='/contact' component={Contact}/>
               </Switch>
            </MainTemplate>
        </BrowserRouter>
      )
  }

}

export default App;
