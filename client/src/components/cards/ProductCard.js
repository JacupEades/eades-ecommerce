import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import Laptop from "../../images/laptop.jpg";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";

const { Meta } = Card;

const ProductCard = ({ product }) => {
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

	// destructure
	const { title, description, images, slug, price } = product;

	return (
		<>
			{product && product.ratings && product.ratings.length > 0 ? (
				showAverage(product)
			) : (
				<div className="text-center pt-1 pb-3">No ratings yet</div>
			)}
			<Card
				// className="mt-4"
				cover={
					<img
						src={images && images.length ? images[0].url : Laptop}
						alt="Default Product, none provided"
						style={{ height: "150px", objectFit: "cover" }}
						className="p-1"
					/>
				}
				actions={[
					<Link to={`/product/${slug}`}>
						<EyeOutlined className="text-primary" /> <br /> View Product
					</Link>,
					<Tooltip title={tooltip}>
						<a
							href="#0"
							onClick={handleAddToCart}
							className={product.quantity < 1 ? "inactiveLink" : ""}>
							<ShoppingCartOutlined className="text-danger" /> <br />
							{product.quantity < 1 ? "Out of stock" : "Add to cart"}
						</a>
					</Tooltip>,
				]}>
				<Meta
					title={`${title} - $${price}`}
					description={`${description && description.substring(0, 40)}...`}
				/>
			</Card>
		</>
	);
};

export default ProductCard;
