package com.generation.connect.service.implementation;

import com.generation.connect.auth.GCAuthUserDetails;
import com.generation.connect.entity.UserEntity;
import com.generation.connect.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class GCUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository.findUserByEmailId(userName);

        if (userEntity == null) {
            throw new UsernameNotFoundException(userName);
        }

        return new GCAuthUserDetails(userEntity);
    }
}
