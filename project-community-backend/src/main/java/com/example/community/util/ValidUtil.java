package com.example.community.util;

import java.util.regex.Pattern;

public class ValidUtil {
    private static final String EMAIL_REGEX = "^(\\w+([-.][A-Za-z0-9]+)*){3,18}@\\w+([-.][A-Za-z0-9]+)*\\.\\w+([-.][A-Za-z0-9]+)*$";
    private static final String TEL_REGEX = "^1[3-9]\\d{9}$";

    public static boolean isEmail(String s){
        return Pattern.matches(EMAIL_REGEX, s);
    }
    public static boolean isTel(String s){
        return Pattern.matches(TEL_REGEX, s);
    }

}
