package com.example.community.util;

import java.util.UUID;
import java.util.function.Consumer;

public class CommonUtil {
    public static <T> void consumeIfNotNull(T obj, Consumer<T> consumer){
        if(obj != null){
            consumer.accept(obj);
        }
    }
    public static String generateUUID(){
        return UUID.randomUUID().toString().replaceAll("-","");
    }



}
