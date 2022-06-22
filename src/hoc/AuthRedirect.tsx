import { Redirect } from "react-router-dom"
import React from "react"
import { connect } from "react-redux"

let mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
    })

const withAuthRedirect = (Component) => {
    class RedirectComponent extends React.Component {
        render() {
            if (!this.props.isAuth) {
                return <Redirect to='/login' />
            } 
            return (
                <Component {...this.props} />
            )
            
        }
    }
    const ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
    return ConnectedAuthRedirectComponent
    
}

export default withAuthRedirect