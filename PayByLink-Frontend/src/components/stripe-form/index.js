import React, {useState} from 'react';
import {Button, Card, CardContent, TextField} from "@material-ui/core";
import {useStripe, useElements, CardElement} from "@stripe/react-stripe-js";
import {useHistory} from "react-router-dom";
import CardInput from "../card-input";
import styles from './home-page.module.scss';
import {payment} from "../../api/payment";

const HomePage = () => {
    const [email, setEmail] = useState('');
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (history) => {
        if (!stripe || !elements) return;

        const res = await payment(email);

        const clientSecret = res.data?.client_secret && res.data.client_secret;

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {email},
            },
        });

        if (result.error) {
            // result.error.message
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                history.push("/thank-you");
            }
        }
    }

    return (
        <Card className={styles.root}>
            <CardContent className={styles.content}>
                <TextField
                    className={styles.input__text}
                    label='Email'
                    id='outlined-email-input'
                    margin='normal'
                    type='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    inputProps={{className: styles.input__text}}
                />
                <CardInput/>
                <div className={styles.button__wrapper}>
                    <Button
                        className={styles.pay__button}
                        color={"primary"}
                        onClick={() => handleSubmit(history)}
                    >
                        Pay
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default HomePage;
