package com.generation.connect.controller;

import com.generation.connect.dto.MessageDTO;
import com.generation.connect.dto.auth.JwtResponseDTO;
import com.generation.connect.dto.auth.SignInRequestDTO;
import com.generation.connect.dto.auth.SignUpRequestDTO;
import com.generation.connect.entity.UserEntity;
import com.generation.connect.service.implementation.JwtService;
import com.generation.connect.service.UserSigningService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/auth")
public class UserSigningController {

    private final Logger logger = LoggerFactory.getLogger(UserSigningController.class);

    private final UserSigningService userSigningService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final PasswordEncoder encoder;


    public UserSigningController(UserSigningService userSigningService,
                                 AuthenticationManager authenticationManager,
                                 JwtService jwtService,
                                 PasswordEncoder encoder) {
        this.userSigningService = userSigningService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.encoder = encoder;
    }

    @RequestMapping(path = "/signup",
            method = RequestMethod.POST,
            consumes = {"application/json"},
            produces = {"application/json"})
    public ResponseEntity<MessageDTO> signUpUser(
            @RequestBody @Valid SignUpRequestDTO signUpRequestDTO
    ) {
        logger.info("Request: {}", signUpRequestDTO);

        SignUpRequestDTO signUpRequestData = userSigningService.signUpUser(signUpRequestDTO);

        if (signUpRequestData != null) {
            logger.info("Signup successful for: {}", signUpRequestData.getEmailId());
            return new ResponseEntity<>(
                    new MessageDTO(HttpStatus.CREATED, "Signup successful for: " + signUpRequestData.getEmailId()),
                    HttpStatus.CREATED
            );
        } else {
            return new ResponseEntity<>(
                    new MessageDTO(HttpStatus.BAD_REQUEST, "Unsuccessful signup attempt"),
                    HttpStatus.BAD_REQUEST
            );
        }
    }

    @RequestMapping(path = "/login",
            method = RequestMethod.POST,
            consumes = {"application/json"},
            produces = {"application/json"})
    public ResponseEntity<JwtResponseDTO> authenticateAndGetToken(
            @RequestBody SignInRequestDTO signInRequestDTO,
            HttpServletResponse httpServletResponse
    ) {
        userSigningService.verifyUserRole(signInRequestDTO);

        // Decode the Base64 string
        byte[] decodedBytes = Base64.getDecoder().decode(signInRequestDTO.getPassword());
        String decodedString = new String(decodedBytes);
        signInRequestDTO.setPassword(decodedString);
        //signInRequestDTO.setPassword(encoder.encode(decodedString));

        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(signInRequestDTO.getUsername(), signInRequestDTO.getPassword()));

        if (authentication.isAuthenticated()) {
            UserEntity user = userSigningService.getUser(signInRequestDTO.getUsername());
            String accessToken = jwtService.GenerateToken(user, authentication.getAuthorities()
                    .stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()));

            ResponseCookie responseCookie = ResponseCookie.from("accessToken", accessToken)
                    .httpOnly(false)
                    .secure(false)
                    .path("/")
                    .domain("localhost")
                    .maxAge(1800000)
                    .build();

            httpServletResponse.addHeader(HttpHeaders.SET_COOKIE, responseCookie.toString());
            JwtResponseDTO jwtResponseDTO = new JwtResponseDTO();
            jwtResponseDTO.setAccessToken(accessToken);
            return new ResponseEntity<>(jwtResponseDTO, HttpStatus.OK);
        } else {
            throw new UsernameNotFoundException("Invalid User request..!!");
        }
    }

    @RequestMapping(path = "/logout", method = RequestMethod.POST, produces = "application/json")
    public ResponseEntity<MessageDTO> logoutUser(
            @RequestParam(required = false, name = "user") String user,
            HttpServletResponse response
    ) {
        logger.info("User with email {} is trying to logout", user);
        clearCookie(response);
        return new ResponseEntity<>(new MessageDTO(HttpStatus.OK, "Logout successful"), HttpStatus.OK);
    }

    void clearCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("accessToken", null);
        cookie.setPath("/");
        cookie.setHttpOnly(false);
        cookie.setMaxAge(0);
        cookie.setDomain("localhost");
        cookie.setSecure(false);
        response.addCookie(cookie);
    }
}
