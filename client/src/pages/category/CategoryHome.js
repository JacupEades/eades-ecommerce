import React, { useState, useEffect } from "react";
import { getCategory } from "../../functions/category";
import ProductCard from "../../components/cards/ProductCard";

const CategoryHome = ({ match }) => {
	const [category, setCategory] = useState({});
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	const { slug } = match.params;

	useEffect(() => {
		setLoading(true);
		getCategory(slug).then((res) => {
			console.log(JSON.stringify(res.data, null, 4));
			setCategory(res.data.category);
			setProducts(res.data.products);
			setLoading(false);
		});
	}, []);

	return (
		<>
			<div className="col">
				{loading ? (
					<h4
						className="text-center shadow-2 p-3 mb-5 display-3"
						style={{
							backgroundColor: "hsl(0, 0%, 94%)",
						}}>
						Loading...
					</h4>
				) : (
					<h4
						className="text-center shadow-2 p-3 mb-5 display-3"
						style={{
							backgroundColor: "hsl(0, 0%, 94%)",
						}}>
						{products.length} Products in "{category.name}" Category
					</h4>
				)}
			</div>
			<div className="container">
				<div className="row">
					{products.map((p) => (
						<div className="col-md-4" key={p._id}>
							<ProductCard product={p} />
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default CategoryHome;
