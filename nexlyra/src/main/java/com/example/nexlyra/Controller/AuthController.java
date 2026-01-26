package com.example.nexlyra.Controller;

import com.example.nexlyra.Entity.User;
import com.example.nexlyra.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // --- SIGN UP ---
    @PostMapping("/signup")
    public String registerUser(@RequestBody User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            return "Email is already taken!";
        }

        if ("tharushawakwella@gmail.com".equals(user.getEmail())) {
            user.setRole("ADMIN");
        } else {
            user.setRole("USER");
        }

        userRepository.save(user);
        return "User registered successfully!";
    }


    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail()).orElse(null);

        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {

            Map<String, String> response = new HashMap<>();
            response.put("message", "Login Successful!");
            response.put("role", user.getRole());
            response.put("email", user.getEmail());
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body("Invalid Credentials");
    }
}