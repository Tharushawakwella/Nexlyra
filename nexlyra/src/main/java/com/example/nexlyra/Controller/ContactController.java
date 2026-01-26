package com.example.nexlyra.Controller;

import com.example.nexlyra.Entity.ContactMessage;
import com.example.nexlyra.Repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin
public class ContactController {

    @Autowired
    private ContactRepository contactRepository;


    @PostMapping("/send")
    public String sendMessage(@RequestBody ContactMessage message) {
        contactRepository.save(message);
        return "Message Sent Successfully!";
    }


    @GetMapping("/all")
    public List<ContactMessage> getAllMessages() {
        return contactRepository.findAll();
    }


    @DeleteMapping("/delete/{id}")
    public String deleteMessage(@PathVariable Long id) {
        contactRepository.deleteById(id);
        return "Message Deleted";
    }
}