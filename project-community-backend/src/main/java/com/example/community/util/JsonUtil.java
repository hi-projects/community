package com.example.community.util;

import com.alibaba.fastjson2.JSONObject;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class JsonUtil {
    public static JSONObject putExtraInfo(JSONObject jsonObject, String code, String msg){
        jsonObject.put("code", code);
        if(msg != null){
            jsonObject.put("msg", msg);
        }
        return jsonObject;
    }

    public static String getJsonString(String code){
        return getJsonString(code, null, null);
    }
    public static String getJsonString(String code, String msg){
        return getJsonString(code, msg, null);
    }
    public static String getJsonString(String code, String msg, Map<String, Object> map){
        JSONObject res = new JSONObject();
        res.put("code", code);
        res.put("msg", msg);

        if(map != null){
            res.putAll(map);
        }

        return res.toJSONString();
    }



}
