import React from "react";
import { connect } from "react-redux";
import { actions } from '../../../redux/profile-reducer.ts'
import MyPosts from "./MyPosts.tsx";

// const MyPostsContainer = (props) => {
//     return <StoreContext.Consumer>
//         { 
//         (store) => {
//                 let state = store.getState()
//                 let btnAddPost = () => {
//                     store.dispatch(btnAddPostActionCreator())
//                 }
//                 let onPostChange = (text) => {
//                     let action = onPostChangeActionCreator(text)
//                     store.dispatch(action)
//                 }
//                 return (
//                     <MyPosts
//                         updateNewPostMessage={onPostChange}
//                         btnAddPost={btnAddPost}
//                         posts={state.profilePage.profilePostData}
//                         valuePost={state.profilePage.newPostText}
//                     />
//                 )
//             }
//         }
//     </StoreContext.Consumer>
// }

//запускаем через connect

let mapProfileStateToProps = (state) => { // здесь коннект в свойства засовывает стейт
    return {
        profilePostData: state.profilePage.profilePostData,
        newPostText: state.profilePage.newPostText
    }
}
let mapDispatchToProps = (dispatch) => { // connect в свойста засунет внутренний диспатч  store.dispatch.bind(store) 
    return {
        btnAddPost: () => {
            dispatch(actions.btnAddPostActionCreator())
        },
        onPostChange: (text) => {
            dispatch(actions.onPostChangeActionCreator(text))
        }
    }
}

const MyPostsContainer = connect(mapProfileStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;
