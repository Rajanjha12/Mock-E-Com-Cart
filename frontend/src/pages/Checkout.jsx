import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { jsPDF } from "jspdf";
import {
	Download,
	CheckCircle,
	CreditCard,
	FileText,
	Loader,
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirect

const Checkout = () => {
	const { user, cart, backendUrl } = useContext(AppContext);
	const [receipt, setReceipt] = useState(null);
	const [isProcessing, setIsProcessing] = useState(false);
	const [showSuccess, setShowSuccess] = useState(false);
	const navigate = useNavigate(); // Initialize navigate for redirecting

	// Redirect to the signup page if the user is not logged in
	useEffect(() => {
		if (!user) {
			navigate("/signup"); // Redirect to signup if no user is found
		}
	}, [user, navigate]);

	const handleCheckout = async () => {
		setIsProcessing(true);
		try {
			const response = await axios.post(backendUrl + "/api/checkout", {
				cartItems: cart,
			});
			setReceipt(response.data);
			setShowSuccess(true);
			setTimeout(() => setShowSuccess(false), 3000);
		} catch (error) {
			console.error("Checkout failed:", error);
			alert("Checkout failed. Please try again.");
		} finally {
			setIsProcessing(false);
		}
	};

	const downloadInvoice = () => {
		const doc = new jsPDF();
		const pageWidth = doc.internal.pageSize.getWidth();

		// Header with colored background
		doc.setFillColor(79, 70, 229);
		doc.rect(0, 0, pageWidth, 40, "F");

		// Company Logo/Title
		doc.setTextColor(255, 255, 255);
		doc.setFontSize(28);
		doc.setFont(undefined, "bold");
		doc.text("INVOICE", pageWidth / 2, 25, { align: "center" });

		// Reset text color
		doc.setTextColor(0, 0, 0);

		// Invoice Details
		doc.setFontSize(11);
		doc.setFont(undefined, "bold");
		const invoiceNumber = `INV-2025-${
			Math.floor(Math.random() * 10000) + 1000
		}`;
		doc.text(`Invoice Number: ${invoiceNumber}`, 20, 55);
		doc.setFont(undefined, "normal");
		doc.text(
			`Date: ${new Date(receipt.timestamp).toLocaleDateString("en-IN")}`,
			20,
			62
		);
		doc.text(`Payment Status: PAID`, 20, 69);

		// Seller Information Box
		doc.setFillColor(243, 244, 246);
		doc.roundedRect(20, 80, 85, 40, 3, 3, "F");
		doc.setFontSize(10);
		doc.setFont(undefined, "bold");
		doc.text("FROM:", 25, 88);
		doc.setFont(undefined, "normal");
		doc.text("VibeCommerce Pvt. Ltd.", 25, 95);
		doc.setFontSize(9);
		doc.text("123 Web Avenue", 25, 101);
		doc.text("Tech City, 560001", 25, 106);
		doc.text("GSTIN: 29ABCDE1234F1Z5", 25, 111);

		// Buyer Information Box
		doc.roundedRect(110, 80, 85, 40, 3, 3, "F");
		doc.setFontSize(10);
		doc.setFont(undefined, "bold");
		doc.text("TO:", 115, 88);
		doc.setFont(undefined, "normal");
		doc.text(receipt.buyerName || "Valued Customer", 115, 95);
		doc.setFontSize(9);
		doc.text(receipt.buyerAddress || "Customer Address", 115, 101);
		if (receipt.buyerGSTIN) {
			doc.text(`GSTIN: ${receipt.buyerGSTIN}`, 115, 111);
		}

		// Table Header
		const tableTop = 135;
		doc.setFillColor(79, 70, 229);
		doc.rect(20, tableTop, pageWidth - 40, 10, "F");
		doc.setTextColor(255, 255, 255);
		doc.setFontSize(9);
		doc.setFont(undefined, "bold");
		doc.text("Item", 25, tableTop + 7);
		doc.text("HSN", 85, tableTop + 7);
		doc.text("Qty", 110, tableTop + 7);
		doc.text("Price", 130, tableTop + 7);
		doc.text("Tax", 155, tableTop + 7);
		doc.text("Total", 175, tableTop + 7);

		// Table Rows
		doc.setTextColor(0, 0, 0);
		doc.setFont(undefined, "normal");
		let yPos = tableTop + 15;

		receipt.cartItems.forEach((item, index) => {
			const itemTotal = item.qty * item.product.price;
			const taxAmount = itemTotal * 0.18;
			const totalWithTax = itemTotal + taxAmount;

			// Alternate row colors
			if (index % 2 === 0) {
				doc.setFillColor(249, 250, 251);
				doc.rect(20, yPos - 5, pageWidth - 40, 10, "F");
			}

			doc.setFontSize(9);
			doc.text(item.product.name.substring(0, 20), 25, yPos);
			doc.text(item.product.hsn || "N/A", 85, yPos);
			doc.text(String(item.qty), 110, yPos);
			doc.text(`$${item.product.price.toFixed(2)}`, 130, yPos);
			doc.text(`$${taxAmount.toFixed(2)}`, 155, yPos);
			doc.text(`$${totalWithTax.toFixed(2)}`, 175, yPos);

			yPos += 10;
		});

		// Totals Section
				
		yPos += 10;
		doc.setDrawColor(200, 200, 200);
		doc.line(20, yPos, pageWidth - 20, yPos);
		yPos += 10;

		doc.setFontSize(10);
		const subtotal = receipt.cartItems.reduce(
		(acc, item) => acc + item.qty * item.product.price,
		0
		);
		const tax = subtotal * 0.18;
		const shipping = 100;
		const grandTotal = subtotal + tax + shipping; // ✅ Add shipping + tax

		doc.text("Subtotal:", 130, yPos);
		doc.text(`$${subtotal.toFixed(2)}`, 175, yPos);
		yPos += 7;

		doc.text("Tax (GST 18%):", 130, yPos);
		doc.text(`$${tax.toFixed(2)}`, 175, yPos);
		yPos += 7;

		doc.text("Shipping:", 130, yPos);
		doc.text(`$${shipping.toFixed(2)}`, 175, yPos);
		yPos += 10;

		// Grand Total
		doc.setFillColor(79, 70, 229);
		doc.rect(120, yPos - 5, pageWidth - 140, 12, "F");
		doc.setTextColor(255, 255, 255);
		doc.setFont(undefined, "bold");
		doc.setFontSize(12);
		doc.text("Grand Total:", 130, yPos + 3);
		doc.text(`$${grandTotal.toFixed(2)}`, 175, yPos + 3); // ✅ Updated value


		// Footer
		doc.setTextColor(100, 100, 100);
		doc.setFontSize(8);
		doc.setFont(undefined, "normal");
		doc.text("Thank you for your business!", pageWidth / 2, 270, {
			align: "center",
		});
		doc.text(
			"For queries: gps.96169@gmail.com | +91-111-2222-333",
			pageWidth / 2,
			276,
			{ align: "center" }
		);

		// Save PDF
		doc.save(`invoice-${invoiceNumber}.pdf`);
	};

	return (
		<div className="space-y-4">
			{!receipt ? (
				<button
					onClick={handleCheckout}
					disabled={isProcessing || cart.length === 0}
					className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed font-semibold text-lg"
				>
					{isProcessing ? (
						<>
							<Loader className="w-5 h-5 animate-spin" />
							<span>Processing...</span>
						</>
					) : (
						<>
							<CreditCard className="w-5 h-5" />
							<span>Proceed to Checkout</span>
						</>
					)}
				</button>
			) : (
				<div className="space-y-4">
					{/* Success Message */}
					{showSuccess && (
						<div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center space-x-3 animate-fade-in">
							<CheckCircle className="w-6 h-6 text-green-600" />
							<div>
								<p className="font-semibold text-green-800">
									Order Placed Successfully!
								</p>
								<p className="text-sm text-green-600">
									Your invoice is ready to download
								</p>
							</div>
						</div>
					)}

					{/* Receipt Details */}
					<div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-lg p-6 border border-indigo-100">
						<div className="flex items-center space-x-2 mb-4">
							<FileText className="w-6 h-6 text-indigo-600" />
							<h3 className="text-2xl font-bold text-gray-800">
								Order Receipt
							</h3>
						</div>

						<div className="bg-white rounded-lg p-4 mb-4 shadow-sm">
							{/* Receipt details */}
							<div className="grid grid-cols-2 gap-4 mb-4">
								<div>
									<p className="text-sm text-gray-600">Order Date</p>
									<p className="font-semibold text-gray-800">
										{new Date(receipt.timestamp).toLocaleDateString("en-IN")}
									</p>
								</div>
								<div>
									<p className="text-sm text-gray-600">Order Time</p>
									<p className="font-semibold text-gray-800">
										{new Date(receipt.timestamp).toLocaleTimeString("en-IN")}
									</p>
								</div>
							</div>

							{/* Items Ordered */}
							<div className="border-t pt-4">
								<h4 className="font-semibold text-gray-800 mb-3">
									Items Ordered
								</h4>
								<ul className="space-y-2">
									{receipt.cartItems.map((item) => (
										<li
											key={item.product._id}
											className="flex justify-between items-center py-2 border-b last:border-b-0"
										>
											<div className="flex-1">
												<p className="font-medium text-gray-800">
													{item.product.name}
												</p>
												<p className="text-sm text-gray-600">
													Quantity: {item.qty}
												</p>
											</div>
											<span className="font-semibold text-gray-800">
												${(item.qty * item.product.price).toFixed(2)}
											</span>
										</li>
									))}
								</ul>
							</div>

							{/* Pricing Info */}
							<div className="border-t pt-4 mt-4">
								<div className="space-y-2">
									<div className="flex justify-between text-gray-600">
										<span>Subtotal</span>
										<span className="font-medium">
											$
											{receipt.cartItems
												.reduce(
													(acc, item) => acc + item.qty * item.product.price,
													0
												)
												.toFixed(2)}
										</span>
									</div>
									<div className="flex justify-between text-gray-600">
										<span>Tax (GST 18%)</span>
										<span className="font-medium">
											$
											{(
												receipt.cartItems.reduce(
													(acc, item) => acc + item.qty * item.product.price,
													0
												) * 0.18
											).toFixed(2)}
										</span>
									</div>
									<div className="flex justify-between text-gray-600">
										<span>Shipping</span>
										<span className="font-medium">$100.00</span>
									</div>
									<div className="flex justify-between text-xl font-bold text-indigo-600 pt-2 border-t-2 border-indigo-200">
										<span>Total Amount</span>
										{/* <span>${receipt.total.toFixed(2)}</span> */}
										<span className="font-medium">
											$
											{(
												receipt.cartItems.reduce(
													(acc, item) => acc + item.qty * item.product.price,0) + // subtotal
												100 + // shipping
												receipt.cartItems.reduce(
													(acc, item) => acc + item.qty * item.product.price,
													0
												) *
													0.18) // GST (18%)
												.toFixed(2)}
										</span>
									</div>
								</div>
							</div>
						</div>

						{/* Download Invoice Button */}
						<button
							onClick={downloadInvoice}
							className="w-full flex items-center justify-center space-x-2 px-6 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
						>
							<Download className="w-5 h-5" />
							<span>Download Invoice (PDF)</span>
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default Checkout;
