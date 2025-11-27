package com.winx.hackaton.security;

import com.winx.hackaton.model.User;
import com.winx.hackaton.repository.UserRepository;
import com.winx.hackaton.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User user = super.loadUser(userRequest);

        // Get email
        String email = user.getAttribute("email").toString();

        // Check if user exists
        if (!userRepository.findByEmail(email).isPresent()) {
            User newUser = User.builder()
                    .email(email)
                    .password("") // Not needed for OAuth
                    .build();
            userRepository.save(newUser);
        }
        return user;
    }

}
