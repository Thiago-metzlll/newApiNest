Este projeto consiste em uma API para um e-commerce simples.
O frontend da aplicação encontra-se disponível em outro repositório em meu GitHub.

A API é responsável por lidar com as requisições do sistema de e-commerce e foi desenvolvida utilizando NestJS, um framework moderno baseado em TypeScript.

Foi adotada a arquitetura modular padrão do NestJS, composta por modules, controllers e services.
Os controllers são responsáveis pelo gerenciamento das rotas e métodos HTTP, os services concentram a lógica de negócio, e os modules organizam e estruturam a aplicação, além de possibilitarem sua correta compilação.

Para validação e transformação de dados, são utilizados DTOs e Pipes, juntamente com o tratamento de exceções, garantindo maior consistência e segurança nas entradas da API.

No que se refere à autenticação e segurança, o projeto utiliza bcrypt para a criptografia de senhas, além de guards e strategies para o controle de acesso. A autenticação é realizada por meio da geração de tokens e cookies, assegurando a integridade do processo de autenticação dos usuários
