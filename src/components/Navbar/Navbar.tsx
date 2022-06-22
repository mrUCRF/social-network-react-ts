import React from "react";
import {NavLink} from "react-router-dom";
import s from "./Navbar.module.css"

const Navbar = () => {
    return (
        <nav className={s.nav}>
        <NavLink to='/profile' activeClassName={s.active} className={({isActive}) => isActive ? s.active : s.item }>Profile</NavLink>
        <br></br>
        <NavLink to='/dialogs' activeClassName={s.active} className={({isActive}) => isActive ? s.active : s.item }>Message</NavLink>
        <br></br>
        <NavLink to='/users' activeClassName={s.active} className={({isActive}) => isActive ? s.active : s.item }>Users</NavLink>
        <br></br>
        <NavLink to='/news' activeClassName={s.active} className={({isActive}) => isActive ? s.active : s.item }>News</NavLink>
        <br></br>
        <NavLink to='/music' activeClassName={s.active} className={({isActive}) => isActive ? s.active : s.item }>Music</NavLink>
      <br></br>
      <br></br>
        <NavLink to='/settings' activeClassName={s.active} className={({isActive}) => isActive ? s.active : s.item }>Settings</NavLink>
      </nav>
    )
}

export default Navbar