-- Limpando tabelas existentes
DROP TABLE IF EXISTS inscricao;
DROP TABLE IF EXISTS evento;
DROP TABLE IF EXISTS participante;
DROP TABLE IF EXISTS apresentador;
DROP TABLE IF EXISTS local;

-- Criando tabelas
CREATE TABLE local (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(200) NOT NULL,
    capacidade INTEGER NOT NULL
);

CREATE TABLE apresentador (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    biografia TEXT,
    especialidade VARCHAR(100)
);

CREATE TABLE participante (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    empresa VARCHAR(100)
);

CREATE TABLE evento (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    data_inicio TIMESTAMP NOT NULL,
    data_fim TIMESTAMP NOT NULL,
    local_id BIGINT,
    apresentador_id BIGINT,
    capacidade_maxima INTEGER NOT NULL,
    preco DOUBLE,
    FOREIGN KEY (local_id) REFERENCES local(id),
    FOREIGN KEY (apresentador_id) REFERENCES apresentador(id)
);

CREATE TABLE inscricao (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    evento_id BIGINT,
    participante_id BIGINT,
    data_inscricao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL CHECK (status IN ('CONFIRMADA', 'CANCELADA', 'PENDENTE')),
    FOREIGN KEY (evento_id) REFERENCES evento(id),
    FOREIGN KEY (participante_id) REFERENCES participante(id),
    UNIQUE(evento_id, participante_id)
);

-- Inserindo dados iniciais
INSERT INTO local (nome, endereco, capacidade) VALUES
('Auditório Principal', 'Rua das Flores, 123', 200),
('Sala de Workshop 1', 'Rua das Flores, 123', 30),
('Sala de Workshop 2', 'Rua das Flores, 123', 30);

INSERT INTO apresentador (nome, email, telefone, biografia, especialidade) VALUES
('João Silva', 'joao@email.com', '(11) 99999-9999', 'Especialista em Spring Boot com 10 anos de experiência', 'Desenvolvimento Java'),
('Maria Santos', 'maria@email.com', '(11) 88888-8888', 'Desenvolvedora Front-end sênior', 'React.js');

INSERT INTO participante (nome, email, telefone, empresa) VALUES
('Pedro Oliveira', 'pedro@email.com', '(11) 77777-7777', 'Tech Solutions'),
('Ana Costa', 'ana@email.com', '(11) 66666-6666', 'Inovação Digital');

INSERT INTO evento (titulo, descricao, data_inicio, data_fim, local_id, apresentador_id, capacidade_maxima, preco) VALUES
('Workshop de Spring Boot', 'Workshop prático sobre desenvolvimento com Spring Boot', 
 '2024-04-01 09:00:00', '2024-04-01 12:00:00', 1, 1, 50, 100.00),
('Introdução ao React', 'Curso introdutório sobre React.js', 
 '2024-04-02 14:00:00', '2024-04-02 17:00:00', 2, 2, 30, 150.00),
('Arquitetura de Software', 'Palestra sobre boas práticas de arquitetura', 
 '2024-04-03 19:00:00', '2024-04-03 21:00:00', 1, 1, 100, 200.00);

INSERT INTO inscricao (evento_id, participante_id, status) VALUES
(1, 1, 'CONFIRMADA'),
(1, 2, 'PENDENTE'),
(2, 1, 'CONFIRMADA'),
(3, 2, 'CONFIRMADA'); 