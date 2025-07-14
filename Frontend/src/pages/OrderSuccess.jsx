import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();
  const transactionId = Math.floor(100000000 + Math.random() * 900000000);

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gradient-to-br from-blue-100 via-purple-100 to-green-100">
      <div className="bg-white p-8 rounded-3xl shadow-xl text-center w-[360px] relative overflow-hidden">
        {/* Decorations around tick circle */}
        <div className="absolute top-[-10px] left-[50%] w-2 h-2 bg-green-400 rounded-full animate-ping" />
        <div className="absolute top-[30px] right-[30px] w-2 h-2 bg-red-400 rounded-full animate-bounce" />
        <div className="absolute bottom-[30px] left-[40px] w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
        <div className="absolute top-[60px] left-[20px] h-4 w-1 bg-purple-500 rotate-45 rounded animate-spin" />
        <div className="absolute bottom-[50px] right-[40px] h-3 w-1 bg-blue-500 rotate-[-45deg] rounded animate-ping" />
        <div className="absolute top-[100px] right-[20px] w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce" />

        {/* Center Tick */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-lg relative z-10"
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </motion.svg>
        </motion.div>

        {/* Text */}
        <h1 className="text-2xl font-semibold mt-5 text-gray-800">
          Your order has been accepted
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          Transaction ID: <strong>{transactionId}</strong>
        </p>

        <button
          onClick={() => navigate("/")}
          className="mt-6 bg-orange-500 text-white font-medium px-6 py-2 rounded-full hover:bg-orange-600 transition"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;