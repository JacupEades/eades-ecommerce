import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true }) => {
	const orderId = order.paymentIntent.paymentIntent.id;

	const orderAmount =
		(order.paymentIntent.paymentIntent.amount /= 100).toLocaleString("en-US", {
			style: "currency",
			currency: "USD",
		});

	const orderCurrency =
		order.paymentIntent.paymentIntent.currency.toUpperCase();

	const orderMethod = order.paymentIntent.paymentIntent.payment_method_types[0];

	const orderPayment = order.paymentIntent.paymentIntent.status.toUpperCase();

	const orderDate = new Date(
		order.paymentIntent.paymentIntent.created * 1000
	).toLocaleString();

	const orderStatus = order.orderStatus;

	return (
		<>
			<div>
				<p>
					<span>
						<b>Order Id:</b> {orderId}
					</span>
					{" / "}
					<span>
						<b>Amount:</b> {orderAmount}
					</span>
					{" / "}
					<span>
						<b>Currency:</b> {orderCurrency}
					</span>
					{" / "}
					<span>
						<b>Method:</b> {orderMethod}
					</span>
					{" / "}
					<span>
						<b>Payment:</b> {orderPayment}
					</span>
					{" / "}
					<span>
						<b>Ordered on:</b> {orderDate}
					</span>
					<br />
					{showStatus && (
						<span className="badge bg-primary text-white">
							<b>STATUS:</b> {orderStatus}
						</span>
					)}
				</p>
			</div>
		</>
	);
};

export default ShowPaymentInfo;
