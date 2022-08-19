const nodemailer = require('nodemailer');

require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: process.env.USER_SERVICE,
    auth : {
        user: process.env.USER_LOGIN_ADDRESS,
        pass: process.env.USER_PASS
    }
});

exports.postMessage = (req, res, next) => {
    let message = {
        from: process.env.USER_LOGIN_ADDRESS,
        to: process.env.TO_EMAIL_ADDRESS,
        replyTo: req.body.email,
        subject: `Nouveau message depuis MPE-BAT de la part de ${req.body.name}`,
        text: `
            Nouvelle demande de Devis de la part de ${req.body.name}
            
            Nom : ${req.body.name}
            Email : ${req.body.email}
            Téléphone : ${req.body.phone}
            Service : ${req.body.service}
            Message : ${req.body.message}

        `
    }

    transporter.sendMail(message, function(err, info){
        if(err){
            res.status(404).json(err)
        } else {
            res.status(200).json({message: 'merci'})
        }
    })
}