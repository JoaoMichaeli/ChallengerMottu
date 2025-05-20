-- CRIAÇÃO DAS TABELAS --

-- Tabela categoria
CREATE TABLE tbl_categoria (
    id_categoria NUMERIC,
    descricao    VARCHAR2(100),
    CONSTRAINT tbl_categoria_pk PRIMARY KEY ( id_categoria )
);

-- Tabela status_motocicleta
CREATE TABLE tbl_status_motocicleta (
    id_status NUMERIC,
    descricao VARCHAR2(50),
    CONSTRAINT tbl_status_motocicleta_pk PRIMARY KEY ( id_status )
);

-- Tabela motocicleta
CREATE TABLE tbl_motocicleta (
    id_moto      NUMERIC,
    id_status    NUMERIC,
    placa        VARCHAR2(7),
    chassi       VARCHAR2(17),
    numero_motor VARCHAR2(17),
    id_modelo    NUMERIC,
    id_categoria NUMERIC,
    CONSTRAINT tbl_motocicleta_pk PRIMARY KEY ( id_moto ),
    CONSTRAINT tbl_motocicleta_placa_un UNIQUE ( placa ),
    CONSTRAINT tbl_motocicleta_chassi_un UNIQUE ( chassi ),
    CONSTRAINT tbl_motocicleta_numero_motor_un UNIQUE ( numero_motor ),
    CONSTRAINT tbl_motocicleta_status_fk FOREIGN KEY ( id_status )
        REFERENCES tbl_status_motocicleta ( id_status ),
    CONSTRAINT tbl_motocicleta_categoria_fk FOREIGN KEY ( id_categoria )
        REFERENCES tbl_categoria ( id_categoria )
);

-- Tabela modelo
CREATE TABLE tbl_modelo (
    id_modelo NUMERIC,
    id_moto   NUMERIC,
    CONSTRAINT tbl_modelo_pk PRIMARY KEY ( id_modelo ),
    CONSTRAINT tbl_modelo_motocicleta_fk FOREIGN KEY ( id_moto )
        REFERENCES tbl_motocicleta ( id_moto )
);

-- Tabela motivo_movimentacao
CREATE TABLE tbl_motivo_movimentacao (
    id_motivo_movimentacao NUMERIC,
    motivo                 VARCHAR2(200),
    CONSTRAINT tbl_motivo_movimentacao_pk PRIMARY KEY ( id_motivo_movimentacao )
);

-- Tabela pais
CREATE TABLE tbl_pais (
    id_pais NUMERIC,
    nome    VARCHAR2(100),
    CONSTRAINT tbl_pais_pk PRIMARY KEY ( id_pais )
);

-- Tabela estado
CREATE TABLE tbl_estado (
    id_estado NUMERIC,
    nome      VARCHAR2(100),
    uf        VARCHAR2(2),
    id_pais   NUMERIC,
    CONSTRAINT tbl_estado_pk PRIMARY KEY ( id_estado ),
    CONSTRAINT tbl_estado_pais_fk FOREIGN KEY ( id_pais )
        REFERENCES tbl_pais ( id_pais )
);

-- Tabela cidade
CREATE TABLE tbl_cidade (
    id_cidade NUMERIC,
    nome      VARCHAR2(100),
    id_estado NUMERIC,
    CONSTRAINT tbl_cidade_pk PRIMARY KEY ( id_cidade ),
    CONSTRAINT tbl_cidade_estado_fk FOREIGN KEY ( id_estado )
        REFERENCES tbl_estado ( id_estado )
);

-- Tabela bairro
CREATE TABLE tbl_bairro (
    id_bairro NUMERIC,
    nome      VARCHAR2(100),
    id_cidade NUMERIC,
    CONSTRAINT tbl_bairro_pk PRIMARY KEY ( id_bairro ),
    CONSTRAINT tbl_bairro_cidade_fk FOREIGN KEY ( id_cidade )
        REFERENCES tbl_cidade ( id_cidade )
);

-- Tabela filial
CREATE TABLE tbl_filial (
    id_filial   NUMERIC,
    cnpj        VARCHAR2(18),
    id_endereco NUMERIC,
    nome        VARCHAR2(100),
    status      NUMBER(1),
    responsavel VARCHAR2(100),
    CONSTRAINT tbl_filial_pk PRIMARY KEY ( id_filial ),
    CONSTRAINT tbl_filial_cnpj_un UNIQUE ( cnpj )
);

