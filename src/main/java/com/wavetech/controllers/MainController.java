package com.wavetech.controllers;

import com.wavetech.models.FeedbackModel;
import com.wavetech.services.FeedbackService;
import com.wavetech.services.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class MainController {
    @Autowired
    private FeedbackService feedbackService;
    @Autowired
    private ProdutoService produtoService;

    @GetMapping("/")
    public String showHomePage(Model model) {
        List<FeedbackModel> listaFeedbacks = feedbackService.listAll();
        model.addAttribute("listaFeedbacks", listaFeedbacks);

        List<FeedbackModel> listaProdutos = feedbackService.listAll();
        model.addAttribute("listaProdutos", listaProdutos);

        return "index";
    }
}
