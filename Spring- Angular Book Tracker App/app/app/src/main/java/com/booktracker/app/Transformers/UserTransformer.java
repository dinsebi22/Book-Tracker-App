package com.booktracker.app.Transformers;

import com.booktracker.app.Dtos.UserDto;
import com.booktracker.app.Models.User;

public class UserTransformer {

    public static final User dtoToModel(UserDto dto){

        User model = new User();
        model.setId(dto.getId());
        model.setEmail(dto.getEmail());
        model.setFirst_name(dto.getFirst_name());
        model.setLast_name(dto.getLast_name());

        return model;
    }

    public static final UserDto modelToDto(User model){

        UserDto dto = new UserDto();
        dto.setId(model.getId());
        dto.setEmail(model.getEmail());
        dto.setFirst_name(model.getFirst_name());
        dto.setLast_name(model.getLast_name());
        return dto;
    }

}
