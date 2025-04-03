-- Criando tabelas
CREATE TABLE IF NOT EXISTS local (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(200) NOT NULL,
    capacidade INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS apresentador (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    biografia TEXT,
    especialidade VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS participante (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    empresa VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS evento (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao TEXT,
    data_inicio TIMESTAMP NOT NULL,
    data_fim TIMESTAMP NOT NULL,
    local_id INTEGER REFERENCES local(id),
    apresentador_id INTEGER REFERENCES apresentador(id),
    capacidade_maxima INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS inscricao (
    id SERIAL PRIMARY KEY,
    evento_id INTEGER REFERENCES evento(id),
    participante_id INTEGER REFERENCES participante(id),
    data_inscricao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) NOT NULL CHECK (status IN ('CONFIRMADA', 'CANCELADA', 'PENDENTE')),
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

INSERT INTO evento (titulo, descricao, data_inicio, data_fim, local_id, apresentador_id, capacidade_maxima) VALUES
('Workshop de Spring Boot', 'Workshop prático sobre desenvolvimento com Spring Boot', 
 '2024-04-01 09:00:00', '2024-04-01 12:00:00', 1, 1, 50),
('Introdução ao React', 'Curso introdutório sobre React.js', 
 '2024-04-02 14:00:00', '2024-04-02 17:00:00', 2, 2, 30),
('Arquitetura de Software', 'Palestra sobre boas práticas de arquitetura', 
 '2024-04-03 19:00:00', '2024-04-03 21:00:00', 1, 1, 100);

INSERT INTO inscricao (evento_id, participante_id, status) VALUES
(1, 1, 'CONFIRMADA'),
(1, 2, 'PENDENTE'),
(2, 1, 'CONFIRMADA'),
(3, 2, 'CONFIRMADA'); 