import React, { ChangeEvent } from "react";
//import Preloader from "../../common/Preloader/Preloader";
//import s from "./ProfileInfo.module.css"

type PropsType = {
    status: string 
    updateStatus: (status: string) => void
}
type StateType = {
    editMode: boolean
    status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {
    //statusInputRef = React.createRef()

    state = {
        editMode: false,
        status: this.props.status
    }


    activateEditMode = () => {    ///режим изменения статуса профиля на странице профиля
        this.setState({
            editMode: true
        })
        console.log(this.state.status)
    }

    deactivateEditMode = () => {
        this.setState({
            editMode: false
        });
        this.props.updateStatus(this.state.status)
    }
    currentStatus = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            status: e.currentTarget.value
        })
    }
    componentDidUpdate(prevProps: PropsType, prevState: StateType) {
        if (prevProps.status !== this.props.status) { //если в предыдущем состоянии пропсы не равны текущему значению пропсов (данные изменились), тогда меняем стейт:
            this.setState({
                status: this.props.status
            })
        }
    }



    render() {
        return (
            <div>
                {!this.state.editMode &&
                    <div>
                        <span onDoubleClick={this.activateEditMode}>{this.state.status || '-----'}</span>
                    </div>
                }
                {this.state.editMode &&
                    <div>
                        <span onBlur={this.deactivateEditMode}><input autoFocus={true} onChange={this.currentStatus} value={this.state.status} /></span>
                    </div>
                }
            </div>
        )
    }
}


export default ProfileStatus
