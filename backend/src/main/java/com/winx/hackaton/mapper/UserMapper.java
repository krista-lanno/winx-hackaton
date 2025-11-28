package com.winx.hackaton.mapper;

import com.winx.hackaton.dto.UserResponse;
import com.winx.hackaton.model.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserResponse toResponse(User user) {
        if (user == null) return null;

        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setEmail(user.getEmail());
        // Password is NOT included - this is important for security!
        return response;
    }
}
