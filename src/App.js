import React, {Component} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import MainTemplate from './components/mainLayout/template/mainTemplate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/home/home';
import Buy from './components/buy/buy';
import Contact from './components/contact/contact';
import Login from './components/login/login';
import ErrorPage from './components/errorPage/errorPage';
import Spinner from './components/spinner/spinner';
import Auth from './components/auth/auth';
import Manage from './components/manage/manage';
import ForgotPassword from './components/forgotPassword/forgotPassword';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      show: true,
      logged: false,
    }
    this.isLogged = this.isLogged.bind(this);
    this.disableSpinner = this.disableSpinner.bind(this);
    this.enableSpinner = this.enableSpinner.bind(this);
  }

  isLogged(){
    let log = this.state.logged;
    this.setState({
      logged:!log
    })
  }

  enableSpinner(){
    this.setState({
      show: true,
    })
  }

  disableSpinner(){
    this.setState({
      show: false,
    })
  }

  componentDidMount(){
  }


  render(){
      return(
        <BrowserRouter>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
          />
          <Spinner show={this.state.show} />
          <MainTemplate show={this.state.show} enableSpinner={this.enableSpinner} disableSpinner={this.disableSpinner} logged={this.state.logged} isLogged={this.isLogged}>
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Home {...props}
                    enableSpinner={this.enableSpinner}
                    disableSpinner={this.disableSpinner} />
                )}
               />
               <Route
                 exact
                 path='/buy'
                 render={(props) => (
                   <Buy {...props}
                     enableSpinner={this.enableSpinner}
                     disableSpinner={this.disableSpinner} />
                 )}
               />
              <Route
                path='/contact'
                render={(props) => (
                  <Contact {...props}
                    enableSpinner={this.enableSpinner}
                    disableSpinner={this.disableSpinner} />
                )}
              />
              <Route
                path='/login'
                render={(props) => (
                  <Login {...props}
                    isLogged={this.isLogged}
                    enableSpinner={this.enableSpinner}
                    disableSpinner={this.disableSpinner} />
                )}
              />
              <Route
                path='/forgotPassword'
                render={(props) => (
                  <ForgotPassword {...props}
                    isLogged={this.isLogged}
                    enableSpinner={this.enableSpinner}
                    disableSpinner={this.disableSpinner} />
                )}
              />
              <Route
                exact
                path='/error'
                render = {(props) => (
                  <ErrorPage {...props}
                    enableSpinner={this.enableSpinner}
                    disableSpinner={this.disableSpinner} />
                )}
              />
              <Route
                path='/manage'
                render = {(props) => (
                  <Auth {...props}
                    ComponentToProtect={Manage}
                    enableSpinner={this.enableSpinner}
                    disableSpinner={this.disableSpinner} />
                )}
              />
              <Redirect
                to="/error"
                render = {(props) => (
                  <ErrorPage {...props}
                    enableSpinner={this.enableSpinner}
                    disableSpinner={this.disableSpinner} />
                )}
              />
            </Switch>
          </MainTemplate>
        </BrowserRouter>
      )
  }

}

export default App;

// <Spinner isHome={this.isHome} show={this.state.show} />
// <MainTemplate isHome={this.isHome} show={this.state.show}>
//   <Switch>
//     <Route exact path='/' component={Home}/>
//     <Route exact path='/buy' component={Buy}/>
//     <Route exact path='/contact' component={Contact}/>
//     <Route exact path='/error' component={ErrorPage}/>
//     <Redirect to="/error" component={ErrorPage}/>
//   </Switch>
// </MainTemplate>
