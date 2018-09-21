var express = require('express');
var fs = require('fs');
var https = require('https');
var app = express();
var options = {
    key: fs.readFileSync('certs/server-key.pem'),
    cert: fs.readFileSync('certs/server-crt.pem'),
    //ca: fs.readFileSync('certs/ca-crt.pem'), //client auth ca OR cert
    ca: fs.readFileSync('certs/client-crt.pem'), //client auth ca OR cert
    requestCert: true,                   //new
    rejectUnauthorized: false            //new
};

app.use(function (req, res, next) {
    if (!req.client.authorized) {
        return res.status(401).send('User is not authorized');
    }
    //examine the cert itself, and even validate based on that!
    var cert = req.socket.getPeerCertificate();
    if (cert.subject) {
        console.log("Client cert: " + cert.subject.CN);
    }
    next();
 });

app.use(express.static('public'));

var listener = https.createServer(options, app).listen(4433, function () {
    console.log('Express HTTPS server listening on port ' + listener.address().port);
});