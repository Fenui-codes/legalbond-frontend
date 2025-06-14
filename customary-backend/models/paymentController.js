const axios = require('axios');

// Initialize payment (create a payment link or payment session)
const initializePayment = async (req, res) => {
  try {
    const { amount, email, marriageId } = req.body;

    if (!amount || !email || !marriageId) {
      return res.status(400).json({ error: 'Missing required fields: amount, email, marriageId' });
    }

    const payload = {
      tx_ref: `marriage_${marriageId}_${Date.now()}`, // unique transaction reference
      amount: amount,
      currency: 'XAF',  // Change currency as needed
      redirect_url: 'https://your-frontend.com/payment/callback',  // Replace with your frontend URL to handle payment status
      customer: {
        email: email,
      },
      payment_options: 'card, mobilemoney, ussd',  // include mobile money options here
      meta: {
        marriageId: marriageId,
      }
    };

    const response = await axios.post(
      'https://api.flutterwave.com/v3/payments',
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );

    if (response.data.status === 'success') {
      // Send back payment link to frontend
      return res.json({
        paymentLink: response.data.data.link,
        message: 'Payment initialized successfully',
      });
    } else {
      return res.status(500).json({ error: 'Failed to initialize payment' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Verify payment status by transaction_id from Flutterwave
const verifyPayment = async (req, res) => {
  try {
    const { transaction_id, marriageId } = req.query;

    if (!transaction_id || !marriageId) {
      return res.status(400).json({ error: 'Missing transaction_id or marriageId in query' });
    }

    const response = await axios.get(
      `https://api.flutterwave.com/v3/transactions/${transaction_id}/verify`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
        }
      }
    );

    if (response.data.status === 'success' && response.data.data.status === 'successful') {
      // Here, update your marriage record to mark payment as done, e.g.:
      // await Marriage.findByIdAndUpdate(marriageId, { paymentStatus: 'paid' });

      return res.json({
        message: 'Payment verified successfully',
        data: response.data.data,
      });
    } else {
      return res.status(400).json({ error: 'Payment not successful or not found' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  initializePayment,
  verifyPayment,
};
