import { connect } from "react-redux"
import Profile from "./Profile"
import React from "react";
import { getUserDataThunk, getUserStatusThunk, updateUserStatusThunk, savePhotoThunk, saveProfileDataThunk } from '../../redux/profile-reducer.ts'
import { withRouter } from "react-router-dom";
//import withAuthRedirect from '../../hoc/AuthRedirect'
import { compose } from "redux";



class ProfileContainer extends React.Component {
    refreshProfilePage() { //что бы не было дублирования кода, создаем свой метод и вызываем его в componentDidMount и componentDidUpdate
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.userId
            if (!userId) {
                this.props.history.push("/login")
            }
        }
        this.props.getUserDataThunk(userId)
        this.props.getUserStatusThunk(userId)
    }

    componentDidMount() {
        this.refreshProfilePage()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId !== prevProps.match.params.userId) {
            this.refreshProfilePage()
        }
    }

    // axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${userId}`)   ---вариант без санок
    // .then(response => {
    //     this.props.setUsersProfile(response.data)
    // })




    render() {

        return (
            <Profile {...this.props} 
            isOwner={!this.props.match.params.userId} //владелец страницы или нет (true/false)
            profile={this.props.profile} 
            status={this.props.status} 
            updateStatus={this.props.updateUserStatusThunk} 
            savePhoto={this.props.savePhotoThunk}
            saveProfileData={this.props.saveProfileDataThunk}/>
        )
    }
}



let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    userId: state.auth.userId
})
export default compose(
    withRouter,
    connect(mapStateToProps, { getUserStatusThunk, getUserDataThunk, updateUserStatusThunk, savePhotoThunk, saveProfileDataThunk }), // 3. потом этой
     // 2. потом этой
    //withAuthRedirect // 1. сначала оборач этой функц (отключили залогиненый режим)
)(ProfileContainer)
// let AuthRedirectComponent = withAuthRedirect(ProfileContainer)   --- этозарефакторили методом компосе прямо в експорт дефаулт
//let WithUrlDataContainerComponent = withRouter(AuthRedirectComponent)


//export default connect(mapStateToProps, {getUserDataThunk}) (WithUrlDataContainerComponent) ----