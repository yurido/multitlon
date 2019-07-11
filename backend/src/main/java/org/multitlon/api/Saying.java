package org.multitlon.api;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

public class Saying {
    @JsonProperty("content")
    private String content;

    public Saying() {
    }

    @JsonCreator
    public Saying(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }
}
