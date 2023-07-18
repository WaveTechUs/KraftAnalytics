package com.wavetech.repositories;

import com.wavetech.models.FeedbackModel;
import org.springframework.data.repository.CrudRepository;

public interface IFeedbackRepository extends CrudRepository<FeedbackModel, Integer> {
}
