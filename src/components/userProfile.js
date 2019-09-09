import React, {
	Component
  } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import { userQuestions } from '../actions/question.actions';

class UserProfile extends Component {


render() {
const {questionsAsked, id} = this.props
	return(
		<div className="card">
			<img className="img"
			src={`/${id.avatarURL}`}
			alt={id.name}
			/>
			<h5>
				{id.name}
			</h5>
		<div>
			<h6>
				Answered Questions: {Object.keys(id.answers).length}
			</h6>
		</div>

		<div>
			<h6>
			Questions Asked: {questionsAsked(id).length}
			</h6>
		<div>
			
		</div>
		</div>
		</div>
	)
}
}

const mapStateToProps = ({user, users, questions}) => {
const questionsAsked= (user) => Object.values(questions).filter((m) => m.author === user.id)
return {
    user,
	questions,
	users,
	questionsAsked
}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getUserQuestions: user => dispatch(userQuestions(user)),
	}
	
  }
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)