import React, { useState } from "react";
import styles from "./Paginator.module.css"
import cn from "classnames"


type PropsType = {
    totalItemCount: number
    pageSize: number
    portionSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void  //вызывается но ничего не возвращает
}

const Paginator: React.FC<PropsType> = ({ totalItemCount, pageSize, portionSize, currentPage, onPageChanged }) => {


    let pagesCount = Math.ceil(totalItemCount / pageSize)  //округливаем в большую сторону из редюс тотюзкаунт /  пейд сайз
    let pages = []   //созд массив под страницы пользователей
    for (let i = 1; i <= pagesCount; i++) {  // создаем под условия страницы равные количеству юзеров и колво отобр юзеров на каждой стр
        pages.push(i) /// пушим (создаем) количество обьектов массива которое будет = колву страниц пользователей
    }

    let portionCount = Math.ceil(pagesCount / portionSize)
    let [portionNumber, setPortionNumber] = useState<number>(1)
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    let rigthPotrionPageNumber = portionNumber * portionSize

    return (

        <div className={styles.paginator}>
            {
                portionNumber > 1 &&
                <button onClick={ () => { setPortionNumber(portionNumber - 1) } }>PREV</button> 
            }

                    {
                        pages.filter((p) => p >= leftPortionPageNumber && p <= rigthPotrionPageNumber)
                            .map((p) => { //перебираем массив пейджс и отображаем количество страниц сколько вышло
                                return <span className={cn({
                                    [styles.selectedPage]: currentPage === p
                                }, styles.pageNumber)}
                                    key={p}
                                    onClick={(e) => (onPageChanged(p))}>{p} </span> //онклик передает екшн (кликнутую страницу) в метод онпостчейндж
                            })
                    }

                    {
                        portionCount > portionNumber &&
                        <button onClick={() => { setPortionNumber(portionNumber + 1) }}>NEXT</button>
                    }
                </div>
    )
}



            export default Paginator



