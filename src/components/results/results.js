import React, {Component} from 'react'
import {connect} from 'react-redux'
import UserProfile from '../userProfile';
import './results.css';

class Results extends Component {
 
	render() {
		const {user, qId, question, percentVoteOne, percentVoteTwo} = this.props
		
		return (
			<div>
				{ Object.keys(question).length !== 0 ?
			<div className = "results" >
			{
			question.map(m=>
				<div key={m.id}>
					<div>
					<UserProfile id={user}/>
					<h2>
						{m.author} asked:
					</h2>
					</div>
					<div className={user.answers[qId] === "optionOne" ? "color" : "noColor"}>
					Would You Rather { m.optionOne.text}
					<p>
					{m.optionOne.votes.length} of {m.optionOne.votes.length + m.optionTwo.votes.length} votes
					</p>
					<div className="progress">
                       <div className="progress-bar" role="progressbar"  style={{"width":`${percentVoteOne}%`, "backgroundColor":"black"}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{percentVoteOne}</div>
					</div>
					{user.answers[qId] === "optionOne" &&
					<div className="vote">
				    <h3>Your Vote!</h3>
					</div>
                    }
					</div>
					<div className={user.answers[qId] === "optionTwo" ? "color" : "noColor"}>
					Would You Rather { m.optionTwo.text}
					<p>
					{m.optionTwo.votes.length} of {m.optionOne.votes.length + m.optionTwo.votes.length} votes
					</p>
					<div className="progress">
					<div className="progress-bar" role="progressbar" style={{"width":`${percentVoteTwo}%`, "backgroundColor":"black"}} aria-valuenow="75" aria-valuemin="0" aria-valuemax="100">{percentVoteTwo}</div>
					</div>
					{user.answers[qId]==="optionTwo" &&
					<div>
					<h3>Your Vote!</h3>
					</div>
					}
					</div>
				</div>
				)
			}</div> :
			<div>
			   <h3>Oops! 404 - Page not found.</h3>
			   <p>What are you trying to do?</p>
			   </div>
		}
			</div>
		)
	}
}

const mapStateToProps = ({questions,user}, props) => {
	const {qId} = props.match.params
	const question = questions.filter((q) => q.id === qId)
	const percentVoteOne = question.map((m) => {
		return (m.optionOne.votes.length/(m.optionOne.votes.length + m.optionTwo.votes.length) * 100).toFixed(2)
	})
	const percentVoteTwo = question.map((m) => {
		return (m.optionTwo.votes.length/(m.optionOne.votes.length + m.optionTwo.votes.length) * 100).toFixed(2)
	})
return {
	question,
	qId,
	user,
	percentVoteOne,
	percentVoteTwo
}
}
export default connect(mapStateToProps)(Results)