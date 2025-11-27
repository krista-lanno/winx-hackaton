package com.winx.hackaton.controller;

import com.winx.hackaton.dto.*;
import com.winx.hackaton.model.User;
import com.winx.hackaton.security.JwtUtils;
import com.winx.hackaton.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;
    private final PasswordEncoder encoder;
    private final JwtUtils jwt;

    public AuthController(UserService userService, PasswordEncoder encoder, JwtUtils jwt) {
        this.userService = userService;
        this.encoder = encoder;
        this.jwt = jwt;
    }

    // Add this test endpoint
    @GetMapping("/test")
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Auth endpoint is working!");
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthRequest req) {
        try {
            User u = userService.register(req.getEmail(), req.getPassword());
            String token = jwt.generateToken(u.getEmail()); // Change to getEmail()
            return ResponseEntity.ok(new AuthResponse(token));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest req) {
        var u = userService.findByEmail(req.getEmail());
        if (u == null || !encoder.matches(req.getPassword(), u.getPassword())) {
            return ResponseEntity.status(401).body("invalid credentials");
        }
        String token = jwt.generateToken(u.getEmail());
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @GetMapping("/protected-test")
    public ResponseEntity<String> protectedTest() {
        return ResponseEntity.ok("This is a PROTECTED endpoint - access granted!");
    }
}