-- Tabela endereco
CREATE TABLE tbl_endereco (
    id_endereco NUMERIC,
    numero      VARCHAR2(10),
    id_filial   NUMERIC,
    cep         VARCHAR2(9),
    logradouro  VARCHAR2(100),
    complemento VARCHAR2(50),
    id_bairro   NUMERIC,
    CONSTRAINT tbl_endereco_pk PRIMARY KEY ( id_endereco ),
    CONSTRAINT tbl_endereco_filial_fk FOREIGN KEY ( id_filial )
        REFERENCES tbl_filial ( id_filial ),
    CONSTRAINT tbl_endereco_bairro_fk FOREIGN KEY ( id_bairro )
        REFERENCES tbl_bairro ( id_bairro )
);

-- Relacionamento entre filial e endereço
ALTER TABLE tbl_filial
    ADD CONSTRAINT tbl_filial_endereco_fk FOREIGN KEY ( id_endereco )
        REFERENCES tbl_endereco ( id_endereco );

-- Tabela patio
CREATE TABLE tbl_patio (
    id_patio   NUMERIC,
    id_filial  NUMERIC,
    nome_patio VARCHAR2(100),
    descricao  VARCHAR2(200),
    CONSTRAINT tbl_patio_pk PRIMARY KEY ( id_patio ),
    CONSTRAINT tbl_patio_filial_fk FOREIGN KEY ( id_filial )
        REFERENCES tbl_filial ( id_filial )
);

-- Tabela movimentacao
CREATE TABLE tbl_movimentacao (
    id_movimentacao        NUMERIC,
    id_moto                NUMERIC,
    data_entrada           DATE,
    data_saida             DATE,
    data_movimentacao      DATE,
    responsavel            VARCHAR2(100),
    observacao             VARCHAR2(250),
    id_filial              NUMERIC,
    id_motivo_movimentacao NUMERIC,
    CONSTRAINT tbl_movimentacao_pk PRIMARY KEY ( id_movimentacao ),
    CONSTRAINT tbl_movimentacao_motocicleta_fk FOREIGN KEY ( id_moto )
        REFERENCES tbl_motocicleta ( id_moto ),
    CONSTRAINT tbl_movimentacao_filial_fk FOREIGN KEY ( id_filial )
        REFERENCES tbl_filial ( id_filial ),
    CONSTRAINT tbl_movimentacao_motivo_fk FOREIGN KEY ( id_motivo_movimentacao )
        REFERENCES tbl_motivo_movimentacao ( id_motivo_movimentacao )
);

-- Tabela contato
CREATE TABLE tbl_contato (
    id_contato NUMERIC,
    valor      VARCHAR2(100),
    observacao VARCHAR2(100),
    id_filial  NUMERIC,
    CONSTRAINT tbl_contato_pk PRIMARY KEY ( id_contato ),
    CONSTRAINT tbl_contato_valor_un UNIQUE ( valor ),
    CONSTRAINT tbl_contato_filial_fk FOREIGN KEY ( id_filial )
        REFERENCES tbl_filial ( id_filial )
);

-- Tabela tipo_contato
CREATE TABLE tbl_tipo_contato (
    id_tipo    NUMERIC,
    nome       VARCHAR2(30),
    descricao  VARCHAR2(100),
    status     NUMBER(1),
    id_contato NUMERIC,
    CONSTRAINT tbl_tipo_contato_pk PRIMARY KEY ( id_tipo ),
    CONSTRAINT tbl_tipo_contato_contato_fk FOREIGN KEY ( id_contato )
        REFERENCES tbl_contato ( id_contato )
);


-- INSERTS DAS TABELAS --

-- TBL_PAIS
INSERT INTO tbl_pais (id_pais, nome) VALUES (1, 'Brasil');
INSERT INTO tbl_pais (id_pais, nome) VALUES (2, 'Argentina');
INSERT INTO tbl_pais (id_pais, nome) VALUES (3, 'Estados Unidos');
INSERT INTO tbl_pais (id_pais, nome) VALUES (4, 'Portugal');
INSERT INTO tbl_pais (id_pais, nome) VALUES (5, 'Japão');

-- TBL_ESTADO
INSERT INTO tbl_estado (id_estado, nome, uf, id_pais) VALUES (1, 'São Paulo', 'SP', 1);
INSERT INTO tbl_estado (id_estado, nome, uf, id_pais) VALUES (2, 'Rio de Janeiro', 'RJ', 1);
INSERT INTO tbl_estado (id_estado, nome, uf, id_pais) VALUES (3, 'Minas Gerais', 'MG', 1);
INSERT INTO tbl_estado (id_estado, nome, uf, id_pais) VALUES (4, 'Buenos Aires', 'BA', 2);
INSERT INTO tbl_estado (id_estado, nome, uf, id_pais) VALUES (5, 'California', 'CA', 3);

