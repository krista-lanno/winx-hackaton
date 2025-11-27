package com.winx.hackaton.controller;

import com.winx.hackaton.dto.UserResponse;
import com.winx.hackaton.mapper.UserMapper;
import com.winx.hackaton.model.User;
import com.winx.hackaton.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository userRepo;
    private final UserMapper userMapper;

    public UserController(UserRepository userRepo, UserMapper userMapper) {
        this.userRepo = userRepo;
        this.userMapper = userMapper;
    }

    // Get current user's profile
    @GetMapping("/me")
    public ResponseEntity<UserResponse> getCurrentUser(Authentication
                                                    auth) {
        if (auth == null) {
            return ResponseEntity.status(401).build();
        }

        var user =
                userRepo.findByEmail(auth.getName()).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        // Return user data without password
        return ResponseEntity.ok(userMapper.toResponse(user));
    }

    // Get user by ID - WITH authorization check
    @GetMapping("/{id}")
    public ResponseEntity<UserResponse> getUserById(@PathVariable Long id, Authentication auth) {
        if (auth == null) {
            return ResponseEntity.status(401).build();
        }

        var user = userRepo.findById(id).orElse(null);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        // AUTHORIZATION CHECK
        String authenticatedEmail = auth.getName();
        if (!user.getEmail().equals(authenticatedEmail)) {
            return ResponseEntity.status(403).build();
        }

        // Return user data without password
        return ResponseEntity.ok(userMapper.toResponse(user));
    }
}
