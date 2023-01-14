const express = require('express');
const app = express();
// require("./src/config/db");
const router = require('./src/routes/route');
const createError = require("http-errors");

// const port = process.env.PORT || 4000;

app.use(express.json());


app.use(router);

app.use(async (req, res, next) => {
    next(createError.NotFound());
})

// error handle
app.use((err, req, res, next) => {
    // console.log(err.status);
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,

        },
    })
})
app.listen(process.env.PORT || 4000, () => {
    console.log("listen");
});