-- TBL_CIDADE
INSERT INTO tbl_cidade (id_cidade, nome, id_estado) VALUES (1, 'São Paulo', 1);
INSERT INTO tbl_cidade (id_cidade, nome, id_estado) VALUES (2, 'Rio de Janeiro', 2);
INSERT INTO tbl_cidade (id_cidade, nome, id_estado) VALUES (3, 'Belo Horizonte', 3);
INSERT INTO tbl_cidade (id_cidade, nome, id_estado) VALUES (4, 'Buenos Aires', 4);
INSERT INTO tbl_cidade (id_cidade, nome, id_estado) VALUES (5, 'Los Angeles', 5);

-- TBL_BAIRRO
INSERT INTO tbl_bairro (id_bairro, nome, id_cidade) VALUES (1, 'Centro', 1);
INSERT INTO tbl_bairro (id_bairro, nome, id_cidade) VALUES (2, 'Copacabana', 2);
INSERT INTO tbl_bairro (id_bairro, nome, id_cidade) VALUES (3, 'Savassi', 3);
INSERT INTO tbl_bairro (id_bairro, nome, id_cidade) VALUES (4, 'Recoleta', 4);
INSERT INTO tbl_bairro (id_bairro, nome, id_cidade) VALUES (5, 'Hollywood', 5);

-- TBL_CATEGORIA
INSERT INTO tbl_categoria (id_categoria, descricao) VALUES (1, 'Esportiva');
INSERT INTO tbl_categoria (id_categoria, descricao) VALUES (2, 'Naked');
INSERT INTO tbl_categoria (id_categoria, descricao) VALUES (3, 'Custom');
INSERT INTO tbl_categoria (id_categoria, descricao) VALUES (4, 'Scooter');
INSERT INTO tbl_categoria (id_categoria, descricao) VALUES (5, 'Off-road');

-- TBL_STATUS_MOTOCICLETA
INSERT INTO tbl_status_motocicleta (id_status, descricao) VALUES (1, 'Disponível');
INSERT INTO tbl_status_motocicleta (id_status, descricao) VALUES (2, 'Em manutenção');
INSERT INTO tbl_status_motocicleta (id_status, descricao) VALUES (3, 'Alugada');
INSERT INTO tbl_status_motocicleta (id_status, descricao) VALUES (4, 'Vendida');
INSERT INTO tbl_status_motocicleta (id_status, descricao) VALUES (5, 'Reservada');

-- TBL_MOTOCICLETA
INSERT INTO tbl_motocicleta (id_moto, id_status, placa, chassi, numero_motor, id_modelo, id_categoria) 
VALUES (1, 1, 'ABC1234', '9BWZZZ377VT004251', '1234567890', 1, 1);
INSERT INTO tbl_motocicleta (id_moto, id_status, placa, chassi, numero_motor, id_modelo, id_categoria) 
VALUES (2, 1, 'DEF5678', '9BWZZZ377VT004252', '1234567891', 2, 2);
INSERT INTO tbl_motocicleta (id_moto, id_status, placa, chassi, numero_motor, id_modelo, id_categoria) 
VALUES (3, 3, 'GHI9012', '9BWZZZ377VT004253', '1234567892', 3, 3);
INSERT INTO tbl_motocicleta (id_moto, id_status, placa, chassi, numero_motor, id_modelo, id_categoria) 
VALUES (4, 2, 'JKL3456', '9BWZZZ377VT004254', '1234567893', 4, 4);
INSERT INTO tbl_motocicleta (id_moto, id_status, placa, chassi, numero_motor, id_modelo, id_categoria) 
VALUES (5, 1, 'MNO7890', '9BWZZZ377VT004255', '1234567894', 5, 5);

-- TBL_MODELO
INSERT INTO tbl_modelo (id_modelo, id_moto) VALUES (1, 1);
INSERT INTO tbl_modelo (id_modelo, id_moto) VALUES (2, 2);
INSERT INTO tbl_modelo (id_modelo, id_moto) VALUES (3, 3);
INSERT INTO tbl_modelo (id_modelo, id_moto) VALUES (4, 4);
INSERT INTO tbl_modelo (id_modelo, id_moto) VALUES (5, 5);

