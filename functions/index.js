const functions = require("firebase-functions");
const express = require('express')

const app = express()

app.use(require('./routes/books'))
app.use(require('./routes/competitions'))
app.use(require('./routes/users'))

exports.app = functions.https.onRequest(app)
