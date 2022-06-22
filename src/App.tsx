import React, { Component, Suspense } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from "./components/News/News.tsx";
import Music from "./components/Music/Music.tsx";
import Settings from "./components/Settings/Settings";
//import DialogsContainer from './components/Dialogs/DialogsContainer';
//import UsersContainer from './components/Users/UsersContainer';
//import ProfileContainer from './components/Profile/ProfileContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/Login/Login';
import { initializeThunk } from "./redux/app-reducer"
import { connect } from 'react-redux';
import Preloader from './components/common/Preloader/Preloader';
import { compose } from "redux";
import store from "./redux/redux-store";
import { Provider } from "react-redux";
import { Redirect, Switch, withRouter, HashRouter, Route, BrowserRouter } from "react-router-dom";
const DialogsContainer = React.lazy( () => import("./components/Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy( () => import("./components/Profile/ProfileContainer"))
const UsersContainer = React.lazy( () => import("./components/Users/UsersContainer"))



class App extends Component {
  handleCatchAllError = (promiseRejectionEvent) => {
alert(promiseRejectionEvent)
console.error(promiseRejectionEvent)
  }
  componentDidMount() {
    this.props.initializeThunk()
    window.addEventListener("unhandlerejection", this.promiseRejectionEvent) 
  }
componentWillUnmount() {
  window.removeEventListener("unhandlerejection", this.promiseRejectionEvent)
}
  render() {
    if (!this.props.initialized) {
      return <Preloader />
    }
    return (
      //<BrowserRouter>

      <div className='app-wrapper'>
        <HeaderContainer />
        <Navbar />

        <div className='app-wrapper-content'>
       
          <Suspense fallback={<Preloader />}>
          <Switch>
          <Route path='/' exact><Redirect to='/profile'/></Route>          
          <Route path="/dialogs" render={() => {
          return <DialogsContainer />
          }} />

          <Route path={`/profile/:userId?`} render={() => {
          return <ProfileContainer />
         }}/>

          <Route path="/users" render={() => {
          return <UsersContainer />
         } }/>

          <Route path="/login" render={() => <Login />} />
          <Route path="/news" render={News} />
          <Route path="/music" render={Music} />
          <Route path="/settings" render={Settings} />
          {/* <Route path="*" render={<div>404 NOT FOUND</div>} /> */}
          </Switch>
          </Suspense>
          
        </div>
      </div>
      // </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initializeThunk }))(App);

const SamuraiJsApp = (props) => {

//if BrowserRouter then we write basename={process.env.PUBLIC_URL}
  return <BrowserRouter>  
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
}

export default SamuraiJsApp