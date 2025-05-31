package com.example.awesomepolls.DTO;

public class VoteMessage {
    private Long pollId;
    private int optionIndex;
    private String voter;

    public VoteMessage(Long pollId, int optionIndex, String voter) {
        this.pollId = pollId;
        this.optionIndex = optionIndex;
        this.voter = voter;
    }

    public Long getPollId() {
        return pollId;
    }

    public void setPollId(Long pollId) {
        this.pollId = pollId;
    }

    public int getOptionIndex() {
        return optionIndex;
    }

    public void setOptionIndex(int optionIndex) {
        this.optionIndex = optionIndex;
    }

    public String getVoter() {
        return voter;
    }

    public void setVoter(String voter) {
        this.voter = voter;
    }

}
