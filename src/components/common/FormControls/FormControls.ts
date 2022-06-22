import { Formik, Form, Field, ErrorMessage } from 'formik'

export const Textarea = (props) => {
return (
    <div>
<textarea {...props}/>
    </div>
)
}







export const Input = (props) => {
    const{input, meta, child, ...restProps} = props
}


export const createField = (placeholder, name, validators, component, props = {}, text = '') => {
    <div>
        <Field placeholder={placeholder}
        name={name}
        validate={validators}
        component={component}
        {...props} /> {text}
    </div>
}