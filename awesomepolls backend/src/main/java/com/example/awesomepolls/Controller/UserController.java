package com.example.awesomepolls.Controller;

import com.example.awesomepolls.Model.Users;
import com.example.awesomepolls.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepo userRepository;

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody Users user){
        Users u = userRepository.findByUsername(user.getUsername());

        if(u == null){
            Users u1 = new Users();
            u1.setUsername(user.getUsername());
            u1.setPassword(user.getPassword());
            userRepository.save(u1);
            return ResponseEntity.ok(true);
        }

        if(
                user.getUsername().equals(u.getUsername())
                && user.getPassword().equals(u.getPassword())
        ){
            return ResponseEntity.ok(true);
        }
        else{
            return ResponseEntity.ok(false);
        }
    }

    @GetMapping
    public List<Users> getAllUsers(){
        return userRepository.findAll();
    }

}
