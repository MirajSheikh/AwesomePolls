package com.example.awesomepolls.Repository;

import com.example.awesomepolls.Model.LikeDislike;
import com.example.awesomepolls.Model.Poll;
import com.example.awesomepolls.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeDislikeRepository extends JpaRepository<LikeDislike, Long> {
    LikeDislike findByUserAndPoll(User user, Poll poll);
}
