const functions = require("firebase-functions");
const express = require('express')
const cors = require('cors')

const app = express()
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions))
app.use(express.json())

app.use(require('./routes/books'))
app.use(require('./routes/competitions'))
app.use(require('./routes/users'))

exports.app = functions.https.onRequest(app)
