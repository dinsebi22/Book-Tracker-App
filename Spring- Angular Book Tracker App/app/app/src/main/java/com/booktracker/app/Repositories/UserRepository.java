package com.booktracker.app.Repositories;

import com.booktracker.app.Models.Book;
import com.booktracker.app.Models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Override
    User save(User user);

    @Override
    List<User> findAll();

    @Override
    Optional<User> findById(Long id);

    @Override
    void deleteById(Long id);


    @Modifying
    @Transactional
    @Query(value = "UPDATE USER  u\n" +
            " SET u.FIRST_NAME = ?,\n" +
            " u.LAST_NAME = ?, \n" +
            " u.EMAIL = ? \n" +
            " WHERE u.ID = ? ",  nativeQuery = true)
    void updateUserDetails(String firstName, String lastName, String email, Long id);


    @Query(
            value = "SELECT ID FROM USER WHERE " +
                    " USER.FIRST_NAME = ? AND" +
                    " USER.LAST_NAME = ? AND" +
                    " USER.EMAIL = ? ", nativeQuery = true)
    Long findUserinDb(String firstName, String lastName, String email);

}
