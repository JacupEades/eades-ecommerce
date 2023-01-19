import React from "react";
import { Card, Tabs } from "antd";
import { Link } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Laptop from "../../images/laptop.jpg";
import ProductListItems from "./ProductListItems";
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";

// const onTabChange = (key) => {
// 	console.log(key);
// };
// onChange={onTabChange}

// this is children component of product page
const SingleProduct = ({ product, onStarClick, star }) => {
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
						<>
							<ShoppingCartOutlined className="text-success" /> <br />
							Add to cart
						</>,
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
