package com.booktracker.app.Controller;

import com.booktracker.app.Dtos.BookDto;
import com.booktracker.app.Services.BookService;
import com.booktracker.app.Services.Impl.BookServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/bookController")
public class BookTrackerController {

    private final Logger logger = LoggerFactory.getLogger(BookTrackerController.class);
    private final BookService bookService;

    @Autowired
    public BookTrackerController(BookServiceImpl bookService) {
        this.bookService = bookService;
    }

    @GetMapping(path = "/books")
    public ResponseEntity<List<BookDto>> getAllBooks(){
        return new ResponseEntity<>(this.bookService.findAll(), HttpStatus.OK);
    }

    @GetMapping(path = "/mostPopularBook")
    public ResponseEntity<BookDto> getMostPopularBook(){
        return new ResponseEntity<>(this.bookService.getMostPopularBook() , HttpStatus.OK);
    }

    @DeleteMapping(path = "/deleteBook/{id}")
    public ResponseEntity deleteBookByID(@PathVariable Long id){
        this.bookService.deleteById(id);
        logger.info("Book with id: "+ id + " was deleted");
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping(path = "/saveBookNewDetails")
    public ResponseEntity saveBookNewDetails(@RequestBody BookDto bookDto){
        this.bookService.updateBookDetails(bookDto);
        logger.info("Book with id: "+ bookDto.getId() + " had its Details Updated");
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping(path = "/addNewBook")
    public ResponseEntity addNewBook(@RequestBody BookDto bookDto){
        BookDto newAddedBook = this.bookService.addNewBook(bookDto);
        if(newAddedBook == null){
            return ResponseEntity.status(HttpStatus.FOUND).build();
        }
        return ResponseEntity.ok().build();
    }
}
