import React from "react";
import m from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";


type DialogItemPropsType = {
    id: number
    img: string
    name: string
}


const DialogItem: React.FC<DialogItemPropsType> = ({id, img, name}) => {
    let addAdr = `/dialogs/${id}`
    
    
    return (
        <div className={m.dialog}>
            <NavLink className={m.avatar} to={addAdr}>{img} </NavLink>
            <NavLink className={m.name} to={addAdr}>{name}</NavLink>
            
        </div>
    )
}


export default DialogItem


