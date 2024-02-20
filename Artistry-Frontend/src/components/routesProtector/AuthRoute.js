import React from 'react';
import Login from '../../pages/LoginPage';

const AuthRoute = ({ children }) => {
	//get user from local storage
	const user = JSON.parse(localStorage.getItem('userInfo'));
	const isLoggedIn = user?.token ? true : false;

	//if user is logged in, return children component, if not return login page
	if (!isLoggedIn) return <Login />;
	return <>{children}</>;
};

export default AuthRoute;
