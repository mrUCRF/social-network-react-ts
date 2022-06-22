import React, { Component } from "react";
import { initialStatePostType } from "../../../types/types";
import mp from './MyPosts.module.css'
import Post from "./Post/Post.tsx";


type MyPostsPropsType = {
    profilePostData: Array<initialStatePostType>
     btnAddPost: () => void
     onPostChange: (text: string) => void
     newPostText: string | null
}
const MyPosts: React.FC<MyPostsPropsType> = ({profilePostData, btnAddPost, newPostText}) => {
        console.log('RENDER POSTS')
    let postElem = profilePostData.map( p => <Post message={p.messagePost} likes={p.likeCount}/>)

let newPostElement = React.createRef()

let onBtnAddPost = () => {
    btnAddPost()
}

let onPostChange = () => { 
    let text = newPostElement.current.value;
    onPostChange(text);
}


    return (
        <div className={mp.item}>
            <h2>My Posts</h2>
            <div>
                <textarea onChange={onPostChange} 
                ref={newPostElement} 
                value={newPostText} 
                />
            </div>
            <div>
                <button onClick={onBtnAddPost}>Add Post</button>
            </div>
            <div className={mp.discrBlock}>
                { postElem }
            </div>
        </div>
    )
}





// class MyPosts extends Component {
// // shouldComponentUpdate(nextProps, nextState) {   ///запрещает перерисовывать компоненту, и не дает менять стейт (вводить текст для нового поста)
// //     return false
// // }
    
// render() {
//     console.log('RENDER YO')
//     let postElem = this.props.profilePostData.map( p => <Post message={p.messagePost} likes={p.likeCount}/>)

// let newPostElement = React.createRef()

// let onBtnAddPost = () => {
//     this.props.btnAddPost()
// }

// let onPostChange = () => { 
//     let text = newPostElement.current.value;
//     this.props.onPostChange(text);
// }


//     return (
//         <div className={mp.item}>
//             <h2>My Posts</h2>
//             <div>
//                 <textarea onChange={onPostChange} 
//                 ref={newPostElement} 
//                 value={this.props.newPostText} 
//                 />
                
//             </div>
//             <div>
//                 <button onClick={onBtnAddPost}>Add Post</button>
//             </div>
//             <div className={mp.discrBlock}>
//                 { postElem }
//             </div>
//         </div>
//     )
// }
// }

export default MyPosts