-- Filiais (primeiro sem endereço)
ALTER TABLE tbl_filial DROP CONSTRAINT tbl_filial_endereco_fk;

-- Inserir filiais sem o id_endereco
INSERT INTO tbl_filial (id_filial, cnpj, nome, status, responsavel) 
VALUES (1, '12345678000101', 'Filial SP', 1, 'João Silva');
INSERT INTO tbl_filial (id_filial, cnpj, nome, status, responsavel) 
VALUES (2, '23456789000102', 'Filial RJ', 1, 'Maria Oliveira');
INSERT INTO tbl_filial (id_filial, cnpj, nome, status, responsavel) 
VALUES (3, '34567890000103', 'Filial BH', 1, 'Carlos Souza');
INSERT INTO tbl_filial (id_filial, cnpj, nome, status, responsavel) 
VALUES (4, '45678901000104', 'Filial BA', 0, 'Ana Santos');
INSERT INTO tbl_filial (id_filial, cnpj, nome, status, responsavel) 
VALUES (5, '56789012000105', 'Filial LA', 1, 'David Johnson');

-- Endereços
INSERT INTO tbl_endereco (id_endereco, numero, id_filial, cep, logradouro, complemento, id_bairro) 
VALUES (1, '100', 1, '01001000', 'Av. Paulista', '10º andar', 1);
INSERT INTO tbl_endereco (id_endereco, numero, id_filial, cep, logradouro, complemento, id_bairro) 
VALUES (2, '200', 2, '20040020', 'Av. Atlântica', '', 2);
INSERT INTO tbl_endereco (id_endereco, numero, id_filial, cep, logradouro, complemento, id_bairro) 
VALUES (3, '300', 3, '30140010', 'Av. Afonso Pena', 'Sala 501', 3);
INSERT INTO tbl_endereco (id_endereco, numero, id_filial, cep, logradouro, complemento, id_bairro) 
VALUES (4, '400', 4, '1001001', 'Av. 9 de Julio', '', 4);
INSERT INTO tbl_endereco (id_endereco, numero, id_filial, cep, logradouro, complemento, id_bairro) 
VALUES (5, '500', 5, '90028', 'Hollywood Blvd', 'Suite 200', 5);

-- Atualiza endereços nas filiais
UPDATE tbl_filial SET id_endereco = 1 WHERE id_filial = 1;
UPDATE tbl_filial SET id_endereco = 2 WHERE id_filial = 2;
UPDATE tbl_filial SET id_endereco = 3 WHERE id_filial = 3;
UPDATE tbl_filial SET id_endereco = 4 WHERE id_filial = 4;
UPDATE tbl_filial SET id_endereco = 5 WHERE id_filial = 5;

-- Recriar a constraint de FK
ALTER TABLE tbl_filial ADD CONSTRAINT tbl_filial_endereco_fk 
FOREIGN KEY (id_endereco) REFERENCES tbl_endereco(id_endereco);

-- TBL_PATIO
INSERT INTO tbl_patio (id_patio, id_filial, nome_patio, descricao) 
VALUES (1, 1, 'Pátio Central SP', 'Principal pátio da filial SP');
INSERT INTO tbl_patio (id_patio, id_filial, nome_patio, descricao) 
VALUES (2, 2, 'Pátio Praia RJ', 'Pátio com vista para praia');
INSERT INTO tbl_patio (id_patio, id_filial, nome_patio, descricao) 
VALUES (3, 3, 'Pátio BH Centro', 'Pátio no centro de BH');
INSERT INTO tbl_patio (id_patio, id_filial, nome_patio, descricao) 
VALUES (4, 4, 'Pátio Argentina', 'Pátio internacional');
INSERT INTO tbl_patio (id_patio, id_filial, nome_patio, descricao) 
VALUES (5, 5, 'Pátio Hollywood', 'Pátio nos EUA');

-- TBL_MOTIVO_MOVIMENTACAO
INSERT INTO tbl_motivo_movimentacao (id_motivo_movimentacao, motivo) 
VALUES (1, 'Aluguel');
INSERT INTO tbl_motivo_movimentacao (id_motivo_movimentacao, motivo) 
VALUES (2, 'Manutenção');
INSERT INTO tbl_motivo_movimentacao (id_motivo_movimentacao, motivo) 
VALUES (3, 'Transferência entre filiais');
INSERT INTO tbl_motivo_movimentacao (id_motivo_movimentacao, motivo) 
VALUES (4, 'Venda');
INSERT INTO tbl_motivo_movimentacao (id_motivo_movimentacao, motivo) 
VALUES (5, 'Demonstração');

