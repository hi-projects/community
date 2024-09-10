package com.example.community.mapper;

import com.example.community.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    //
    User selectById(int id);
    //
    User selectByTel(String tel);
    User selectByEmail(String email);
    User selectByUsername(String username);
    int insertUser(User user);
    int updateStatus(int id, int status);
    int updateHeader(int id, String headerUrl);
    int updatePassword(int id,String password);

}
