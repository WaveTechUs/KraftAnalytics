package com.wavetech.repositories;

import com.wavetech.models.ProdutoModel;
import org.springframework.data.repository.CrudRepository;

public interface IProdutoRepository extends CrudRepository<ProdutoModel, Integer> {
}
