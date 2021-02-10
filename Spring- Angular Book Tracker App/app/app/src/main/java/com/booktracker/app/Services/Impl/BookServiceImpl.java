package com.booktracker.app.Services.Impl;


import com.booktracker.app.Dtos.BookDto;
import com.booktracker.app.Models.Book;
import com.booktracker.app.Models.User;
import com.booktracker.app.Repositories.BookRepository;
import com.booktracker.app.Repositories.EntityManager.JpaEntityManager;
import com.booktracker.app.Repositories.UserRepository;
import com.booktracker.app.Services.BookService;
import com.booktracker.app.Transformers.BookTransformer;
import org.hibernate.ObjectDeletedException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.orm.jpa.JpaObjectRetrievalFailureException;
import org.springframework.stereotype.Service;

import javax.persistence.EntityExistsException;
import javax.persistence.EntityManager;
import javax.persistence.EntityNotFoundException;
import javax.persistence.NoResultException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.Set;

@Service
public class BookServiceImpl implements BookService {

    private final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    private final BookRepository bookRepository;



    @Autowired
    public BookServiceImpl(BookRepository bookRepository ) {
        this.bookRepository = bookRepository;
    }

    @Override
    public Book save(BookDto bookDto) {
        try {
            return this.bookRepository.save(BookTransformer.dtoToModel(bookDto));
        } catch (EntityExistsException e){
            logger.warn("Entity already exists. " + e.getMessage() );
            throw e;
        } catch (Exception e){
            logger.warn("An error has occurred: " + e.getMessage());
            throw e;
        }
    }

    @Override
    public BookDto findById(Long id) {
        try {
            return  BookTransformer.modelToDto(this.bookRepository.findById(id).get());
        } catch (EntityNotFoundException e){
            logger.warn("User with Id "+ id +" Not Found");
            throw e;
        } catch (Exception e){
            logger.error(e.getMessage());
            throw e;
        }
    }

    @Override
    public List<BookDto> findAll() {
        try {
            List<BookDto> dtoBookList = new ArrayList<>();
            List<Book> bookList =  this.bookRepository.findAll();
            for (Book book : bookList) {
                dtoBookList.add(BookTransformer.modelToDto(book));
            }
            return dtoBookList;
        }  catch (NoResultException e) {
            logger.warn("No results found. " + e.getMessage() );
            throw e;
        } catch (Exception e){
            logger.warn("An error has occurred: " + e.getMessage());
            throw e;
        }

    }

    @Override
    public void deleteById(Long id) {
        try{
            EntityManager entityManager = JpaEntityManager.entityManagerFactory.createEntityManager();
            entityManager.getTransaction().begin();

            Book toBeDeletedBook = entityManager.find(Book.class , id);
            Set<User> toBeDeletedUserList = toBeDeletedBook.getReaders();

            for (User user: toBeDeletedUserList) {
                user.getBookList().remove(toBeDeletedBook);
            // merge: Find an attached object with the same id and update it.
                entityManager.merge(user);
            }
            entityManager.remove(toBeDeletedBook);

            entityManager.getTransaction().commit();
            entityManager.close();
        } catch (EntityNotFoundException e ){
            logger.warn("User with Id "+ id +" Not Found");
            throw e;
        } catch (ObjectDeletedException e){
            logger.error("Object deletion encountered a problem:"+ e.getMessage());
            throw e;
        } catch (Exception e){
            logger.error(e.getMessage());
            throw e;
        }

    }

    @Override
    public BookDto getMostPopularBook() {
        try {
            return BookTransformer.modelToDto(this.bookRepository.getMostPopularBook());
        } catch (JpaObjectRetrievalFailureException e){
            logger.warn("Object retrieval failure encountered " + e.getMessage());
            throw e;
        } catch (Exception e){
            logger.error(e.getMessage());
            throw e;
        }

    }

    @Override
    public void updateBookDetails(BookDto bookDto){
        try{
            this.bookRepository.updateBookDetails(
                    bookDto.getAuthor_first_name(),
                    bookDto.getAuthor_last_name(),
                    bookDto.getPrice(),
                    bookDto.getBook_title(),
                    bookDto.getId()
            );
        } catch (EntityNotFoundException e){
            logger.warn("User with Id "+ bookDto.getId() +" Not Found");
            throw e;
        } catch (Exception e){
            logger.error(e.getMessage());
            throw e;
        }
    }

    @Override
    public BookDto addNewBook(BookDto bookDto) {

        try{

            Long bookId = this.bookRepository.findBookinDb(
                    bookDto.getAuthor_first_name(),
                    bookDto.getAuthor_last_name(),
                    "$" +bookDto.getPrice(),
                    bookDto.getBook_title(),
                    bookDto.getEmail()
            );

            if(bookId != null){
                throw new EntityExistsException();
            }

            Random randomNum = new Random();
            Book newBook = new Book();
            newBook.setAuthor_first_name(bookDto.getAuthor_first_name());
            newBook.setAuthor_last_name(bookDto.getAuthor_last_name());
            newBook.setBook_code(
                    100+ randomNum.nextInt(900) +"-"+ (100+ randomNum.nextInt(900))
            );
            newBook.setBook_title(bookDto.getBook_title());
            newBook.setEmail(bookDto.getEmail());
            newBook.setPrice( "$" + bookDto.getPrice());
            System.out.println(newBook.toString());

            return BookTransformer.modelToDto(this.bookRepository.save(newBook));

        } catch (Exception e){
            throw e;
        }
    }
}
