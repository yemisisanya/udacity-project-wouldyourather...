import React, {
	Component
  } from 'react';
import { connect } from 'react-redux';
import { addQuestion } from '../../actions/question.actions';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Redirect} from 'react-router-dom';

class NewQuestion extends Component {

state = {
	question: {
		author:'',
		optionOne: '',
		optionTwo: '',
	},
	prev:'',
	home:false
}

onChange = (e) => {
	const {value} = e.target

	this.setState({
		prev:value
	})
	this.setState(() => ({
		question: {
			optionOne: this.state.prev,
			optionTwo: value,
			author:this.props.user.id
		},
	}))
}

onSubmit = (e) => {
	e.preventDefault();
	
	this.props.dispatch(addQuestion(this.state.question))
	 this.setState(() => ({
		question: {
			optionOne: '',
			optionTwo:'',
			author:''
		},
		home:true
	}))

}
render() {
if (this.state.home === true) {
    return <Redirect to='/'/>
}
	 return (
		 <div>
		<Form onSubmit = {this.onSubmit}>
			<Label for="wouldyourather">Would You Rather: </Label>
        <FormGroup>
          <Label for="optionOne">Option One</Label>
          <Input onChange={this.onChange} type="input" name="optionOne" id="optionOne" placeholder="Enter option one" />
        </FormGroup>
        <FormGroup>
          <Label for="optionTwo">Option Two</Label>
          <Input onChange={this.onChange} type="input" name="optionTwo" id="optionTwo" placeholder="Enter option two" />
        </FormGroup>
		<Button>Submit</Button>
		</Form>
		</div>
	 )
 }
}
const mapStateToProps = ({user, question, questions}) => {
	return {
		user,
        question,
        questions
	}
	}
export default connect(mapStateToProps)(NewQuestion)