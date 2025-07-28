package com.example.awesomepolls.Repository;

import com.example.awesomepolls.Model.Poll;
import com.example.awesomepolls.Model.UserVotes;
import com.example.awesomepolls.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserVotesRepository extends JpaRepository<UserVotes, Long> {
    Optional<UserVotes> findByUserAndPoll(Users user, Poll poll);
}
