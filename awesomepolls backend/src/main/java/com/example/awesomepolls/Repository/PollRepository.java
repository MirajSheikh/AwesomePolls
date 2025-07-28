package com.example.awesomepolls.Repository;

import com.example.awesomepolls.Model.Poll;

import java.util.List;

import com.example.awesomepolls.Model.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface PollRepository extends JpaRepository<Poll, Long> {
		List<Poll> findAllByUser(Users user);
}
