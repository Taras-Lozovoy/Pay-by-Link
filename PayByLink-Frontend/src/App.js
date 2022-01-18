import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import './index.scss';
import HomePage from "./components/stripe-form";
import {STRIPE_KEY} from "./config";
import {Route} from "react-router-dom";
import ThankYou from "./components/thank-you";

const stripePromise = loadStripe(STRIPE_KEY);

const App = () => {
    return (
        <Elements stripe={stripePromise}>
            <Route exact path='/'>
                <HomePage/>
            </Route>
            <Route exact path='/thank-you'>
                <ThankYou />
            </Route>
        </Elements>
    );
}

export default App;
