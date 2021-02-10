package com.booktracker.app.Repositories;

import com.booktracker.app.Models.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    @Override
    Book save(Book book);

    @Override
    Optional<Book> findById(Long id);

    @Override
    List<Book> findAll();

    @Override
    void deleteById(Long id);

    @Query(value = "SELECT ID, AUTHOR_FIRST_NAME, AUTHOR_LAST_NAME, BOOK_CODE, BOOK_TITLE , EMAIL, PRICE FROM BOOK  \n" +
                   "JOIN  \n" +
                   "( SELECT TOP 1 BOOK_ID, COUNT(book_id)  \n" +
                   "FROM  USER_BOOKS GROUP BY BOOK_ID ORDER BY \n" +
                   "COUNT(BOOK_ID) DESC ) TOPBOOK ON BOOK.ID = TOPBOOK.BOOK_ID", nativeQuery = true)
    Book getMostPopularBook();

    @Modifying
    @Transactional
    @Query(value = "UPDATE BOOK  b\n" +
            " SET b.AUTHOR_FIRST_NAME = ?,\n" +
            " b.AUTHOR_LAST_NAME =  ?, \n" +
            " b.PRICE = ?, \n" +
            " b.BOOK_TITLE = ? \n" +
            " WHERE b.ID = ? ",  nativeQuery = true)
    void updateBookDetails(String authorFirstName, String authorLastName, String price, String bookTitle, Long id);


    @Query(
            value = "SELECT ID FROM BOOK WHERE " +
            " BOOK.AUTHOR_FIRST_NAME = ? AND" +
            " BOOK.AUTHOR_LAST_NAME = ? AND" +
            " BOOK.PRICE = ? AND " +
            " BOOK.BOOK_TITLE = ? AND" +
            " BOOK.EMAIL = ? ", nativeQuery = true)
    Long findBookinDb(String authorFirstName, String authorLastName, String price, String bookTitle , String email);
}
