import React from "react";
import { Menu, Slider, Checkbox } from "antd";
import {
	DollarOutlined,
	DownSquareOutlined,
	StarOutlined,
} from "@ant-design/icons";

const ShopNav = ({
	price,
	handleSlider,
	categories,
	categoryIds,
	handleCheck,
	showStars,
	showSubs,
	showBrands,
	showColors,
	showShipping,
}) => {
	const showCategories = () =>
		categories.map((c) => (
			<div key={c._id}>
				<Checkbox
					onChange={handleCheck}
					value={c._id}
					name="category"
					checked={categoryIds.includes(c._id)}>
					{c.name}
				</Checkbox>
			</div>
		));

	function getItem(label, key, icon, children, type) {
		return {
			label,
			key,
			icon,
			children,
			type,
		};
	}
	const items = [
		// Price Slider
		getItem(
			<span className="h6">Price</span>,
			"priceSlider",
			<DollarOutlined style={{ fontSize: "1rem" }} />,
			[
				getItem(
					<Slider
						range
						value={price}
						onChange={handleSlider}
						tooltip={{ formatter: (v) => `$${v}` }}
						max="4999"
					/>,
					"priceSliderChild"
				),
			]
		),
		// Category Selection
		getItem(
			<span className="h6">Category</span>,
			"categorySelect",
			<DownSquareOutlined style={{ fontSize: "1rem" }} />,
			[getItem(showCategories(), "categorySelectChild")]
		),
		// Star Selection
		getItem(
			<span className="h6">Rating</span>,
			"starSelect",
			<StarOutlined style={{ fontSize: "1rem" }} />,
			[getItem(showStars(), "ratingSelectChild")]
		),
		// Sub Category Selection
		getItem(
			<span className="h6">Sub Categories</span>,
			"subSelect",
			<DownSquareOutlined style={{ fontSize: "1rem" }} />,
			[getItem(<div className="row">{showSubs()}</div>, "subSelectChild")]
		),
		// Brands Selection
		getItem(
			<span className="h6">Brands</span>,
			"brandSelect",
			<DownSquareOutlined style={{ fontSize: "1rem" }} />,
			[getItem(<div className="row">{showBrands()}</div>, "brandSelectChild")]
		),
		// Colors Selection
		getItem(
			<span className="h6">Colors</span>,
			"colorSelect",
			<DownSquareOutlined style={{ fontSize: "1rem" }} />,
			[getItem(<div className="row">{showColors()}</div>, "colorSelectChild")]
		),
		// Shipping Selection
		getItem(
			<span className="h6">Shipping</span>,
			"shippingSelect",
			<DownSquareOutlined style={{ fontSize: "1rem" }} />,
			[
				getItem(
					<div className="row">{showShipping()}</div>,
					"shippingSelectChild"
				),
			]
		),
	];

	return (
		<Menu
			defaultSelectedKeys={["shippingSelect"]}
			defaultOpenKeys={["shippingSelect"]}
			mode="inline"
			items={items}
		/>
	);
};

export default ShopNav;
