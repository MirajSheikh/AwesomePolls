package com.example.awesomepolls.Controller;

import com.example.awesomepolls.DTO.LikeDislikeDTO;
import com.example.awesomepolls.DTO.VoteMessage;
import com.example.awesomepolls.Model.LikeDislike;
import com.example.awesomepolls.Model.Poll;
import com.example.awesomepolls.Model.User;
import com.example.awesomepolls.Model.UserVotes;
import com.example.awesomepolls.Repository.LikeDislikeRepository;
import com.example.awesomepolls.Repository.PollRepository;
import com.example.awesomepolls.Repository.UserRepository;
import com.example.awesomepolls.Repository.UserVotesRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class PollWebSocketController {
    @Autowired
    private PollRepository pollRepository;

    @Autowired
    private UserVotesRepository userVotesRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LikeDislikeRepository likeDislikeRepository;

    @Transactional
    @MessageMapping("/vote")
    @SendTo("/topic/poll-updates")
    public Poll handleVote(@Payload VoteMessage vote) {
        Poll poll = pollRepository.findById(vote.getPollId()).orElseThrow();
        User user = userRepository.findByUsername(vote.getVoter());

        List<Long> voteCounts = poll.getVoteCounts();

//        fresh vote
        if(!poll.getVoters().contains(vote.getVoter())) {
            poll.setTotalVotes(poll.getTotalVotes() + 1);
            poll.getVoters().add(vote.getVoter());
            voteCounts.set(vote.getOptionIndex(), voteCounts.get(vote.getOptionIndex()) + 1);
        }

//        existing vote
        else{
            UserVotes uv = userVotesRepository.findByUserAndPoll(user, poll).orElseThrow();
//            equal nhi isliye update krege
            if(uv.getVoteOptionIndex() != vote.getOptionIndex()){
//                new wale ko increase kiya
                voteCounts.set(vote.getOptionIndex(), voteCounts.get(vote.getOptionIndex()) + 1);
//                old wale ko decrease kiya
                voteCounts.set(uv.getVoteOptionIndex(), voteCounts.get(uv.getVoteOptionIndex()) - 1);
            }
        }

        pollRepository.save(poll);
        return poll;
    }

    @MessageMapping("/like")
    @SendTo("/topic/poll-updates")
    public Poll handleLike(@Payload LikeDislikeDTO likeDislikeDTO){
        User user = userRepository.findByUsername(likeDislikeDTO.getUsername());
        Poll poll = pollRepository.findById(likeDislikeDTO.getPollId()).orElseThrow();

        LikeDislike ld = likeDislikeRepository.findByUserAndPoll(user, poll);

//        if any record does not exist
        if(ld == null){
            poll.setLikes(poll.getLikes() + 1);
            LikeDislike newld = new LikeDislike();
            newld.setUser(user);
            newld.setPoll(poll);
            newld.setLiked(true);
            newld.setDisliked(false);
            likeDislikeRepository.save(newld);
        }
//        if record exists
        else{
            if(ld.isLiked()){
                poll.setLikes(poll.getLikes() - 1);
                ld.setLiked(false);
            }
            else{
                poll.setLikes(poll.getLikes() + 1);
                ld.setLiked(true);
                if(ld.isDisliked()){
                    poll.setDislikes(poll.getDislikes() - 1);
                    ld.setDisliked(false);
                }
            }
            likeDislikeRepository.save(ld);
        }

        pollRepository.save(poll);
        return poll;

    }

    @MessageMapping("/dislike")
    @SendTo("/topic/poll-updates")
    public Poll handleDislike(@Payload LikeDislikeDTO likeDislikeDTO){
        User user = userRepository.findByUsername(likeDislikeDTO.getUsername());
        Poll poll = pollRepository.findById(likeDislikeDTO.getPollId()).orElseThrow();

        LikeDislike ld = likeDislikeRepository.findByUserAndPoll(user, poll);

//        if any record does not exist
        if(ld == null){
            poll.setLikes(poll.getLikes() + 1);
            LikeDislike newld = new LikeDislike();
            newld.setUser(user);
            newld.setPoll(poll);
            newld.setLiked(true);
            newld.setDisliked(false);
            likeDislikeRepository.save(newld);
        }
//        if record exists
        else{
            if(ld.isDisliked()){
                poll.setDislikes(poll.getDislikes() - 1);
                ld.setDisliked(false);
            }
            else{
                poll.setDislikes(poll.getDislikes() + 1);
                ld.setDisliked(true);
                if(ld.isLiked()){
                    poll.setLikes(poll.getLikes() - 1);
                    ld.setLiked(false);
                }
            }
            likeDislikeRepository.save(ld);
        }

        pollRepository.save(poll);
        return poll;

    }
}
