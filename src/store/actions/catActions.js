import firebase from 'firebase';
import axios from 'axios';

Array.prototype.move = function(from,to){
  this.splice(to,0,this.splice(from,1)[0]);
  return this;
};

export const getbreed = (breed) => {
	return dispatch => {
		axios.get(`https://api.thecatapi.com/v1/images/search?limit=8&breed_id=${breed}`,
			{headers: {
	        "x-api-key": firebase.functions().app_.options_.catkey,
	        "Content-Type": "application/json",
	      }
	    }
		)
		.then(res => {
			let ar = ['show']
			for (let i = 1; i < res.data.length; i++){
				ar.push('hide')
			}
			dispatch({type: 'GET_BREED_SUCCESS', breed: res.data, classes: ar, info: res.data[0].breeds[0]})
		})
		.catch(error => {
			console.log(error)
			dispatch({type: 'GET_BREED_ERROR'})
		})
	}
}

export const getObjs = () => {
	return dispatch => {
		axios.get(`https://api.thecatapi.com/v1/breeds`, 
			{headers: {
	        "x-api-key": firebase.functions().app_.options_.catkey,
	        "Content-Type": "application/json",
	      }
	    }
		)
		.then(res => {
			let obj
			let ar = [{value: "", label: "None"}]
			for (let i = 0; i < res.data.length; i++){
				obj = {value: res.data[i].id, label: res.data[i].name}
				ar.push(obj)
			}
			dispatch({type: 'GET_OBJS_SUCCESS', options: ar})
		})
		.catch(error => {
			console.log(error)
			dispatch({type: 'GET_OBJS_ERROR'})
		})
	}
}

export const getCategories = () => {
	return dispatch => {
		axios.get(`https://api.thecatapi.com/v1/categories`,
			{headers: {
	        "x-api-key": firebase.functions().app_.options_.catkey,
	        "Content-Type": "application/json",
	      }
	    }
		)
		.then(res => {
			let obj
			let ar = [{value: "", label: "None"}]
			for (let i = 0; i < res.data.length; i++){
				obj = {value: res.data[i].id, label: res.data[i].name}
				ar.push(obj)
			}
			dispatch({type: 'GET_CATEGORIES_SUCCESS', categories: ar})
		})
		.catch(error => {
			console.log(error)
			dispatch({type: 'GET_CATEGORIES_ERROR'})
		})
	}
} 


export const moveRight = (i, classes, breed) => {
	return dispatch => {		
		let ar = classes
		if (i === breed.length - 1){
			ar.move(i, 0)
		} else {
			ar.move(i, i + 1)
		}
		dispatch({type: 'CLASS_MOVED', classes: ar})
	}
}

export const moveLeft = (i, classes, breed) => {
	return dispatch => {
		let ar = classes
		if (i - 1 === -1){
			i = classes.length - 1
			ar.move(0, i)
		} else {
			ar.move(i, i - 1)
		}
		dispatch({type: 'CLASS_MOVED', classes: ar})
	}
}

export const getCats = (breed, category, type, limit) => {
	return dispatch => {
		axios.get(`https://api.thecatapi.com/v1/images/search?mime_types=${type}&limit=${limit}&category_ids=${category}&breed_id=${breed}`,
			{headers: {
	        "x-api-key": firebase.functions().app_.options_.catkey,
	        "Content-Type": "application/json",
	      }
	    }
		)
		.then(res => {
			for (let i = 0; i < res.data.length; i++){
				res.data[i].class = ""
				res.data[i].show_class = ""
			}
			dispatch({type: 'GET_CATS_SUCCESS', cats: res.data})
		})
		.catch(error => {
			console.log(error)
			dispatch({type: 'GET_CATS_ERROR'})
		})
	}
}

export const addFav = (idx, cats, hide, show) => {
	return dispatch => {
		let ar = cats
		ar[idx].class = hide
		ar[idx].show_class = show
		dispatch({type: 'HIDE_SUCCESS', favBtns: ar})
	}
}
