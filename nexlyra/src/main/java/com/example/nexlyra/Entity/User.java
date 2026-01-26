package com.example.nexlyra.Entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;

    @Column(unique = true)
    private String email;

    private String password;

    private String role; // "USER" හෝ "ADMIN"

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}