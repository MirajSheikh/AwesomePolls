package com.example.awesomepolls.Controller;

import com.example.awesomepolls.Model.Users;
import com.example.awesomepolls.Repository.UserRepo;
import com.example.awesomepolls.Service.JWTService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:5173")
public class HomeController {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTService jwtService;

    @GetMapping("")
    public String showMessage(HttpServletRequest httpServletRequest){
        return "This is Called Security " + httpServletRequest.getSession().getId();
    }

    @PostMapping("/signin")
    public String signin(@RequestBody Users user){
        Authentication authentication =
                authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        if(authentication.isAuthenticated())
            return jwtService.generateToken(user.getUsername());

        return "Unable to Verify";
    }

    @PostMapping("/register")
    public Users register(@RequestBody Users user){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepo.save(user);
    }

}
