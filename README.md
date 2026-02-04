NewApiNest Frontend

Frontend para a API NewApiNest, desenvolvido em React, com foco em componentização, integração com múltiplos bancos e fluxo de dados em uma aplicação realista.

Tecnologias e Arquitetura

Framework: React

Comunicação com API: fetch

Integração Multi-Database: Consome dados do Supabase (PostgreSQL) e do Firebase (Firestore), dependendo da configuração da API.

Componentização: Estrutura modular para facilitar manutenção e reuso de componentes.

Gerenciamento de estado: Hooks nativos (useState, useEffect) e Context API.

Objetivo: Estudo de integração front-end / back-end, organização de componentes e fluxo de dados em um projeto realista.

Funcionalidades

Consome endpoints da API NewApiNest para produtos, pedidos e usuários.

Suporte a múltiplos bancos de dados via configuração na API.

Estrutura pensada para escalabilidade e manutenção futura.

Melhorias e Ajustes Pendentes

Ajuste da identidade visual (cores dos botões, tipografia e consistência visual).

Polimento do layout geral para maior usabilidade.

Eventuais otimizações de performance no consumo de dados e renderização de componentes.

Execução Local
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm start

Estrutura do Projeto

/src/components: Componentes reutilizáveis da interface.

/src/pages: Páginas e rotas principais.

/src/services: Funções para comunicação com a API (fetch/axios).

/src/context: Context API para gerenciamento global de estado.

/public: Arquivos estáticos (imagens, favicon, etc.).
