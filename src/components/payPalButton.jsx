import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from 'axios';

const PayPalButton = ({ total }) => {
  return (
    <PayPalScriptProvider options={{ "client-id": axios.get(`${import.meta.env.PAYPAL_CLIENT_ID}`) }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: total.toString(),
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
