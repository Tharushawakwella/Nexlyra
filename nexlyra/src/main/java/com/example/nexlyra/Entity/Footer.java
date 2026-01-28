package com.example.nexlyra.Entity;

import jakarta.persistence.*;

@Entity
public class Footer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String text; // Footer එකේ වචන ටික

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getText() { return text; }
    public void setText(String text) { this.text = text; }
}