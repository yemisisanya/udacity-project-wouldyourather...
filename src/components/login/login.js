import React, {Component} from 'react'
import {connect} from 'react-redux'
import './login.css'
import {Button, Card, CardText, CardBody} from 'reactstrap'
import { getLoginUser, loadUsers } from "../../actions/user.action";
import { Redirect} from 'react-router-dom'
import { loadQuestions} from '../../actions/question.actions';

class Login extends Component {

    state = {
        loggedIn: false,
        }

    componentDidMount() {
		this.props.getUsers().then(response => {
            this.setState({
              users: response.users,
            })
          });
          this.props.getQuestions();     
	  }
    

    onClick = async (user, e) => {
        e.preventDefault();
        if(user !== "") {
            this.props.loginUser(user)
       }
       this.setState({
        loggedIn:true,
    })
    }
    
    render() {
        const {from} = this.props.location.state || {from: {pathname: '/'}}
        const {users } = this.props;


        if (this.state.loggedIn && users) {
            return <Redirect to={from}/>
        }

        return (
        <div> 
            <h3>SELECT A USER</h3>
            {users.map((user) => {
                return(
                <Card  key={user.id}>
                <img alt={user.name} className="img" src={user.avatarURL}/>
                <CardBody>
                <CardText>
                {user.name}
                </CardText>
                <Button value={user.id} onClick={e => this.onClick(user.id, e)} type="submit" id="submit" name="submit"
                className="btn-primary btn-block">{user.id}</Button>
                </CardBody>
            </Card>
                ) 
            })
            }
            
        </div>
        )
    }

}

const mapStateToProps = ({users, user}) => {
    return {
        users: Object.values(users).map((user) => {
            return user
        }),
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        getUsers: () => dispatch(loadUsers()),
        loginUser: user => dispatch(getLoginUser(user)),
        getQuestions: () => dispatch(loadQuestions()),
    }
    
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)