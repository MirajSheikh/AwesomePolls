package com.example.awesomepolls.Controller;

import com.example.awesomepolls.Model.MyUserDetails;
import com.example.awesomepolls.Model.Users;
import com.example.awesomepolls.Repository.UserRepo;
import com.example.awesomepolls.Service.JWTService;
import com.example.awesomepolls.Service.MyUserDetailsService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@RestController
@CrossOrigin("http://localhost:5173")
public class HomeController {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTService jwtService;

    @Autowired
    ApplicationContext context;

    @PostMapping("/signin")
    public ResponseEntity<String> signin(@RequestBody Users user){
        Authentication authentication =
                authenticationManager
                        .authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

        if(authentication.isAuthenticated()){

            return ResponseEntity.ok()
                    .body(jwtService.generateToken(user.getUsername()));
        }

        return ResponseEntity.ok("unauthenticated");
    }

    @PostMapping("/register")
    public String register(@RequestBody Users user){
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
        user.setPassword(encoder.encode(user.getPassword()));
        userRepo.save(user);

        return jwtService.generateToken(user.getUsername());
    }

}
