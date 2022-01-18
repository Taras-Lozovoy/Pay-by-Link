const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const redis = require("redis");
const session = require('express-session');
const CryptoJS = require("crypto-js");
const validateEmail = require("./validators");
const RedisStore = require('connect-redis')(session);

dotenv.config({path: './.env'});

const stripe = require('stripe')(process.env.STRIPE_KEY);

const app = express();

const redisData = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
};

app.use(bodyParser.json({limit: "50mb"}));
app.use(cors());

const test = {foo: 'bar'};

const client = redis.createClient(redisData);

const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(test), process.env.CRYPTO_SECRET).toString();

app.set('trust proxy', 1);
app.use(session({
    store: new RedisStore({client}),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true}
}));

const bytes = CryptoJS.AES.decrypt(encryptedData, process.env.CRYPTO_SECRET);
const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

client.set('data', decryptedData);

app.post('/pay', async (req, res) => {
    try {
        const {email} = req.body;

        if (!validateEmail(email)) {
            res.status(400).send({message: "Invalid email address"});
            return;
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: 5000,
            currency: 'usd',
            metadata: {integration_check: 'accept_a_payment'},
            receipt_email: email,
        });

        client.get("data", async (err, result) => {
            req.session.parameters = await JSON.parse(result);
        });

        res.send({'client_secret': paymentIntent['client_secret']});
    } catch (e) {
        console.log(e)
    }
})

app.listen(process.env.PORT || 5000, () => console.log(`App has been started on port ${process.env.PORT || 5000}...`));
