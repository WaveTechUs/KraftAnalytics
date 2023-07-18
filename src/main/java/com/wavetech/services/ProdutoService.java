package com.wavetech.services;

import com.wavetech.models.ProdutoModel;
import com.wavetech.repositories.IProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {
    @Autowired
    private IProdutoRepository repo;

    public List<ProdutoModel> listAll(){
        return (List<ProdutoModel>) repo.findAll();
    }
}
