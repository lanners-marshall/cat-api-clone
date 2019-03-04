
const initState = {authError: null}
const authReducer = (state=initState, action) => {
	switch (action.type){
		case "FACEBOOK_SUCCESS":
			return {...state, authError: null}
		case "FACEBOOK_ERROR":
			return {...state, authError: action.payload}
		default: 
			return state
	}
}

export default authReducer;