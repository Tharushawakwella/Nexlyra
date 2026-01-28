package com.example.nexlyra.Controller;

import com.example.nexlyra.Entity.ContactInfo;
import com.example.nexlyra.Repository.ContactInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact-info")
@CrossOrigin
public class ContactInfoController {

    @Autowired
    private ContactInfoRepository contactInfoRepository;

    // විස්තර ගන්න (Home Page එකට)
    @GetMapping("/get")
    public ContactInfo getContactInfo() {
        List<ContactInfo> list = contactInfoRepository.findAll();
        if (list.isEmpty()) {
            // Database එක හිස් නම් Default ඒවා යවනවා
            ContactInfo def = new ContactInfo();
            def.setEmail("hello@nexlyra.com");
            def.setPhone("+94 77 123 4567");
            def.setAddress("Colombo, Sri Lanka");
            return def;
        }
        return list.get(0);
    }

    // විස්තර වෙනස් කරන්න (Admin Panel එකට)
    @PostMapping("/update")
    public ContactInfo updateContactInfo(@RequestBody ContactInfo contactInfo) {
        contactInfoRepository.deleteAll(); // පරණ ඒවා මකලා අලුත් එක දානවා
        return contactInfoRepository.save(contactInfo);
    }
}