import React from "react";
import {CardElement} from "@stripe/react-stripe-js";

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            'color': '#fff',
            'fontFamily': '"Helvetica Neue", Helvetica, sans-serif',
            'fontSmoothing': 'antialiased',
            'fontSize': '16px',
            '::placeholder': {
                color: '#b8c7ff',
            },
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a',
        },
    },
};

const CardInput = () => {
    return (
        <CardElement options={CARD_ELEMENT_OPTIONS} />
    );
};

export default CardInput;
