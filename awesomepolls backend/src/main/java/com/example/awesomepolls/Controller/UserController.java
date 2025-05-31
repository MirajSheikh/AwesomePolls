package com.example.awesomepolls.Controller;

import com.example.awesomepolls.Model.User;
import com.example.awesomepolls.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:5173")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public ResponseEntity<?> createUser(@RequestBody User user){
        User u = userRepository.findByUsername(user.getUsername());

        if(u == null){
            User u1 = new User();
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
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

}
