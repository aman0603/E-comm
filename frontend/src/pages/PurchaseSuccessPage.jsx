// pages/PurchaseSuccessPage.jsx
import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import axios from "../lib/axios";
import Confetti from "react-confetti";

const PurchaseSuccessPage = () => {
	const [isProcessing, setIsProcessing] = useState(true);
	const [orderId, setOrderId] = useState(null);
	const [error, setError] = useState(null);
	const navigate = useNavigate();
	const { clearCart } = useCartStore();

	useEffect(() => {
		const query = new URLSearchParams(window.location.search);
		const razorpay_order_id = query.get("razorpay_order_id");
		const razorpay_payment_id = query.get("razorpay_payment_id");
		const razorpay_signature = query.get("razorpay_signature");

		if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
			setIsProcessing(false);
			setError("Missing payment verification details.");
			return;
		}

		const verifyPayment = async () => {
			try {
				const res = await axios.post("/payments/checkout-success", {
					razorpay_order_id,
					razorpay_payment_id,
					razorpay_signature,
				});

				if (res.data.success) {
					setOrderId(res.data.orderId);
					clearCart();
				} else {
					setError("Verification failed");
				}
			} catch (err) {
				console.error(err);
				setError("Server error verifying payment.");
			} finally {
				setIsProcessing(false);
			}
		};

		verifyPayment();
	}, [clearCart]);

	if (isProcessing) return <p className="text-white text-center mt-8">Processing...</p>;

	if (error) return <p className="text-red-400 text-center mt-8">Error: {error}</p>;

	return (
		<div className='h-screen flex items-center justify-center px-4'>
			<Confetti width={window.innerWidth} height={window.innerHeight} gravity={0.1} numberOfPieces={700} />
			<div className='max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10'>
				<div className='p-6 sm:p-8'>
					<div className='flex justify-center'>
						<CheckCircle className='text-emerald-400 w-16 h-16 mb-4' />
					</div>
					<h1 className='text-3xl font-bold text-center text-emerald-400 mb-2'>Payment Successful!</h1>
					<p className='text-gray-300 text-center mb-2'>Your payment was verified and order has been placed.</p>
					{orderId && (
						<p className='text-emerald-400 text-center text-sm mb-6'>Order ID: #{orderId}</p>
					)}
					<div className='space-y-4'>
						<button className='w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center'>
							<HandHeart className='mr-2' size={18} />
							Thanks for trusting us!
						</button>
						<Link
							to='/'
							className='w-full bg-gray-700 hover:bg-gray-600 text-emerald-400 font-bold py-2 px-4 rounded-lg flex items-center justify-center'
						>
							Continue Shopping
							<ArrowRight className='ml-2' size={18} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PurchaseSuccessPage;
