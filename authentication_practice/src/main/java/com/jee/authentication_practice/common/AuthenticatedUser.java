package com.jee.authentication_practice.common;

import com.jee.authentication_practice.auth.service.UserDetailsImpl;
import com.jee.authentication_practice.user.entity.User;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public class AuthenticatedUser {

    public static User fetchUserInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl detailsUser = (UserDetailsImpl) authentication.getPrincipal();
        User user = detailsUser.getUser();

        if (user == null) {
            return null;
        }

        return user;
    }
}
