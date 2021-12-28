const booksCtrl = {};

booksCtrl.getBooks = (req, res) => res.json({message: []});

booksCtrl.getBook = (req, res) => res.json({message: 'book '});

booksCtrl.addBooks = (req, res) => res.json({message: 'book create'});

booksCtrl.deleteBooks = (req, res) => res.json({message: 'book deleted'});

booksCtrl.updateBooks = (req, res) => res.json({message: 'book updated'});



module.exports = booksCtrl;