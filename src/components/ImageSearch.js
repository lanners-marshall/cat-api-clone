import React from 'react';
import axios from 'axios';
import Select from 'react-select';
import firebase from 'firebase';

import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';

import {getbreed, getObjs, getCategories, getCats, addFav} from '../store/actions/catActions'

import './custom.css'
import Image from 'react-image-resizer';

import MediaQuery from 'react-responsive';

import heart from './heart.png'

const type = [
  { value: 'jpg,png,gif', label: 'All' },
  { value: 'jpg,png', label: 'Static' },
  { value: 'gif', label: 'Animated' }
];

const totalCats = [
  { value: '8', label: '8' },
  { value: '16', label: '16' },
  { value: '32', label: '32' },
  { value: '64', label: '64' },
]

const styles = {};

const image = {
	border: '1px solid #ccc',
	background: '#fefefe',
	margin: "10px auto" 
}

class ImageSearch extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			selectedOption: { value: '', label: 'None' },
			selectedOption2: { value: '', label: 'None'},
			selectedOption3: { value: 'all', label: 'All' },
			selectedOption4: { value: '8', label: '8' },
			spacing: '16',
			currentPage: 1,
      catsPerPage: 8,
		};
	}

	handleClick = (event) => {
		this.setState({
			currentPage: Number(event.target.id)
		})
	}

	componentDidMount(){
		this.props.getObjs()
		this.props.getCategories()
		this.props.getCats(this.state.selectedOption.value, this.state.selectedOption2.value, this.state.selectedOption3.value, this.state.selectedOption4.value)
	}

	handleChangeUI = key => (event, value) => {
    this.setState({
      [key]: value,
    });
  };

	handleChange = (selectedOption) => {
     this.setState({ selectedOption },
    	() => {this.props.getCats(this.state.selectedOption.value, this.state.selectedOption2.value, this.state.selectedOption3.value, this.state.selectedOption4.value)}
    );
  }

  handleChange2 = (selectedOption2) => {
    this.setState({ selectedOption2 },
    	() => {this.props.getCats(this.state.selectedOption.value, this.state.selectedOption2.value, this.state.selectedOption3.value, this.state.selectedOption4.value)}
    );
  }

  handleChange3 = (selectedOption3) => {
    this.setState({ selectedOption3 },
    	() => {this.props.getCats(this.state.selectedOption.value, this.state.selectedOption2.value, this.state.selectedOption3.value, this.state.selectedOption4.value)}
    );
  }

  handleChange4 = (selectedOption4) => {
    this.setState({ selectedOption4 },
    	() => {this.props.getCats(this.state.selectedOption.value, this.state.selectedOption2.value, this.state.selectedOption3.value, this.state.selectedOption4.value)}
    );
  }

  handleChange5 = (selectedOption5) => {
    this.setState({ selectedOption5 },
    	() => {this.props.getCats(this.state.selectedOption.value, this.state.selectedOption2.value, this.state.selectedOption3.value, this.state.selectedOption4.value)}
    );
  }

  favCat = (event) => {
  	event.preventDefault()

  	let arr = event.target.id.split(",")
  	let catId = arr[0]
		let index = arr[1] 
  	let idexs = []

  	if (this.state.currentPage > 1){
  		let nums = 	this.state.currentPage * this.state.catsPerPage
  		for (let i = nums - 8; i < nums; i++ ){
  			idexs.push(i)
  		}
  		index = idexs[index]
  	}

		let fav = {image_id: catId, sub_id: this.props.auth.uid}
		axios.post('https://api.thecatapi.com/v1/favourites', fav,
			{headers: {
	        "x-api-key": firebase.functions().app_.options_.catkey
	      }
	    }
		)
		.then(res => {
			console.log(res)
			this.props.addFav(index, this.props.cats.cats, 'hidden', 'show')
		})
		.catch(error => {
			console.log(error)
		})
	}

	render() {
		const { selectedOption, selectedOption2, selectedOption3, selectedOption4, selectedOption5, currentPage, catsPerPage, spacing } = this.state;
		const { classes } = this.props;
    const {cats} = this.props.cats
    const indexOfLastCat = currentPage * catsPerPage;
    const indexOfFirstCat = indexOfLastCat - catsPerPage;
    const currentCats = cats.slice(indexOfFirstCat, indexOfLastCat);
    const pageNumbers = [];

    console.log(this.props.cats.cats)

    for (let i = 1; i <= Math.ceil(cats.length / catsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <button
          key={number}
          id={number}
          onClick={this.handleClick}
          className="buttonPag"
        >
          {number}
        </button>
      );
    });
		return (

			<div>
				<div className="flex2">
					<div className="selector">
						<p>Breed</p>
						<Select
			        value={selectedOption}
			        onChange={this.handleChange}
			        options={this.props.cats.options}
			        className={"selectorBar"}
			      />
			    </div>
			    <div className="selector">
			      <p>Category</p>
			      <Select
			        value={selectedOption2}
			        onChange={this.handleChange2}
			        options={this.props.cats.categories}
			        className={"selectorBar"}
			      />
	      	</div>
	      </div>
	      <div className="flex2">
		      <div className="selector">
			      <p>Type</p>
			      <Select
			        value={selectedOption3}
			        onChange={this.handleChange3}
			        options={type}
			        className={"selectorBar"}
			      />
			    </div>
			    <div className="selector">
			      <p>Total</p>
			      <Select
			        value={selectedOption4}
			        onChange={this.handleChange4}
			        options={totalCats}
			        className={"selectorBar"}
			      />
		      </div>
		    </div>
	      <MediaQuery query="(orientation: landscape)">
		      <div className="catSearchDiv">
		      	{currentCats.map((c, i) => {
		      		return (
		      		<div key={i} className="catCard">
					      <Image
								  src={c.url}
								  width={420}
								  height={420}
								  style={image}
								  key={i}
								/>
								<img src={heart} className={`heart ${c.show_class}`} />
								<button className={`${c.class} favButton`} id={[c.id, i]} onClick={this.favCat}>ADD FAVORITE</button>
							</div>
		      		)
		      	})}
		      </div>
	      </MediaQuery>
	      <MediaQuery query="(orientation: portrait)">
		      <div className="catSearchDiv">
		      	{currentCats.map((c, i) => {
		      		return (
		      			<div key={i} className="catCard">
						      <Image
									  src={c.url}
									  width={370}
									  height={370}
									  style={image}
									  key={i}
									/>
									<img src={heart} className={`heart ${c.show_class}`} />
									<button className={`${c.class} favButton`} id={[c.id, i]} onClick={this.favCat}>ADD FAVORITE</button>
								</div>
		      		)
		      	})}
		      </div>
	      </MediaQuery>
	      <div>
          {renderPageNumbers}
        </div>
      <div>
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

ImageSearch.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {getbreed, getObjs, getCategories, getCats, addFav})(withStyles(styles)(ImageSearch));

