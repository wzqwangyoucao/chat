import {combineReducers} from 'redux'
import {user} from './redux/user.redux.js'
import {chatuser} from './redux/chatuser.redux'
import { chat } from './redux/chat.redux.js'

export default combineReducers({user,chatuser,chat})
//合并所有reducer 并且返回
