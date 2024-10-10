import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({total}) => {
    return (
        <PayPalScriptProvider options={{ "client-id": "AUz_UUEOcb8AZsM2qc24KJGskDAUCFmAqEIg7Q-PfnBTsxUMn3WLtJwRsA_wGElXi9lVJBZrk_ELzRMn" }}>
            <PayPalButtons
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: total,
                            },
                        },
                    ],
                });
            }}
            onApprove={
                (data, actions) => {
                    return actions.order.capture().then((details) => {
                        alert(`Transacción completada por ${details.payer.name.given_name}`);
                    });
                }}

            />
            </PayPalScriptProvider>

    );
    
};
export default PayPalButton;