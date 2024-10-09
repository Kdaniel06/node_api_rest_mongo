const express = require('express')
const router = express.Router()
const Book = require('../models/book.model')

// MIDDLEWARE
const getBook = async (req, res, next) => {
    let book;
    const { id } = req.params;

    // ? Use a regExp to match a 24 alphanumeric id from mongoDB
    if(!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(404).json({
            message: 'Invalid book ID'
        })
    }

    try {
        book = await Book.findById(id);
        if (!book) {
            return res.status(404).json({
                message: 'The book does not exist'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }

    res.book = book
    next()
}

// GET ALL
router.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        if (books.length === 0) {
            return res.status(204).json([])
        }
        res.json(books)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// CREATE 
router.post('/', async (req, res) => {
    const {title, author, genre, publication_date} = req?.body
    if (!title || !author || !genre || !publication_date){
        return res.status(400).json({
            message: 'Title, author, genre and publication_date are necessary'
        })
    }
    const book = new Book({
        title, 
        author, 
        genre, 
        publication_date
    })

    try {
        const newBook = await book.save()
        console.log(newBook)
        res.status(201).json(newBook)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})


// GET BY ID
router.get('/:id', getBook, async(req, res) => {
    res.json(res.book);
})

// PUT METHOD
router.put('/:id', getBook, async(req, res) => {
    try {
        const book = res.book
        book.title = req.body.title || book.title
        book.author = req.body.author || book.author
        book.genre = req.body.genre || book.genre
        book.publication_date = req.body.publication_date || book.publication_date

        const updatedBook = await book.save()
        res.json(updatedBook)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

// PATCH METHOD
router.patch('/:id', getBook, async(req, res) => {

    if (!req.body.title && !req.body.author && !req.body.genre && !req.body.publication_date){
        res.status(400).json({
            message: 'You need at least one of the attributes: Title, author, genre or publication_date'
        })
    }

    try {
        const book = res.book
        book.title = req.body.title || book.title
        book.author = req.body.author || book.author
        book.genre = req.body.genre || book.genre
        book.publication_date = req.body.publication_date || book.publication_date

        const updatedBook = await book.save()
        res.json(updatedBook)
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
})

// DELETE METHOD
router.delete('/:id', getBook, async(req, res) => {
    try {
        const book = res.book
        await book.deleteOne({
            _id: book._id
        });
        res.json({
            message: `The book ${book.title} was removed succesfully`
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
})

module.exports = router