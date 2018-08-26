import {combineReducers} from 'redux'
import {user} from './redux/user.redux.js'
import {chatuser} from './redux/chatuser.redux'

export default combineReducers({user,chatuser})
//合并所有reducer 并且返回
