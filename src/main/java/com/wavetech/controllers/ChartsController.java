package com.wavetech.controllers;

import com.google.gson.Gson;
import com.wavetech.models.FeedbackModel;
import com.wavetech.models.ProdutoModel;
import com.wavetech.services.FeedbackService;
import com.wavetech.services.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
@Controller
public class ChartsController {
    @Autowired
    private FeedbackService feedbackService;
    @Autowired
    private ProdutoService produtoService;

    @GetMapping("/Chart")
    public String showChart(Model model){
        Gson gson = new Gson();
        List<FeedbackModel> listaFeedbacks = feedbackService.listAll();
        String jsonFeedback = gson.toJson(listaFeedbacks);
        model.addAttribute("listaFeedbacks", jsonFeedback);

        return "chart";
    }
}