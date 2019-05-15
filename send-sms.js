const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, function(){
    console.log('listening on port: ', port);
});

app.post('/api/messages', (req, res) => {
    res.header('Content-Type', 'application/json');
    client.messages
      .create({
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.MY_PHONE_NUMBER,
        body: "whenIneedU is here for you -- standard message"
    })
    .then(() => {
        res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
        console.log(err);
        res.send(JSON.stringify({ success: false }));
    });
});