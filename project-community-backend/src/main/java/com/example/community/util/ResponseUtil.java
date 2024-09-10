package com.example.community.util;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;

public class ResponseUtil {
    public static void write(HttpServletResponse response, String s) throws IOException {
        response.setCharacterEncoding("UTF-8");
        try (OutputStreamWriter writer = new OutputStreamWriter(response.getOutputStream(), StandardCharsets.UTF_8)) {
            PrintWriter printWriter = new PrintWriter(writer);
            printWriter.write(s);
            printWriter.flush(); // 确保所有数据都被写入
        }
    }
}
