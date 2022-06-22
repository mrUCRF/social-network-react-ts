import React, { useState, useEffect } from "react";
//import Preloader from "../../common/Preloader/Preloader";
//import s from "./ProfileInfo.module.css"



const ProfileStatusWithHooks = (props) => {


let [editMode, setEditMode] = useState(false)   ///editMode передается первый свойством в метод useState, setEditMode - вторым (в функцию юзе стейт)
let [status, setStatus] = useState(props.status)
useEffect(() => { //первым параметром передается функция которая чтото делает, вторым передается зависимость от чего то (когда функции перерисовываться)
    setStatus(props.status)
}, [props.status])

const activateEditMode = () => {
    setEditMode(true)
} 

const deactivateEditMode = () => {
    setEditMode(false)
    props.updateStatus(status)
}

const onStatusChange = (e) => {
setStatus(e.currentTarget.value)
}


        return (
            <div>
                {!editMode &&
                    <div>
                        <span onDoubleClick={activateEditMode}>{props.status  || '-----'}</span>
                    </div>
                }
                {editMode &&
                    <div>
                        <span  onBlur={deactivateEditMode}  ><input value={status} onChange={onStatusChange} autoFocus={true}   /></span>
                    </div>
                }
            </div>
        )
}


export default ProfileStatusWithHooks
