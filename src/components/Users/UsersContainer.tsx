import { connect } from "react-redux";
import { actions, getUsersThunkCreator, changeSubscrThunkCreator } from "../../redux/users-reducer";
import React from "react";
import Users from './Users'
import Preloader from "../common/Preloader/Preloader";
import withAuthRedirect from "../../hoc/AuthRedirect";
import { compose } from "redux";
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFetching, getFollowingInProgress, getPortionSize } from "../../redux/users-selectors"
import { UsersType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";


type MapStatePropsType = {
    users: Array<UsersType>
    pageSize: number
    totalItemCount: number
    currentPage: number
    isFetching: boolean
    followingInProgress: Array<number>
    portionSize: number
    
}
type MapDispatchPropsType = {
    follow: () => void
    unfollow: () => void 
    getUsers: (currentPage: number, pageSize: number) => void
    changeSubscr: (id: number, status: boolean) => void
   
    
    //toggleFollowingProgress: (id: number, isFetching: boolean) => void
    
}
type PropsType = MapStatePropsType & MapDispatchPropsType

class UsersContainer extends React.Component<PropsType> { //React.Component<PropsType, StateType> - но в этом компонент стейт мы не используем

    // componentDidMount() { //метод вызывается один раз при загрузке страницы    --------вариант без санок
    //     this.props.toggleIsFetching(true) // запускаем прелоадер
    //     usersAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => { // старт стр,  в метод апишки передаем со стора стейта базовые данные для загрузки стр по этому адр
    //             this.props.toggleIsFetching(false) //убираем прелоадер
    //              this.props.setUsers(data.items) //передаем данные с апи в экш креатор и тот исходя из данных стр апи в стейт добавляет юзеров
    //              this.props.setTotalUsersCount(data.totalCount) // добавляем в стейт редьюсера даные об общ количестве пользователей
    //             })
    // } ------ вариант без санок
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }
    // onPageChanged = (pageNumber) => {  //свойство pageNumber(p) получили с презент комп Юзерс с события онКлик ----вариант без санок
    //    this.props.setCurrentPage(pageNumber) //свойство передаем в метод редюсера для изменения значение выбр страницы в стейте
    //    this.props.toggleIsFetching(true) // отображает прелоадер
    //    usersAPI.getUsers(this.props.currentPage, this.props.pageSize) //в фунцию апишки передаем со стейта стора каррент пейдж(туда с дидмаунта подтянулись данные апи, и заданный в стейте размер юзеров на странице)
    //    .then(data => {
    //     this.props.toggleIsFetching(false) //после прогрузки зен, убираем прелоадер
    //         this.props.setUsers(data.items) // передаем данные с апи в экш криейтор редьюсера, которы заполняет стейт юзерами выбранной страницы
    //    })
    // } -----вариант без санок
    onPageChanged = (pageNumber: number) => {
        this.props.getUsers(pageNumber, this.props.pageSize)
    }
    //     changeSubscriptionStatus = (id, status) => { -----вариант без санок
    //          this.props.toggleFollowingProgress(true, id)
    //         usersAPI.changeSubscribng(id, status).then(resultCode => { //когда отрабатывает и с апи приходит резалт код то меняем тогл деактив кнопки
    // this.props.toggleFollowingProgress(false, id)
    //         })
    //     } --- вариант без санок
    changeSubscriptionStatus = (id: number, status: boolean) => {
        this.props.changeSubscr(id, status)
    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader /> : null} {/* условие запуска прелоадера */}

            <Users 
            // totalItemCount={this.props.totalItemCount} /* прокидываем количество пользователей которое лягля в стейт из АПИ */
            //     pageSize={this.props.pageSize} /* размер юзеров на странице (неизменно указан в стейте) */
            //     currentPage={this.props.currentPage} /* прокидываем со стейта данные о выбранной странице (дефолт знач 1) */
            //     onPageChanged={this.onPageChanged} /* прокидываем метод с контейнера для работы с онклик (оклик передавать будет событие) */
            //     users={this.props.users} /* прокидываем обьек юзерс со стейта (туда он пришел с апи через компонентдидмаунт) */
            //     follow={this.props.follow} /* прокидываем экш креатор с редьюсера который меняет булево значение */
            //     unfollow={this.props.unfollow} /* прокидываем экш креатор с редьюсера который меняет булево значение */
            //     changeSubscriptionStatus={this.changeSubscriptionStatus}
            //     //toggleFollowingProgress={this.props.toggleFollowingProgress}
            //     followingInProgress={this.props.followingInProgress}
            //     portionSize={this.props.portionSize}
            />
        </>
    }
}


const mapStateToProps = (state: AppStateType): MapStatePropsType => { //это то что будет приходить через коннект в классовую конт компоненту и она будет передавать в презент Юзеры
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalItemCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        portionSize: getPortionSize(state)
    }
}
export default compose(
    //withAuthRedirect,
    connect<MapStatePropsType, MapDispatchPropsType, AppStateType>(mapStateToProps, {
        follow: actions.follow, unfollow: actions.unfollow,
        getUsers: getUsersThunkCreator,
        changeSubscr: changeSubscrThunkCreator
    })
)(UsersContainer)

// let AuthRedirectComponent = withAuthRedirect(UsersContainer)
// export default connect(mapStateToProps, {
//     follow, unfollow, setCurrentPage,
//     getUsers: getUsersThunkCreator,
//     changeSubscr: changeSubscrThunkCreator
// })(AuthRedirectComponent)