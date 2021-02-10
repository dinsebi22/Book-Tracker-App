package com.booktracker.app.Dtos;

import com.booktracker.app.Models.Book;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class UserDto {

    private Long id;
    private String first_name;
    private String last_name;
    private String email;
}
