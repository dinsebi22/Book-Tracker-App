package com.booktracker.app.Controller;

import com.booktracker.app.Dtos.BookDto;
import com.booktracker.app.Dtos.UserDto;
import com.booktracker.app.Services.Impl.UserServiceImpl;
import com.booktracker.app.Services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/userController")
public class UserTrackerController {

    private final Logger logger = LoggerFactory.getLogger(UserTrackerController.class);
    private final UserService userService;

    @Autowired
    public UserTrackerController(UserServiceImpl userServiceImpl) {
        this.userService = userServiceImpl;
    }
    @GetMapping(path = "/users")
    public List<UserDto> getAllUsers(){
        return this.userService.findAll();
    }

    @GetMapping(path = "/book-reader/{id}")
    public UserDto getReader(@PathVariable Long id){
        return this.userService.findById(id);
    }


    @DeleteMapping(path = "/deleteUser/{id}")
    public ResponseEntity deleteBookByID(@PathVariable Long id){
        this.userService.deleteById(id);
        logger.info("User with id: "+ id + " was deleted");
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping(path = "/saveUserNewDetails")
    public ResponseEntity saveBookNewDetails(@RequestBody UserDto userDto){
        this.userService.updateUserDetails(userDto);
        logger.info("User with id: "+ userDto.getId() + " had its Details Updated");
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping(path = "/getUserBooks/{id}")
    public ResponseEntity<List<BookDto>> getUserBooks(@PathVariable Long id){
        return new ResponseEntity<>(this.userService.getUserBookList(id), HttpStatus.OK);
    }

    @DeleteMapping(path = "/removeBookFromUser/{userId}/{bookId}")
    public ResponseEntity<BookDto> deleteBookFromUser(@PathVariable Long userId, @PathVariable Long bookId){
        return new ResponseEntity<>(this.userService.deleteBookFromUser(userId , bookId), HttpStatus.OK);
    }

    @PostMapping(path = "/addNewUser")
    public ResponseEntity<UserDto> addNewUser(@RequestBody UserDto userDto){
        return ResponseEntity.ok(this.userService.addNewUser(userDto));
    }

    @PostMapping(path = "/addBooksToUser/{userId}")
    public ResponseEntity<UserDto> addBooksToReader(@RequestBody List<Long> booksIdList , @PathVariable Long userId){
        return ResponseEntity.ok(this.userService.addBooksToUser(booksIdList , userId));
    }
}
