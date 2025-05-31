package com.example.awesomepolls.DTO;

public class LikeDislikeDTO {
    private String username;
    private Long pollId;

    public LikeDislikeDTO(String username, Long pollId) {
        this.username = username;
        this.pollId = pollId;
    }

    public LikeDislikeDTO() {
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getPollId() {
        return pollId;
    }

    public void setPollId(Long pollId) {
        this.pollId = pollId;
    }
}
