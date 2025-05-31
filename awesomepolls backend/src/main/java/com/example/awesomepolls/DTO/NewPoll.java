package com.example.awesomepolls.DTO;

import java.util.List;

public class NewPoll {
    private String title;
    private List<String> options;
    private String author;
    private int expiry;

    public NewPoll(String title, List<String> options, String author, int expiry) {
        this.title = title;
        this.options = options;
        this.author = author;
        this.expiry = expiry;
    }

    public NewPoll() {
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

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public int getExpiry() {
        return expiry;
    }

    public void setExpiry(int expiry) {
        this.expiry = expiry;
    }
}
