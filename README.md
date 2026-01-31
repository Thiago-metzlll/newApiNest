# NewApiNest - Ecommerce Backend

API robusta para e-commerce desenvolvida com **NestJS**, focada em performance e escalabilidade.

## 🚀 Tecnologias e Arquitetura

-   **Framework**: [NestJS](https://nestjs.com/) (TypeScript)
-   **ORM**: [Prisma](https://www.prisma.io/)
-   **Banco de Dados**: PostgreSQL (Supabase)
-   **Autenticação**: JWT com Cookies HttpOnly e estratégias de segurança Passport.
-   **Transações ACID**: Processamento de pedidos via transações do Prisma para garantir integridade do estoque.
-   **CORS**: Configuração dinâmica para múltiplos ambientes.

## 🛠️ Correções e Melhorias Recentes

Realizamos uma série de ajustes críticos para estabilidade em produção:

1.  **Deploy no Vercel**: Sincronização de módulos e correção de dependências de build.
2.  **Fix de Checkout (Prisma)**: Ajustado o mapeamento do `userId` no `OrdersController` para garantir que o ID do usuário seja extraído corretamente do token JWT.
3.  **CORS Dinâmico**: Adicionado suporte à variável `ALLOWED_ORIGINS`, permitindo que o frontend no Vercel e o ambiente local funcionem simultaneamente sem bloqueios de segurança.

## ⚙️ Variáveis de Ambiente

As seguintes variáveis devem ser configuradas para o funcionamento correto (consulte `vercel-setup.md` para detalhes):

```env
DATABASE_URL="URL de conexão com pooling (Supabase)"
DIRECT_URL="URL de conexão direta para migrations"
ALLOWED_ORIGINS="URLs permitidas (ex: https://seu-app.vercel.app,http://localhost:3000)"
JWT_SECRET="Sua chave secreta para tokens"
```

## 📦 Execução Local

```bash
# Instalar dependências
npm install

# Gerar Client do Prisma
npx prisma generate

# Rodar em modo desenvolvimento
npm run start:dev
```

## 🏗️ Estrutura do Projeto

-   `/src/products`: Gestão de catálogo de produtos.
-   `/src/orders`: Sistema de carrinho e checkout com transações.
-   `/src/auth`: Autenticação e proteção de rotas.
-   `/src/user`: Gestão de perfis de usuários.
-   `/prisma`: Schema e migrations do banco de dados.

---
Desenvolvido por [Thiago Metzlll](https://github.com/Thiago-metzlll)
