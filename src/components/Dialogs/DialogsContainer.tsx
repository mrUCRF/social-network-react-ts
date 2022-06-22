import { connect } from "react-redux";
import { actions, initialStateDialogType } from '../../redux/dialog-reducer.tsx';
import Dialogs from "./Dialogs.tsx";
import withAuthRedirect from '../../hoc/AuthRedirect.tsx'
import { compose } from "redux";
import { AppStateType } from "../../redux/redux-store";



// const DialogsContainer = (props) => {    //// старый вариант через собственно созданный файл StoreContext.js
//     return <StoreContext.Consumer>
//         {
//             (store) => {
//                 //let state = store.getState().dialogPage
//                 let btnAddMessage = () => {
//                     store.dispatch(btnAddMessageDActionCreator())
//                 }
//                 let postChangeMessage = (text) => {
//                     let action = onMessageChangeActionCreator(text)
//                     store.dispatch(action)
//                 }
//                 return (
//                     <Dialogs btnAddMessage={btnAddMessage}
//                         postChangeMessage={postChangeMessage}
//                         dialogPage={store.getState().dialogPage}
//                         //valPost={store.getState().dialogPage.newPostDialogPage}
//                     />
//                     )
//             }
//         }
//     </StoreContext.Consumer>

// теперь создаем функции и коннектим их к стору через метод реакт-редакс:

// type mapStateToPropsType = {
//     dialogPage: initialStateType
// }
type mapStateToPropsType = {
    dialogPage: initialStateDialogType
}
const mapStateToProps = (state : AppStateType) => ({/// connect в свойства засунет store.dialogPage(dialog-reducer) (с redux-store.js) в mapStateToProps
    dialogPage: state.dialogPage
})   
    
// type mapDispatchToPropsType = {
//     btnAddMessage: (value: string) => void
//     postChangeMessage: (text: string) => void
// }

type mapDispatchToPropsType = {
    btnAddMessage: (value: string) => void
    postChangeMessage: (text: string) => void
}
// const mapDispatchToProps = (dispatch): mapDispatchToPropsType => { // connect в свойста засунет внутренний диспатч  store.dispatch.bind(store) 
//     return {
//         btnAddMessage: (value) => {
//             dispatch(actions.btnAddMessageDActionCreator(value))
//         },
//         postChangeMessage: (text) => {
//             dispatch(actions.onMessageChangeActionCreator(text))
//         }
//     }
// }   --- диспатч ту просп описали напрямую в коннекте




export default compose(
    connect<mapStateToPropsType, mapDispatchToPropsType, AppStateType>(mapStateToProps, {...actions}), // 2 потом оборачивает этой функцией
    withAuthRedirect  // 1 сначала оборачивает этой функц
)(Dialogs)
