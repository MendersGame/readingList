import mongoose from 'mongoose'

const Schema = mongoose.Schema

const bookSchema = new Schema({
  title: String,
  author: String,
  readMe: Boolean,
  owner: { type: Schema.Types.ObjectId, ref: 'Profile' },
}, { timestamps: true, }
)

const Book = mongoose.model('Book', bookSchema)

export {
  Book
}