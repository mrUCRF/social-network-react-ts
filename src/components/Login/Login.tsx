import React from "react";
//import { Field, reduxForm } from "redux-form" 
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as yup from 'yup'
import { connect } from "react-redux";
import { initialStateAuthType, loginThunk, ThunkType } from "../../redux/auth-reducer.ts";
import { Redirect } from "react-router-dom";
import { AppStateType } from "../../redux/redux-store.ts";
//import { propTypes } from "redux-form";


const LoginFormik: React.FC<LoginFormikPropsType> = ({ loginThunk, captchaUrl }) => {   ///в фигурных скобках передаем названия пропсов и теперь их можно вызвать без префикса "props."
    
    const validaionsSchema = yup.object().shape({
        email: yup.string().typeError('должно быть строкой').required('Обязательное поле'),
        password: yup.string().typeError('должно быть строкой').required('Обязательное поле')
    })
type formDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}
    const formData = (values: formDataType) => {
        console.log(values)
        //здесь нужно вызвать санки
        loginThunk(values.email, values.password, values.rememberMe, values.captcha) //логин который пришел с пропсов с помощью коннекта
    }

    return (
        <Formik
            initialValues={{ email: '', password: '', rememberMe: false, captcha: '' }}
            validateOnBlur
            onSubmit={(values) => {
                return formData(values)
            }}
            validationSchema={validaionsSchema}
        >
            {({ values, errors, touched, handleChange, handleBlur, isValid, handleSubmit, dirty }) => (
                <div>
                    <form>
                        <div>
                            <Field type="text" name={"email"} placeholder={"Email"} onChange={handleChange} onBlur={handleBlur} />
                            {touched.email && errors.email && <p className={"error"}>{errors.email}</p>}
                        </div>

                        <div>
                            <Field type="password" name={"password"} placeholder={"Password"} onChange={handleChange} onBlur={handleBlur} />
                            {touched.password && errors.password && <p className={"error"}>{errors.password}</p>}
                        </div>

                        <div>
                            <Field type={"checkbox"} name={"rememberMe"} onChange={handleChange} onBlur={handleBlur}  />Remember me
                            {touched.rememberMe && errors.rememberMe && <p className={"error"}>{errors.rememberMe}</p>}
                        </div>
                        <div>
                            <p>{ captchaUrl && <img src={captchaUrl} />}</p>
                            <p>{ captchaUrl && <Field type="input" name={"captcha"} onChange={handleChange} onBlur={handleBlur}  />}</p>
                        </div>
                        <div>
                            <button
                                disabled={!isValid && !dirty}
                                type="submit"
                                onClick={handleSubmit}
                            //onChange={(e) => {
                            //return formData(e)}
                            //}
                            >Login</button>
                        </div>
                    </form>
                </div>
            )
            }
        </Formik>
    )
}

type LoginFormikPropsType = {
    loginThunk: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
    captchaUrl: string | null
}
const Login: React.FC<mapStateToPropsType & mapDispatchPropsType> = ({ isAuth, loginThunk,  captchaUrl}) => {
    if (isAuth) {
        return <Redirect to={"/profile"} />
    }

    return (
        <div>
            <div>Login1</div>
            <LoginFormik loginThunk={loginThunk} captchaUrl={captchaUrl} />

        </div>
    )
}
type mapStateToPropsType = {
    captchaUrl: string | null
    isAuth: boolean
}
type mapDispatchPropsType = {
    loginThunk: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void
}
const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
})
export default connect<mapStateToPropsType, mapDispatchPropsType>(mapStateToProps, { loginThunk })(Login)