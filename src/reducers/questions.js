import { GET_QUESTIONS, ASK_QUESTION, USER_QUESTIONS } from '../actions/question.actions';

  export function questions (state = [], action) {
    switch (action.type) {
      case GET_QUESTIONS:
        return action.questions;
      default:
        return state;
    }
  }

  export function question (state = {}, action) {
    switch (action.type) {
      case ASK_QUESTION:
        return action.question;
      default:
        return state;
    }
  }

  export function userQuestions (state=[], action) {
    switch (action.type) {
      case USER_QUESTIONS:
        return action.user;
      default:
        return state;
    }
  }

  