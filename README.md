# Aplicação fullstack para cadastro de operações.

Essa App faz o controle de operações.

## Instalação

1. Clone esse repositório:

```bash
git clone https://github.com/JuanLucca846/operacoes-fullstack.git
```

2. Iniciando a aplicação com Docker Compose.

```bash
$ docker compose up
```

3. Configurando o banco de dados.
```
$ docker exec -it cadastro-operacoes_db mysql -u root -p
```
```
$ Senha: root
```
```
$ USE cadastro_operacoes;
```
```
$ USE cadastro_operacoes;
```
```
CREATE TABLE IF NOT EXISTS tb_operacoes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(255),
    categoria VARCHAR(255),
    autenticacao VARCHAR(255),
    permissao VARCHAR(255),
    dateTime DATETIME NOT NULL
);


CREATE TABLE IF NOT EXISTS tb_requisicao (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tipo VARCHAR(255),
    operacao_id BIGINT,
    FOREIGN KEY (operacao_id) REFERENCES tb_operacoes(id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS tb_resposta (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    tipo VARCHAR(255),
    operacao_id BIGINT,
    FOREIGN KEY (operacao_id) REFERENCES tb_operacoes(id) ON DELETE CASCADE
);
```
```
$ SHOW tables;
```

## Uso

1. Após iniciar a aplicação.
2. O Frontend estara disponivel em: http://localhost:4200/
3. O swagger do backend estara disponível em: http://localhost:8080/q/swagger-ui/


## Tecnologias

- ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
- ![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
- ![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
- ![Quarkus](https://img.shields.io/badge/quarkus-%234794EB.svg?style=for-the-badge&logo=quarkus&logoColor=white)
