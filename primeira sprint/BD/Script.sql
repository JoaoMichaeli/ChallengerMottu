-- CRIAÇÃO DAS TABELAS --

-- Tabela contato
CREATE TABLE tbl_contato (
    id_contato NUMERIC,
    valor      VARCHAR2(100),
    tipo       VARCHAR2(20),
    observacao VARCHAR2(100),
    CONSTRAINT tbl_contato_pk PRIMARY KEY ( id_contato ),
    CONSTRAINT tbl_contato_un UNIQUE ( valor )
);

-- Tabela endereco
CREATE TABLE tbl_endereco (
    id_endereco NUMERIC,
    numero      VARCHAR2(10),
    id_filial   NUMERIC,
    cep         VARCHAR2(9),
    logradouro  VARCHAR2(100),
    bairro      VARCHAR2(50),
    cidade      VARCHAR2(50),
    estado      VARCHAR2(2),
    pais        VARCHAR2(50),
    complemento VARCHAR2(50),
    CONSTRAINT tbl_endereco_pk PRIMARY KEY ( id_endereco ),
    CONSTRAINT tbl_endereco_un UNIQUE ( numero )
);

-- Tabela filial
CREATE TABLE tbl_filial (
    id_filial   NUMERIC,
    cnpj        VARCHAR2(18),
    id_endereco NUMERIC,
    id_contato  NUMERIC,
    nome        VARCHAR2(100),
    status      VARCHAR2(20),
    responsavel VARCHAR2(100),
    CONSTRAINT tbl_filial_pk PRIMARY KEY ( id_filial ),
    CONSTRAINT tbl_filial_un UNIQUE ( cnpj ),
    CONSTRAINT tbl_filial_fk_endereco FOREIGN KEY ( id_endereco )
        REFERENCES tbl_endereco ( id_endereco ),
    CONSTRAINT tbl_filial_fk_contato FOREIGN KEY ( id_contato )
        REFERENCES tbl_contato ( id_contato )
);

-- Tabela status da motocicleta
CREATE TABLE tbl_status_motocicleta (
    id_status NUMERIC,
    descricao VARCHAR2(50),
    CONSTRAINT tbl_status_motocicleta_pk PRIMARY KEY ( id_status )
);

-- Tabela patio
CREATE TABLE tbl_patio (
    id_patio   NUMERIC,
    id_filial  NUMERIC,
    nome_patio VARCHAR2(100),
    descricao  VARCHAR2(200),
    CONSTRAINT tbl_patio_pk PRIMARY KEY ( id_patio ),
    CONSTRAINT tbl_patio_fk_filial FOREIGN KEY ( id_filial )
        REFERENCES tbl_filial ( id_filial )
);

-- Tabela motocicleta
CREATE TABLE tbl_motocicleta (
    id_moto      NUMERIC,
    id_categoria NUMERIC,
    id_status    NUMERIC,
    placa        VARCHAR2(7),
    chassi       VARCHAR2(17),
    modelo       VARCHAR2(50),
    numero_motor VARCHAR2(17),
    CONSTRAINT tbl_motocicleta_pk PRIMARY KEY ( id_moto ),
    CONSTRAINT tbl_motocicleta_un_placa UNIQUE ( placa ),
    CONSTRAINT tbl_motocicleta_un_chassi UNIQUE ( chassi ),
    CONSTRAINT tbl_motocicleta_fk_status FOREIGN KEY ( id_status )
        REFERENCES tbl_status_motocicleta ( id_status )
);

-- Tabela categoria da motocicleta
CREATE TABLE tbl_categoria (
    id_categoria NUMERIC,
    id_moto      NUMERIC,
    descricao    VARCHAR2(100),
    CONSTRAINT tbl_categoria_pk PRIMARY KEY ( id_categoria ),
    CONSTRAINT tbl_categoria_fk_moto FOREIGN KEY ( id_moto )
        REFERENCES tbl_motocicleta ( id_moto )
);

