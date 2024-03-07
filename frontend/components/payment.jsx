'use client';
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Test = () => {
  
    const initializeRazorpay = () => {
        return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";

        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };

        document.body.appendChild(script);
        });
    };

    const makePayment = async () => {
        let res = await initializeRazorpay();
        if (!res) {
            alert("Razorpay SDK Failed to load");
            return;
        }
        const amount = 5000, currency = "INR";

        // Make API call to the serverless API
        const data = await fetch("http://localhost:8080/api/razerpay/create_order", {method: 'post'}).then((t) => t.json());
            console.log("data in frontend=>", data);
            
            // axios.post("http://localhost:8080/api/razerpay/payment", data?.data ).then((res) => {
            //     console.log(res?.data, "payment ");
            // }).catch((err) => {
            //     console.log(err);
            // })

            console.log()

            var options = {
                key: data?.key_id,
                name: "Vasooli Bhai",
                currency: data?.data?.currency,
                amount: data?.data?.amount,
                order_id: data?.data?.id,
                description: "Chall be Paisa de mera",
                image: "https://i.pinimg.com/564x/a7/58/0e/a7580e55cf9503580a8b8cb88b5aadd2.jpg",
            
                handler : async function (response) {
                console.log("before object response from callback", response);
                let obj = {
                    paymentId: response.razorpay_payment_id,
                    orderId: response?.razorpay_order_id,
                    razerpay_signature: response?.razorpay_signature
                };
                console.log("after object response from callback", obj);
                // alert(response.razorpay_payment_id);
                // alert(response.razorpay_order_id);
                // alert(response.razorpay_signature);
                const res = await axios.post("http://localhost:8080/api/razerpay/payment", obj);
                const resData = await res?.data;
                toast.success(resData?.message);
            },
            prefill: {
                name: "Katillboyy",
                email: "katillboyy@gmail.com",
                contact: "8998989898",
            },
            theme: {
                "color": "#b52828"
            }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };


  return (
    <div>
      <button onClick={makePayment}>Pay Now</button>
    </div>
  );
};

export default Test;