-- TBL_MOVIMENTACAO
INSERT INTO tbl_movimentacao (id_movimentacao, id_moto, data_entrada, data_saida, data_movimentacao, responsavel, observacao, id_filial, id_motivo_movimentacao) 
VALUES (1, 1, TO_DATE('2023-01-10', 'YYYY-MM-DD'), TO_DATE('2023-01-15', 'YYYY-MM-DD'), TO_DATE('2023-01-10', 'YYYY-MM-DD'), 'João Silva', 'Aluguel para cliente', 1, 1);
INSERT INTO tbl_movimentacao (id_movimentacao, id_moto, data_entrada, data_saida, data_movimentacao, responsavel, observacao, id_filial, id_motivo_movimentacao) 
VALUES (2, 2, TO_DATE('2023-02-05', 'YYYY-MM-DD'), NULL, TO_DATE('2023-02-05', 'YYYY-MM-DD'), 'Maria Oliveira', 'Manutenção preventiva', 2, 2);
INSERT INTO tbl_movimentacao (id_movimentacao, id_moto, data_entrada, data_saida, data_movimentacao, responsavel, observacao, id_filial, id_motivo_movimentacao) 
VALUES (3, 3, TO_DATE('2023-03-20', 'YYYY-MM-DD'), TO_DATE('2023-03-25', 'YYYY-MM-DD'), TO_DATE('2023-03-20', 'YYYY-MM-DD'), 'Carlos Souza', 'Transferência para filial BH', 1, 3);
INSERT INTO tbl_movimentacao (id_movimentacao, id_moto, data_entrada, data_saida, data_movimentacao, responsavel, observacao, id_filial, id_motivo_movimentacao) 
VALUES (4, 4, TO_DATE('2023-04-15', 'YYYY-MM-DD'), TO_DATE('2023-04-15', 'YYYY-MM-DD'), TO_DATE('2023-04-15', 'YYYY-MM-DD'), 'Ana Santos', 'Venda direta', 3, 4);
INSERT INTO tbl_movimentacao (id_movimentacao, id_moto, data_entrada, data_saida, data_movimentacao, responsavel, observacao, id_filial, id_motivo_movimentacao) 
VALUES (5, 5, TO_DATE('2023-05-01', 'YYYY-MM-DD'), TO_DATE('2023-05-03', 'YYYY-MM-DD'), TO_DATE('2023-05-01', 'YYYY-MM-DD'), 'David Johnson', 'Test drive cliente', 5, 5);

-- TBL_CONTATO
INSERT INTO tbl_contato (id_contato, valor, observacao, id_filial) 
VALUES (1, 'contato@filialsp.com', 'E-mail principal', 1);
INSERT INTO tbl_contato (id_contato, valor, observacao, id_filial) 
VALUES (2, '(11) 9999-8888', 'Telefone comercial', 1);
INSERT INTO tbl_contato (id_contato, valor, observacao, id_filial) 
VALUES (3, 'contato@filialrj.com', 'E-mail principal', 2);
INSERT INTO tbl_contato (id_contato, valor, observacao, id_filial) 
VALUES (4, '(21) 9888-7777', 'Telefone comercial', 2);
INSERT INTO tbl_contato (id_contato, valor, observacao, id_filial) 
VALUES (5, 'contato@filialbh.com', 'E-mail principal', 3);

-- TBL_TIPO_CONTATO
INSERT INTO tbl_tipo_contato (id_tipo, nome, descricao, status, id_contato) 
VALUES (1, 'E-mail', 'Contato por e-mail', 1, 1);
INSERT INTO tbl_tipo_contato (id_tipo, nome, descricao, status, id_contato) 
VALUES (2, 'Telefone', 'Contato telefônico', 1, 2);
INSERT INTO tbl_tipo_contato (id_tipo, nome, descricao, status, id_contato) 
VALUES (3, 'E-mail', 'Contato por e-mail', 1, 3);
INSERT INTO tbl_tipo_contato (id_tipo, nome, descricao, status, id_contato) 
VALUES (4, 'Telefone', 'Contato telefônico', 1, 4);
INSERT INTO tbl_tipo_contato (id_tipo, nome, descricao, status, id_contato) 
VALUES (5, 'E-mail', 'Contato por e-mail', 1, 5);


