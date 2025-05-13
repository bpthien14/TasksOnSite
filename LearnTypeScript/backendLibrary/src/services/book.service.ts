import Book from "../models/book.model";
import Borrowing from "../models/borrowing.model";
import Author from "../models/author.model";
import { FilterQuery } from "mongoose";
import { IBook } from "../types/book.types";

interface PaginationOptions {
  page: number;
  limit: number;
  sort?: string;
}

interface DeleteResult {
  ok: boolean;
  message?: string;
}

export const getBooks = async (
  filters: Record<string, any>, 
  options: PaginationOptions
) => {
  try {
    const { page, limit, sort } = options;
    const skip = (page - 1) * limit;

    const sortOption: any = {};
    if (sort) {
      const sortOrder = sort.startsWith('-') ? -1 : 1;
      const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
      sortOption[sortField] = sortOrder;
    } else {
      sortOption.title = 1; 
    }

    const books = await Book.find(filters)
      .sort(sortOption)
      .skip(skip)
      .limit(limit);

    const total = await Book.countDocuments(filters);

    return {
      books,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    };
  } catch (error) {
    throw error;
  }
};

// Lấy chi tiết một cuốn sách
export const getBookById = async (id: string) => {
  try {
    const book = await Book.findById(id);
    return book;
  } catch (error) {
    throw error;
  }
};

// Thêm sách mới
export const createBook = async (bookData: Partial<IBook>) => {
  try {
    const newBook = await Book.create(bookData);
    
    // Cập nhật số lượng sách cho tác giả
    if (bookData.authors && bookData.authors.length > 0) {
      for (const author of bookData.authors) {
        await Author.findByIdAndUpdate(
          author._id,
          { $inc: { bookCount: 1 } }
        );
      }
    }
    
    return newBook;
  } catch (error) {
    throw error;
  }
};

// Cập nhật thông tin sách
export const updateBook = async (id: string, bookData: Partial<IBook>) => {
  try {
    // Kiểm tra sách tồn tại
    const existingBook = await Book.findById(id);
    if (!existingBook) {
      return null;
    }
    
    // Cập nhật số lượng sách của tác giả nếu có thay đổi tác giả
    if (bookData.authors && JSON.stringify(existingBook.authors) !== JSON.stringify(bookData.authors)) {
      // Giảm số lượng sách của các tác giả cũ
      if (existingBook.authors && existingBook.authors.length > 0) {
        for (const author of existingBook.authors) {
          await Author.findByIdAndUpdate(
            author._id,
            { $inc: { bookCount: -1 } }
          );
        }
      }
      
      // Tăng số lượng sách của các tác giả mới
      if (bookData.authors.length > 0) {
        for (const author of bookData.authors) {
          await Author.findByIdAndUpdate(
            author._id,
            { $inc: { bookCount: 1 } }
          );
        }
      }
    }
    
    // Cập nhật thông tin sách
    const updatedBook = await Book.findByIdAndUpdate(
      id,
      { $set: bookData },
      { new: true }
    );
    
    return updatedBook;
  } catch (error) {
    throw error;
  }
};

// Kiểm tra xem có thể xóa sách không
export const canDeleteBook = async (id: string): Promise<DeleteResult> => {
  try {
    // Kiểm tra xem có bản sao nào đang được mượn không
    const book = await Book.findById(id);
    if (!book) {
      return { ok: false, message: "Không tìm thấy sách" };
    }
    
    // Kiểm tra xem có bản sao nào đang được mượn không
    const hasBorrowedCopies = book.copies.some(copy => copy.status === 'Đang mượn');
    if (hasBorrowedCopies) {
      return { 
        ok: false, 
        message: "Không thể xóa sách vì có bản sao đang được mượn" 
      };
    }
    
    // Kiểm tra xem có lịch sử mượn không
    const hasBorrowingHistory = await Borrowing.exists({ 'bookCopy.bookId': id });
    if (hasBorrowingHistory) {
      return { 
        ok: false, 
        message: "Không thể xóa sách vì có lịch sử mượn. Hãy đánh dấu là không còn sử dụng thay vì xóa" 
      };
    }
    
    return { ok: true };
  } catch (error) {
    throw error;
  }
};

// Xóa sách
export const deleteBook = async (id: string) => {
  try {
    const book = await Book.findById(id);
    if (!book) return null;
    
    // Cập nhật số lượng sách của tác giả
    if (book.authors && book.authors.length > 0) {
      for (const author of book.authors) {
        await Author.findByIdAndUpdate(
          author._id,
          { $inc: { bookCount: -1 } }
        );
      }
    }
    
    const result = await Book.findByIdAndDelete(id);
    return result;
  } catch (error) {
    throw error;
  }
};

// Tìm kiếm sách
export const searchBooks = async (query: string, limit: number = 10) => {
  try {
    // Tìm kiếm theo tiêu đề, tác giả, ISBN, danh mục
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { 'authors.name': { $regex: query, $options: 'i' } },
        { isbn: { $regex: query, $options: 'i' } },
        { 'category.name': { $regex: query, $options: 'i' } },
        { publisher: { $regex: query, $options: 'i' } }
      ]
    }).limit(limit);
    
    return books;
  } catch (error) {
    throw error;
  }
};