package com.example.awesomepolls.Model;

import jakarta.persistence.*;

@Entity
@Table(name = "likeDislike")
public class LikeDislike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "username")
    private User user;

    @ManyToOne
    @JoinColumn(name = "pollId")
    private Poll poll;

    private boolean liked;
    private boolean disliked;

    public LikeDislike(Long id, User user, Poll poll, boolean liked, boolean disliked) {
        this.id = id;
        this.user = user;
        this.poll = poll;
        this.liked = liked;
        this.disliked = disliked;
    }

    public LikeDislike() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public boolean isLiked() {
        return liked;
    }

    public void setLiked(boolean liked) {
        this.liked = liked;
    }

    public boolean isDisliked() {
        return disliked;
    }

    public void setDisliked(boolean disliked) {
        this.disliked = disliked;
    }
}
