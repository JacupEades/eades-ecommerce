import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";
import { currentAdmin } from "../../functions/auth";

const AdminRoute = ({ children, ...rest }) => {
	const { user } = useSelector((state) => ({ ...state }));
	const [ok, setOk] = useState(false);

	useEffect(() => {
		if (user && user.token) {
			currentAdmin(user.token)
				.then((res) => {
					console.log("CURRENT ADMIN RES", res);
					setOk(true);
				})
				.catch((err) => {
					console.log("ADMIN ROUTE ERR", err);
					setOk(false);
				});
		}
	}, [user]);

	return ok ? (
		// I removed this from the route because of a warning
		//  render={() => children}
		<Route {...rest} />
	) : (
		<LoadingToRedirect />
	);
};

export default AdminRoute;
