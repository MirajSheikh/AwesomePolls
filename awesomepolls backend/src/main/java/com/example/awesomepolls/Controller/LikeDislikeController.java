package com.example.awesomepolls.Controller;

import com.example.awesomepolls.Model.LikeDislike;
import com.example.awesomepolls.Model.Poll;
import com.example.awesomepolls.Model.Users;
import com.example.awesomepolls.Repository.LikeDislikeRepository;
import com.example.awesomepolls.Repository.PollRepository;
import com.example.awesomepolls.Repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/likeDislike")
@CrossOrigin("http://localhost:5173")
public class LikeDislikeController {

    @Autowired
    private LikeDislikeRepository likeDislikeRepository;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private PollRepository pollRepository;

    @GetMapping("/like")
    public ResponseEntity<?> getLiked(@RequestParam String username, @RequestParam Long pollId){
        Users user = userRepository.findByUsername(username);
        Poll poll = pollRepository.findById(pollId).orElseThrow();
        LikeDislike ld = likeDislikeRepository.findByUserAndPoll(user, poll);
        return ld != null
                ? ResponseEntity.ok(ld.isLiked())
                : ResponseEntity.ok(false);
    }

    @GetMapping("/dislike")
    public ResponseEntity<?> getDisliked(@RequestParam String username, @RequestParam Long pollId){
        Users user = userRepository.findByUsername(username);
        Poll poll = pollRepository.findById(pollId).orElseThrow();
        LikeDislike ld = likeDislikeRepository.findByUserAndPoll(user, poll);
        return ld != null
                ? ResponseEntity.ok(ld.isDisliked())
                : ResponseEntity.ok(false);
    }
}
