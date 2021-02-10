package com.booktracker.app.Services;

import com.booktracker.app.Dtos.BookDto;
import com.booktracker.app.Models.Book;

import java.util.List;
import java.util.Optional;

public interface BookService {

    Book save(BookDto book);

    BookDto findById(Long id);

    List<BookDto> findAll();

    void deleteById(Long id);

    BookDto getMostPopularBook();

    void updateBookDetails(BookDto bookDto);

    BookDto addNewBook(BookDto bookDto);
}