-- Tabela movimentacao
CREATE TABLE tbl_movimentacao (
    id_movimentacao     NUMERIC,
    id_moto             NUMERIC,
    id_patio            NUMERIC,
    data_entrada        DATE,
    data_saida          DATE,
    data_movimentacao   DATE,
    responsavel         VARCHAR2(100),
    motivo_movimentacao VARCHAR2(50),
    observacao          VARCHAR2(250),
    CONSTRAINT tbl_movimentacao_pk PRIMARY KEY ( id_movimentacao ),
    CONSTRAINT tbl_movimentacao_fk_moto FOREIGN KEY ( id_moto )
        REFERENCES tbl_motocicleta ( id_moto ),
    CONSTRAINT tbl_movimentacao_fk_patio FOREIGN KEY ( id_patio )
        REFERENCES tbl_patio ( id_patio )
);


-- INSERTS DAS TABELAS --


-- TBL_CONTATO
INSERT INTO tbl_contato (id_contato, valor, tipo, observacao) VALUES (1, 'contato@filialsp.com', 'email', 'Contato principal da filial SP');
INSERT INTO tbl_contato (id_contato, valor, tipo, observacao) VALUES (2, '(11) 99999-1234', 'telefone', 'Telefone comercial');
INSERT INTO tbl_contato (id_contato, valor, tipo, observacao) VALUES (3, 'contato@filialrj.com', 'email', 'Contato principal da filial RJ');
INSERT INTO tbl_contato (id_contato, valor, tipo, observacao) VALUES (4, '(21) 98888-5678', 'telefone', 'Telefone comercial');
INSERT INTO tbl_contato (id_contato, valor, tipo, observacao) VALUES (5, 'contato@filialmg.com', 'email', 'Contato principal da filial MG');

SELECT * FROM tbl_contato;

-- TBL_ENDERECO
INSERT INTO tbl_endereco (id_endereco, numero, id_filial, cep, logradouro, bairro, cidade, estado, pais, complemento)
VALUES (1, '123', 1, '01001-000', 'Rua das Flores', 'Centro', 'São Paulo', 'SP', 'Brasil', 'Próximo ao metrô');
INSERT INTO tbl_endereco (id_endereco, numero, id_filial, cep, logradouro, bairro, cidade, estado, pais, complemento)
VALUES (2, '456', 2, '20040-020', 'Avenida Rio Branco', 'Centro', 'Rio de Janeiro', 'RJ', 'Brasil', 'Andar 3');
INSERT INTO tbl_endereco (id_endereco, numero, id_filial, cep, logradouro, bairro, cidade, estado, pais, complemento)
VALUES (3, '789', 3, '30140-110', 'Rua da Bahia', 'Funcionários', 'Belo Horizonte', 'MG', 'Brasil', 'Sala 101');
INSERT INTO tbl_endereco (id_endereco, numero, id_filial, cep, logradouro, bairro, cidade, estado, pais, complemento)
VALUES (4, '101', 4, '80010-020', 'Rua XV de Novembro', 'Centro', 'Curitiba', 'PR', 'Brasil', '');
INSERT INTO tbl_endereco (id_endereco, numero, id_filial, cep, logradouro, bairro, cidade, estado, pais, complemento)
VALUES (5, '202', 5, '70040-010', 'Esplanada dos Ministérios', 'Zona Cívico-Administrativa', 'Brasília', 'DF', 'Brasil', '');

SELECT * FROM tbl_endereco;

-- TBL_FILIAL
INSERT INTO tbl_filial (id_filial, cnpj, id_endereco, id_contato, nome, status, responsavel)
VALUES (1, '12.345.678/0001-90', 1, 1, 'Filial São Paulo', 'Ativa', 'Carlos Silva');
INSERT INTO tbl_filial (id_filial, cnpj, id_endereco, id_contato, nome, status, responsavel)
VALUES (2, '98.765.432/0001-10', 2, 2, 'Filial Rio de Janeiro', 'Ativa', 'Ana Souza');
INSERT INTO tbl_filial (id_filial, cnpj, id_endereco, id_contato, nome, status, responsavel)
VALUES (3, '56.789.123/0001-55', 3, 3, 'Filial Belo Horizonte', 'Ativa', 'João Pereira');
INSERT INTO tbl_filial (id_filial, cnpj, id_endereco, id_contato, nome, status, responsavel)
VALUES (4, '22.333.444/0001-66', 4, 4, 'Filial Curitiba', 'Ativa', 'Mariana Costa');
INSERT INTO tbl_filial (id_filial, cnpj, id_endereco, id_contato, nome, status, responsavel)
VALUES (5, '77.888.999/0001-00', 5, 5, 'Filial Brasília', 'Ativa', 'Ricardo Alves');

