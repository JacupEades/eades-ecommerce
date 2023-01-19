import React from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const UserRoute = ({ children, ...rest }) => {
	const { user } = useSelector((state) => ({ ...state }));

	return user && user.token ? (
		// I removed this from the route because of a warning
		//  render={() => children}
		<Route {...rest} />
	) : (
		<LoadingToRedirect />
	);
};

export default UserRoute;
