const { db } = require('../database')
const { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, sendEmailVerification } = require('../auth')

const userCtrl = {};

const ref = db.collection('users')
const auth = getAuth()

userCtrl.getUsers = async (req, res) => {
  try {
    const snapshot = await ref.get()
    const users = snapshot.docs.map(user => ({ ...user.data() }))
    return res.status(200).json(users)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

userCtrl.getUserToken = async (req, res) => {
  try {
    onAuthStateChanged(auth, user => {
      return user ? res.status(200).json(user) : res.status(401).json({ message: 'no user' })
    })
  } catch(err) {
    console.log(err)
    res.status(500).send(err)
  }
} 

userCtrl.getUser = (req, res) => {
    try {
      const token = req.headers.authorization.split(" ")[1]
      onAuthStateChanged(auth, async user => {
	if(user){
	  const accessToken = user.stsTokenManager.accessToken
	  if(token === accessToken) {
	    const doc = ref.doc(req.params.id)
	    const item = await doc.get()
	    const myUser = { ...item.data()}
	    return res.status(200).json(myUser)
	  }
	}else return res.status(401).send({ message: "Unauthorized" })
    })
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
}

userCtrl.addUsers = (req, res) => {
  try {
    createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
    .then(async credential => {
      const newUser = {
	name: req.body.name,
	lastname: req.body.lastname,
	email: req.body.email,
	password: req.body.password,
	type: 'client'
      }
      await ref.doc().set(newUser)
      const snap = await ref.where("email", "==", newUser.email).get()
      const idUser = snap ? snap.map(doc => doc.id) : null
      console.log(idUser)
      return res.status(201).json({ idToken: credential._tokenResponse.idToken, idUser })
    })
    .catch(err => res.status(501).send(err))
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

userCtrl.deleteUsers = async (req, res) => {
  try {
    await ref.doc(req.params.id).delete()
    return res.status(200).json()
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

userCtrl.updateUsers = async (req, res) => {
  try {
    const doc = ref.doc(req.params.id)
    await doc.update({ ...req.body })
    return res.status(200).json()
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

module.exports = userCtrl;
