import React from 'react';
import { connect } from "react-redux";
import firebase from 'firebase';
import axios from 'axios'
import './custom.css'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Image from 'react-image-resizer';

const styles = {
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};

class Vote extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			catId: '',
			catUrl: '',
			switch: true,
			fav_id: ''
		};
	}

	componentDidMount(){
		this.getCat()
	}

	getCat = () => {
		axios.get('https://api.thecatapi.com/v1/images/search')
		.then(res => {
			this.setState({
				catId: res.data[0].id,
				catUrl: res.data[0].url
			})
		})
		.catch(error => {
			console.log(error)
		})
	}

	voteCat = (score) => {
		let vote = {image_id: this.state.catId, value: score, sub_id: this.props.auth.uid}
		console.log(vote)
		axios.post('https://api.thecatapi.com/v1/votes', vote,
			{headers: {
	        "x-api-key": firebase.functions().app_.options_.catkey
	      }
	    }
		)
		.then(res => {
			console.log(res)
			this.getCat()
		})
		.catch(error => {
			console.log(error)
		})
	}

	favCat = (event) => {
		event.preventDefault()
		let fav = {image_id: this.state.catId, sub_id: this.props.auth.uid}
		axios.post('https://api.thecatapi.com/v1/favourites', fav,
			{headers: {
	        "x-api-key": firebase.functions().app_.options_.catkey
	      }
	    }
		)
		.then(res => {
			console.log(res)
			this.setState({
				fav_id: res.data.id,
				switch: false
			})
		})
		.catch(error => {
			console.log(error)
		})
	}

	unFav = (event) => {
		axios.delete(`https://api.thecatapi.com/v1/favourites/${this.state.fav_id}`,
			{headers: {
	        "x-api-key": firebase.functions().app_.options_.catkey
	      }
	    }
		)
		.then(res => {
			console.log(res)
			this.setState({
				switch: true
			})
		})
		.catch(error => {
			console.log(error)
		})
	}

	voteDownCat = () => {}

	render() {
		const { classes } = this.props;
	  const bull = <span className={classes.bullet}>•</span>;

		return (
			<div>
				<Card>
					<div className="flex">
						<CardActions>
			        <Button size="small" onClick={() => {this.voteCat(1)}}>VOTE UP</Button>
			      </CardActions>
			      <CardActions>
			        <Button size="small" onClick={() => {this.voteCat(0)}}>VOTE DOWN</Button>
			      </CardActions>
			    </div>
		      <img src={this.state.catUrl} className="catimg" />
		      <div className="flex">
		      	{this.state.switch ? (
 						<CardActions>
				        <Button size="small" onClick={this.favCat}>ADD FAVORITE</Button>
				    </CardActions>
		      	) : 
		      	<CardActions>
				        <Button size="small" onClick={this.unFav}>REMOVE FAVORITE</Button>
				    </CardActions>
		      	}
			    </div>
		    </Card>
				
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

export default connect(mapStateToProps, null)(withStyles(styles)(Vote));
