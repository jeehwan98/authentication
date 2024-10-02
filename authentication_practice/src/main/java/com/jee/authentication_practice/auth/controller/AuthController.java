package com.jee.authentication_practice.auth.controller;

import com.jee.authentication_practice.auth.dto.LoginDTO;
import com.jee.authentication_practice.auth.util.JwtTokenUtil;
import com.jee.authentication_practice.user.entity.User;
import com.jee.authentication_practice.user.repository.UserRepository;
import com.jee.authentication_practice.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final UserService userService;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenUtil jwtTokenUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO, HttpServletRequest request) {
        log.info("logging in");
        HashMap<String, Object> responseMap = new HashMap<>();
        Optional<User> userExists = userRepository.findUserByUserId(loginDTO.getUserId());
        if (userExists.isEmpty()) {
            responseMap.put("error", "userId doesn't exist");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responseMap);
        }

        if (!passwordEncoder.matches(loginDTO.getPassword(), userExists.get().getPassword())) {
            responseMap.put("error", "invalid password");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseMap);
        }

        User user = userExists.get();
        String token = jwtTokenUtil.generateToken(user);

        ResponseCookie jwtCookie = ResponseCookie.from("accessToken", token)
                .path("/")
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .maxAge(Duration.ofMinutes(30))
                .build();

        log.info("is token set?"+ jwtCookie.toString());

        responseMap.put("message", "login success");
//        responseMap.put("token", token);

        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .contentType(MediaType.APPLICATION_JSON)
                .body(responseMap);
    }

    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        return ResponseEntity.ok().body("logout completed");
    }
}
