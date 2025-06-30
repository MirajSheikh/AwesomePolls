package com.example.awesomepolls.Service;

import com.example.awesomepolls.Model.LikeDislike;
import com.example.awesomepolls.Model.Poll;
import com.example.awesomepolls.Model.User;
import com.example.awesomepolls.Repository.PollRepository;
import com.example.awesomepolls.Repository.UserRepository;
import com.example.awesomepolls.Repository.LikeDislikeRepository;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PollService {

    private final PollRepository pollRepository;
    private final UserRepository userRepository;
    private final LikeDislikeRepository likeDislikeRepository;

    public PollService(PollRepository pollRepository, UserRepository userRepository, LikeDislikeRepository likeDislikeRepository){
        this.pollRepository = pollRepository;
        this.userRepository = userRepository;
        this.likeDislikeRepository = likeDislikeRepository;
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

    public void like(Long pollId, String username){
        User user = userRepository.findByUsername(username);
        Poll poll = pollRepository.findById(pollId).orElseThrow();
        LikeDislike likeDislike = likeDislikeRepository.findByUserAndPoll(user, poll);

        //create new LikeDislike record
        if(likeDislike == null){
            poll.setLikes(poll.getLikes() + 1);

            LikeDislike newLikeDislike = new LikeDislike();
            newLikeDislike.setPoll(poll);
            newLikeDislike.setUser(user);
            newLikeDislike.setLiked(true);
            newLikeDislike.setDisliked(false);

            likeDislikeRepository.save(newLikeDislike);
        }
        //update LikeDislike record bcoz it already exists
        else{
            if(likeDislike.isLiked()){
                poll.setLikes(poll.getLikes() - 1);

                likeDislike.setLiked(false);
            }
            else if(likeDislike.isDisliked()){
                poll.setLikes(poll.getLikes() + 1);

                if(poll.getDislikes() > 0){
                    poll.setDislikes(poll.getDislikes() - 1);
                }

                likeDislike.setLiked(true);
                likeDislike.setDisliked(false);
            }
            else{
                poll.setLikes(poll.getLikes() + 1);
                likeDislike.setLiked(true);
            }

            likeDislikeRepository.save(likeDislike);
        }

        pollRepository.save(poll);
    }

    public void dislike(Long pollId, String username){
        User user = userRepository.findByUsername(username);
        Poll poll = pollRepository.findById(pollId).orElseThrow();
        LikeDislike likeDislike = likeDislikeRepository.findByUserAndPoll(user, poll);

        //create new LikeDislike record
        if(likeDislike == null){
            poll.setDislikes(poll.getDislikes() + 1);

            LikeDislike newLikeDislike = new LikeDislike();
            newLikeDislike.setPoll(poll);
            newLikeDislike.setUser(user);
            newLikeDislike.setLiked(false);
            newLikeDislike.setDisliked(true);

            likeDislikeRepository.save(newLikeDislike);
        }
        //update LikeDislike records bcoz it already exists
        else{
            if(likeDislike.isDisliked()){
                poll.setDislikes(poll.getDislikes() - 1);

                likeDislike.setDisliked(false);
            }
            else if(likeDislike.isLiked()){
                poll.setDislikes(poll.getDislikes() + 1);

                if(poll.getLikes() > 0){
                    poll.setLikes(poll.getLikes() - 1);
                }
                likeDislike.setLiked(false);
                likeDislike.setDisliked(true);
            }
            else{
                poll.setDislikes(poll.getDislikes() + 1);
                likeDislike.setDisliked(true);
            }

            likeDislikeRepository.save(likeDislike);
        }

        pollRepository.save(poll);
    }


    public void deletePoll(Long pollId){
        pollRepository.deleteById(pollId);
    }
}
