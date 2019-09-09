import React, {
	Component
  } from 'react';
import { connect } from 'react-redux';
import UserProfile from '../userProfile';

class Leaderboard extends Component {
 
render() {
const {usrs, users} = this.props

	  return(
		  <div>
			<section>
				<ul className="card">
					{usrs.map(m =>
					<UserProfile key ={users[m].id} id={users[m]}/>
						)}
				</ul>
			</section>
			</div>
	  )
  }
}

const mapStateToProps = ({users}) => {

return {
    users,
	usrs: Object.keys(users)
	.sort((a, b) => ((Object.keys(users[b].answers).length + users[b].questions.length) - (Object.keys(users[a].answers).length + users[a].questions.length)))
}
}
  export default connect(mapStateToProps)(Leaderboard);
