import React, { useEffect, useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { getProductsByCount } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import { removeProduct } from "../../../functions/product";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AllProducts = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);

	const { user } = useSelector((state) => ({ ...state }));

	useEffect(() => {
		loadAllProducts();
	}, []);

	const loadAllProducts = () => {
		setLoading(true);
		getProductsByCount(100)
			.then((res) => {
				setProducts(res.data);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				console.log(err);
			});
	};

	const handleRemove = (slug) => {
		let answer = window.confirm(`Are you sure you want to delete ${slug}?`);
		if (answer) {
			// console.log("send delete request", slug);
			removeProduct(slug, user.token)
				.then((res) => {
					loadAllProducts();
					toast.error(`${res.data.title} is deleted.`);
				})
				.catch((err) => {
					if (err.response.status === 400) toast.error(err.response.data);
					console.log(err);
				});
		}
	};

	return (
		<div className="constainer-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col-md-10">
					{loading ? (
						<h4 className="text-danger">Loading...</h4>
					) : (
						<h4>All Products</h4>
					)}
					<h4 className="col">
						<div className="row">
							{products.map((product) => (
								<div className="col-md-4" key={product._id}>
									<AdminProductCard
										product={product}
										handleRemove={handleRemove}
									/>
								</div>
							))}
						</div>
					</h4>
				</div>
			</div>
		</div>
	);
};

export default AllProducts;
