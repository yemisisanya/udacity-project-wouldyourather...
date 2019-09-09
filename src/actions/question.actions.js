import {
    _getQuestions, _saveQuestion, _saveQuestionAnswer
  } from '../utils/_DATA'
  export const GET_QUESTIONS = 'GET_QUESTIONS'
  export const ASK_QUESTION = 'ASK_QUESTION'
  export const USER_QUESTIONS='USER_QUESTIONS'
  
  // get questions
  const getQuestions = questions => {
    return {
      type: GET_QUESTIONS,
      questions
    };
  };

  const askQuestion = (question) => {
	return {
		type:ASK_QUESTION,
		question
	}
  }

 const getUserQuestions = (user) => {
  return {
    type: USER_QUESTIONS,
    user
  }
 } 

 export const loadQuestions = () => {
  return dispatch => {
    return _getQuestions().then(response => {
           const questions = Object.keys(response).map(question => response[question]);
             dispatch(getQuestions(questions));
      });
  };
};

  export const addQuestion = (question) => {
    return dispatch => {
	  return _saveQuestion(question)
	  .then(response => {
			 dispatch(askQuestion(response));
        });
    };
  };


export const saveQA = (user, qid, answer) => {
    return dispatch => {
	  return _saveQuestionAnswer(user, qid, answer)
	  .then(() => {
		  dispatch()
	  })
    };
  };

  export const userQuestions = (user) => {
    return dispatch => {
      return _getQuestions().then(response => {
             const userQ = Object.keys(response).filter(userQ => 
              response[userQ].author === user);
              dispatch(getUserQuestions(userQ))
    });
  }
};