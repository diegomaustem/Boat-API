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
