import React, { useState } from "react";
import { Menu, Badge } from "antd";
import {
	AppstoreOutlined,
	SettingOutlined,
	UserOutlined,
	UserAddOutlined,
	LogoutOutlined,
	ShoppingOutlined,
	ShoppingCartOutlined,
	DashboardOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import Search from "../forms/Search";
import Username from "./Username";

const Header = () => {
	const [current, setCurrent] = useState("home");

	let dispatch = useDispatch();
	let { user, cart } = useSelector((state) => ({ ...state }));

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

	const noUserItems = [
		{
			type: "group",
			children: [
				{
					label: <Link to="..">Home</Link>,
					key: "home",
					icon: <AppstoreOutlined />,
				},
				{
					label: <Link to="/shop">Shop</Link>,
					key: "shop",
					icon: <ShoppingOutlined />,
				},
				{
					label: (
						<Link to="/cart">
							<Badge count={cart.length} offset={[9, 0]}>
								Cart
							</Badge>
						</Link>
					),
					key: "cart",
					icon: <ShoppingCartOutlined />,
				},
			],
		},

		{
			type: "group",
			children: [
				{ label: <Search />, key: "search" },
				{
					label: <Link to="/register">Register</Link>,
					key: "register",
					icon: <UserAddOutlined />,
				},
				{
					label: <Link to="/login">Login</Link>,
					key: "login",
					icon: <UserOutlined />,
				},
			],
		},
	];

	const subscriberUserItems = [
		{
			type: "group",
			children: [
				{
					label: <Link to="..">Home</Link>,
					key: "home",
					icon: <AppstoreOutlined />,
				},
				{
					label: <Link to="/shop">Shop</Link>,
					key: "shop",
					icon: <ShoppingOutlined />,
				},
				{
					label: (
						<Link to="/cart">
							<Badge count={cart.length} offset={[9, 0]}>
								Cart
							</Badge>
						</Link>
					),
					key: "cart",
					icon: <ShoppingCartOutlined />,
				},
			],
		},

		{
			type: "group",
			children: [
				{
					label: <Search />,
				},
				{
					label: <Username />,
					key: "SubMenu",
					icon: <UserOutlined />,
					children: [
						{
							label: <Link to="/user/history">Settings</Link>,
							key: "userDB",
							icon: <SettingOutlined />,
						},
						{
							label: <Link to="/register">Logout</Link>,
							key: "logout",
							icon: <LogoutOutlined />,
							onClick: logout,
						},
					],
				},
			],
		},
	];

	const adminUserItems = [
		{
			type: "group",
			children: [
				{
					label: <Link to="..">Home</Link>,
					key: "home",
					icon: <AppstoreOutlined />,
				},
				{
					label: <Link to="/shop">Shop</Link>,
					key: "shop",
					icon: <ShoppingOutlined />,
				},
				{
					label: (
						<Link to="/cart">
							<Badge count={cart.length} offset={[9, 0]}>
								Cart
							</Badge>
						</Link>
					),
					key: "cart",
					icon: <ShoppingCartOutlined />,
				},
			],
		},

		{
			type: "group",
			children: [
				{
					label: <Search />,
				},
				{
					label: <Username />,
					key: "SubMenu",
					icon: <UserOutlined />,
					children: [
						{
							label: <Link to="/admin/dashboard">Dashboard</Link>,
							key: "adminDB",
							icon: <DashboardOutlined />,
						},
						{
							label: <Link to="/user/history">Admin Settings</Link>,
							key: "adminSettings",
							icon: <SettingOutlined />,
						},
						{
							label: <Link to="/register">Logout</Link>,
							key: "logout",
							icon: <LogoutOutlined />,
							onClick: logout,
						},
					],
				},
			],
		},
	];

	const items = () => {
		if (user && user.role === "admin") {
			return adminUserItems;
		} else if (user && user.role === "subscriber") {
			return subscriberUserItems;
		} else {
			return noUserItems;
		}
	};

	return (
		//! old way of finding user name in:
		// title={user.email && user.email.split("@")[0]}
		<Menu
			onClick={onClick}
			selectedKeys={[current]}
			mode="horizontal"
			items={items()}
		/>
	);
};

export default Header;
