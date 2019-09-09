import { combineReducers } from 'redux';
import { questions, userQuestions } from './questions';
import { users, user } from './users';

export default combineReducers({questions, userQuestions, users, user})
