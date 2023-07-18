package com.wavetech.models;

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

    @Column(length = 45, nullable = false, name = "Data do Feedback")
    private Date data;

    @Column(length = 45, nullable = false)
    private String comentario;

    @Column(length = 45, nullable = false)
    private int fk_produto;

    @Override
    public String toString() {
        return "FeedbackModel{" +
                "id=" + id +
                ", tipo_esg='" + tipo_esg + '\'' +
                ", estado='" + estado + '\'' +
                ", data='" + data + "'" +
                ", comentario='" + comentario + '\'' +
                ", fk_produto=" + fk_produto +
                '}';
    }
}
