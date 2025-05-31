package com.example.awesomepolls.DTO;

public class UserVotesDTO {
    private String username;
    private Long pollId;
    private int voteOptionIndex;

    public UserVotesDTO(String username, Long pollId, int voteOptionIndex) {
        this.username = username;
        this.pollId = pollId;
        this.voteOptionIndex = voteOptionIndex;
    }

    public UserVotesDTO() {
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

    public int getVoteOptionIndex() {
        return voteOptionIndex;
    }

    public void setVoteOptionIndex(int voteOptionIndex) {
        this.voteOptionIndex = voteOptionIndex;
    }
}
