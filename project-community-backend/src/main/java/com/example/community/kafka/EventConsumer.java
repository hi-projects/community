package com.example.community.kafka;

import com.alibaba.fastjson2.JSONObject;
import com.example.community.entity.Event;
import com.example.community.entity.Message;
import com.example.community.entity.Post;
import com.example.community.service.ElasticsearchService;
import com.example.community.service.MessageService;
import com.example.community.service.PostService;
import jakarta.annotation.Resource;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.example.community.entity.Event.TopicConstants.*;
import static com.example.community.entity.User.SYSTEM_USER_ID;

@Component
public class EventConsumer{
    private static final Logger logger = LoggerFactory.getLogger(EventConsumer.class);
    @Resource
    private MessageService messageService;
    @Resource
    private PostService postService;

    @Resource
    private ElasticsearchService elasticsearchService;

//    @Value("${wk.image.command}")
//    private String wkImageCommand;
//
//    @Value("${wk.image.storage}")
//    private String wkImageStorage;
//
//    @Value("${qiniu.key.access}")
//    private String accessKey;
//
//    @Value("${qiniu.key.secret}")
//    private String secretKey;
//
//    @Value("${qiniu.bucket.share.name}")
//    private String shareBucketName;

//    @Autowired
//    private ThreadPoolTaskScheduler taskScheduler;

    @KafkaListener(topics = {TOPIC_COMMENT, TOPIC_LIKE, TOPIC_FOLLOW}, groupId = "topic_like_follow")
    public void handleCommentMessage(ConsumerRecord record) {
        if (record == null || record.value() == null) {
            logger.error("消息的内容为空!");
            return;
        }

        Event event = JSONObject.parseObject(record.value().toString(), Event.class);
        if (event == null) {
            logger.error("消息格式错误!");
            return;
        }

        // 发送站内通知
        Message message = new Message();
        message.setFromId(SYSTEM_USER_ID);
        message.setToId(event.getEntityUserId());
        message.setConversationId(event.getTopic());
        message.setCreateTime(new Date());

        Map<String, Object> content = new HashMap<>();
        content.put("userId", event.getUserId());
        content.put("entityType", event.getEntityType());
        content.put("entityId", event.getEntityId());
        content.putAll(event.getData());

        message.setContent(JSONObject.toJSONString(content));
        messageService.addMessage(message);
    }

    // 消费发帖事件
    @KafkaListener(topics = {TOPIC_PUBLISH}, groupId = "publish_consumer_group")
    public void handlePublishMessage(ConsumerRecord record) {
        if (record == null || record.value() == null) {
            logger.error("消息的内容为空!");
            return;
        }

        Event event = JSONObject.parseObject(record.value().toString(), Event.class);
        if (event == null) {
            logger.error("消息格式错误!");
            return;
        }

        Post post = postService.findPostById(event.getEntityId());
        elasticsearchService.savePost(post);
    }

    // 消费删帖事件
//    @KafkaListener(topics = {TOPIC_DELETE})
//    public void handleDeleteMessage(ConsumerRecord record) {
//        if (record == null || record.value() == null) {
//            logger.error("消息的内容为空!");
//            return;
//        }
//
//        Event event = JSONObject.parseObject(record.value().toString(), Event.class);
//        if (event == null) {
//            logger.error("消息格式错误!");
//            return;
//        }
//
////        elasticsearchService.deleteDiscussPost(event.getEntityId());
//    }

    // 消费分享事件
//    @KafkaListener(topics = TOPIC_SHARE)
//    public void handleShareMessage(ConsumerRecord record) {
//        if (record == null || record.value() == null) {
//            logger.error("消息的内容为空!");
//            return;
//        }
//
//        Event event = JSONObject.parseObject(record.value().toString(), Event.class);
//        if (event == null) {
//            logger.error("消息格式错误!");
//            return;
//        }
//
//        String htmlUrl = (String) event.getData().get("htmlUrl");
//        String fileName = (String) event.getData().get("fileName");
//        String suffix = (String) event.getData().get("suffix");
//
//        String cmd = wkImageCommand + " --quality 75 "
//                + htmlUrl + " " + wkImageStorage + "/" + fileName + suffix;
//        try {
//            Runtime.getRuntime().exec(cmd);
//            logger.info("生成长图成功: " + cmd);
//        } catch (IOException e) {
//            logger.error("生成长图失败: " + e.getMessage());
//        }
//
//        // 启用定时器,监视该图片,一旦生成了,则上传至七牛云.
//        UploadTask task = new UploadTask(fileName, suffix);
//        Future future = taskScheduler.scheduleAtFixedRate(task, 500);
//        task.setFuture(future);
//    }

//    class UploadTask implements Runnable {
//
//        // 文件名称
//        private String fileName;
//        // 文件后缀
//        private String suffix;
//        // 启动任务的返回值
//        private Future future;
//        // 开始时间
//        private long startTime;
//        // 上传次数
//        private int uploadTimes;
//
//        public UploadTask(String fileName, String suffix) {
//            this.fileName = fileName;
//            this.suffix = suffix;
//            this.startTime = System.currentTimeMillis();
//        }
//
//        public void setFuture(Future future) {
//            this.future = future;
//        }
//
//        @Override
//        public void run() {
//            // 生成失败
//            if (System.currentTimeMillis() - startTime > 30000) {
//                logger.error("执行时间过长,终止任务:" + fileName);
//                future.cancel(true);
//                return;
//            }
//            // 上传失败
//            if (uploadTimes >= 3) {
//                logger.error("上传次数过多,终止任务:" + fileName);
//                future.cancel(true);
//                return;
//            }
//
//            String path = wkImageStorage + "/" + fileName + suffix;
//            File file = new File(path);
//            if (file.exists()) {
//                logger.info(String.format("开始第%d次上传[%s].", ++uploadTimes, fileName));
//                // 设置响应信息
//                StringMap policy = new StringMap();
//                policy.put("returnBody", CommunityUtil.getJSONString(0));
//                // 生成上传凭证
//                Auth auth = Auth.create(accessKey, secretKey);
//                String uploadToken = auth.uploadToken(shareBucketName, fileName, 3600, policy);
//                // 指定上传机房
//                UploadManager manager = new UploadManager(new Configuration(Zone.zone1()));
//                try {
//                    // 开始上传图片
//                    Response response = manager.put(
//                            path, fileName, uploadToken, null, "image/" + suffix, false);
//                    // 处理响应结果
//                    JSONObject json = JSONObject.parseObject(response.bodyString());
//                    if (json == null || json.get("code") == null || !json.get("code").toString().equals("0")) {
//                        logger.info(String.format("第%d次上传失败[%s].", uploadTimes, fileName));
//                    } else {
//                        logger.info(String.format("第%d次上传成功[%s].", uploadTimes, fileName));
//                        future.cancel(true);
//                    }
//                } catch (QiniuException e) {
//                    logger.info(String.format("第%d次上传失败[%s].", uploadTimes, fileName));
//                }
//            } else {
//                logger.info("等待图片生成[" + fileName + "].");
//            }
//        }
//    }

}
