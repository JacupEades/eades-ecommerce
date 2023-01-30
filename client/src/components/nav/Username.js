import { useSelector } from "react-redux";

const UsernameTest = () => {
	let { user } = useSelector((state) => ({ ...state }));

	let userName = user.email && user.email.split("@")[0];

	return userName;
};

export default UsernameTest;
