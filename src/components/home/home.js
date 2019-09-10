import React, {Component} from 'react'
import {connect} from 'react-redux'
import './home.css'
import { Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Card, CardTitle, CardText, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { loadQuestions, userQuestions } from '../../actions/question.actions';

class Home extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          activeTab: '1',
          uId:'',
          aId:'',
          prev:''
        };
      }

  componentDidMount() {
    this.props.getQuestions(); 
    this.props.getUserQuestions(this.props.user.id);
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
			prev: nextProps.user
		})
        if (nextProps.user !== this.props.user) {
          return this.props.user
        }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }


  onClickUnansQ = (qId) => {
        this.setState({
            uId: qId
        })
  }
  onClickAnsQ = (qId) => {
    this.setState({
        aId: qId
    })
  }

render() {
    const {ansQ, unansQ} = this.props
    if(this.state.aId) {
      return <Redirect to={`/${this.state.aId}/results`}></Redirect>
    }

    if(this.state.uId) {
        return <Redirect to={`/question/${this.state.uId}`}></Redirect>
    }

    return (
      
        <div>
         { this.state.prev &&
         <div>
           <div className="brandName">
           <h3>Hi, {this.props.user.name}. Welcome to Would You Rather...</h3>
             </div>
        <Nav tabs>
            <NavItem>
               <NavLink onClick={()=>{this.toggle('1')}} active={this.state.activeTab === '1'}>Unanswered</NavLink>
            </NavItem>
            <NavItem>
               <NavLink onClick={()=>{this.toggle('2')}} active={this.state.activeTab === '2'}>Answered</NavLink>
            </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
        <TabPane tabId="1">
          <Row>
          <Col sm="6">
           {unansQ.map((unans) => (
               <Card key={unans.id} body>
               <CardTitle>{unans.author} asked: </CardTitle>
               <CardText>{unans.optionOne.text} or {unans.optionTwo.text}</CardText>
               <Button onClick={(e)=> this.onClickUnansQ(unans.id,)} value="answer">Answer</Button>
           </Card>
           ))}
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
          <Col sm="6">
           {ansQ.map((ans) => (
               <Card key={ans.id} body>
               <CardTitle>{ans.author} asked: </CardTitle>
               <CardText>{ans.optionOne.text} or {ans.optionTwo.text}</CardText>
               <Button onClick={(e)=> this.onClickAnsQ(ans.id,)} value="results">Results</Button>
           </Card>
           ))}
            </Col>
          </Row>
        </TabPane>
      </TabContent> 
      </div>
         }   
      </div>
    )
}
}

const mapStateToProps = ({users, user,questions, userQuestions}) => {
  const ansQ =  Object.values(questions).filter((question) =>
	question.optionOne.votes.includes(user.id) || question.optionTwo.votes.includes(user.id)
	).sort((a, b) => {
        return b.timestamp - a.timestamp 
      })

	const unansQ = Object.values(questions).filter((question) =>
	!question.optionOne.votes.includes(user.id) && !question.optionTwo.votes.includes(user.id)).sort((a, b) => {
        return b.timestamp - a.timestamp 
      })

  
    return {
       user,
       questions,
       ansQ,
       unansQ
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
      getQuestions: () => dispatch(loadQuestions()),
      getUserQuestions: user => dispatch(userQuestions(user)),
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)