import { LOGIN_USER, GET_USERS } from '../actions/user.action';

export function users(state = {}, action) {
    switch (action.type) {
      case GET_USERS:
        return action.users;
      default:
        return state;
    }
  }

  export function user (state = [], action) {
    switch (action.type) {
      case LOGIN_USER:
        return action.user;
      default:
        return state;
    }
  }

