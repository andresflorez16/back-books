const { db } = require('../database')
const { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signOut, sendEmailVerification } = require('../auth')

const userCtrl = {};

const ref = db.collection('users')
const auth = getAuth()

userCtrl.getUsers = async (req, res) => {
  try {
    const snapshot = await ref.get()
    const users = snapshot.docs.map(user => ({ ...user.data(), idUser: user.id }))
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

userCtrl.getUser = async (req, res) => {
  try{
    const doc = ref.doc(req.params.id)
    const item = await doc.get()
    const myUser = { ...item.data(), idUser: item.id }
    return res.status(200).json(myUser)
  } catch(error) {
    console.log('Error getting user data', error)
    return res.status(500).send(error)
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
      snap.forEach(doc => {
	      return res.status(201).json({ idToken: credential._tokenResponse.idToken, idUser: doc.id })
      })
    })
    .catch(err => res.status(501).send(err))
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

userCtrl.loginUser = async (req, res) => {
  try { 
    const snap = await ref.where("email", "==", req.body.email)
  } catch (err) {
    
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
