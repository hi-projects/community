package com.example.community.constants;

public enum ExpiredDuration {

    DEFAULT_EXPIRED_SECONDS(3600 * 12),
    REMEMBER_ME_EXPIRED_SECONDS(3600 * 24 * 100);

    private int duration;

    ExpiredDuration(int duration){
        this.duration = duration;
    }

    public int getDuration() {
        return this.duration;
    }
}
