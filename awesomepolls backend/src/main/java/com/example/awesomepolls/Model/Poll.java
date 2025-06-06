package com.example.awesomepolls.Model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "polls")
public class Poll {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "author")
    private User user;

    private String title;

    private Long likes;
    private Long dislikes;
    private boolean favorite;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> options;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<Long> voteCounts;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> voters;

    private Long totalVotes;

    private LocalDateTime expiry;

    public Poll(User user, Long likes, Long dislikes, boolean favorite, List<Long> voteCounts, Long totalVotes) {
        this.user = user;
        this.likes = likes;
        this.dislikes = dislikes;
        this.favorite = favorite;
        this.voteCounts = voteCounts;
        this.totalVotes = totalVotes;
    }

    public Poll(Long id, String title, List<String> options) {
        this.id = id;
        this.title = title;
        this.options = options;
    }

    public Poll(LocalDateTime expiry, List<String> voters){
        this.expiry = expiry;
        this.voters = voters;
    }

    public Poll() {
    }

    public Poll(User user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<String> getOptions() {
        return options;
    }

    public Long getLikes() {
        return likes;
    }

    public void setLikes(Long likes) {
        this.likes = likes;
    }

    public Long getDislikes() {
        return dislikes;
    }

    public void setDislikes(Long dislikes) {
        this.dislikes = dislikes;
    }

    public boolean isFavorite() {
        return favorite;
    }

    public void setFavorite(boolean favorite) {
        this.favorite = favorite;
    }

    public List<Long> getVoteCounts() {
        return voteCounts;
    }

    public void setVoteCounts(List<Long> voteCounts) {
        this.voteCounts = voteCounts;
    }

    public Long getTotalVotes() {
        return totalVotes;
    }

    public void setTotalVotes(Long totalVotes) {
        this.totalVotes = totalVotes;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public LocalDateTime getExpiry() {
        return expiry;
    }

    public void setExpiry(LocalDateTime expiry) {
        this.expiry = expiry;
    }

    public List<String> getVoters() {
        return voters;
    }

    public void setVoters(List<String> voters) {
        this.voters = voters;
    }
}
