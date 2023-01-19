import React from "react";
import { Card } from "antd";
import Laptop from "../../images/laptop.jpg";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";

const { Meta } = Card;

const ProductCard = ({ product }) => {
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

			// save to local storage (make sure you don't save duplicates)
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
					<a onClick={handleAddToCart}>
						<ShoppingCartOutlined className="text-danger" /> <br /> Add to Cart
					</a>,
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
