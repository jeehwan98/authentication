package com.jee.authentication_practice.user.service;

import com.jee.authentication_practice.user.entity.User;
import com.jee.authentication_practice.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User findByUserId(String userId) {
        return userRepository.findUserByUserId(userId).orElseThrow(() -> new UsernameNotFoundException("user not found with userId: " + userId));
    }
}
