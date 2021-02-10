package com.booktracker.app.Transformers;

import com.booktracker.app.Dtos.BookDto;
import com.booktracker.app.Dtos.UserDto;
import com.booktracker.app.Models.Book;
import com.booktracker.app.Models.User;

public class BookTransformer {

    public static final Book dtoToModel(BookDto dto){

        Book model = new Book();
        model.setId(dto.getId());
        model.setAuthor_first_name(dto.getAuthor_first_name());
        model.setAuthor_last_name(dto.getAuthor_last_name());
        model.setBook_code(dto.getBook_code());
        model.setBook_title(dto.getBook_title());
        model.setEmail(dto.getEmail());
        model.setPrice(dto.getPrice());

        return model;
    }

    public static final BookDto modelToDto(Book model){

        BookDto dto = new BookDto();;
        dto.setId(model.getId());
        dto.setAuthor_first_name(model.getAuthor_first_name());
        dto.setAuthor_last_name(model.getAuthor_last_name());
        dto.setBook_code(model.getBook_code());
        dto.setBook_title(model.getBook_title());
        dto.setEmail(model.getEmail());
        dto.setPrice(model.getPrice());
        return dto;
    }

}
