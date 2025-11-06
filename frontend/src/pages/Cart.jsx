import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import Checkout from "./Checkout";
import { Trash2, Plus, Minus, ShoppingBag, Package } from "lucide-react";

const Cart = () => {
	const { cart, removeFromCart, updateCartQty, backendUrl } = useContext(AppContext);
	const [total, setTotal] = useState(0);
	const [subtotal, setSubtotal] = useState(0);
	const shippingCost = 100;
	const taxRate = 0.18;

	useEffect(() => {
		const cartSubtotal = cart.reduce(
			(acc, item) => acc + item.product.price * item.qty,
			0
		);
		setSubtotal(cartSubtotal);
		const tax = cartSubtotal * taxRate;
		setTotal(cartSubtotal + tax + shippingCost);
	}, [cart]);

	const handleRemove = (itemId) => {
		removeFromCart(itemId);
		axios
			.delete(`${backendUrl}/api/cart/${itemId}`)
			.catch((error) => console.error("Error removing item from cart:", error));
			
	};

	const handleUpdateQty = (itemId, newQty) => {
		if (newQty < 1) return;
		updateCartQty(itemId, newQty);
		axios
			.put(`${backendUrl}/api/cart/${itemId}`, { qty: newQty })
			.catch((error) => console.error("Error updating quantity:", error));
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 py-8">
			<div className="container mx-auto px-4 max-w-6xl">
				{/* Header */}
				<div className="flex items-center space-x-3 mb-8">
					<ShoppingBag className="w-8 h-8 text-indigo-600" />
					<h1 className="text-3xl md:text-4xl font-bold text-gray-800">
						Your Shopping Cart
					</h1>
				</div>

				{cart.length === 0 ? (
					/* Empty Cart State */
					<div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
						<Package className="w-20 h-20 md:w-24 md:h-24 text-gray-300 mx-auto mb-4" />
						<h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
							Your cart is empty
						</h2>
						<p className="text-gray-600 mb-6">Add some items to get started!</p>
						<a
							href="/"
							className="inline-block px-5 md:px-6 py-2.5 md:py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
						>
							Continue Shopping
						</a>
					</div>
				) : (
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
						{/* Cart Items */}
						<div className="lg:col-span-2 space-y-4">
							{cart.map((item) => (
								<div
									key={item.product._id}
									className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-4 md:p-6"
								>
									<div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start">
										{/* Product Image */}
										<div className="w-full md:w-32 h-40 md:h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
											<img
												src={item.product.imageUrl}
												alt={item.product.name}
												className="w-full h-full object-cover"
											/>
										</div>

										{/* Product Details */}
										<div className="flex-1 w-full flex flex-col justify-between">
											<div>
												<h3 className="text-base md:text-lg font-semibold text-gray-800 mb-1">
													{item.product.name}
												</h3>
												<p className="text-sm md:text-sm text-gray-600 mb-3 line-clamp-3">
													{item.product.description ||
														"Premium quality product"}
												</p>
												<p className="text-xl md:text-2xl font-bold text-indigo-600">
													${item.product.price.toFixed(2)}
												</p>
											</div>

											{/* Quantity Controls */}
											<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-3">
												<div className="flex items-center space-x-3 bg-gray-100 rounded-lg p-1">
													<button
														onClick={() =>
															handleUpdateQty(item.product._id, item.qty - 1)
														}
														className="p-2 hover:bg-white rounded-md transition-colors duration-200"
													>
														<Minus className="w-4 h-4 text-gray-600" />
													</button>
													<span className="text-lg font-semibold text-gray-800 w-10 text-center">
														{item.qty}
													</span>
													<button
														onClick={() =>
															handleUpdateQty(item.product._id, item.qty + 1)
														}
														className="p-2 hover:bg-white rounded-md transition-colors duration-200"
													>
														<Plus className="w-4 h-4 text-gray-600" />
													</button>
												</div>

												<button
													onClick={() => handleRemove(item.product._id)}
													className="flex items-center justify-center sm:justify-start space-x-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
												>
													<Trash2 className="w-4 h-4" />
													<span className="font-medium">Remove</span>
												</button>
											</div>
										</div>

										{/* Item Total */}
										<div className="w-full md:w-auto text-right mt-2 md:mt-0">
											<p className="text-sm text-gray-600 mb-1">Item Total</p>
											<p className="text-lg md:text-xl font-bold text-gray-800">
												${(item.product.price * item.qty).toFixed(2)}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>

						{/* Order Summary */}
						<div className="lg:col-span-1">
							<div className="bg-white rounded-xl shadow-lg p-4 md:p-6 lg:p-6 lg:sticky lg:top-24">
								<h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
									Order Summary
								</h2>

								<div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
									<div className="flex justify-between text-gray-600">
										<span>Subtotal ({cart.length} items)</span>
										<span className="font-medium">${subtotal.toFixed(2)}</span>
									</div>
									<div className="flex justify-between text-gray-600">
										<span>Tax (GST 18%)</span>
										<span className="font-medium">
											${(subtotal * taxRate).toFixed(2)}
										</span>
									</div>
									<div className="flex justify-between text-gray-600">
										<span>Shipping</span>
										<span className="font-medium">
											${shippingCost.toFixed(2)}
										</span>
									</div>
									<div className="border-t pt-3">
										<div className="flex justify-between text-lg md:text-xl font-bold text-gray-800">
											<span>Total</span>
											<span className="text-indigo-600">
												${total.toFixed(2)}
											</span>
										</div>
									</div>
								</div>

								<Checkout />
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Cart;
