import React, { useState, useEffect } from "react";
// import firebase from "firebase/compat/app";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Register = ({ history }) => {
	const [email, setEmail] = useState("");

	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		if (user && user.token) history.push("/");
	}, [history, user]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const config = {
			url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
			handleCodeInApp: true,
		};
		await auth.sendSignInLinkToEmail(email, config);
		toast.success(
			`Email is sent to ${email}. Click the link to complete your registration.`
		);
		// save user email in local storage
		window.localStorage.setItem("emailForRegistration", email);
		// clear state
		setEmail("");
	};

	const registerForm = () => (
		<form onSubmit={handleSubmit}>
			<input
				type="email"
				className="form-control"
				value={email}
				// https://stackoverflow.com/questions/71039088/what-is-onchange-e-setnamee-target-value-in-react-mean
				// Setting the state to the imput from the form feild
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Email"
				// Makes the form feild active on load
				autoFocus
			/>
			<br />
			<button type="submit" className="btn btn-raised">
				Register
			</button>
		</form>
	);

	return (
		<div className="container p-5">
			<div className="row">
				<div className="col-md-6 offset-md-3">
					<h4>Register</h4>
					{registerForm()}
				</div>
			</div>
		</div>
	);
};

export default Register;
