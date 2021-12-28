const db = require('../database')
const booksCtrl = {};
const ref = db.collection('books')

booksCtrl.getBooks = async (req, res) => {
  try {
    const snapshot = await ref.get()
    const books = snapshot.docs.map(book => ({ ...book.data(), id: book.id }))
    return res.status(200).json(books)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

booksCtrl.getBook = (req, res) => {
  (async () => {
    try {
      const doc = ref.doc(req.params.id)
      const item = await doc.get()
      const book = { ...item.data()}
      return res.status(200).json(book)
    } catch (err) {
      console.log(err)
      res.status(500).send(err)
    }
  }
  )()
}

booksCtrl.addBooks = async (req, res) => {
  try {
    const books = {
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      document: req.body.document,
      image: req.body.image,
      token: {
        comments: req.body.comments,
        statu: req.body.statu,
      }
    }
    await ref.doc().set(books)
    return res.status(201).json()
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

booksCtrl.deleteBooks = async (req, res) => {
  try {
    await ref.doc(req.params.id).delete()
    return res.status(200).json()
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}

booksCtrl.updateBooks = async (req, res) => {
  try {
    const doc = ref.doc(req.params.id)
    await doc.update({ ...req.body })
    return res.status(200).json()
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
}



module.exports = booksCtrl;