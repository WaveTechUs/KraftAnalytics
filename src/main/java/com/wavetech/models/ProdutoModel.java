package com.wavetech.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Produto")
public class ProdutoModel
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 50)
    private String nome;

}
