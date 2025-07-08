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

# Payments

    Lista pagamentos : GET : http://localhost:5000/api/payments
    Lista pagamento  : GET : http://localhost:5000/api/payment/id
    Cria pagamento   : POST : http://localhost:5000/api/payment
    {
        "price": 89.90,
        "status": "completed",
        "users_id": 3,
        "debts_id": 4
    }

    Atualiza pagamento : PUT : http://localhost:5000/api/payment/id
    {
        "price": 12.58,
        "status": "pending",
        "users_id": 1,
        "debts_id": 3
    }
    Apagar pagamento : DELETE : http://localhost:5000/api/payment/id

# Debts

    Lista débitos  : GET : http://localhost:5000/api/debts
    Lista débito : GET : http://localhost:5000/api/debt/id
    Cria débito : POST : http://localhost:5000/api/debt
    {
        "title": "Livro Novo",
        "value": 55.00,
        "description": "Compra de livro didático",
        "status": "pending",
        "users_id": 5
    }

    Atualiza débito : PUT : http://localhost:5000/api/debt/id
    {
        "title": "Livro Novo",
        "value": 55.00,
        "description": "Compra de livro didático",
        "status": "pending",
        "users_id": 1
    }
    Apagar débito : DELETE : http://localhost:5000/api/debt/id
