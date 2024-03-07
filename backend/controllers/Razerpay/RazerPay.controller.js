const { RazorpaykeyId, RazorpayKeySecret } = process.env;
const shortid = require("shortid");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
    key_id: RazorpaykeyId,
    key_secret: RazorpayKeySecret,
});

const CreateOrder = async (req, res) => {

     let amount = '5000', currency = 'INR'; // amount we can find the prodcut by id and set the amount

    const options = {
        amount: amount * 100, // Razorpay expects the amount in paise
        currency,
        receipt: shortid.generate(),
    };
    try {
        const order = await razorpay.orders.create(options);
        // console.log(order)
        res.status(200).json({ message: "Move to the secound process",key_id: RazorpaykeyId, data: order });
    } catch (error) {
        return res.status(400).send({ message: error.message, status: false });
    }
}


const CapturePayment = async (req, res) => {
    try{
        console.log(req.body, 'capture payment');
        // const { paymentId } = req.body;
        // const payment = await razorpay.payments.capture(paymentId, 5000);
        res.status(200).json({ message: "Payment Captured", data: "payment" });
    }
    catch (error) {
        return res.status(400).send({ message: error.message, status: false });
    }
}

module.exports = {
    CreateOrder,
    CapturePayment
}