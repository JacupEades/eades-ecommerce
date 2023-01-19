import React, { useState, useEffect } from "react";
import { getProductsByCount } from "../functions/product";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import { fetchProductsByFilter } from "../functions/product";
import ShopNav from "../components/nav/ShopNav";
import { getCategories } from "../functions/category";
import { getSubs } from "../functions/sub";
import Star from "../components/forms/Star";
import { Checkbox, Radio } from "antd";

const Shop = () => {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [price, setPrice] = useState([0, 0]);
	const [ok, setOk] = useState(false);
	const [categories, setCategories] = useState([]);
	const [categoryIds, setCategoryIds] = useState([]);
	const [star, setStar] = useState("");
	const [subs, setSubs] = useState([]);
	const [sub, setSub] = useState([]);
	const [brands, setBrands] = useState([
		"Apple",
		"Samsung",
		"Microsoft",
		"Lenovo",
		"ASUS",
	]);
	const [brand, setBrand] = useState("");
	const [colors, setColors] = useState([
		"Black",
		"Brown",
		"Silver",
		"White",
		"Blue",
	]);
	const [color, setColor] = useState("");
	const [shipping, setShipping] = useState("");

	let dispatch = useDispatch();
	let { search } = useSelector((state) => ({ ...state }));
	const { text } = search;

	useEffect(() => {
		loadAllProducts();
		// fetch categories
		getCategories().then((res) => setCategories(res.data));
		// fetch sub categories
		getSubs().then((res) => setSubs(res.data));
	}, []);

	const fetchProducts = (arg) => {
		fetchProductsByFilter(arg).then((res) => {
			setProducts(res.data);
		});
	};

	// 1. load products by default on page load
	const loadAllProducts = () => {
		getProductsByCount(12).then((p) => {
			setProducts(p.data);
			setLoading(false);
		});
	};
	// 2. load products on user search input
	useEffect(() => {
		// console.log("load products on user search input", text);
		const delayed = setTimeout(() => {
			fetchProducts({ query: text });
		}, 300);
		return () => clearTimeout(delayed);
	}, [text]);

	// 3. load products based on price range
	useEffect(() => {
		console.log("ok to request");
		fetchProducts({ price });
	}, [ok]);

	const handleSlider = (value) => {
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: "" },
		});
		setCategoryIds([]);
		setStar("");
		setSub("");
		setBrand("");
		setColor("");
		setShipping("");
		setPrice(value);
		setTimeout(() => {
			setOk(!ok);
		}, 500);
	};
	// 4. load products based on category
	const handleCheck = (e) => {
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: "" },
		});
		setPrice([0, 0]);
		setStar("");
		setSub("");
		setBrand("");
		setColor("");
		setShipping("");
		// console.log(e.target.value);
		let inTheState = [...categoryIds];
		let justChecked = e.target.value;
		let foundInTheState = inTheState.indexOf(justChecked);

		// indexOf method ?? if not found returns -1 else returns index
		if (foundInTheState === -1) {
			inTheState.push(justChecked);
		} else {
			// if found pull out one item from index
			inTheState.splice(foundInTheState, 1);
		}

		setCategoryIds(inTheState);
		// console.log(inTheState);
		fetchProducts({ category: inTheState });
	};
	// 5. load products based on star rating
	const handleStarClick = (num) => {
		// console.log(num);
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: "" },
		});
		setPrice([0, 0]);
		setCategoryIds([]);
		setSub("");
		setBrand("");
		setColor("");
		setShipping("");
		setStar(num);
		fetchProducts({ stars: num });
	};

	const showStars = () => (
		<div>
			<Star starClick={handleStarClick} numberOfStars={5} />
			<Star starClick={handleStarClick} numberOfStars={4} />
			<Star starClick={handleStarClick} numberOfStars={3} />
			<Star starClick={handleStarClick} numberOfStars={2} />
			<Star starClick={handleStarClick} numberOfStars={1} />
		</div>
	);

	// 6. load products based on sub category
	const showSubs = () =>
		subs.map((s) => (
			<div key={s._id} className="col p-1 w-auto">
				<div
					onClick={() => handleSubmit(s)}
					className="badge badge-secondary"
					style={{ cursor: "pointer" }}>
					{s.name}
				</div>
			</div>
		));

	const handleSubmit = (sub) => {
		// console.log("SUB", sub);
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: "" },
		});
		setPrice([0, 0]);
		setCategoryIds([]);
		setStar("");
		setBrand("");
		setColor("");
		setShipping("");
		setSub(sub);
		fetchProducts({ sub });
	};

	// 7. load products based on brands
	const showBrands = () =>
		brands.map((b) => (
			<Radio
				key={b}
				value={b}
				name={b}
				checked={b === brand}
				onChange={handleBrand}
				className="pb-1">
				{b}
			</Radio>
		));

	const handleBrand = (e) => {
		// console.log(e.target.value);
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: "" },
		});
		setPrice([0, 0]);
		setCategoryIds([]);
		setStar("");
		setSub("");
		setColor("");
		setShipping("");
		setBrand(e.target.value);
		fetchProducts({ brand: e.target.value });
	};

	// 8. load products based on colors
	const showColors = () =>
		colors.map((c) => (
			<Radio
				key={c}
				value={c}
				name={c}
				checked={c === color}
				onChange={handleColor}
				className="pb-1">
				{c}
			</Radio>
		));

	const handleColor = (e) => {
		// console.log(e.target.value);
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: "" },
		});
		setPrice([0, 0]);
		setCategoryIds([]);
		setStar("");
		setSub("");
		setBrand("");
		setShipping("");
		setColor(e.target.value);
		fetchProducts({ color: e.target.value });
	};

	// 9. load products based on shipping
	const showShipping = () => (
		<div>
			<Checkbox
				className="pb-2"
				onChange={handleShippingChange}
				value="Yes"
				checked={shipping === "Yes"}>
				Yes
			</Checkbox>
			<Checkbox
				className="pb-2"
				onChange={handleShippingChange}
				value="No"
				checked={shipping === "No"}>
				No
			</Checkbox>
		</div>
	);

	const handleShippingChange = (e) => {
		// console.log(e.target.value);
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: "" },
		});
		setPrice([0, 0]);
		setCategoryIds([]);
		setStar("");
		setSub("");
		setBrand("");
		setColor("");
		setShipping(e.target.value);
		fetchProducts({ shipping: e.target.value });
	};

	return (
		<div className="container-fluid ps-0">
			<div className="row">
				<div className="col-md-3">
					<h4 className="text-center pt-2 mb-0">Search/Filter</h4>
					<hr className="mb-0" />
					<ShopNav
						price={price}
						setPrice={setPrice}
						handleSlider={handleSlider}
						categories={categories}
						categoryIds={categoryIds}
						handleCheck={handleCheck}
						showStars={showStars}
						showSubs={showSubs}
						showBrands={showBrands}
						showColors={showColors}
						showShipping={showShipping}
					/>
				</div>

				<div className="col-md-9 pt-3">
					{loading ? (
						<h4 className="text-danger">Loading...</h4>
					) : (
						<h4>Products</h4>
					)}

					{products.length < 1 && <p>No products found</p>}

					<div className="row pb-5">
						{products.map((p) => (
							<div key={p._id} className="col-md-4 mt-3">
								<ProductCard product={p} />
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Shop;
