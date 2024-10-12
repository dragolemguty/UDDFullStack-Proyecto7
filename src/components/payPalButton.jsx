import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ total }) => {
  const paypalClientId = import.meta.env.PAYPAL_CLIENT_ID;  // Usar el client-id de tus variables de entorno

  return (
    <PayPalScriptProvider options={{ "client-id": paypalClientId }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: total.toString(), // Pasar el total como string
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            alert(`Transacción completada por ${details.payer.name.given_name}`);
          });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;
