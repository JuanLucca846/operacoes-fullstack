-- This file allow to write SQL commands that will be emitted in test and dev.
-- The commands are commented as their support depends of the database
-- insert into myentity (id, field) values(1, 'field-1');
-- insert into myentity (id, field) values(2, 'field-2');
-- insert into myentity (id, field) values(3, 'field-3');
-- alter sequence myentity_seq restart with 4;

CREATE
DATABASE cadastro_operacoes;

USE
cadastro_operacoes;

CREATE TABLE IF NOT EXISTS tb_operacoes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    descricao VARCHAR(255),
    categoria VARCHAR(255),
    autenticacao VARCHAR(255),
    permissao VARCHAR(255),
    dateTime DATETIME NOT NULL,
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