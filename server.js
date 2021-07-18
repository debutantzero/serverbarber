const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const { allRoutes, verifyId } = require("./middleware/verification")
const cookieParser = require("cookie-parser")
require("dotenv").config()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "https://barberstore-b42ac.web.app",
    credentials: true,
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));
const url = process.env.URL
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, () => {
    console.log("connection")
});
const connection = mongoose.connection
connection.once("open", () => {
        console.log("url valide")
    })
    // router
app.get('/myid', verifyId)
    //app.get("*", allRoutes)
const userRoute = require("./routes/user.routes")
const postRoute = require("./routes/produit.routes")
const sendMail = require("./routes/mail.routes")
app.use("/mail", sendMail)
app.use("/api", postRoute)
app.use("/api", userRoute)

const port = process.env.PORT
app.listen(port, () => {
    console.log("server sur le port " + port)
})