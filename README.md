# Sistema de Gestão de Eventos

Este é um sistema de gestão de eventos desenvolvido com Spring Boot (backend) e React (frontend).

## Estrutura do Projeto

```
sistema-gestao-eventos/
├── client/          # Frontend React
│   ├── src/        # Código fonte do frontend
│   ├── public/     # Arquivos estáticos
│   └── package.json
├── server/         # Backend Spring Boot
│   ├── src/        # Código fonte do backend
│   ├── pom.xml     # Configuração do Maven
│   └── target/     # Pasta gerada pelo Maven (não versionada)
└── README.md       # Documentação do projeto
```

### Sobre a pasta target/
A pasta `target/` é gerada automaticamente pelo Maven durante a compilação do projeto Spring Boot. Ela contém:
- Classes compiladas
- Arquivos JAR
- Recursos do projeto
- Relatórios de testes

Esta pasta não deve ser versionada no Git, pois é gerada automaticamente durante o build.

## Pré-requisitos

- Node.js (v14 ou superior)
- Java JDK 11 ou superior
- Maven

## Como Executar o Projeto

### Backend (Server)

1. Navegue até a pasta do servidor:
```bash
cd server
```

3. Execute o servidor Spring Boot:
```bash
mvn spring-boot:run
```

O servidor estará disponível em: http://localhost:8080

### Frontend (Client)

1. Navegue até a pasta do cliente:
```bash
cd client
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
```

O frontend estará disponível em: http://localhost:3000

## Endpoints da API

- Eventos: http://localhost:8080/api/eventos
- Locais: http://localhost:8080/api/locais
- Apresentadores: http://localhost:8080/api/apresentadores
- Participantes: http://localhost:8080/api/participantes

## Tecnologias Utilizadas

### Backend
- Spring Boot
- Spring Data JPA
- PostgreSQL

### Frontend
- React
- Axios
- Material-UI 