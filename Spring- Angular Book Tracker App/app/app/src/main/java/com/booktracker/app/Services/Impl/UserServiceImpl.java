package com.booktracker.app.Services.Impl;

import com.booktracker.app.Dtos.BookDto;
import com.booktracker.app.Dtos.UserDto;
import com.booktracker.app.Models.Book;
import com.booktracker.app.Models.User;
import com.booktracker.app.Repositories.BookRepository;
import com.booktracker.app.Repositories.EntityManager.JpaEntityManager;
import com.booktracker.app.Repositories.UserRepository;
import com.booktracker.app.Services.UserService;
import com.booktracker.app.Transformers.BookTransformer;
import com.booktracker.app.Transformers.UserTransformer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    private final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, BookRepository bookRepository) {
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }

    @Override
    public User save(UserDto userDto) {
        try {
            return this.userRepository.save(UserTransformer.dtoToModel(userDto));
        } catch (EntityExistsException e){
            logger.warn("Entity already exists. " + e.getMessage() );
            throw e;
        } catch (Exception e){
            logger.warn("An error has occurred: " + e.getMessage());
            throw e;
        }
    }

    @Override
    public List<UserDto> findAll() {
        try {
            List<User> userList = this.userRepository.findAll();
            List<UserDto> dtoUserList = new ArrayList<>();
            for (User user : userList) {
                dtoUserList.add(UserTransformer.modelToDto(user));
            }

            return dtoUserList;
        } catch (NoResultException e) {
            logger.warn("No results found. " + e.getMessage() );
            throw e;
        } catch (Exception e){
            logger.warn("An error has occurred: " + e.getMessage());
            throw e;
        }

    }

    @Override
    public UserDto findById(Long id) {
        try{
            return UserTransformer.modelToDto(this.userRepository.findById(id).get());
        } catch (EntityNotFoundException e){
            logger.warn("User with Id "+ id +" Not Found");
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

            User userToBeDeleted = entityManager.find(User.class , id);
            Set<Book> toBeDeletedBookList = userToBeDeleted.getBookList();

            for (Book book: toBeDeletedBookList) {
                book.getReaders().remove(book);
                // merge: Find an attached object with the same id and update it.
                entityManager.merge(book);
            }
            entityManager.remove(userToBeDeleted);

            entityManager.getTransaction().commit();
            entityManager.close();
        } catch (EntityNotFoundException e){
            logger.warn("User with Id "+ id +" Not Found");
            throw e;
        } catch (QueryTimeoutException e){
            logger.warn("Query timed out" + e.getMessage());
            throw e;
        } catch (Exception e){
            logger.warn("An error has occurred: " + e.getMessage());
            throw e;
        }


    }

    @Override
    public void updateUserDetails(UserDto userDto){
        try{
            this.userRepository.updateUserDetails(
                    userDto.getFirst_name(),
                    userDto.getLast_name(),
                    userDto.getEmail(),
                    userDto.getId()
            );
        } catch (Exception e){
            logger.warn("An error has occurred: " + e.getMessage());
            throw e;
        }
    }

    @Override
    public List<BookDto> getUserBookList(Long id){
        try{
            User requestedUser = this.userRepository.findById(id).get();
            Set<Book> userBookList = requestedUser.getBookList();
            List<BookDto> bookDtoList = new ArrayList<>();

            for (Book book: userBookList) {
                bookDtoList.add(BookTransformer.modelToDto(book));
            }
            return bookDtoList;
        }catch (EntityNotFoundException e){
            logger.warn("User with Id "+ id +" Not Found");
            throw e;
        } catch (Exception e){
            logger.error(e.getMessage());
            throw e;
        }
    }

    @Override
    public BookDto deleteBookFromUser(Long userId, Long bookId) {
        try{
            User user = this.userRepository.findById(userId).get();
            Book bookToRemove = this.bookRepository.findById(bookId).get();

            user.removeBook(bookToRemove);
            this.userRepository.save(user);

            logger.info("User with Id: "+ userId + " had the following book removed: "+ bookToRemove.toString()) ;
            return BookTransformer.modelToDto(bookToRemove);

        } catch (EntityNotFoundException e){
            logger.warn("User with Id "+ userId +" Not Found or Book with Id "+ bookId +" Not Found");
            throw e;
        } catch (RuntimeException e){
            logger.error(e.getMessage());
            throw e;
        }

    }

    @Override
    public UserDto addNewUser(UserDto userDto) {
        try{
            Long userId = this.userRepository.findUserinDb(
                    userDto.getFirst_name(),
                    userDto.getLast_name(),
                    userDto.getEmail()
            );
            if(userId != null){
                throw new EntityExistsException();
            }

            User newUser = new User();
            newUser.setFirst_name(userDto.getFirst_name());
            newUser.setLast_name(userDto.getLast_name());
            newUser.setEmail(userDto.getEmail());
            return UserTransformer.modelToDto(this.userRepository.save(newUser));
        } catch (Exception e){
            throw e;
        }
    }

    @Override
    public UserDto addBooksToUser(List<Long> addedBookIds, Long userId){
        try{
            List<Book> addedBooks = this.bookRepository.findAllById(addedBookIds);
            User user = this.userRepository.findById(userId).get();

            for (Book book: addedBooks) {
                user.getBookList().add(book);
            }
            return UserTransformer.modelToDto(this.userRepository.save(user));
        } catch (EntityNotFoundException e){
            logger.warn("Book already exists for user..");
            throw e;
        } catch (Exception e){
            throw e;
        }
    }
}
