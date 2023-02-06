import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
	title: "",
	description: "",
	price: "",
	category: "",
	subs: [],
	shipping: "",
	quantity: "",
	images: [],
	colors: ["Black", "Brown", "Silver", "White", "Blue"],
	brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
	color: "",
	brand: "",
};

// match works  because the app.js is wrapped in <BrowserRouter> of the index.js
const ProductUpdate = ({ match, history }) => {
	const [values, setValues] = useState(initialState);
	const [categories, setCategories] = useState([]);
	const [subOptions, setSubOptions] = useState([]);
	const [arrayOfSubIds, setArrayOfSubIds] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("");
	const [loading, setLoading] = useState(false);

	// redux
	const { user } = useSelector((state) => ({ ...state }));

	// router
	const { slug } = match.params;

	useEffect(() => {
		loadProduct();
		loadCategories();
	}, []);

	const loadProduct = () => {
		getProduct(slug).then((p) => {
			// console.log("single product", p)
			// 1 load single product
			setValues({ ...values, ...p.data });
			// 2 load single product category subs
			getCategorySubs(p.data.category._id).then((res) =>
				setSubOptions(res.data)
			);
			// 3 prepare array of sub ids to show as default sub values in antd Select
			let arr = [];
			p.data.subs.map((s) => {
				arr.push(s._id);
			});
			setArrayOfSubIds((prev) => arr);
		});
	};

	const loadCategories = () =>
		getCategories().then((c) => setCategories(c.data));

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		//adding the values that had to be removed from the initial state
		values.subs = arrayOfSubIds;
		values.category = selectedCategory ? selectedCategory : values.category;

		updateProduct(slug, values, user.token)
			.then((res) => {
				console.log(res);
				setLoading(false);
				toast.success(`"${res.data.title}" is updated`);
				// because the slug can change on submit we send the user to the products page
				history.push("/admin/products");
			})
			.catch((err) => {
				console.log(err);
				setLoading(false);
				// if (err.response.status === 400) toast.error(err.response.data);
				toast.error(err.response.data.err);
			});
	};

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
		// console.log(e.target.name, "----", e.target.value);
	};

	const handleCategoryChange = (e) => {
		e.preventDefault();
		console.log("CLICKED CATEGORY", e.target.value);
		setValues({ ...values, subs: [] });

		setSelectedCategory(e.target.value);

		getCategorySubs(e.target.value).then((res) => {
			console.log("SUBS OPTIONS ON CATEGORY CLICK", res);
			setSubOptions(res.data);
		});
		// They the user clicks the original category this reloads the subs
		if (values.category._id === e.target.value) {
			loadProduct();
		}
		// Clear all sub category ids
		setArrayOfSubIds([]);
	};

	return (
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-2">
					<AdminNav />
				</div>
				<div className="col-md-8 pt-2">
					{loading ? (
						<LoadingOutlined className="text-danger h1" />
					) : (
						<h4>Product update</h4>
					)}
					{/* {JSON.stringify(values)} */}
					<hr />

					<div className="ps-3 pb-2 pt-1">
						<FileUpload
							values={values}
							setValues={setValues}
							setLoading={setLoading}
						/>
					</div>

					<ProductUpdateForm
						handleSubmit={handleSubmit}
						handleChange={handleChange}
						setValues={setValues}
						values={values}
						handleCategoryChange={handleCategoryChange}
						categories={categories}
						subOptions={subOptions}
						arrayOfSubIds={arrayOfSubIds}
						setArrayOfSubIds={setArrayOfSubIds}
						selectedCategory={selectedCategory}
					/>
				</div>
			</div>
		</div>
	);
};

export default ProductUpdate;
