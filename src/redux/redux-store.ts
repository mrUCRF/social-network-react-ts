import { combineReducers, createStore, applyMiddleware, compose, Action } from "redux";
import  authReducer  from "./auth-reducer.ts";
import dialogReducer from './dialog-reducer.tsx';
import profileReducer from './profile-reducer.ts';
import sidebarReducer from './sidebar-reducer.ts';
import usersReducer from './users-reducer.ts';
import thunkMiddleware, { ThunkAction } from 'redux-thunk' 
import appReducer from './app-reducer.ts'
//import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
    dialogPage: dialogReducer,
    profilePage: profileReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
   auth: authReducer,
   app: appReducer
   //form: formReducer
})
type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType> //экспортированный тип всего глобального стейта
// type PropertiesTypes<T> = T extends {[key: string]: infer U} ? U : never   //если этот обьект является (extend) обьектом, у кторого есть ключ, то определи (infer) и 
// //верни U (тип экшн криейтора) или если конструкция не такая то верни never (ничего)
// export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertiesTypes<T>>   //ActionsType<T extends {[key: string]: (...args: any[]) => any} -- уточнение (ограничение) по передаче типа, что значение у нас является только функцией

export type InferActionsTypes<T> = T extends { [ keys: string]: (...args: any[]) => infer U } ? U : never // более сокращенная верс кода выше
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>

//let store = createStore(reducers, applyMiddleware(thunkMiddleware));  

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))
//@ts-ignore
window.store = store



export default store