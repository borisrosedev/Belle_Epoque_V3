const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const process = require("process")
dotenv.config()
const app = express()
const rootRoutes = require("./backend/routes/root.cjs");
const stripeRoutes = require("./backend/routes/stripe.cjs");
const isDocker = process.env.IS_DOCKER; 
const isProd = process.env.IS_PROD;

app.use(express.static(path.resolve(process.env.STATIC_DIR)))
app.use(cors({
    origin: [process.env.HOST]
}))
app.use(express.json({
    verify: function (req, res, buf) {
        if (req.originalUrl.startsWith('/webhook')) {
          req.rawBody = buf.toString();
        }
    },
}))
app.use('/', rootRoutes)
app.use('/api/stripe', stripeRoutes)


app.listen(process.env.PORT, () => {
    console.log(`Serving listening on port ${process.env.PORT}`)
    if (!isDocker && (isProd !== false)) {
        const open = require('open');
        open(`http://localhost:${process.env.PORT}/`);
    }
})




