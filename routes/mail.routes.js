const router = require("express").Router();
const sendMailController = require("../controllers/email.controllers")
router.post('/send', sendMailController.sendMail)
module.exports = router;