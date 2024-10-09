const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

const enviroment = new checkoutNodeJssdk.core.SandboxEnvironment('Client_ID', 'Client_Token');
const client = new checkoutNodeJssdk.core.PayPalHttpClient(enviroment);

module.exports = {client};