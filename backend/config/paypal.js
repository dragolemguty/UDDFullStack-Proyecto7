const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');

let clientId = process.env.PAYPAL_CLIENT_ID;
let clientSecret = process.env.PAYPAL_CLIENT_SECRET;

// Crea un ambiente sandbox o live según corresponda
let environment = new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);
// Si es para producción, usar:
// let environment = new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret);

let client = new checkoutNodeJssdk.core.PayPalHttpClient(environment);

module.exports = { client, orders: checkoutNodeJssdk.orders };
