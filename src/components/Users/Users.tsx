import React from "react";
import styles from "./users.module.css"
import userPhoto from '../../assets/images/219986.png'
import { NavLink } from "react-router-dom";
import Paginator from "../common/Paginator/Paginator.tsx"
import User from "./User"
import { UsersType } from "../../types/types";

type PropsType = {
    totalItemCount: number
    pageSize: number
    portionSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void  //вызывается но ничего не возвращает
    followingInProgress: (userId: number) => void //userId number, потом покадает в стейт в массив юзеров
    changeSubscriptionStatus: (id: number, subscrStatus: boolean) => void  //принимает два свойства но ничего не возвращает
    users: Array<UsersType>
}



const Users: React.FC<PropsType> = ({currentPage, onPageChanged, totalItemCount, pageSize, portionSize, followingInProgress, changeSubscriptionStatus, users }) => {

    // let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)  //округливаем в большую сторону из редюс тотюзкаунт /  пейд сайз
    // let pages = []   //созд массив под страницы пользователей
    // for (let i = 1; i <= pagesCount; i++) {  // создаем под условия страницы равные количеству юзеров и колво отобр юзеров на каждой стр
    //     pages.push(i) /// пушим (создаем) количество обьектов массива которое будет = колву страниц пользователей
    // }
    // ИСПОЛЬЗУЕМ ПАГИНАТОР

    return <div>

        {/* <div>
            {pages.map(p => { //перебираем массив пейджс и отображаем количество страниц сколько вышло
                return <span className={props.currentPage === p && styles.selectedPage}
                    onClick={(e) => (props.onPageChanged(p))}>{p} </span> //онклик передает екшн (кликнутую страницу) в метод онпостчейндж
            })}

        </div> */}
        {/* ТЕПЕРЬ ИСПОЛЬЗУЕМ ПАГИНАТОР */}
        <Paginator currentPage={currentPage} 
        onPageChanged={onPageChanged} 
        totalItemCount={totalItemCount} 
        pageSize={pageSize} 
        portionSize={portionSize}
        />  

        {

            users.map(u => <User
                key={u.id}
                user={u}
                followingInProgress={followingInProgress}
                changeSubscriptionStatus={changeSubscriptionStatus} />
            )
        }

    </div>
}




    export default Users