SELECT * FROM tbl_filial;

-- TBL_STATUS_MOTOCICLETA
INSERT INTO tbl_status_motocicleta (id_status, descricao) VALUES (1, 'Disponível');
INSERT INTO tbl_status_motocicleta (id_status, descricao) VALUES (2, 'Em manutenção');
INSERT INTO tbl_status_motocicleta (id_status, descricao) VALUES (3, 'Vendida');
INSERT INTO tbl_status_motocicleta (id_status, descricao) VALUES (4, 'Reservada');
INSERT INTO tbl_status_motocicleta (id_status, descricao) VALUES (5, 'Indisponível');

SELECT * FROM tbl_status_motocicleta;

-- TBL_PATIO
INSERT INTO tbl_patio (id_patio, id_filial, nome_patio, descricao) VALUES (1, 1, 'Pátio Central SP', 'Pátio principal na sede SP');
INSERT INTO tbl_patio (id_patio, id_filial, nome_patio, descricao) VALUES (2, 2, 'Pátio Zona Sul RJ', 'Pátio localizado na zona sul RJ');
INSERT INTO tbl_patio (id_patio, id_filial, nome_patio, descricao) VALUES (3, 3, 'Pátio BH Centro', 'Pátio central em BH');
INSERT INTO tbl_patio (id_patio, id_filial, nome_patio, descricao) VALUES (4, 4, 'Pátio Curitiba Norte', 'Pátio no bairro norte de Curitiba');
INSERT INTO tbl_patio (id_patio, id_filial, nome_patio, descricao) VALUES (5, 5, 'Pátio Brasília Sul', 'Pátio localizado na região sul de Brasília');

SELECT * FROM tbl_patio;

-- TBL_MOTOCICLETA
INSERT INTO tbl_motocicleta (id_moto, id_categoria, id_status, placa, chassi, modelo, numero_motor)
VALUES (1, 1, 1, 'ABC1D23', '9C2PC0307KR123456', 'Honda CG 160', 'MTR123456789');
INSERT INTO tbl_motocicleta (id_moto, id_categoria, id_status, placa, chassi, modelo, numero_motor)
VALUES (2, 2, 2, 'XYZ9Z87', 'JH2RC4469EK000001', 'Yamaha YBR 125', 'MTR987654321');
INSERT INTO tbl_motocicleta (id_moto, id_categoria, id_status, placa, chassi, modelo, numero_motor)
VALUES (3, 3, 3, 'LMN4T56', 'KBXPC0312JP000002', 'Honda CG 125', 'MTR112233445');
INSERT INTO tbl_motocicleta (id_moto, id_categoria, id_status, placa, chassi, modelo, numero_motor)
VALUES (4, 4, 4, 'QRS5U78', 'JH2RC4499EK000003', 'Suzuki GSR 150', 'MTR556677889');
INSERT INTO tbl_motocicleta (id_moto, id_categoria, id_status, placa, chassi, modelo, numero_motor)
VALUES (5, 5, 5, 'TUV6V89', '9C2PC0307KR654321', 'Yamaha XTZ 250', 'MTR998877665');

SELECT * FROM tbl_motocicleta;

-- TBL_CATEGORIA
INSERT INTO tbl_categoria (id_categoria, id_moto, descricao) VALUES (1, 1, 'Esportiva');
INSERT INTO tbl_categoria (id_categoria, id_moto, descricao) VALUES (2, 2, 'Urbana');
INSERT INTO tbl_categoria (id_categoria, id_moto, descricao) VALUES (3, 3, 'Trail');
INSERT INTO tbl_categoria (id_categoria, id_moto, descricao) VALUES (4, 4, 'Custom');
INSERT INTO tbl_categoria (id_categoria, id_moto, descricao) VALUES (5, 5, 'Scooter');

SELECT * FROM tbl_categoria;

