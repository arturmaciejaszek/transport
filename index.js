'use strict';

const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const config = require('./config');
const cors = require('cors')({origin: true});

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    // service: 'gmail',
    auth: {
      user: config.transporter,
      pass: config.password
    }
});

exports.sendEmail = functions.https.onRequest((req, res) => {
        const options = {
            from: '',
            to: config.recipient,
            subject: "Wiadomość od: " + req.body.name,
            text: "Wiadomość od " + req.body.name + "\n\n" + 
            "adres zwrotny: "+ req.body.email + "\n\n" +
            "Telefon kontaktowy: " + req.body.phone + "\n\n" +
            "link do mapy: " +req.body.link + "\n\n" +
            "szacowane wartości: odległość: " + req.body.dist + " wycena: " + req.body.est + " brutto" + "\n\n" +
            "Wiadomość: " + "\n\n" +
            req.body.msg
        }

        cors(req, res, () => {
            return transporter.sendMail(options).then( () => {
                res.send(true);
            }).catch( err => res.send(err) );
        })

    });
