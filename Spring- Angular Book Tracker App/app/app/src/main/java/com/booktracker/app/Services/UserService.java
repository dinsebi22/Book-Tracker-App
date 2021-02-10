package com.booktracker.app.Services;

import com.booktracker.app.Dtos.BookDto;
import com.booktracker.app.Dtos.UserDto;
import com.booktracker.app.Models.User;

import java.util.List;

public interface UserService {

    User save(UserDto userDto);

    List<UserDto> findAll();

    UserDto findById(Long id);

    void deleteById(Long id);

    void updateUserDetails(UserDto userDto);

    List<BookDto> getUserBookList(Long id);

    BookDto deleteBookFromUser(Long userId, Long bookId);

    UserDto addNewUser(UserDto userDto);

    UserDto addBooksToUser(List<Long> addedBookIds, Long userId);

}
