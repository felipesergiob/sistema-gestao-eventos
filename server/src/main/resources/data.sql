-- Primeiro dropamos as tabelas de junção e tabelas que dependem de outras
DROP TABLE IF EXISTS evento_participante;
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
    cidade VARCHAR(100) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    cep VARCHAR(9) NOT NULL,
    capacidade INT NOT NULL
);

CREATE TABLE apresentador (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    especialidade VARCHAR(100),
    biografia TEXT
);

CREATE TABLE participante (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    telefone VARCHAR(20),
    empresa VARCHAR(100),
    cpf VARCHAR(14) UNIQUE,
    data_nascimento DATE
);

CREATE TABLE evento (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descricao VARCHAR(500),
    data_inicio TIMESTAMP NOT NULL,
    data_fim TIMESTAMP NOT NULL,
    capacidade INT NOT NULL,
    valor DECIMAL(10,2) NOT NULL,
    local_id BIGINT,
    apresentador_id BIGINT,
    FOREIGN KEY (local_id) REFERENCES local(id),
    FOREIGN KEY (apresentador_id) REFERENCES apresentador(id)
);

CREATE TABLE inscricao (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    evento_id BIGINT NOT NULL,
    participante_id BIGINT NOT NULL,
    data_inscricao TIMESTAMP NOT NULL,
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY (evento_id) REFERENCES evento(id),
    FOREIGN KEY (participante_id) REFERENCES participante(id)
);

CREATE TABLE evento_participante (
    evento_id BIGINT NOT NULL,
    participante_id BIGINT NOT NULL,
    PRIMARY KEY (evento_id, participante_id),
    FOREIGN KEY (evento_id) REFERENCES evento(id),
    FOREIGN KEY (participante_id) REFERENCES participante(id)
);

-- Insere dados de exemplo
INSERT INTO local (nome, endereco, cidade, estado, cep, capacidade) VALUES
('Centro de Convenções', 'Av. Principal, 100', 'São Paulo', 'SP', '01234-567', 500),
('Auditório Central', 'Rua das Flores, 50', 'Rio de Janeiro', 'RJ', '20000-000', 200),
('Espaço de Eventos', 'Av. Comercial, 200', 'Belo Horizonte', 'MG', '30000-000', 300);

INSERT INTO apresentador (nome, email, telefone, especialidade, biografia) VALUES
('João Silva', 'joao.silva@email.com', '(11) 99999-9999', 'Desenvolvimento Web', 'Especialista em desenvolvimento web com 10 anos de experiência'),
('Maria Santos', 'maria.santos@email.com', '(21) 88888-8888', 'UX/UI Design', 'Consultora de design de interfaces com foco em experiência do usuário'),
('Pedro Oliveira', 'pedro.oliveira@email.com', '(31) 77777-7777', 'DevOps', 'Especialista em infraestrutura e automação');

INSERT INTO participante (nome, email, telefone, empresa, cpf, data_nascimento) VALUES
('Ana Costa', 'ana.costa@email.com', '(11) 98765-4321', 'Empresa A', '123.456.789-00', '1990-05-15'),
('Carlos Mendes', 'carlos.mendes@email.com', '(21) 98765-4321', 'Empresa B', '987.654.321-00', '1985-08-20'),
('Julia Lima', 'julia.lima@email.com', '(31) 98765-4321', 'Empresa C', '456.789.123-00', '1995-03-10');

INSERT INTO evento (titulo, descricao, data_inicio, data_fim, capacidade, valor, local_id, apresentador_id) VALUES
('Workshop de Spring Boot', 'Aprenda Spring Boot do zero ao avançado', '2024-03-20 14:00:00', '2024-03-20 18:00:00', 50, 199.90, 1, 1),
('UI/UX Design Patterns', 'Padrões de design para interfaces modernas', '2024-03-25 09:00:00', '2024-03-25 17:00:00', 30, 299.90, 2, 2),
('DevOps na Prática', 'Implementando CI/CD com Docker e Kubernetes', '2024-04-01 13:00:00', '2024-04-01 17:00:00', 40, 249.90, 3, 3);

INSERT INTO evento_participante (evento_id, participante_id) VALUES
(1, 1),
(1, 2),
(2, 1),
(3, 2);

INSERT INTO inscricao (evento_id, participante_id, data_inscricao, status) VALUES
(1, 1, CURRENT_TIMESTAMP, 'CONFIRMADA'),
(1, 2, CURRENT_TIMESTAMP, 'PENDENTE'),
(2, 1, CURRENT_TIMESTAMP, 'CONFIRMADA'),
(3, 2, CURRENT_TIMESTAMP, 'CONFIRMADA'); 