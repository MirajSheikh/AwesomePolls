package com.example.awesomepolls.Controller;

import com.example.awesomepolls.Model.Users;
import com.example.awesomepolls.Repository.UserRepo;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:5173")
public class HomeController {

    @Autowired
    private UserRepo userRepo;

    @GetMapping("")
    public String showMessage(HttpServletRequest httpServletRequest){
        return "This is Called Security " + httpServletRequest.getSession().getId();
    }

    @PostMapping("/signin")
    public String signin(@RequestBody Users user){

        Users existingUser = userRepo.findByUsername(user.getUsername());

        if(existingUser == null){
            return "User Not Found";
        }
        else{
            if(user.getPassword().equals(existingUser.getPassword())){
                return "Hello " + user.getUsername();
            }
            return "Wrong Password";
        }
    }

}
