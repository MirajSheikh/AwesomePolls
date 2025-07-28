package com.example.awesomepolls.Repository;

import com.example.awesomepolls.Model.LikeDislike;
import com.example.awesomepolls.Model.Poll;
import com.example.awesomepolls.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeDislikeRepository extends JpaRepository<LikeDislike, Long> {
    LikeDislike findByUserAndPoll(Users user, Poll poll);
}
