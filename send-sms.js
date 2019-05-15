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
    let toPhone = req.body.toPhone ? req.body.toPhone : process.env.MY_PHONE_NUMBER
    let fromPhone = req.body.fromPhone ? req.body.fromPhone : process.env.TWILIO_PHONE_NUMBER
    let message = req.body.message ? req.body.message : "whenIneedU is here for you -- standard message"
    res.header('Content-Type', 'application/json');
    client.messages
      .create({
        from: fromPhone,
        to: toPhone,
        body: message
    })
    .then(() => {
        res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
        console.log(err);
        res.send(JSON.stringify({ success: false }));
    });
});