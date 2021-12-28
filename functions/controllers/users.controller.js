const db = require('../database')

const userCtrl = {};

const ref = db.collection('users')

userCtrl.getUsers = async (req, res) => {
  try {
    const snapshot = await ref.get()
    const users = snapshot.docs.map(user => ({ ...user.data(), id: user.id }))
    return res.status(200).json(users)
  } catch(err) {
    console.log(err)
    res.status(500).send(err)
  }
}

userCtrl.getUser = (req, res) => {
  (async () => {
    try{
      const doc = ref.doc(req.params.id)
      const item = await doc.get()
      const user = { ...item.data(), id: item.id }
      return res.status(200).json(user)
    } catch(err) {
      console.log(err)
      res.status(500).send(err)
    }
  }
  )()
}

userCtrl.addUsers = async (req, res) => {
  try{
    const user = {
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password
    }
    await ref.doc().set(user)
    return res.status(201).json()
  } catch(err) {
    console.log(err)
    res.status(500).send(err)
  }
}

userCtrl.deleteUsers = async (req, res) => {
  try{
    await ref.doc(req.params.id).delete()
    return res.status(200).json()
  } catch(err) {
    console.log(err)
    res.status(500).send(err)
  }
}

userCtrl.updateUsers = async (req, res) => {
  try{
    const doc = ref.doc(req.params.id)
    await doc.update({ ...req.body })
    return res.status(200).json()
  } catch(err) {
    console.log(err)
    res.status(500).send(err)
  }
}

module.exports = userCtrl;
