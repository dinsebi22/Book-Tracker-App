export interface Book {
  id: number;
  author_first_name: string;
  author_last_name: string;
  email: string;
  price: string;
  book_title: string;
  book_code: string;
}

export interface User {
  id: number;
  book_id: number;
  first_name: string;
  last_name: string;
  email: string;
}
