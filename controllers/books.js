import { Book } from '../models/book.js'

function index(req, res) {
  Book.find({})
    .populate('owner')
    .then(books => {
      res.render('books/index', {
        books,
        title: "Book Title"
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
}
function create(req, res) {
  req.body.owner = req.user.profile._id
  req.body.readMe = !!req.body.readMe
  Book.create(req.body)
    .then(book => {
      res.redirect('/books')
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
}

function show(req, res) {
  Book.findById(req.params.bookId)
    .populate('owner')
    .then(book => {
      res.render('books/show', {
        book,
        title: "Book show"
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
}

function flipRead(req, res) {
  Book.findById(req.params.bookId)
    .then(book => {
      book.readMe = !book.readMe
      book.save()
        .then(() => {
          res.redirect(`/books/${book._id}`)
        })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
}

function edit(req, res) {
  Book.findById(req.params.bookId)
    .then(book => {
      res.render('books/edit', {
        book,
        title: "Edit Book"
      })
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
}

function update(req, res) {
  Book.findById(req.params.bookId)
    .then(book => {
      if (book.owner.equals(req.user.profile._id)) {
        console.log("if check");
        req.body.readMe = !!req.body.readMe
        book.updateOne(req.body)
        .then(() => {
          res.redirect('/books')
        }) 
        .catch(err => {
          console.log(err)
          res.redirect('/')
        })
      } 
    })
    .catch(err => {
      console.log(err)
      res.redirect('/')
    })
}

function deleteBook(req, res) {
  console.log("Delete Book Call");
  Book.findByIdAndDelete(req.params.bookId)
  .then(() => {
    console.log("Deleted");
    res.redirect('/books')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/')
  })
}

export {
  index,
  create,
  show,
  flipRead,
  edit,
  update,
  deleteBook as delete,
}