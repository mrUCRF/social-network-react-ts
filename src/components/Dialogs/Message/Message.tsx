import React from "react";
import s from './../Dialogs.module.css'
import {NavLink} from "react-router-dom";
type MessagePropsType = {
    avatAuthorDialog: string
    message: string
}

const Message: React.FC<MessagePropsType> = ({avatAuthorDialog, message}) => {
    
    
    return (
        
        <div className={s.message}>{avatAuthorDialog} {message}</div>
    )
}

export default Message