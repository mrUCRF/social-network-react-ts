import React, { Component, Suspense } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import News from "./components/News/News";
import Music from "./components/Music/Music";
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
import store, { AppStateType } from "./redux/redux-store";
import { Provider } from "react-redux";
import { Navigate, Routes, useNavigate, HashRouter, Route, BrowserRouter } from "react-router-dom";
const DialogsContainer = React.lazy( () => import("./components/Dialogs/DialogsContainer"))
const ProfileContainer = React.lazy( () => import("./components/Profile/ProfileContainer"))
const UsersContainer = React.lazy( () => import("./components/Users/UsersContainer"))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
  initializeThunk: () => void
}


class App extends Component<MapPropsType & DispatchPropsType> {
  handleCatchAllError = (e: PromiseRejectionEvent) => {
alert(e)
console.error(e)
  }

  componentDidMount() {
    this.props.initializeThunk()
    window.addEventListener('unhandledrejection', this.handleCatchAllError) 
  }
componentWillUnmount() {
  window.removeEventListener('unhandledrejection', this.handleCatchAllError)
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
          <Routes>
          <Route path='/' element><Navigate to='/profile'/></Route>          
          <Route path="/dialogs" element={<DialogsContainer />} />

          <Route path={`/profile/:userId?`} element={<ProfileContainer />}/>

          <Route path="/users" element={<UsersContainer />} />

          <Route path="/login" element={<Login />} />
          <Route path="/news" element={<News />} />
          <Route path="/music" element={<Music />} />
          <Route path="/settings" element={<Settings />} />
          {/* <Route path="*" render={<div>404 NOT FOUND</div>} /> */}
          </Routes>
          </Suspense>
          
        </div>
      </div>
      // </BrowserRouter>
    )
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized
})

let AppContainer = compose<React.ComponentType>(
  useNavigate,
  connect(mapStateToProps, { initializeThunk }))(App);

const SamuraiJsApp = (props) => {

//if BrowserRouter then we write basename={process.env.PUBLIC_URL}
  return (
  <BrowserRouter>  
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
  )
}

export default SamuraiJsApp