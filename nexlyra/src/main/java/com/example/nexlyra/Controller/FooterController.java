package com.example.nexlyra.Controller;

import com.example.nexlyra.Entity.Footer;
import com.example.nexlyra.Repository.FooterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/footer")
@CrossOrigin
public class FooterController {

    @Autowired
    private FooterRepository footerRepository;

    // Footer එක ගන්න (Home Page එකට)
    @GetMapping("/get")
    public Footer getFooter() {
        List<Footer> footers = footerRepository.findAll();
        if (footers.isEmpty()) {
            Footer defaultFooter = new Footer();
            defaultFooter.setText("© 2026 Nexlyra Digital. All rights reserved.");
            return defaultFooter;
        }
        return footers.get(0);
    }

    // Footer එක Update කරන්න (Admin Page එකට)
    @PostMapping("/update")
    public Footer updateFooter(@RequestBody Footer footer) {
        footerRepository.deleteAll(); // පරණ ඒවා මකලා අලුත් එක දානවා
        return footerRepository.save(footer);
    }
}