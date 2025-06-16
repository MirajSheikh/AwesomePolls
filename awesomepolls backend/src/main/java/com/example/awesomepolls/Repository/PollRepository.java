package com.example.awesomepolls.Repository;

import com.example.awesomepolls.Model.Poll;
import com.example.awesomepolls.Model.User;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface PollRepository extends JpaRepository<Poll, Long> {
		List<Poll> findAllByUser(User user);
}
