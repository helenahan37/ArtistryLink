import React from 'react';

const AuthRoute = ({ children }) => {
	//get user from local storage
	const user = JSON.parse(localStorage.getItem('userInfo'));
	const isAdmin = user?.user?.isAdmin ? true : false;

	//if user is admin, return children component, if not-accsee denied
	if (!isAdmin) return <h1>Access Denied, Admin Only</h1>;
	return <>{children}</>;
};

export default AuthRoute;
