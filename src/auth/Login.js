import React from 'react';
//import axios from 'axios';
import {facebookAuth} from '../store/actions/authActions.js';
import {connect} from 'react-redux';
import facebook from './Facebook-Logo.png'
import './custom.css'

class Login extends React.Component {
	constructor(props){
		super(props);
		this.state = {};
	}

	componentDidMount(){}


	render() {
		return (
			<div className="Container">
				<h2>Login with facebook</h2>
				<img src={facebook} className="facebook" onClick={this.props.facebookAuth} />
			</div>
		)
	}
}


const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    error: state.auth.authError
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    facebookAuth: () => dispatch(facebookAuth()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);








//export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LandingPage));




//<img src={facebook} className="image" onClick={() => { props.facebookAuth(); props.history.push('get-started') } }/>