-- BLOCOS ANÔNIMOS --

SET SERVEROUTPUT ON;

-- Total de movimentações por filial com detalhes de localização e moto
BEGIN
  FOR rec IN (
    SELECT 
      f.nome AS filial,
      b.nome AS bairro,
      ci.nome AS cidade,
      COUNT(mv.id_movimentacao) AS total_movimentacoes,
      MAX(mc.placa) AS ultima_placa
    FROM 
      tbl_filial f
      JOIN tbl_endereco e ON f.id_filial = e.id_filial
      JOIN tbl_bairro b ON e.id_bairro = b.id_bairro
      JOIN tbl_cidade ci ON b.id_cidade = ci.id_cidade
      JOIN tbl_movimentacao mv ON mv.id_filial = f.id_filial
      JOIN tbl_motocicleta mc ON mc.id_moto = mv.id_moto
    GROUP BY 
      f.nome, b.nome, ci.nome
    ORDER BY 
      total_movimentacoes DESC
  ) LOOP
    DBMS_OUTPUT.PUT_LINE('Filial: ' || rec.filial || 
                         ' | Bairro: ' || rec.bairro ||
                         ' | Cidade: ' || rec.cidade ||
                         ' | Movimentações: ' || rec.total_movimentacoes || 
                         ' | Última placa: ' || rec.ultima_placa);
  END LOOP;
END;

COMMIT;

-- Quantidade de motos por status e categoria com detalhes de modelo
BEGIN
  FOR rec IN (
    SELECT 
      st.descricao AS status,
      cat.descricao AS categoria,
      COUNT(m.id_moto) AS quantidade,
      MAX(mod.id_modelo) AS ultimo_modelo
    FROM 
      tbl_status_motocicleta st
      JOIN tbl_motocicleta m ON m.id_status = st.id_status
      JOIN tbl_categoria cat ON cat.id_categoria = m.id_categoria
      JOIN tbl_modelo mod ON mod.id_moto = m.id_moto
    GROUP BY 
      st.descricao, cat.descricao
    ORDER BY 
      st.descricao, quantidade DESC
  ) LOOP
    DBMS_OUTPUT.PUT_LINE('Status: ' || rec.status || 
                         ' | Categoria: ' || rec.categoria || 
                         ' | Quantidade: ' || rec.quantidade ||
                         ' | Último modelo: ' || rec.ultimo_modelo);
  END LOOP;
END;

COMMIT;

-- Bloco que mostra valor atual, anterior e próximo de uma coluna
BEGIN
  FOR i IN (
    SELECT 
      LAG(mm.motivo, 1, 'Vazio') OVER (ORDER BY m.id_movimentacao) AS anterior,
      mm.motivo AS atual,
      LEAD(mm.motivo, 1, 'Vazio') OVER (ORDER BY m.id_movimentacao) AS proximo
    FROM tbl_movimentacao m
    JOIN tbl_motivo_movimentacao mm ON mm.id_motivo_movimentacao = m.id_motivo_movimentacao
  ) LOOP
    DBMS_OUTPUT.PUT_LINE('Anterior: ' || i.anterior || ' | Atual: ' || i.atual || ' | Próximo: ' || i.proximo);
  END LOOP;
END;

COMMIT;

-- DROPS DAS TABELAS --

/*
DROP TABLE tbl_tipo_contato CASCADE CONSTRAINTS;
DROP TABLE tbl_contato CASCADE CONSTRAINTS;
DROP TABLE tbl_movimentacao CASCADE CONSTRAINTS;
DROP TABLE tbl_patio CASCADE CONSTRAINTS;
DROP TABLE tbl_motivo_movimentacao CASCADE CONSTRAINTS;
DROP TABLE tbl_filial CASCADE CONSTRAINTS;
DROP TABLE tbl_endereco CASCADE CONSTRAINTS;
DROP TABLE tbl_modelo CASCADE CONSTRAINTS;
DROP TABLE tbl_motocicleta CASCADE CONSTRAINTS;
DROP TABLE tbl_status_motocicleta CASCADE CONSTRAINTS;
DROP TABLE tbl_categoria CASCADE CONSTRAINTS;
DROP TABLE tbl_bairro CASCADE CONSTRAINTS;
DROP TABLE tbl_cidade CASCADE CONSTRAINTS;
DROP TABLE tbl_estado CASCADE CONSTRAINTS;
DROP TABLE tbl_pais CASCADE CONSTRAINTS;
*/