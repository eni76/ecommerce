import React, { useEffect, useState, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import Confetti from "react-confetti";
import { toast } from "react-toastify";
import { ProductContext } from "../Context/ProductContext";
// import { baseUrl } from "../App";
import PulseLoader from "react-spinners/PulseLoader";
import { IoMdCloseCircle } from "react-icons/io";

export default function VerifyEmail() {
    const { token } = useParams();

    const [isVerified, setIsVerified] = useState(false);

    const [isLoading, setIsLoading] = useState(true);
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });



    const hasVerified = useRef(false);

    useEffect(() => {
        const verifyPayment = async () => {
            if (hasVerified.current) return;

            if (!token) {
                toast.error("No authentication token found");
                setIsLoading(false);
                return;
            }

            hasVerified.current = true;

            try {
                const res = await fetch(`http://localhost:5000/verifyemail`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ token }),
                });

                const data = await res.json();

                if (res.ok && data.success) {
                    console.log("data:", data);
                    setIsVerified(true);

                    toast.success("Email verified successfully!");
                } else {
                    console.log("data:", data);
                    // Handle Prisma unique constraint issue gracefully
                    setIsVerified(false);
                    toast.info("Email Verification Failed Please try again later!");
                }
            } catch (err) {
                console.error("Verification error:", err);
                toast.error("Network error during Email verification.");
            } finally {
                setIsLoading(false);
            }
        };

        verifyPayment();
    }, [token]);

    useEffect(() => {
        console.log("isVeridfed:", isVerified);
    }, [isVerified]);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Loader while verifying
    if (isLoading) {
        return (
            <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
                <PulseLoader size={12} color="#000" />
                <p className="mt-2 text-lg font-semibold text-black">
                    Verifying Payment...
                </p>
            </div>
        );
    }

    // Fallback if verification failed
    if (!isVerified) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
                <p className="mb-4 text-xl font-bold text-red-600">
                    Payment verification failed.
                </p>
                <a
                    href="/"
                    className="px-6 py-3 text-white transition bg-black border rounded-xl hover:bg-white hover:text-black"
                >
                    Go Back
                </a>
            </div>
        );
    }

    // Payment verified (new or existing receipt)
    return (
        <div className="relative flex items-center justify-center min-h-screen px-4 text-black bg-white">
            <Confetti
                width={windowSize.width}
                height={windowSize.height}
                numberOfPieces={20}
            />

            {isVerified && (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="z-10 w-full max-w-lg p-8 text-center bg-white border border-gray-200 shadow-xl rounded-3xl"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
                        className="flex justify-center"
                    >
                        <div className="flex items-center justify-center w-20 h-20 mb-6 text-white bg-black rounded-full shadow-lg">
                            <FaCheckCircle className="w-10 h-10" />
                        </div>
                    </motion.div>

                    <h1 className="mb-2 text-3xl font-extrabold">
                        Email verification Successful!
                    </h1>

                    <p className="mb-6 text-lg text-gray-600">
                        Your Email has been verified!
                    </p>
                </motion.div>
            )}
        </div>
    )
}