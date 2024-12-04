package io.github.JuanLucca846.sistemaoperacoes.rest.resource;

import io.github.JuanLucca846.sistemaoperacoes.domain.model.Operacao;
import io.github.JuanLucca846.sistemaoperacoes.domain.model.Requisicao;
import io.github.JuanLucca846.sistemaoperacoes.domain.model.Resposta;
import io.github.JuanLucca846.sistemaoperacoes.domain.repository.OperacoesRepository;
import io.github.JuanLucca846.sistemaoperacoes.rest.dto.CreateOperacaoRequest;
import io.github.JuanLucca846.sistemaoperacoes.rest.dto.ResponseError;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validator;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Path("/api/v1")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class OperacoesResource {

    private final OperacoesRepository operacoesRepository;
    private final Validator validator;

    @Inject
    public OperacoesResource(OperacoesRepository operacoesRepository, Validator validator) {
        this.operacoesRepository = operacoesRepository;
        this.validator = validator;
    }

    @POST
    @Path("operacoes")
    @Transactional
    public Response criarOperacao(CreateOperacaoRequest operacaoRequest) {
        Set<ConstraintViolation<CreateOperacaoRequest>> violations = validator.validate(operacaoRequest);

        if (!violations.isEmpty()) {
            return ResponseError.createFromValidation(violations).withStatusCode(ResponseError.UNPROCESSABLE_ENTITY_STATUS);
        }


        Operacao operacao = new Operacao();
        operacao.setNome(operacaoRequest.getNome());
        operacao.setDescricao(operacaoRequest.getDescricao());
        operacao.setCategoria(operacaoRequest.getCategoria());
        operacao.setAutenticacao(operacaoRequest.getAutenticacao());
        operacao.setPermissao(operacaoRequest.getPermissao());

        List<Requisicao> requisicoes = operacaoRequest.getRequisicao().stream().map(requisicaoRequest -> {
            Requisicao requisicao = new Requisicao();
            requisicao.setNome(requisicaoRequest.getNome());
            requisicao.setTipo(requisicaoRequest.getTipo());
            requisicao.setOperacao(operacao);
            return requisicao;
        }).collect(Collectors.toList());


        List<Resposta> respostas = operacaoRequest.getResposta().stream().map(respostaRequest -> {
            Resposta resposta = new Resposta();
            resposta.setNome(respostaRequest.getNome());
            resposta.setTipo(respostaRequest.getTipo());
            resposta.setOperacao(operacao);
            return resposta;
        }).collect(Collectors.toList());

        operacao.setRequisicao(requisicoes);
        operacao.setResposta(respostas);


        operacoesRepository.persist(operacao);


        return Response.status(Response.Status.CREATED.getStatusCode()).entity(operacao).build();
    }

    @GET
    @Path("operacoes")
    public Response listarOperacoes() {
        PanacheQuery<Operacao> query = operacoesRepository.findAll();
        return Response.ok(query.list()).build();
    }

    @GET
    @Path("operacoes/{id}")
    public Response buscarOperacaoPorID(@PathParam("id") Long id) {
        Operacao operacao = operacoesRepository.findById(id);

        if (operacao != null) {
            return Response.ok(operacao).build();
        }

        return Response.status(Response.Status.NOT_FOUND).build();
    }


    @GET
    @Path("operacoes/busca")
    public Response buscarPorNomeDescricaoCategoria(@QueryParam("parametro") String parametro) {
        List<Operacao> operacao = operacoesRepository.buscarOperacaoNomeDescCat(parametro);

        if (operacao.isEmpty()) {
            throw new NotFoundException("Nenhuma operação encontrada.");
        }

        return Response.ok(operacao).build();
    }


    @PUT
    @Transactional
    @Path("operacoes/{id}")
    public Response atualizarOperacao(@PathParam("id") Long id, CreateOperacaoRequest operacaoRequest) {


        Operacao buscarOperacaoExistente = operacoesRepository.findById(id);
        if (buscarOperacaoExistente != null) {

            Operacao operacao = new Operacao();
            operacao.setNome(operacaoRequest.getNome());
            operacao.setDescricao(operacaoRequest.getDescricao());
            operacao.setCategoria(operacaoRequest.getCategoria());
            operacao.setAutenticacao(operacaoRequest.getAutenticacao());
            operacao.setPermissao(operacaoRequest.getPermissao());

            List<Requisicao> requisicoes = operacaoRequest.getRequisicao().stream().map(requisicaoRequest -> {
                Requisicao requisicao = new Requisicao();
                requisicao.setNome(requisicaoRequest.getNome());
                requisicao.setTipo(requisicaoRequest.getTipo());
                requisicao.setOperacao(operacao);
                return requisicao;
            }).collect(Collectors.toList());


            List<Resposta> respostas = operacaoRequest.getResposta().stream().map(respostaRequest -> {
                Resposta resposta = new Resposta();
                resposta.setNome(respostaRequest.getNome());
                resposta.setTipo(respostaRequest.getTipo());
                resposta.setOperacao(operacao);
                return resposta;
            }).collect(Collectors.toList());

            operacao.setRequisicao(requisicoes);
            operacao.setResposta(respostas);

            operacoesRepository.persist(operacao);
            return Response.ok(operacao).build();
        }


        return Response.status(Response.Status.NOT_FOUND).build();
    }

    @DELETE
    @Transactional
    @Path("operacoes/{id}")
    public Response deletarOperacao(@PathParam("id") Long id) {
        Operacao operacao = operacoesRepository.findById(id);
        if (operacao != null) {
            operacoesRepository.delete(operacao);
        }

        return Response.status(Response.Status.NO_CONTENT.getStatusCode()).build();
    }
}
