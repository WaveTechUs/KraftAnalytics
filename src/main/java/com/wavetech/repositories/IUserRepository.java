package com.wavetech.repositories;

import com.wavetech.models.UserModel;
import org.springframework.data.repository.CrudRepository;

public interface IUserRepository extends CrudRepository<UserModel, Integer> {

}
