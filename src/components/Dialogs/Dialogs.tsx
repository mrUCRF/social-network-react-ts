import React from "react";
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem.tsx";
import Message from "./Message/Message.tsx";
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { AppStateType } from "../../redux/redux-store";
import { initialStateDialogType } from "../../redux/dialog-reducer";


type DialogsPropsType = {
    dialogPage: initialStateDialogType
    btnAddMessage: (postText: string) => void
}
const Dialogs: React.FC<DialogsPropsType> = ({dialogPage, btnAddMessage }) => {

        let state = dialogPage

    let dialogsElem = state.dialogName.map(d => <DialogItem name={d.name} id={d.id} img={d.img} />);
    let messagesElem = state.dialogMessages.map(m => <Message message={m.message} avatAuthorDialog={m.img} id={m.id} />);


    return (
        <div className={s.dialogsList}>
            <div className={s.dialogsItems}>
                {dialogsElem}
            </div>

            <div className={s.chatList}>
                {messagesElem}
                <AddMessageFormik dialogPage={state} btnAddMessage={btnAddMessage} />
            </div>
        </div>
    )
}
type FormikProps = {
    btnAddMessage: (valuesText: string) => void
    dialogPage: initialStateDialogType
}
const AddMessageFormik: React.FC<FormikProps> = (props) => {   ///в фигурных скобках передаем названия пропсов и теперь их можно вызвать без префикса "props."
    // const validaionsSchema = yup.object().shape({
    //     email: yup.string().typeError('должно быть строкой').required('Обязательное поле'),
    //     password: yup.string().typeError('должно быть строкой').required('Обязательное поле')
    // })
    const onBtnAddMessage = (values: {addPostText: string}) => {
        debugger
        props.btnAddMessage(values.addPostText)
    }
    
    return (
        <Formik
            initialValues={{ addPostText: props.dialogPage.newPostDialogPage }}
            validateOnBlur
            onSubmit={(values) => {
                return onBtnAddMessage(values)
            }}
        //validationSchema={validaionsSchema}
        >
            {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                <div>
                    <form>
                        <div>
                            <textarea type="text" name={"addPostText"} placeholder={"Add Text"} onChange={handleChange} onBlur={handleBlur}  ></textarea>  {/* value={values.addPostText} */}
                            {/* {touched.email && errors.email && <p className={"error"}>{errors.email}</p>} */}
                        </div>

                        <div>
                            <button
                                // disabled={!isValid && !dirty}
                                type="submit"
                                onClick={handleSubmit}
                            //onChange={(e) => {
                            //return formData(e)}
                            //}
                            >Add Post</button>
                        </div>
                    </form>
                </div>
            )
            }
        </Formik>
    )
}


export default Dialogs