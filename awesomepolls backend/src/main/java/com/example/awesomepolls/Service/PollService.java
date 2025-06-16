package com.example.awesomepolls.Service;

import com.example.awesomepolls.Model.Poll;
import com.example.awesomepolls.Model.User;
import com.example.awesomepolls.Repository.PollRepository;
import com.example.awesomepolls.Repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PollService {

    private final PollRepository pollRepository;
    private final UserRepository userRepository;

    public PollService(PollRepository pollRepository, UserRepository userRepository){
        this.pollRepository = pollRepository;
        this.userRepository = userRepository;
    }

    public void addPoll(Poll poll) {
        pollRepository.save(poll);
    }

    public List<Poll> getAllPolls() {
        return pollRepository.findAll();
    }

    public Optional<Poll> getPoll(Long id) {
        return pollRepository.findById(id);
    }

    public List<String> getAllPollTitles() {
        List<Poll> polls = pollRepository.findAll();
        List<String> titles = new ArrayList<>();
        for(Poll p:polls){
            titles.add(p.getTitle());
        }
        return titles;
    }

    public List<Poll> getMyPolls(String author){
        User user = userRepository.findByUsername(author);
        return pollRepository.findAllByUser(user);
    }
}
