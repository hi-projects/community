package com.example.community.controller;

import com.example.community.service.DataService;
import com.example.community.util.JsonUtil;
import jakarta.annotation.Resource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.HashMap;

@RestController
@RequestMapping("/data")
public class DataController {

    @Resource
    private DataService dataService;

    // 统计网站UV
    @PostMapping(path = "/uv")
    public String getUV(@DateTimeFormat(pattern = "yyyy-MM-dd") Date start, @DateTimeFormat(pattern = "yyyy-MM-dd") Date end) {
        long uv = dataService.calculateUV(start, end);

        HashMap<String, Object> res = new HashMap<>();
        res.put("data", uv);

        return JsonUtil.getJsonString("200", "获取UV统计数据成功!", res);
    }

    // 统计活跃用户
    @PostMapping("/dau")
    public String getDAU(@DateTimeFormat(pattern = "yyyy-MM-dd") Date start, @DateTimeFormat(pattern = "yyyy-MM-dd") Date end) {
        long dau = dataService.calculateDAU(start, end);

        HashMap<String, Object> res = new HashMap<>();
        res.put("data", dau);

        return JsonUtil.getJsonString("200", "获取DAU统计数据成功!", res);
    }

}
