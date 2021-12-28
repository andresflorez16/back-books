var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert('./permission.json')
});

const db = admin.firestore()

module.exports = db
