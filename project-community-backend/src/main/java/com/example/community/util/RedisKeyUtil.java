package com.example.community.util;

public class RedisKeyUtil {
    private static final String CONDITION_SPLIT = ":";
    private static final String DETAIL_SPLIT = "_";

    // LoginTicket
    private static final String LOGINTICKET = "loginticket";
    private static final String PREFIX_LOGINTICKET_TICKET = LOGINTICKET + CONDITION_SPLIT + "ticket";
    private static final String PREFIX_TICKET_USERID = "ticket:userid";

    private static final String PREFIX_ENTITY_LIKE = "like:entity";
    private static final String PREFIX_USER_LIKE = "like:user";
    private static final String PREFIX_FOLLOWEE = "followee";
    private static final String PREFIX_FOLLOWER = "follower";
    private static final String PREFIX_KAPTCHA = "kaptcha";
    private static final String PREFIX_USER_ID = "user:id";
    private static final String PREFIX_USER = "user";
    private static final String PREFIX_UV = "uv";
    private static final String PREFIX_DAU = "dau";
    private static final String PREFIX_POST = "post";
    private static final String PREFIX_ACTIVATE_CODE = "user:activate_code";



    public static String getActivateCodeKey(int userId){
        return PREFIX_ACTIVATE_CODE + CONDITION_SPLIT + userId;
    }

    // 某个实体的赞
    // like:entity:entityType:entityId -> set(userId)
    public static String getEntityLikeKey(int entityType, int entityId) {
        return PREFIX_ENTITY_LIKE + CONDITION_SPLIT + entityType + CONDITION_SPLIT + entityId;
    }

    // 某个用户的赞
    // like:user:userId -> int
    public static String getUserLikeKey(int userId) {
        return PREFIX_USER_LIKE + CONDITION_SPLIT + userId;
    }

    // 某个实体关注的实体: [ followee:userId:entityType -> zset(entityId,now)) ]

    public static String getFolloweeKey(int entityType, int entityId) {
        return PREFIX_FOLLOWEE + CONDITION_SPLIT + entityType + CONDITION_SPLIT + entityId;
    }

    // 某个实体拥有的粉丝: [ follower:entityType:entityId -> zset(userId, now) ]
    public static String getFollowerKey(int entityType, int entityId) {
        return PREFIX_FOLLOWER + CONDITION_SPLIT + entityType + CONDITION_SPLIT + entityId;
    }
    // 登录验证码
    public static String getKaptchaKey(String owner) {
        return PREFIX_KAPTCHA + CONDITION_SPLIT + owner;
    }
    // 登录的凭证
    public static String getTicketUserIdKey(int userId) {
        return PREFIX_TICKET_USERID + CONDITION_SPLIT + userId;
    }
    public static String getLoginTicketTicketKey(String ticket){
        return PREFIX_LOGINTICKET_TICKET + CONDITION_SPLIT + ticket;
    }

    // ===================================================================================
    public static String getUserIdKey(int id){
        return PREFIX_USER_ID + CONDITION_SPLIT + id;
    }

    // 单日UV
    public static String getUVKey(String date) {
        return PREFIX_UV + CONDITION_SPLIT + date;
    }
    // 区间UV
    public static String getUVKey(String startDate, String endDate) {
        return PREFIX_UV + CONDITION_SPLIT + startDate + CONDITION_SPLIT + endDate;
    }

    // 单日活跃用户
    public static String getDAUKey(String date) {
        return PREFIX_DAU + CONDITION_SPLIT + date;
    }
    // 区间活跃用户
    public static String getDAUKey(String startDate, String endDate) {
        return PREFIX_DAU + CONDITION_SPLIT + startDate + CONDITION_SPLIT + endDate;
    }
    // 帖子分数
    public static String getPostScoreKey() {
        return PREFIX_POST + DETAIL_SPLIT + "score";
    }

}
