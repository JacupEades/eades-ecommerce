import React from "react";
import { Link } from "react-router-dom";

const ProductListItems = ({ product }) => {
	const { price, category, subs, shipping, color, brand, quantity, sold } =
		product;

	return (
		<ul className="list-group">
			<li className="list-group-item">
				Price{" "}
				<span className="float-end label label-default pull-xs-right">
					$ {price}
				</span>
			</li>
			{category && (
				<li className="list-group-item">
					Category{" "}
					<Link
						to={`/category/${category.slug}`}
						className="float-end label label-default pull-xs-right">
						{category.name}
					</Link>
				</li>
			)}
			{subs && (
				<li className="list-group-item">
					Sub Categories{" "}
					{subs.map((s) => (
						<Link
							key={s._id}
							to={`/subs/${s.slug}`}
							className="float-end label label-default pull-xs-right">
							{s.name}
						</Link>
					))}
				</li>
			)}
			<li className="list-group-item">
				Shipping{" "}
				<span className="float-end label label-default pull-xs-right">
					{shipping}
				</span>
			</li>
			<li className="list-group-item">
				Color{" "}
				<span className="float-end label label-default pull-xs-right">
					{color}
				</span>
			</li>
			<li className="list-group-item">
				Brand{" "}
				<span className="float-end label label-default pull-xs-right">
					{brand}
				</span>
			</li>
			<li className="list-group-item">
				Available{" "}
				<span className="float-end label label-default pull-xs-right">
					{quantity}
				</span>
			</li>
			<li className="list-group-item">
				Sold{" "}
				<span className="float-end label label-default pull-xs-right">
					{sold}
				</span>
			</li>
		</ul>
	);
};

export default ProductListItems;
