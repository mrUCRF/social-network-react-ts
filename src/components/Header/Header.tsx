import React from "react";
import NavLink from "react-router-dom/NavLink";
import './Header.module.css'
import s from './Header.module.css'

const Header = (props) => {
    return (
     
        <header className={s.header}> 
        <img src='https://audimediacenter-a.akamaihd.net/system/production/media/28535/images/14e205d96f6f7dcd21e1c48ee7ee6e39ab1c30ba/A160188_full.png?1582246422'></img>
      
      <div className={s.loginBlock}>
        {props.isAuth 
        ? <div>{props.login} - <button onClick={props.logout}>Log out</button></div>
        : <NavLink to={'/login'}>Login</NavLink>}
       
      </div>
      
      </header>
    )
}

export default Header
