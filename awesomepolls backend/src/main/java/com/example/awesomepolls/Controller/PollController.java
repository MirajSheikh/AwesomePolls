package com.example.awesomepolls.Controller;

import com.example.awesomepolls.DTO.NewPoll;
import com.example.awesomepolls.Model.Poll;
import com.example.awesomepolls.Model.User;
import com.example.awesomepolls.Repository.UserRepository;
import com.example.awesomepolls.Service.PollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/poll")
@CrossOrigin("http://localhost:5173")
public class PollController {

    private final PollService pollService;

    @Autowired
    private UserRepository userRepository;

    public PollController(PollService pollService){
        this.pollService = pollService;
    }

    @PostMapping
    public ResponseEntity<?> addPoll(@RequestBody NewPoll newPoll){
        User author = userRepository.findByUsername(newPoll.getAuthor());
        Poll poll = new Poll();

        poll.setTitle(newPoll.getTitle());
        poll.setOptions(newPoll.getOptions());
        poll.setUser(author);

        poll.setLikes(0L);
        poll.setDislikes(0L);
        poll.setFavorite(false);
        poll.setTotalVotes(0L);

        poll.setVoteCounts(new ArrayList<>(Collections.nCopies(newPoll.getOptions().size(), 0L)));

        poll.setExpiry(LocalDateTime.now().plusHours(newPoll.getExpiry()).truncatedTo(ChronoUnit.SECONDS));

        pollService.addPoll(poll);
        return ResponseEntity.ok("Created a New Poll");
    }

    @GetMapping
    public ResponseEntity<?> getAllPolls(){
        return ResponseEntity.ok(pollService.getAllPolls());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPoll(@PathVariable Long id){
        Optional<Poll> poll = pollService.getPoll(id);
        return ResponseEntity.ok(poll);
    }

    @GetMapping("/titles")
    public ResponseEntity<?> getAllPollTitles(){
        List<String> titles = pollService.getAllPollTitles();
        return ResponseEntity.ok(titles);
    }
}
