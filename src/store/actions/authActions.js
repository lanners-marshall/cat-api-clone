export const facebookAuth = () => {
	return (dispatch, getState, {getFirebase}) => {
		const firebase = getFirebase();
		let provider = new firebase.auth.FacebookAuthProvider();
		firebase.auth().signInWithPopup(provider)
		.then(() => {
			dispatch({type: "FACEBOOK_SUCCESS"})
		})
		.catch(error => {
			console.log(error)
			dispatch({type: 'FACEBOOK_ERROR', payload: error.message})
		})
	}
}