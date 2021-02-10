package com.booktracker.app.Dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
public class BookDto {

    private Long id;
    private String author_first_name;
    private String author_last_name;
    private String email;
    private String price;
    private String book_title;
    private String book_code;

}
