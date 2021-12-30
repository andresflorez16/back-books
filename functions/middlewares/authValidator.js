const admin = require("firebase-admin")

module.exports = validateFirebaseToken = async (req, res, next) => {
  if((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer '))){
    console.error('No Firebase id Token was passed as a Bearer token in the Authorization header, verify!')
    res.status(403).send('Unauthorized')
    return
  }

  let idToken
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer ')){
    idToken = req.headers.authorization.split('Bearer ')[1]
  } else {
    res.status(403).send('Unauthorized')
    return
  }

  try {
    const decodedIdToken = await admin.auth().verifyIdToken(idToken)
    console.log('Id token decoded', decodedIdToken)
    req.user = decodedIdToken
    next()
    return
  } catch(error) {
    console.error('Error verifying token', error)
    res.status(403).send('Unauthorized')
    return
  }
}
