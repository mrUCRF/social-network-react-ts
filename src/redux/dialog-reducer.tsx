import { TypeOf } from "yup";
import { BaseThunkType, InferActionsTypes } from "./redux-store";

// const UPDATE_NEW_MESSAGE = 'sn/dialog/UPDATE-NEW-MESSAGE'
// const BTN_ADD_MESSAGE_D = 'sn/dialog/BTN-ADD-MESSAGE-D';


export type DialogsType = {
    id: number
    name: string
    img: JSX.Element | null
}
export type MessagesType = {
    id: number
    message: string
    img: JSX.Element | null
}
let initialState = {
    dialogName: [
        { id: 1, name: 'Vitalii', img: <img src="https://photoshablon.com/_ph/44/52953599.jpg" /> },
        { id: 2, name: 'Andrey', img: <img src="https://s5o.ru/storage/simple/cyber/edt/5d/7a/99/a7/cybered84106a565.png" /> },
        { id: 3, name: 'Mykola', img: <img src="https://photoshablon.com/_ph/44/2/921507573.jpg" /> },
        { id: 4, name: 'Arnold', img: <img src="https://i.pinimg.com/originals/63/d5/af/63d5af0bff40f279164953ab0577da3b.jpg" /> }
    ] as Array<DialogsType>,
    dialogMessages: [
        { id: 1, message: 'Hello, how are you?', img: <img src="https://photoshablon.com/_ph/44/52953599.jpg" /> },
        { id: 2, message: 'What am I doing here?', img: <img src="https://s5o.ru/storage/simple/cyber/edt/5d/7a/99/a7/cybered84106a565.png" /> },
        { id: 3, message: 'Where can you buy products?', img: <img src="https://photoshablon.com/_ph/44/52953599.jpg" /> }
    ] as Array<MessagesType>,
    newPostDialogPage: 'first dialog page'
}
export type initialStateDialogType = typeof initialState

const dialogReducer = (state = initialState, action: ActionsType): initialStateDialogType => {
    //let stateCopy = { ...state };
    switch (action.type) {
        case 'sn/dialog/BTN-ADD-MESSAGE-D': {
            let newMessage = {
                id: 4,
                message: action.text,
                img: <img src='https://photoshablon.com/_ph/44/52953599.jpg' />
            }
            //stateCopy.dialogMessages.push(newMessage)  // 1. после нажатия кнопки адд пост добавляем свойства из переменной newMessage в раздел dialogMessages
            // stateCopy.newPostDialogPage = ''; // 2. очищаем окно текст ареа
            return {
                ...state,   // правильный вариант добавления поста
                dialogMessages: [...state.dialogMessages, newMessage],
                newPostDialogPage: ''
            }
        }
        case 'sn/dialog/UPDATE-NEW-MESSAGE': {
            //stateCopy.newPostDialogPage = action.newMess;   //при вводе текста, символы с помощью константы onMessageChangeActionCreator определяются к типу UPDATE_NEW_MESSAGE 
            //и свойства newMess заполняется символами и они парарельно находяться здесь, и мы определяем что свойство newPostDialogPage теперь будут = action.newMess 
            //(экшн потому что первый в onMessageChangeActionCreator и свойства newMess задается type, потом action
            return {    //самый правильный вариант, добавление ссылки в ретурне
                ...state,   
                newPostDialogPage: action.newMess
            }
        }
        default:
            return state
    }
}
//type ThunkType = BaseThunkType<ActionsType> здесь санок нету
type ActionsType = InferActionsTypes<typeof actions>
export const actions = {
    onMessageChangeActionCreator: (messageBody: string) => {
        return { type: 'sn/dialog/UPDATE-NEW-MESSAGE', newMess: messageBody } as const
},
btnAddMessageDActionCreator: (text: string) => {
    return { type: 'sn/dialog/BTN-ADD-MESSAGE-D', text } as const
}
}





export default dialogReducer;