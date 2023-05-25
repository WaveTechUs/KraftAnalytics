package com.wavetech.services;

import com.wavetech.models.UserModel;
import com.wavetech.repositories.IUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired private IUserRepository repo;

    public List<UserModel> listAll(){
        return (List<UserModel>) repo.findAll();
    }


}
