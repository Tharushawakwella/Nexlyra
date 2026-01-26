package com.example.nexlyra.Controller;

import com.example.nexlyra.Entity.*;
import com.example.nexlyra.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired private ServiceRepository serviceRepo;
    @Autowired private ProjectRepository projectRepo;
    @Autowired private UserRepository userRepo;

    // --- SERVICE MANAGEMENT ---
    @GetMapping("/services")
    public List<Service> getServices() { return serviceRepo.findAll(); }

    @PostMapping("/services/add")
    public Service addService(@RequestBody Service service) { return serviceRepo.save(service); }

    @DeleteMapping("/services/delete/{id}")
    public String deleteService(@PathVariable Long id) {
        serviceRepo.deleteById(id);
        return "Service Deleted";
    }

    // --- PROJECT MANAGEMENT ---
    @GetMapping("/projects")
    public List<Project> getProjects() { return projectRepo.findAll(); }

    @PostMapping("/projects/add")
    public Project addProject(@RequestBody Project project) { return projectRepo.save(project); }

    @DeleteMapping("/projects/delete/{id}")
    public String deleteProject(@PathVariable Long id) {
        projectRepo.deleteById(id);
        return "Project Deleted";
    }

    // --- USER MANAGEMENT ---
    @GetMapping("/users")
    public List<User> getUsers() { return userRepo.findAll(); }
}