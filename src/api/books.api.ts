import { httpClient } from "./http";
import { Book, BookDetail } from "../models/book.model";
import { Pagination } from "../models/pagination.model";
interface fetchBooksParams {
  category_id?: number;
  new_book?: boolean;
  current_page?: number;
  limit: number;
}

interface FetchBooksResponse {
  books: Book[];
  pagination: Pagination;
}

export const fetchBooks = async (params: fetchBooksParams) => {
  try {
    const response = await httpClient.get<FetchBooksResponse>("/books", {
      params: params,
    });
    return response.data;
  } catch (error) {
    return {
      books: [],
      pagination: {
        total_count: 0,
        current_page: 1,
      },
    };
  }
};

export const fetchBook = async (bookId: string) => {
  const response = await httpClient.get<BookDetail>(`/books/${bookId}`);

  return response.data;
};

export const likeBook = async (bookId: number) => {
  try {
    const response = await httpClient.post(`/likes/${bookId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const unlikeBook = async (bookId: number) => {
  const response = await httpClient.delete(`/likes/${bookId}`);
  return response.data;
};
