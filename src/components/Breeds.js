import React from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import firebase from 'firebase';
import Select from 'react-select';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Flag from 'react-world-flags'
import StarRatings from 'react-star-ratings';

import Image from 'react-image-resizer';

import {getbreed, getObjs, moveRight, moveLeft} from '../store/actions/catActions'

const styles = {
  card: {
    minWidth: 275,
    marginTop: 15,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  font: {
    fontSize: 18,
  },
  margin: {
  	marginBottom: 15,
  },
  margin2: {
  	marginTop: 15,
  },
  pos: {
    marginBottom: 0,
  },
};


class Breeds extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			selectedOption: {value: "abys", label: "Abyssinian"} 
		};
	}

	componentDidMount(){
		this.props.getObjs()
		this.props.getbreed(this.state.selectedOption.value)
	}

	handleChange = (selectedOption) => {
    this.setState({ selectedOption }, () => { this.props.getbreed(this.state.selectedOption.value)});
  }

	render() {

		const { selectedOption } = this.state
		const {info} = this.props.cats
		const { classes } = this.props;

	  const bull = <span className={classes.bullet}>•</span>;
		return (
			<div>
				<Select
	        value={selectedOption}
	        onChange={this.handleChange}
	        options={this.props.cats.options}
	        className="margin"
	      />
	      <div>
      		{this.props.cats.breed.map((b, i ) => {
      			return (
      				<div className="flex3" key={i}>
      					<div className="flex2">
	      					<div className={this.props.cats.classes[i]}><button onClick={() => {this.props.moveLeft(i, this.props.cats.classes, this.props.cats.breed)}} className="circle left">+</button></div>
				            <img src={b.url} id={i} key={i} className={`${this.props.cats.classes[i]} cat`} />
				          <div className={this.props.cats.classes[i]}><button onClick={() => {this.props.moveRight(i, this.props.cats.classes, this.props.cats.breed)}} className="circle right">+</button></div>
				        </div>
								<Card className={`${classes.card} ${this.props.cats.classes[i]}`}>
						      <CardContent>
						        <Typography variant="h5" component="h2">
						          {info.name}
						        </Typography>
						        <Flag className="flag" code={info.country_code }/>
						        <Typography className={`${classes.font} ${classes.margin2} ${classes.pos}`} color="textSecondary">
						          {info.temperament}
						        </Typography>
						        <Typography component="p" className={`${classes.font} ${classes.margin} ${classes.margin2}`}>
						         {info.description}<br/>
						        </Typography>
						        <Typography component="div" className={`${classes.font} mWidth`}>
											<div className="flex4">
												<p>Affection Level</p> 
												<StarRatings starRatedColor="blue" numberOfStars={5} name='rating' rating={info.affection_level} starDimension="40px" />
											</div>
											<div className="flex4">
												<p>Adaptability</p> 
												<StarRatings starRatedColor="blue" numberOfStars={5} name='rating' rating={info.adaptability} starDimension="40px"/>
											</div>
											<div className="flex4">
												<p>Child Friendly</p> 
												<StarRatings starRatedColor="blue" numberOfStars={5} name='rating' rating={info.child_friendly} starDimension="40px"/>
											</div>
											<div className="flex4">
												<p>Dog Friendly</p> 
												<StarRatings starRatedColor="blue" numberOfStars={5} name='rating' rating={info.dog_friendly} starDimension="40px"/>
											</div>
											<div className="flex4">
												<p>Energy Level </p>
												<StarRatings starRatedColor="blue" numberOfStars={5} name='rating' rating={info.energy_level} starDimension="40px"/> 
											</div>
											<div className="flex4">
												<p>Grooming</p> 
												<StarRatings starRatedColor="blue" numberOfStars={5} name='rating' rating={info.grooming} starDimension="40px"/>
											</div>
											<div className="flex4">
												<p>Health Issues</p> 
												<StarRatings starRatedColor="blue" numberOfStars={5} name='rating' rating={info.health_issues} starDimension="40px"/>
											</div>
											<div className="flex4">
												<p>Intelligence</p> 
												<StarRatings starRatedColor="blue" numberOfStars={5} name='rating' rating={info.intelligence} starDimension="40px" />
											</div>
											<div className="flex4">
												<p>Shedding Level</p> 
												<StarRatings starRatedColor="blue" numberOfStars={5} name='rating' rating={info.shedding_level} starDimension="40px"/>
											</div>
											<div className="flex4">
												<p>Social Needs</p> 
												<StarRatings starRatedColor="blue" numberOfStars={5} name='rating' rating={info.social_needs} starDimension="40px"/>
											</div>
											<div className="flex4">
												<p>Stranger Friendly</p> 
												<StarRatings starRatedColor="blue" numberOfStars={5} name='rating' rating={info.social_needs} starDimension="40px"/>
											</div>
											<div className="flex4">
												<p>Social Needs</p> 
												<StarRatings starRatedColor="blue" numberOfStars={5} name='rating' rating={info.stranger_friendly} starDimension="40px"/>
											</div>
											<div className="flex4">
												<p>Vocalisation</p> 
												<StarRatings starRatedColor="blue" numberOfStars={5} name='rating' rating={info.vocalisation} starDimension="40px"/>
											</div>
						        </Typography>
						      </CardContent>
						      <CardActions>
						        <Button size="small"><a className="ahref" href={info.wikipedia_url}>WIKI</a></Button>
						        <Button size="small"><a className="ahref" href={info.vcahospitals_url}>VCA HOSPITALS</a></Button>
						        <Button size="small"><a className="ahref" href={info.vetstreet_url}>VET STREET</a></Button>
						        <Button size="small"><a className="ahref" href={info.cfa_url}>CFA.ORG</a></Button>
						      </CardActions>
						    </Card>
		          </div>
      			)
      		})}
      	</div>
			</div>
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


export default connect(mapStateToProps, {getbreed, getObjs, moveRight, moveLeft})(withStyles(styles)(Breeds));
