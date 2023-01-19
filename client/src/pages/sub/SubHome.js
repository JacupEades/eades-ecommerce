import React, { useState, useEffect } from "react";
import { getSub } from "../../functions/sub";
import ProductCard from "../../components/cards/ProductCard";

const SubHome = ({ match }) => {
	const [sub, setSub] = useState({});
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	const { slug } = match.params;

	useEffect(() => {
		setLoading(true);
		getSub(slug).then((res) => {
			console.log(JSON.stringify(res.data, null, 4));
			setSub(res.data.sub);
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
						{products.length} Products in the "{sub.name}" Sub Category
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

export default SubHome;
