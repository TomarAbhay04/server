// const crypto = require('crypto');
import crypto from 'crypto';

const generateSignature = (order_id, payment_id, secret) => {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(`${order_id}|${payment_id}`);
  return hmac.digest('hex');
};

const razorpay_order_id = 'order_ONoKxpFY8g4T1r'; // Replace with actual order ID
const razorpay_payment_id = 'order_ONoWx3slIrHkNa'; // Replace with actual payment ID
const razorpay_secret = 'HT2w3H3FDdkHC5BCDGZb5yYF'; // Replace with actual secret

const razorpay_signature = generateSignature(razorpay_order_id, razorpay_payment_id, razorpay_secret);
console.log('Generated Signature:', razorpay_signature);
