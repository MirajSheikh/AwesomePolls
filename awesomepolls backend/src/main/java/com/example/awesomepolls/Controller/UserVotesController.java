package com.example.awesomepolls.Controller;

import com.example.awesomepolls.DTO.UserVotesDTO;
import com.example.awesomepolls.Model.Poll;
import com.example.awesomepolls.Model.UserVotes;
import com.example.awesomepolls.Model.Users;
import com.example.awesomepolls.Repository.PollRepository;
import com.example.awesomepolls.Repository.UserRepo;
import com.example.awesomepolls.Repository.UserVotesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/userVotes")
@CrossOrigin("http://localhost:5173")
public class UserVotesController {

    @Autowired
    private UserVotesRepository userVotesRepository;

    @Autowired
    private UserRepo userRepository;

    @Autowired
    private PollRepository pollRepository;

    @PostMapping
    public ResponseEntity<?> recordVote(@RequestBody UserVotesDTO userVotesDTO){
        Users user = userRepository.findByUsername(userVotesDTO.getUsername());
        Poll poll = pollRepository.findById(userVotesDTO.getPollId()).orElseThrow();

        if(LocalDateTime.now().isAfter(poll.getExpiry())){
            poll.setExpired(true);
            pollRepository.save(poll);
            return ResponseEntity.ok("Poll has Expired!");
        }

        Optional<UserVotes> uv = userVotesRepository.findByUserAndPoll(user, poll);
        if(uv.isPresent()){
            UserVotes existingVote = uv.get();
            existingVote.setVoteOptionIndex(userVotesDTO.getVoteOptionIndex());
            userVotesRepository.save(existingVote);
            return ResponseEntity.ok("Updated vote");
        }
        else {
            UserVotes userVotes = new UserVotes();

            userVotes.setUser(user);
            userVotes.setPoll(poll);
            userVotes.setVoteOptionIndex(userVotesDTO.getVoteOptionIndex());

            userVotesRepository.save(userVotes);
            return ResponseEntity.ok("Saved vote");
        }

    }

    @GetMapping("/vote")
    public ResponseEntity<?> getVoteRecord(@RequestParam String username, @RequestParam Long pollId){
        Users user = userRepository.findByUsername(username);
        Poll poll = pollRepository.findById(pollId).orElseThrow();
        Optional<UserVotes> uv = userVotesRepository.findByUserAndPoll(user, poll);
        return ResponseEntity.ok(uv);
    }
}
