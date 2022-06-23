import React from "react";
import styles from "./users.module.css"
import userPhoto from '../../assets/images/219986.png'
import { NavLink } from "react-router-dom";
// import Paginator from "../common/Paginator/Paginator.tsx"
import { UsersType } from "../../types/types";

type PropsType = {
    user: UsersType
    followingInProgress: Array<number>
    changeSubscriptionStatus: (userId: number, followed:boolean) => void
}

const User: React.FC<PropsType> = ({user, followingInProgress, changeSubscriptionStatus}) => { 
    return (
        <div>
            <span>
                <div>
                    <NavLink to={'/profile/' + user.id}>  {/* при наводе на аватар формируется адрес юзера для перехода на его стр */}
                        <img src={user.photos.small != null 
                            ? user.photos.small 
                            : userPhoto} alt='error' className={styles.userAvatar} />
                    </NavLink>
                </div>
                <div>

                    {user.followed 
                    ? <button disabled={followingInProgress.some(id => id === user.id)} onClick={() => { // при усл булевого значения свойства юзера фолловед, меняется статус кнопки
                        changeSubscriptionStatus(user.id, user.followed)

                        //вызываем метод с редьюсера для изменения статуса подписки прогруженых юзеров и отображения
                        // axios.delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`,
                        //     {
                        //         withCredentials: true,
                        //         headers: {
                        //             "API-KEY": "43ab35d3-a913-4ff3-b373-4c376aa7e8b5"
                        //         }
                        //     })
                        //     .then(response => {

                        //         if (response.data.resultCode === 0) { //резалтКод прописан в бекенде апишки, если 0 то успешно взяты данные о подписке
                        //             props.unfollow(u.id)
                        //         }

                        //     })
                    }}>Unfollow</button> : <button disabled={followingInProgress.some(id => id === user.id)} 
                    onClick={() => {changeSubscriptionStatus(user.id, user.followed)

                        //вызываем метод с редьюсера для изменения статуса поодписки прогруженых юзеров и отображения
                        // axios.post(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`, {},
                        //     {
                        //         withCredentials: true,
                        //         headers: {
                        //             "API-KEY": "43ab35d3-a913-4ff3-b373-4c376aa7e8b5"
                        //         }
                        //     })
                        //     .then(response => {
                        //         if (response.data.resultCode === 0) {
                        //             props.follow(u.id)
                        //         }

                        //     })
                    }}>Follow</button>


                    }
                </div>
            </span>
            <span>
                <span>
                    <div>{user.name}</div>
                    <div>{user.status}</div>
                </span>
                <span>
                    <div>{"u.location.country"}</div>
                    <div>{"u.location.city"}</div>
                </span>
            </span>
        </div>
    )

}




export default User


