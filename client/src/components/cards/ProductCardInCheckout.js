import React from "react";
import ModalImage from "react-modal-image";
import laptop from "../../images/laptop.jpg";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
	CheckCircleOutlined,
	CloseCircleOutlined,
	CloseOutlined,
} from "@ant-design/icons";

const ProductCardInCheckout = ({ p }) => {
	const colors = ["Black", "Brown", "Silver", "White", "Blue"];
	let dispatch = useDispatch();

	const handleColorChange = (e) => {
		// console.log("color changed", e.target.value);

		let cart = [];
		if (typeof window !== "undefined") {
			if (localStorage.getItem("cart")) {
				cart = JSON.parse(localStorage.getItem("cart"));
			}

			cart.map((product, i) => {
				if (product._id === p._id) {
					cart[i].color = e.target.value;
				}
			});

			// console.log("cart update color", cart)
			localStorage.setItem("cart", JSON.stringify(cart));
			dispatch({
				type: "ADD_TO_CART",
				payload: cart,
			});
		}
	};

	const handleQuantityChange = (e) => {
		// console.log("available quantity", p.quantity);
		let count = e.target.value < 1 ? 1 : e.target.value;

		if (count > p.quantity) {
			toast.error(`Max available quantity: ${p.quantity}`);
			return;
		}

		let cart = [];

		if (typeof window !== "undefined") {
			if (localStorage.getItem("cart")) {
				cart = JSON.parse(localStorage.getItem("cart"));
			}

			cart.map((product, i) => {
				if (product._id === p._id) {
					cart[i].count = count;
				}
			});

			// console.log("cart update color", cart)
			localStorage.setItem("cart", JSON.stringify(cart));
			dispatch({
				type: "ADD_TO_CART",
				payload: cart,
			});
		}
	};

	const handleRemove = () => {
		let cart = [];

		if (typeof window !== "undefined") {
			if (localStorage.getItem("cart")) {
				cart = JSON.parse(localStorage.getItem("cart"));
			}

			cart.map((product, i) => {
				if (product._id === p._id) {
					cart.splice(i, 1);
				}
			});

			// console.log("cart update color", cart)
			localStorage.setItem("cart", JSON.stringify(cart));
			dispatch({
				type: "ADD_TO_CART",
				payload: cart,
			});
		}
	};

	return (
		<tbody>
			<tr>
				<td className="text-center">
					{/* image col */}
					<div
						style={{
							minWidth: "6.25rem",
							maxWidth: "10rem",
							height: "auto",
						}}>
						{p.images.length ? (
							<ModalImage
								small={p.images[0].url}
								large={p.images[0].url}
								alt={p.title}
							/>
						) : (
							<ModalImage small={laptop} large={laptop} alt={p.title} />
						)}
					</div>
				</td>
				<td className="text-center">{p.title}</td>
				<td className="text-center">${p.price}</td>
				<td className="text-center">{p.brand}</td>
				<td className="text-center">
					<select
						onChange={handleColorChange}
						name="color"
						className="form-control w-auto">
						{p.color ? (
							<option value={p.color}>{p.color}</option>
						) : (
							<option>Select</option>
						)}
						{colors
							.filter((c) => c !== p.color)
							.map((c) => (
								<option key={c} value={c}>
									{c}
								</option>
							))}
					</select>
				</td>
				<td className="text-center">
					<input
						type="number"
						className="form-control"
						style={{
							width: "4.5rem",
						}}
						value={p.count}
						onChange={handleQuantityChange}></input>
				</td>
				<td className="text-center">
					{p.shipping === "Yes" ? <p>included</p> : <p>NOT included</p>}
				</td>
				<td className="text-center">
					<CloseOutlined
						onClick={handleRemove}
						className="text-center btn btn-raised text-light bg-danger btn-blockpointer"
					/>
				</td>
			</tr>
		</tbody>
	);
};

export default ProductCardInCheckout;
