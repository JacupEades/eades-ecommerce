import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import laptop from "../../images/laptop.jpg";

const SideDrawer = () => {
	const dispatch = useDispatch();
	const { drawer, cart } = useSelector((state) => ({ ...state }));

	const imageStyle = {
		width: "100%",
		height: "10rem",
		objectFit: "cover",
	};

	const drawerExit = () => {
		dispatch({
			type: "SET_VISIBLE",
			payload: false,
		});
	};

	return (
		<Drawer
			className="text-center"
			title={`Cart / ${cart.length} Product`}
			placement="right"
			onClose={drawerExit}
			open={drawer}>
			<Link to={"/cart"}>
				<button
					onClick={drawerExit}
					className="text-center btn btn-raised btn-danger btn-block">
					Go To Cart
				</button>
			</Link>
			{cart.map((p) => (
				<div className="row" key={p._id}>
					<div className="col">
						{p.images[0] ? (
							<>
								<img alt="Product" src={p.images[0].url} style={imageStyle} />
								<p className="text-center bg-primary text-light">
									{p.title} x {p.count}
								</p>
							</>
						) : (
							<>
								<img
									alt="default laptop product"
									src={laptop}
									style={imageStyle}
								/>
								<p className="text-center bg-primary text-light">
									{p.title} x {p.count}
								</p>
							</>
						)}
					</div>
				</div>
			))}
		</Drawer>
	);
};

export default SideDrawer;
