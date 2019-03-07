import React from 'react';
import axios from 'axios';
import firebase from 'firebase'
import { connect } from "react-redux";

class Favs extends React.Component {
	constructor(props){
		super(props);
		this.state = {};
	}

	componentDidMount(){
		//axios.get('https://api.thecatapi.com/v1/favourites')
	}

	render() {
		console.log(this.props)
		return (
			<div></div>
		)
	}
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    error: state.auth.authError,
    cats: state.cats
  }
}

export default connect(mapStateToProps, null)(Favs);
