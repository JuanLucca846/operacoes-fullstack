package io.github.JuanLucca846.sistemaoperacoes.rest;

import io.github.JuanLucca846.sistemaoperacoes.domain.model.Requisicao;
import io.github.JuanLucca846.sistemaoperacoes.domain.model.Resposta;
import io.github.JuanLucca846.sistemaoperacoes.rest.dto.CreateOperacaoRequest;
import io.github.JuanLucca846.sistemaoperacoes.rest.dto.ResponseError;
import io.quarkus.test.common.http.TestHTTPResource;
import io.quarkus.test.junit.QuarkusTest;
import io.restassured.http.ContentType;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.*;

import java.net.URL;
import java.util.List;
import java.util.Map;

import static io.restassured.RestAssured.given;
import static org.junit.jupiter.api.Assertions.*;

@QuarkusTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class OperacoesResourceTest {

    @TestHTTPResource("/api/v1/operacoes")
    URL apiURL;

    @Test
    @DisplayName("Deve criar uma nova operação com sucesso")
    @Order(1)
    public void criarOperacaoTest() {

        var requisicao = new Requisicao();
        requisicao.setNome("Nome");
        requisicao.setTipo("String");

        var resposta = new Resposta();
        resposta.setNome("Mensagem");
        resposta.setTipo("String");

        var operacao = new CreateOperacaoRequest();
        operacao.setNome("Operação de Teste");
        operacao.setDescricao("Operação de testes unitários");
        operacao.setCategoria("Test");
        operacao.setAutenticacao("JwT");
        operacao.setPermissao("Todos");
        operacao.setRequisicao(List.of(requisicao));
        operacao.setResposta(List.of(resposta));

        var response =
                given()
                        .contentType(ContentType.JSON)
                        .body(operacao)
                        .when()
                        .post(apiURL)
                        .then()
                        .extract().response();

        assertEquals(201, response.statusCode());
        assertNotNull(response.jsonPath().getString("id"));
    }

    @Test
    @DisplayName("Deve retornar erro ao criar uma operação")
    @Order(2)
    public void retornarErroAoCriarOperacaoTest() {

        var requisicao = new Requisicao();
        requisicao.setNome("Nome");
        requisicao.setTipo("String");

        var resposta = new Resposta();
        resposta.setNome("Mensagem");
        resposta.setTipo("String");

        var operacao = new CreateOperacaoRequest();
        operacao.setNome(null);
        operacao.setDescricao("Operação de testes unitários");
        operacao.setCategoria("Test");
        operacao.setAutenticacao("JwT");
        operacao.setPermissao("Todos");
        operacao.setRequisicao(List.of(requisicao));
        operacao.setResposta(List.of(resposta));

        var response = given()
                .contentType(ContentType.JSON)
                .body(operacao)
                .when()
                .post(apiURL)
                .then()
                .extract().response();

        assertEquals(ResponseError.UNPROCESSABLE_ENTITY_STATUS, response.statusCode());
        assertEquals("Validation error.", response.jsonPath().getString("message"));

        List<Map<String, String>> errors = response.jsonPath().getList("errors");
        assertNotNull(errors.get(0).get("message"));

    }


    @Test
    @DisplayName("Deve listar todas operações")
    @Order(3)
    public void listarTodasOperacoesTest() {
        given()
                .contentType(ContentType.JSON)
                .when()
                .get(apiURL)
                .then()
                .statusCode(200)
                .body("size()", Matchers.is(4));
    }

    @Test
    @DisplayName("Deve buscar uma operação por ID")
    @Order(4)
    public void buscarOperacaoPorIdTest() {
        var id = 4;
        given()
                .contentType(ContentType.JSON)
                .when()
                .get(apiURL + "/" + id)
                .then()
                .statusCode(200)
                .body("id", Matchers.is(id))
                .body("nome", Matchers.is("Operação de Teste"))
                .body("descricao", Matchers.is("Operação de testes unitários"))
                .body("categoria", Matchers.is("Test"))
                .body("requisicao", Matchers.not(Matchers.empty()))
                .body("resposta", Matchers.not(Matchers.empty()))
                .body("autenticacao", Matchers.is("JwT"))
                .body("permissao", Matchers.is("Todos"));
    }

    @Test
    @DisplayName("Deve retornar not found, ao buscar um ID que não existe")
    @Order(5)
    public void retornarOperacaoIDNotFoundTest() {
        var id = 10;
        given()
                .contentType(ContentType.JSON)
                .when()
                .get(apiURL + "/" + id)
                .then()
                .statusCode(404);
    }

    @Test
    @DisplayName("Deve buscar uma operação por nome")
    @Order(6)
    public void buscarOperacaoPorNomeTest() {
        var nomeOperacao = "Operação de Teste";

        given()
                .contentType(ContentType.JSON)
                .when()
                .get(apiURL + "/nome?nome=" + nomeOperacao)
                .then()
                .statusCode(200)
                .body("nome", Matchers.hasItem(nomeOperacao));
    }

    @Test
    @DisplayName("Deve retornar not found, ao buscar um nome que não existe")
    @Order(7)
    public void retornarOperacaoNomeNotFoundTest() {
        var nomeOperacao = "Operação de Test";

        given()
                .contentType(ContentType.JSON)
                .when()
                .get(apiURL + "/nome?nome=" + nomeOperacao)
                .then()
                .statusCode(404);
    }

    @Test
    @DisplayName("Deve buscar uma operação por descrição")
    @Order(8)
    public void buscarOperacaoPorDescricaoTest() {
        var descricaoOperacao = "Operação de testes unitários";

        given()
                .contentType(ContentType.JSON)
                .when()
                .get(apiURL + "/descricao?descricao=" + descricaoOperacao)
                .then()
                .statusCode(200)
                .body("descricao", Matchers.hasItem(descricaoOperacao));
    }

    @Test
    @DisplayName("Deve retornar not found, ao buscar uma descrição que não existe")
    @Order(9)
    public void retornarOperacaoDescricaoNotFoundTest() {
        var descricaoOperacao = "Operação de testes unitário";

        given()
                .contentType(ContentType.JSON)
                .when()
                .get(apiURL + "/descricao?descricao=" + descricaoOperacao)
                .then()
                .statusCode(404);
    }

    @Test
    @DisplayName("Deve buscar uma operação por categoria")
    @Order(10)
    public void buscarOperacaoPorCategoriaTest() {
        var categoriaOperacao = "Test";

        given()
                .contentType(ContentType.JSON)
                .when()
                .get(apiURL + "/categoria?categoria=" + categoriaOperacao)
                .then()
                .statusCode(200)
                .body("categoria", Matchers.hasItem(categoriaOperacao));
    }

    @Test
    @DisplayName("Deve retornar not found, ao buscar uma descrição que não existe")
    @Order(11)
    public void retornarOperacaoCategoriaNotFoundTest() {
        var categoriaOperacao = "Tes";

        given()
                .contentType(ContentType.JSON)
                .when()
                .get(apiURL + "/categoria?categoria=" + categoriaOperacao)
                .then()
                .statusCode(404);
    }

    @Test
    @DisplayName("Deve atualizar uma operação com sucesso")
    @Order(12)
    public void atualizarOperacaoTest() {
        var id = 4;
        var novoNome = "Operação de Teste Atualizada";

        var requisicao = new Requisicao();
        requisicao.setNome("Nome");
        requisicao.setTipo("String");

        var resposta = new Resposta();
        resposta.setNome("Mensagem");
        resposta.setTipo("String");

        var operacao = new CreateOperacaoRequest();
        operacao.setNome(novoNome);
        operacao.setDescricao("Operação de testes unitários");
        operacao.setCategoria("Test");
        operacao.setAutenticacao("JwT");
        operacao.setPermissao("Todos");
        operacao.setRequisicao(List.of(requisicao));
        operacao.setResposta(List.of(resposta));


        given()
                .contentType(ContentType.JSON)
                .body(operacao)
                .when()
                .put(apiURL + "/" + id)
                .then()
                .statusCode(200)
                .extract().response();


        var idNovaOperacao = 5;

        given()
                .contentType(ContentType.JSON)
                .when()
                .get(apiURL + "/" + idNovaOperacao)
                .then()
                .statusCode(200)
                .body("id", Matchers.is(idNovaOperacao))
                .body("nome", Matchers.is("Operação de Teste Atualizada"));
    }

}
