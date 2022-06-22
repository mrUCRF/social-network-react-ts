import React from "react";
import p from './Post.module.css';

type PostPropsType = {
    idAvatar: string
    message: string
    likes: number | string
}
const Post: React.FC<PostPropsType> = ({idAvatar, message, likes}) => {
return (
<div className={p.item}>
<img src="https://mena.org.ua/wp-content/uploads/2014/03/avatar.png"/>
    <b>{idAvatar} {message}</b>
    <div>
    {likes}
    </div>
</div>
)
}

export default Post