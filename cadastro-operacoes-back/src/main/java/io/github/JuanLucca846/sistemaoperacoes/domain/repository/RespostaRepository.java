package io.github.JuanLucca846.sistemaoperacoes.domain.repository;

import io.github.JuanLucca846.sistemaoperacoes.domain.model.Resposta;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class RespostaRepository implements PanacheRepository<Resposta> {
}
