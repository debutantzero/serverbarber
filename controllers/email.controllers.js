const nodemailer = require("nodemailer");

module.exports.sendMail = async(req, res) => {
    const { email, prix, picture, heure, name } = req.body;
    const url = "https://barberstore-b42ac.web.app/" + picture.slice(1);

    await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: "barbershopservice@outlook.com",
            pass: "boom11boom",
        },
    });
    let options = {
        from: ' "Barbershopservice"  <barbershopservice@outlook.com>',
        to: `${email}`,
        subject: `${name}`,
        text: `${name}`,
        html: `<img style="width: 250" src=${url} ><h3>Prix : ${prix}</h3> <h3>Heure : ${heure}</h3>`,
    };

    let info = transporter.sendMail(options, (err, data) => {
        if (err) res.json(err);
        if (data) console.log(data.response);
    });


}