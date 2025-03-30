import { RequestHandler } from "express";
import { Request, Response } from "express";
import Book from "../models/bookModel";

// GET alla böcker från databasen
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { title } = req.query;

    let query = {};
    if (title) {
      // Case-insensitive sökning med regex
      query = { title: { $regex: title as string, $options: "i" } };
    }

    const books = await Book.find(query);
    res.json(books);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
};
export const getBookById: RequestHandler = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    if (!book) {
      res.status(404).json({ error: "Book not found" });
      return;
    }
    res.json(book);
    return;
  } catch (error) {
    res.status(500).json({ error: "Server error" });
    return;
  }
};
// POST – skapa ny bok i databasen
export const createBook = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { title, author, publishedYear, genre } = req.body;

  if (!title || !author || !publishedYear || !genre) {
    res.status(400).json({
      error: "All fields are required: title, author, publishedYear, genre",
    });
    return;
  }

  try {
    const newBook = await Book.create({ title, author, publishedYear, genre });
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ error: "Failed to create book" });
  }
};

export const deleteBook: RequestHandler = async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      res.status(404).json({ error: "Book not found" });
      return;
    }
    res.json({ message: "Book deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete book" });
  }
};

export const updateBook: RequestHandler = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedBook) {
      res.status(404).json({ error: "Book not found" });
      return;
    }

    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ error: "Failed to update book" });
  }
};
