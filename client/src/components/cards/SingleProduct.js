import React, { useState } from "react";
import { Card, Tabs, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Laptop from "../../images/laptop.jpg";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

// const onTabChange = (key) => {
// 	console.log(key);
// };
// onChange={onTabChange}

// this is children component of product page
const SingleProduct = ({ product, onStarClick, star }) => {
	const [tooltip, setTooltip] = useState("Click to add to cart");

	// redux
	const { user, cart } = useSelector((state) => ({ ...state }));
	const dispatch = useDispatch();

	const handleAddToCart = () => {
		// create cart array
		let cart = [];
		if (typeof window !== "undefined") {
			// if cart is in local storage GET it
			if (localStorage.getItem("cart")) {
				cart = JSON.parse(localStorage.getItem("cart"));
			}
			// push new product to cart
			cart.push({
				...product,
				count: 1,
			});
			// remove duplicates
			let unique = _.uniqWith(cart, _.isEqual);
			// save to local storage (make sure you don't save duplicates)
			console.log("unique", unique);
			localStorage.setItem("cart", JSON.stringify(unique));
			// show tooltip
			setTooltip("Added to cart");
			// add to redux state
			dispatch({
				type: "ADD_TO_CART",
				payload: unique,
			});
			// show cart items in side drawer
			dispatch({
				type: "SET_VISIBLE",
				payload: true,
			});
		}
	};

	const { title, images, description, _id } = product;
	const tabItems = [
		{
			label: "Description",
			key: "1",
			children: `${description && description}`,
		},
		{
			label: "More",
			key: "2",
			children: "Call us on ################ to learn more",
		},
	];
	return (
		<>
			<div className="col-md-7">
				{images && images.length ? (
					<Carousel showArrows={true} autoPlay infiniteLoop>
						{images &&
							images.map((i) => (
								<img alt={i.public_id} src={i.url} key={i.public_id} />
							))}
					</Carousel>
				) : (
					<Carousel showArrows={true} autoPlay infiniteLoop>
						<img src={Laptop} alt="Default Product, none provided" />
					</Carousel>
				)}
				<Tabs defaultActiveKey="1" items={tabItems} />
				{/* <Tabs type="card">
					<TabPane tab="Description" key="1">
						{description && description}
					</TabPane>
					<TabPane tab="More" key="2">
						Call us on ################ to learn more
					</TabPane>
				</Tabs> */}
			</div>

			<div className="col-md-5">
				<h1 className="bg-info text-black p-3 rounded">{title}</h1>
				{product && product.ratings && product.ratings.length > 0 ? (
					showAverage(product)
				) : (
					<div className="text-center pt-1 pb-3">No ratings yet</div>
				)}

				<Card
					actions={[
						<Tooltip title={tooltip}>
							<a href="#0" onClick={handleAddToCart}>
								<ShoppingCartOutlined className="text-danger" /> <br /> Add to
								Cart
							</a>
						</Tooltip>,
						<Link to={"/"}>
							<HeartOutlined className="text-info" /> <br />
							Add to Wishlist
						</Link>,
						<RatingModal>
							<StarRating
								name={_id}
								numberOfStars={5}
								rating={star}
								changeRating={onStarClick}
								isSelectable={true}
								starRatedColor="red"
							/>
						</RatingModal>,
					]}>
					<ProductListItems product={product} />
				</Card>
			</div>
		</>
	);
};

export default SingleProduct;
