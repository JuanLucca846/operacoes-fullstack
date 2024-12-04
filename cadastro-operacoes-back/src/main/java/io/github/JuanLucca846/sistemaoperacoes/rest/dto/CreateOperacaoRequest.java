package io.github.JuanLucca846.sistemaoperacoes.rest.dto;

import io.github.JuanLucca846.sistemaoperacoes.domain.model.Requisicao;
import io.github.JuanLucca846.sistemaoperacoes.domain.model.Resposta;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Data
public class CreateOperacaoRequest {

    @NotBlank(message = "Nome obrigatório.")
    private String nome;

    @NotBlank(message = "Descrição obrigatória.")
    private String descricao;

    @NotBlank(message = "Categoria obrigatória.")
    private String categoria;

    @NotBlank(message = "Autenticação obrigatória.")
    private String autenticacao;

    @NotBlank(message = "Permissão obrigatória.")
    private String permissao;

    @NotEmpty(message = "Requisição obrigatória")
    private List<Requisicao> requisicao;

    @NotEmpty(message = "Resposta obrigatória")
    private List<Resposta> resposta;
}
