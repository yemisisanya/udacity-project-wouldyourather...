import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import {connect} from 'react-redux';
import Navigation from './navigation/navigation';


const PrivateRoute = ({component: Component, Auth, user, ...rest}) => (  
    <Route {...rest} render={(props) => {
        return (
            Auth
                ?
                <div>
                <Navigation user={user}/>
                <Component {...props}/>
                </div>
                : 
                <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                }}/>
        )
    }}/>
)

function mapStateToProps({user}) {
    return {
        Auth: !isEmpty(user)
    }
}

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
export default connect(mapStateToProps)(PrivateRoute)