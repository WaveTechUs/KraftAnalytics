package com.wavetech.controllers;


import com.wavetech.models.FeedbackModel;
import com.wavetech.services.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class ChartsController {
    @Autowired private FeedbackService service;

    @GetMapping("/Chart")
    public String showFeedbackList(Model model){
        List<FeedbackModel> listFeedbacks = service.listAll();
        model.addAttribute("listFeedbacks", listFeedbacks);

        return "charts";
    }
}
