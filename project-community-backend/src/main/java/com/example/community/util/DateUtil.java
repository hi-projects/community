package com.example.community.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {
    private static final String FORMAT_STRING = "yyyy-MM-dd HH:mm:ss";
    private static final SimpleDateFormat simpleDateFormat = new SimpleDateFormat(FORMAT_STRING);
    public static String formatDate(Date date){
        return simpleDateFormat.format(date);
    }

    public static Date parse(String s) throws ParseException {
        return simpleDateFormat.parse(s);
    }
}
