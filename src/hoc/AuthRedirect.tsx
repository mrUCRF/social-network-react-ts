import { Routes, Route } from "react-router-dom"
import React from "react"
import { connect } from "react-redux"

let mapStateToPropsForRedirect = (state: { auth: { isAuth: any } }) => ({
    isAuth: state.auth.isAuth
    })
    type MapPropsType = {
        isAuth: boolean
    }
    type DispatchPropsType = {
    }
export function withAuthRedirect<WCP>(Component: React.ComponentType<WCP>) {
    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        const {isAuth, ...restProps} = props
        
            if (!isAuth) {
                return <Route path='/login' />
            } 
            return (
                <Component {...restProps as WCP} />
            )
            
        
    }
    const ConnectedAuthRedirectComponent = connect(mapStateToPropsForRedirect)(RedirectComponent)
    return ConnectedAuthRedirectComponent
    
}

export default withAuthRedirect