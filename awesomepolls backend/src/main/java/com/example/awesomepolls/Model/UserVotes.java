package com.example.awesomepolls.Model;

import jakarta.persistence.*;

@Entity
public class UserVotes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "username")
    private Users user;

    @ManyToOne
    @JoinColumn(name = "pollId")
    private Poll poll;

    private int voteOptionIndex;

    public UserVotes(Long id, Users user, Poll poll, int voteOptionIndex) {
        this.id = id;
        this.user = user;
        this.poll = poll;
        this.voteOptionIndex = voteOptionIndex;
    }

    public UserVotes() {
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public Poll getPoll() {
        return poll;
    }

    public void setPoll(Poll poll) {
        this.poll = poll;
    }

    public int getVoteOptionIndex() {
        return voteOptionIndex;
    }

    public void setVoteOptionIndex(int voteOptionIndex) {
        this.voteOptionIndex = voteOptionIndex;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
