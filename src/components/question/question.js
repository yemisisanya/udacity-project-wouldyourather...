import React, {Component} from 'react'
import {connect} from 'react-redux'
import { Col, Card, CardTitle, Button } from 'reactstrap';
import UserProfile from '../userProfile';
import { Redirect } from 'react-router-dom';
import './question.css'

class Question extends Component {
state = {
	selected: '',
	submit:false
}

checked = (e) => {
	this.setState({
	  selected: e
	})
  }

  submit = (e) => {
	  if(this.state.selected !== '') {
		this.setState({
			submit: true
		})
		
		this.props.question[0][this.state.selected].votes.push(this.props.user.id)
		this.props.user.answers[this.props.qId] = this.state.selected
	  }
  }

render() {
	const {qId, user, question} = this.props
	if(this.state.submit) {
		return <Redirect to={`/${qId}/results`}></Redirect>
	}
	return(
		<Col sm="6">
			<div className="questionBody">
				{ Object.keys(question).length !== 0 ?
				<div>
			<UserProfile id={user}/>
               <Card body>
				   {question.map((m) => {
					  return <div key={m.id}>
					   <CardTitle>{m.author} asked: </CardTitle>
					   <h3>Would You Rather</h3>
					   <label className="radioButton">
			<input className = "form-check-input"
                type = "radio"
            	onChange = {this.checked.bind(this, "optionOne")}
                id = {qId}
                value = "optionOne"
                checked = {user.answers[qId] !== undefined ? user.answers[qId] === "optionOne" :this.state.selected === "optionOne"}
                />
				{m.optionOne.text}
				</label>
				<label className="radioButton">
				<input className = "form-check-input"
					type = "radio"
					onChange = {this.checked.bind(this, "optionTwo")}
					id = {qId}
					value = "optionTwo"
					checked = {user.answers[qId] !== undefined ? user.answers[qId] === "optionTwo" : this.state.selected === "optionTwo" }
					/>
					{m.optionTwo.text}
					</label>
					   <Button onClick={(e) =>this.submit(qId,e)} value="submit">Submit</Button>
					   </div>
				   })}
		   </Card> 
		   </div>
		   : <div>
			   <h3>Oops! 404 - Page not found.</h3>
			   <p>What are you trying to do?</p>
			   </div>
				}
			</div>
			
            </Col>
	)
}
}

const mapStateToProps = ({questions,user}, props) => {
	const {qId} = props.match.params
	const question = questions.filter((q) => q.id === qId)
return {
	question,
	qId,
	user,
}
}
export default connect(mapStateToProps)(Question)