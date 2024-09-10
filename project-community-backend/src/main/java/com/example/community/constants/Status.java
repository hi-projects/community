package com.example.community.constants;

public enum Status{
    ACTIVATION_SUCCEED(0),
    ACTIVATION_REPEATED(1),
    ACTIVATION_FAILED(2);

    private int status;

    Status(int status){
        this.status = status;
    }

    public int getStatus(){return this.status;}
}
