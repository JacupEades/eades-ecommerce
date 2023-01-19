import React, { useState } from "react";
import { Menu } from "antd";
import {
	AppstoreOutlined,
	SettingOutlined,
	UserOutlined,
	UserAddOutlined,
	LogoutOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import SubMenu from "antd/es/menu/SubMenu";

const Header = () => {
	const [current, setCurrent] = useState("home");
	const Item = Menu.Item;

	let dispatch = useDispatch();
	let { user } = useSelector((state) => ({ ...state }));

	let history = useHistory();

	const onClick = (e) => {
		// console.log(e.key);
		setCurrent(e.key);
	};

	const logout = () => {
		firebase.auth().signOut();
		dispatch({
			type: "LOGOUT",
			payload: null,
		});
		history.push("/login");
	};

	return (
		<Menu onClick={onClick} mode="horizontal" selectedKeys={[current]}>
			<Item key="home" icon={<AppstoreOutlined />}>
				<Link to="/">Home</Link>
			</Item>
			{!user && (
				<SubMenu
					icon={<UserAddOutlined />}
					key="headerSubMenu1"
					title="Register/ Login">
					<Item key="register" icon={<UserAddOutlined />}>
						<Link to="/register">Register</Link>
					</Item>
					<Item icon={<UserOutlined />} key="login">
						<Link to="/login">Login</Link>
					</Item>
				</SubMenu>
				// 	<Item key="register" icon={<UserAddOutlined />}>
				// 		<Link to="/register">Register</Link>
				// 	</Item>
				// )}
			)}
			{user && (
				<SubMenu
					icon={<SettingOutlined />}
					key="headerSubMenu2"
					title={user.email && user.email.split("@")[0]}>
					{user && user.role === "subscriber" && (
						<Item key="subscriberDB">
							<Link to="/user/history">Dashboard</Link>
						</Item>
					)}
					{user && user.role === "admin" && (
						<Item key="adminDB">
							<Link to="/admin/dashboard">Dashboard</Link>
						</Item>
					)}
					<Item icon={<LogoutOutlined />} key="logout" onClick={logout}>
						Logout
					</Item>
				</SubMenu>
			)}
		</Menu>
	);
};

export default Header;
