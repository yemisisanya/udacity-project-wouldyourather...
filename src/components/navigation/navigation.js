import React, {Component} from 'react'
import {NavLink, Redirect} from 'react-router-dom';
import './navigation.css';
import {connect} from 'react-redux';
import {Button, Nav, Navbar, NavItem, NavLink as NavL} from 'reactstrap';

class Navigation extends Component {
    state ={
        loggedOut: false,
      }
      
   
    logout = () => {
		this.setState({loggedOut:true});
		}

    render() {
        
        if(this.state.loggedOut){
			return <Redirect to="/login"/>
		  }

        return (
                <Navbar>
                    <Nav className="navMain">
                        <NavItem>
                            <NavL tag={NavLink} exact to="/">Home</NavL>
                        </NavItem>
                        <NavItem>
                            <NavL tag={NavLink}
                            to="/leaderboard">Leaderboard</NavL>
                        </NavItem>
                        <NavItem>
                            <NavL tag={NavLink} to="/add">New
                                Question</NavL>
                        </NavItem>
                        
                        <NavItem>
                           <Button onClick={this.logout.bind(this)}>LOGOUT</Button>
                           
                        </NavItem>
                    </Nav>
                </Navbar>
        )
    }
}

function mapStateToProps({user}) {
    return {
        user
    }
}

export default connect(mapStateToProps)(Navigation)