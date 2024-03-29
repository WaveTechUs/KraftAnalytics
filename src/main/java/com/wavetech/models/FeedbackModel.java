package com.wavetech.models;

import com.wavetech.models.ProdutoModel;
import jakarta.persistence.*;

import java.util.Date;

@Entity
@Table(name = "Feedback")
public class FeedbackModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 15)
    private String tipo_esg;

    @Column(length = 15, nullable = false)
    private String estado;

    @Column(nullable = false)
    private Integer nota;

    @Column(length = 45, nullable = false, name = "Data do Feedback")
    private Date data;

    @Column(length = 45, nullable = false)
    private String comentario;

    @ManyToOne
    @JoinColumn(name = "fk_produto", nullable = false)
    private ProdutoModel fk_produto;

    @Override
    public String toString() {
        return "FeedbackModel{" +
                "id=" + id +
                ", tipo_esg='" + tipo_esg + '\'' +
                ", estado='" + estado + '\'' +
                ", nota='" + nota + '\'' +
                ", data='" + data + "'" +
                ", comentario='" + comentario + '\'' +
                ", fk_produto=" + fk_produto +
                '}';
    }
}
