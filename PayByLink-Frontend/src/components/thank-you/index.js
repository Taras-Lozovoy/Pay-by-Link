import React from "react";
import styles from './thank-you.module.scss';
import {Button} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const ThankYou = () => {
    const history = useHistory();

    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>Your payment was successful!</h1>
            <div>
                <Button
                    className={styles.pay__button}
                    color={"primary"}
                    onClick={() => history.push("/")}
                >
                    Back to payment
                </Button>
            </div>
        </div>
    );
};

export default ThankYou;
