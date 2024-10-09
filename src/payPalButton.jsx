import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({total}) => {
    return (
        <PayPalScriptProvider options={{ "client-id": "AXUGJU4Fl7bbUeV08fMZjO4iOV7qv3Zv5mgfdX7VUKTWLL-Acd8J9l_zB8E9754sxOfCdgBkhIEGqHw3" }}>
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