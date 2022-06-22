import React from "react";
import Header from "./Header.tsx";
import { connect } from "react-redux";
//import {  headerLoginProfileThunk } from "../../redux/auth-reducer"
import { logoutThunk } from "../../redux/auth-reducer.ts";


class HeaderContainer extends React.Component {
  // componentDidMount() {
  //   this.props.headerLoginProfileThunk()
//}   ----этот метод перенесли в апп.js

    // axios  ---вариант без санок (делаем запрос в конт компоненте)
    // .get(`https://social-network.samuraijs.com/api/1.0/auth/me`, { withCredentials: true }) //проверяем авторизован ли 
    //   .then(response => {
        
    //     if (response.data.resultCode === 0) {
    //       let { id, email, login } = response.data.data
    //       this.props.setAuthUserData(id, email, login)
    //     }
    //   }) ----вариант без санок
      
  
  render() {
    return <Header {...this.props} />
  }
}


const mapStateToProps = (state) => ({
  login: state.auth.login,
  isAuth: state.auth.isAuth

})

export default connect(mapStateToProps, { //setAuthUserData, с санками уже не надо
   //headerLoginProfileThunk, -- перенесли в app.js
   logout: logoutThunk })(HeaderContainer)