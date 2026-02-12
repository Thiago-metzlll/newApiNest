# newApiNest

Este projeto é uma API desenvolvida em NestJS que serve como backend para aplicações web. A aplicação é multi-database, utilizando tanto o Supabase (PostgreSQL) quanto o Firebase (Firestore) para armazenamento de dados.

A arquitetura foi planejada para separar responsabilidades: dados relacionais ficam no PostgreSQL (usuários, pedidos, fornecedores) enquanto dados mais dinâmicos e flexíveis vão para o Firestore (produtos). Toda a comunicação entre databases é gerenciada pela API através do Prisma (PostgreSQL) e Firebase Admin SDK (Firestore).

No backend foi utilizado NestJS com arquitetura modular, autenticação JWT com guards, bcrypt para hash de senhas e cookies httpOnly para segurança. O objetivo do projeto é estudar integração multi-database, autenticação robusta e organização de código em uma aplicação realista.

Obs: ainda preciso melhorar o tratamento de erros e adicionar mais validações nos endpoints.

## Tecnologias

- NestJS
- Prisma (PostgreSQL/Supabase)
- Firebase Admin SDK (Firestore)
- JWT + Passport
- bcrypt
- TypeScript

## Estrutura

A API conta com os seguintes módulos:

- auth - Sistema de autenticação (login, registro, guards JWT)
- user - Gerenciamento de usuários e perfis
- products - Produtos armazenados no PostgreSQL
- products_firebase - Produtos armazenados no Firestore
- orders - Pedidos
- fornecedores - Fornecedores

## Rodando localmente

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run start:dev

# Build para produção
npm run build
npm run start:prod
```
