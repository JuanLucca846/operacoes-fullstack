package io.github.JuanLucca846.sistemaoperacoes.domain.repository;

import io.github.JuanLucca846.sistemaoperacoes.domain.model.Operacao;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class OperacoesRepository implements PanacheRepository<Operacao> {

    public List<Operacao> buscarOperacaoNomeDescCat(String parametro) {
        PanacheQuery<Operacao> query = find("nome like ?1 or descricao like ?1 or categoria like ?1", "%" + parametro + "%");

        return (query).list();
    }


}
