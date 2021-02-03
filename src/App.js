import React, {Component} from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import MainTemplate from './components/mainLayout/template/mainTemplate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/home/home';
import Buy from './components/buy/buy';
import Contact from './components/contact/contact';
import Login from './components/login/login';
import SaveUser from './components/user/saveUser';
import ErrorPage from './components/errorPage/errorPage';
import Legal from './components/legal/legal';
import Spinner from './components/spinner/spinner';
import Auth from './components/auth/auth';
import Manage from './components/manage/manage';
import ForgotPassword from './components/forgotPassword/forgotPassword';
import HowWork from './components/howWork/howWork';
import Win from './components/win/win';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      show: true,
      isAuth: false,
      isAuthBasic: false,
    }
    this.disableSpinner = this.disableSpinner.bind(this);
    this.enableSpinner = this.enableSpinner.bind(this);
    this.setAuth = this.setAuth.bind(this);
  }

  setAuth(isAuth1,isAuthBasic1) {
    this.setState({
      ...this.state,
      isAuth: isAuth1 !== null ? isAuth1 : this.state.isAuth,
      isAuthBasic: isAuthBasic1 !== null ? isAuthBasic1 : this.state.isAuthBasic
    })
  }

  enableSpinner(){
    this.setState({
      ...this.state,
      show: true,
    })
  }

  disableSpinner(){
    this.setState({
      ...this.state,
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
          <MainTemplate show={this.state.show} enableSpinner={this.enableSpinner} disableSpinner={this.disableSpinner} setAuth={this.setAuth} isAuth={this.state.isAuth} isAuthBasic={this.state.isAuthBasic}>
            <Switch>
              <Route
                exact
                path='/'
                render={(props) => (
                  <Home {...props}
                    setAuth={this.setAuth}
                    enableSpinner={this.enableSpinner}
                    disableSpinner={this.disableSpinner} />
                )}
               />
               <Route
                 exact
                 path='/buy'
                 render={(props) => (
                   <Buy {...props}
                     setAuth={this.setAuth}
                     enableSpinner={this.enableSpinner}
                     disableSpinner={this.disableSpinner} />
                 )}
               />
              <Route
                path='/contact'
                render={(props) => (
                  <Contact {...props}
                    setAuth={this.setAuth}
                    enableSpinner={this.enableSpinner}
                    disableSpinner={this.disableSpinner} />
                )}
              />
              <Route
                path='/howWork'
                render={(props) => (
                  <HowWork {...props}
                    setAuth={this.setAuth}
                    enableSpinner={this.enableSpinner}
                    disableSpinner={this.disableSpinner} />
                )}
              />
              <Route
                path='/win'
                render={(props) => (
                  <Win {...props}
                    setAuth={this.setAuth}
                    enableSpinner={this.enableSpinner}
                    disableSpinner={this.disableSpinner} />
                )}
              />
              <Route
                path='/login'
                render={(props) => (
                  <Login {...props}
                    setAuth={this.setAuth}
                    enableSpinner={this.enableSpinner}
                    disableSpinner={this.disableSpinner} />
                )}
              />
              <Route
                path='/register'
                render={(props) => (
                  <SaveUser {...props}
                    setAuth={this.setAuth}
                    enableSpinner={this.enableSpinner}
                    disableSpinner={this.disableSpinner} />
                )}
              />
              <Route
                path='/forgotPassword'
                render={(props) => (
                  <ForgotPassword {...props}
                    setAuth={this.setAuth}
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
                    setAuth={this.setAuth}
                    enableSpinner={this.enableSpinner}
                    disableSpinner={this.disableSpinner} />
                )}
              />
              <Route
                path='/legal'
                render = {(props) => (
                  <Legal {...props}
                    setAuth={this.setAuth}
                    enableSpinner={this.enableSpinner}
                    disableSpinner={this.disableSpinner}/>
                )}
              />
              <Route
                path='/manage'
                render = {(props) => (
                  <Auth {...props}
                    setAuth={this.setAuth}
                    ComponentToProtect={Manage}
                    enableSpinner={this.enableSpinner}
                    disableSpinner={this.disableSpinner} />
                )}
              />
              <Redirect
                to="/error"
                render = {(props) => (
                  <ErrorPage {...props}
                    setAuth={this.setAuth}
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
