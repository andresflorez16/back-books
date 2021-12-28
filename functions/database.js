var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert('./permission.json')
});

const db = admin.firestore()
const auth = admin.auth()

module.exports = { db, auth }