-- TBL_MOVIMENTACAO
INSERT INTO tbl_movimentacao (id_movimentacao, id_moto, id_patio, data_entrada, data_saida, data_movimentacao, responsavel, motivo_movimentacao, observacao)
VALUES (1, 1, 1, DATE '2024-04-10', DATE '2024-04-15', DATE '2024-04-10', 'João Silva', 'Entrada para manutenção', 'Chegou com problema no freio');
INSERT INTO tbl_movimentacao (id_movimentacao, id_moto, id_patio, data_entrada, data_saida, data_movimentacao, responsavel, motivo_movimentacao, observacao)
VALUES (2, 2, 2, DATE '2024-05-01', DATE '2024-05-07', DATE '2024-05-01', 'Maria Oliveira', 'Retirada para venda', 'Veículo vendido para cliente');
INSERT INTO tbl_movimentacao (id_movimentacao, id_moto, id_patio, data_entrada, data_saida, data_movimentacao, responsavel, motivo_movimentacao, observacao)
VALUES (3, 3, 3, DATE '2024-06-20', DATE '2024-06-25', DATE '2024-06-20', 'Carlos Santos', 'Transferência entre pátios', 'Mudança para pátio central');
INSERT INTO tbl_movimentacao (id_movimentacao, id_moto, id_patio, data_entrada, data_saida, data_movimentacao, responsavel, motivo_movimentacao, observacao)
VALUES (4, 4, 4, DATE '2024-07-15', DATE '2024-07-20', DATE '2024-07-15', 'Ana Paula', 'Entrada para revisão', 'Revisão periódica');
INSERT INTO tbl_movimentacao (id_movimentacao, id_moto, id_patio, data_entrada, data_saida, data_movimentacao, responsavel, motivo_movimentacao, observacao)
VALUES (5, 5, 5, DATE '2024-08-10', DATE '2024-08-15', DATE '2024-08-10', 'Rafael Costa', 'Reserva para cliente', 'Moto reservada para cliente VIP');

SELECT * FROM tbl_movimentacao;


-- BLOCOS ANÔNIMOS --

SET SERVEROUTPUT ON;

-- Total de movimentações por filial
BEGIN
  FOR rec IN (
    SELECT f.nome AS filial,
           COUNT(m.id_movimentacao) AS total_movimentacoes
    FROM tbl_filial f
    JOIN tbl_patio p ON p.id_filial = f.id_filial
    JOIN tbl_movimentacao m ON m.id_patio = p.id_patio
    GROUP BY f.nome
    ORDER BY total_movimentacoes DESC
  ) LOOP
    DBMS_OUTPUT.PUT_LINE('Filial: ' || rec.filial || ' - Movimentações: ' || rec.total_movimentacoes);
  END LOOP;
END;

COMMIT;

-- Quantidade de motos por status
BEGIN
  FOR rec IN (
    SELECT s.descricao AS status,
           COUNT(m.id_moto) AS quantidade
    FROM tbl_status_motocicleta s
    JOIN tbl_motocicleta m ON m.id_status = s.id_status
    GROUP BY s.descricao
    ORDER BY quantidade DESC
  ) LOOP
    DBMS_OUTPUT.PUT_LINE('Status: ' || rec.status || ' - Quantidade de Motos: ' || rec.quantidade);
  END LOOP;
END;

COMMIT;

-- Bloco que mostra valor atual, anterior e próximo de uma coluna
BEGIN
  FOR i IN (
    SELECT 
      LAG(motivo_movimentacao, 1, 'Vazio') OVER (ORDER BY id_movimentacao) AS anterior,
      motivo_movimentacao AS atual,
      LEAD(motivo_movimentacao, 1, 'Vazio') OVER (ORDER BY id_movimentacao) AS proximo
    FROM tbl_movimentacao
  ) LOOP
    DBMS_OUTPUT.PUT_LINE('Anterior: ' || i.anterior || ' | Atual: ' || i.atual || ' | Próximo: ' || i.proximo);
  END LOOP;
END;

COMMIT;

-- DROPS DAS TABELAS --

/*
DROP TABLE tbl_movimentacao;
DROP TABLE tbl_categoria;
DROP TABLE tbl_motocicleta;
DROP TABLE tbl_patio;
DROP TABLE tbl_status_motocicleta;
DROP TABLE tbl_filial;
DROP TABLE tbl_endereco;
DROP TABLE tbl_contato;
*/