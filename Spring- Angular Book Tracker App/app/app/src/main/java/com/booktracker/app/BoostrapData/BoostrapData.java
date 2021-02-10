package com.booktracker.app.BoostrapData;

import com.booktracker.app.Models.Book;
import com.booktracker.app.Models.User;
import com.booktracker.app.Repositories.BookRepository;
import com.booktracker.app.Repositories.UserRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Random;

@Configuration
public class BoostrapData {

    private static final Logger logger = LoggerFactory.getLogger(BoostrapData.class);
    private static final ObjectMapper objectMapper = new ObjectMapper();
    private static  final Random random = new Random();
    @Bean
    CommandLineRunner initDb(UserRepository userRepository , BookRepository bookRepository) throws IOException {
        return args -> {

            logger.info("Started Loading data");
            List<User> userList= this.readUserJson();

            for (User user: userList ) {
                userRepository.save(user);
            }
            logger.info("Loaded Users in Db , user count is: " + userList.size() );

            List<Book> bookList = this.readBookJson();
            for (Book book: bookList) {
                bookRepository.save(book);
            }
            logger.info("Loaded Books in Db , user count is: " + bookList.size() );

            bookList = bookRepository.findAll();
            for (User user: userList ) {
                for (Book book : bookList){
                    if(random.nextInt(7) > 5){
                        user.getBookList().add(book);
                    }
                }
                userRepository.save(user);
            }
            logger.info("Loaded Users in Db , User - Book Relations" );

        };
    }

    private List<User> readUserJson() throws IOException {
        return objectMapper.readValue(
                new File("src/main/java/com/booktracker/app/BoostrapData/userData.json"),
                new TypeReference<List<User>>(){});
    }

    private List<Book> readBookJson() throws IOException {
        return objectMapper.readValue(
                new File("src/main/java/com/booktracker/app/BoostrapData/bookData.json"),
                new TypeReference<List<Book>>(){});
    }


}
