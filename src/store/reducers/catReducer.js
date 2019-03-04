
const initialState = {
	breed: [],
	classes: [],
	info: '',
	options: [],
	categories: [],
	cats: [],
	error: null
}

const catsReducer = (state = initialState, action) => {
	switch (action.type){
		case "GET_BREED_SUCCESS":
			return {...state, breed: action.breed, classes: action.classes, info: action.info }
		case  "GET_BREED_ERROR":
			return {...state, error: 'failed request to get breeds'}
		case "GET_OBJS_SUCCESS":
			return {...state, options: action.options}
		case "GET_OBJS_ERROR":
			return {...state, error: 'failed to get objects'}
		case "CLASS_MOVED":
			return {...state, classes: action.classes}
		case "GET_CATEGORIES_SUCCESS":
			return {...state, categories: action.categories }
		case "GET_CATEGORIES_ERROR":
			return {...state, error: 'error getting categories'}
		case "GET_CATS_SUCCESS":
			return {...state, cats: action.cats}
		case "GET_CATS_ERROR":
			return {...state, error: 'error getting cats'}
		case "HIDE_SUCCESS":
			return {...state, favBtns: action.favBtns}
		default:
			return state
	}
}

export default catsReducer