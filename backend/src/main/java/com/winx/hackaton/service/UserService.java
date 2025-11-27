package com.winx.hackaton.service;

import com.winx.hackaton.model.User;
import com.winx.hackaton.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository repo;
    private final PasswordEncoder encoder;

    public UserService(UserRepository repo, PasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    public User register(String email, String rawPassword) {
        if (repo.existsByEmail(email)) throw new RuntimeException("user exists");
        User u = User.builder()
                .email(email)
                .password(encoder.encode(rawPassword))
                .roles("ROLE_USER")
                .build();
        return repo.save(u);
    }

    public User findByEmail(String email) {
        return repo.findByEmail(email).orElse(null);
    }
}
