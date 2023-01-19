import React, { useState } from "react";
import { Modal, Button } from "antd";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { StarOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";

const RatingModal = ({ children }) => {
	const { user } = useSelector((state) => ({ ...state }));
	const [modalVisable, setModalVisable] = useState(false);

	let history = useHistory();
	let { slug } = useParams();

	const handleModal = () => {
		if (user && user.token) {
			setModalVisable(true);
		} else {
			// this takes the user back to the product page after they login
			history.push({
				pathname: "/login",
				state: { from: `/product/${slug}` },
			});
		}
	};

	return (
		<>
			<div onClick={handleModal}>
				<StarOutlined className="text-danger" /> <br />{" "}
				{user ? "Leave rating" : "Login to leave a rating"}
			</div>
			<Modal
				title="Leave your rating"
				centered
				open={modalVisable}
				onOk={() => {
					setModalVisable(false);
					toast.success("Thank you for your review.");
				}}
				onCancel={() => setModalVisable(false)}>
				{children}
			</Modal>
		</>
	);
};

export default RatingModal;
