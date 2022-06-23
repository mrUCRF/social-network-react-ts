
import { createField, Input } from "../../common/FormControls/FormControls"
import React, { useState } from "react";
// import Preloader from "../../common/Preloader/Preloader.tsx";
import s from "./ProfileInfo.module.css"
import ProfileStatusWithHooks from './ProfileStatusWithHooks'
import userPhoto from '../../../assets/images/219986.png'
import { Formik, Form, Field, ErrorMessage } from 'formik'


const ProfileDataEditMode = ({ profile, goToEditMode, submit }) => {
    return (
        <Formik
            initialValues={{
                fullName: profile.fullName,
                lookingForAJob: profile.lookingForAJob,
                lookingForAJobDescription: profile.lookingForAJobDescription,
                aboutMe: profile.aboutMe,
                contacts: profile.contacts
            }}
            validateOnBlur
            onSubmit={submit}
        //validationSchema={validaionsSchema}
        >
            {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                <form>
                    <div><button type="submit" onClick={handleSubmit}>Save</button></div>
                    <br />
                    <div className={s.profileData}>
                        <div>
                            <b>Full Name:</b> <Field type="text" name={"fullName"} placeholder={"Add Full Name"} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        <br />
                        <div>
                            <b>В поиске работы:</b> <Field type="checkbox" name={"lookingForAJob"} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        <br />
                        <div>
                            <b>My proffesion skills:</b>
                            <p><Field as="textarea" name={"lookingForAJobDescription"} placeholder={"Add you skills"} onChange={handleChange} onBlur={handleBlur} /></p>
                        </div>
                        <div>
                            <b>About me:</b>
                            <p><Field as="textarea" name={"aboutMe"} placeholder={"Tell us about yourself"} onChange={handleChange} onBlur={handleBlur} /></p>
                        </div>

                        <div className={s.socialNetwork}>
                    <h3>Contacts:</h3> {Object.keys(profile.contacts).map((key) => {
                        return (
                        <div className={s.contacts}>

                        <b>{key}:</b> <Field type="text" name={"contacts." + key} placeholder={key} onChange={handleChange} onBlur={handleBlur} />
                        </div>
                        )
                    })}
                </div>

                    </div>
                </form>
            )
            }
        </Formik >
    )
}


export default ProfileDataEditMode