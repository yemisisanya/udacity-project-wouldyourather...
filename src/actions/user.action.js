import {
  _getUsers
} from '../utils/_DATA'

export const GET_USERS = 'GET_USERS'
export const LOGIN_USER = 'LOGIN_USER'
export const SAVE_USER = 'SAVE_USER'

// get user
export const loginUser = user => {
  return {
    type: LOGIN_USER,
    user
  };
};



// get the login user 
export const getLoginUser = (user) => {
  return async dispatch => {
    _getUsers().then(response => {
      const usr = response[user]
      dispatch(loginUser(usr))
    })
    }
  };

// load users
const getUsers = users => {
  return {
    type: GET_USERS,
    users
  };
};

export const loadUsers = () => {
  return dispatch => {
    return _getUsers().then(response => dispatch(getUsers(response)));
  };
};
