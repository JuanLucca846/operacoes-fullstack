package io.github.JuanLucca846.sistemaoperacoes.domain.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tb_operacoes")
@Data
public class Operacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "categoria")
    private String categoria;

    @Column(name = "autenticacao")
    private String autenticacao;

    @Column(name = "permissao")
    private String permissao;

    @OneToMany(mappedBy = "operacao", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Requisicao> requisicao = new ArrayList<>();

    @OneToMany(mappedBy = "operacao", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Resposta> resposta = new ArrayList<>();

    @Column(name = "dateTime")
    private LocalDateTime dateTime;

    @PrePersist
    public void prePersist() {
        dateTime = LocalDateTime.now();
    }
}
