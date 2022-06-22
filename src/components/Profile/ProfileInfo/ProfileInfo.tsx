import React, { useState } from "react";
import Preloader from "../../common/Preloader/Preloader.tsx";
import s from "./ProfileInfo.module.css"
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import userPhoto from '../../../assets/images/219986.png'
import ProfileDataEditMode from "./ProfileDataEditMode";



const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false) //хук режима редактирования свойств пользователя

    if (!props.profile) {
        return <Preloader />
    }
    let socialNetwork = props.profile.contacts
    console.log()
    const onMainPhotoSelected = (e) => {    //если длинна файлов не false, то передаем файл в метод savePhoto
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }

    const onSubmit = async (formData) => {
        await props.saveProfileData(formData)
        setEditMode(false)
    }
    return (
        <div>
            <div>
                <img src={props.profile.photos.large || userPhoto} alt={'aschibka)'} className={s.userAvatar} />
                {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
            </div>
            {editMode
                ? <ProfileDataEditMode profile={props.profile} socialNetwork={socialNetwork} submit={onSubmit}/>
                : <ProfileData profile={props.profile} socialNetwork={socialNetwork} isOwner={props.isOwner} goToEditMode={ () => { setEditMode(true) }}/>}
            <p></p>
            <h2>
                Это статус:
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
            </h2>
        </div>
    )
}
const ProfileData = ({ profile, socialNetwork, isOwner, goToEditMode }) => {
    
    return (
        <div>
            { isOwner && <div><button onClick={goToEditMode}>edit</button></div> }

            <div className={s.profileData}>
                <p><b>Полное имя:</b> {profile.fullName}</p>
                <p><b>Обо мне:</b> {profile.aboutMe}</p>
                <p><b>Мои проф. скилы:</b> { profile.lookingForAJobDescription }</p>
                <p><b>В поиске работы:</b> { profile.lookingForAJob ? "ДА, конечно" : "НЕТ, уже работаю" }</p>

                <div className={s.socialNetwork}>
                    <h3>Contacts:</h3> {Object.keys(socialNetwork).map((key) => {
                        return <Contact key={key} contactTitle={key} contactValue={socialNetwork[key]} />
                    })}
                </div>

            </div>
        </div>
    )
}



const Contact = ({ contactTitle, contactValue }) => {
    return (
        <div className={s.contact}>
            <b>{contactTitle} </b>  : {contactValue}
        </div>
    )
}
export default ProfileInfo
