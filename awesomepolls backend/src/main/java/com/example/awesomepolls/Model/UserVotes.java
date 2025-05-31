package com.example.awesomepolls.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "userVotes")
public class UserVotes {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "username")
    private User user;

    @ManyToOne
    @JoinColumn(name = "pollId")
    private Poll poll;

    private int voteOptionIndex;

    public UserVotes(Long id, User user, Poll poll, int voteOptionIndex) {
        this.id = id;
        this.user = user;
        this.poll = poll;
        this.voteOptionIndex = voteOptionIndex;
    }

    public UserVotes() {
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
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
