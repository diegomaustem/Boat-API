# Sistema Boat API

# Descrição

    Sistema gerenciador de vendas Boat.
    Módulo gerenciamento de usuários
    Módulo gerenciamento de pagamentos
    Módulo gerenciamento de dívidas
    Módulo autenticação de users com JWT
    Mensageria - Kafka(Em construção)

# Tecnologias

    Node.js + Express + Prisma ORM

# EndPoints

    Registrar usuários : http://localhost:5000/api/auth/register
    Método : POST

    Exemplo : {"name": "Maria Tew", "email": "eliana.tes@example.com","password": "123456" "secret_code": "456"}

    Logar usuários : http://localhost:5000/api/auth/login
    Método : POST

    Exemplo : {"email": "eliana.tes@example.com","password": "123456"}

# Users

    Lista usuários  : GET : http://localhost:5000/api/users
    Lista usuário : GET : http://localhost:5000/api/user/id
    Atualizar usuário : PUT : http://localhost:5000/api/user/id
    {
        "name": "Ana Silva",
        "email": "ana.silva@example.com",
        "password": "123456",
        "secret_code": "123",
        "role": "user"
    }
    Apagar usuário : DELETE : http://localhost:5000/api/user/id
