package com.wavetech.services;

import com.wavetech.models.FeedbackModel;
import com.wavetech.repositories.IFeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {
    @Autowired private IFeedbackRepository repo;

    public List<FeedbackModel> listAll(){
        List<FeedbackModel> feedbacks = (List<FeedbackModel>) repo.findAll();

        return feedbacks;
    }
}
