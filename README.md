# WaiterApp API

REST API para gerenciamento de pedidos de restaurante, construída com Node.js, Express e MongoDB.

## Tecnologias

- **Node.js** com **TypeScript**
- **Express 5**
- **MongoDB** com **Mongoose**
- **Multer** (upload de imagens)
- **TSX** + **Nodemon** (desenvolvimento)

## Pré-requisitos

- [Docker](https://www.docker.com/) e Docker Compose

> Para rodar sem Docker: Node.js 18+, Yarn 4+ e MongoDB local na porta `27017`.

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
MONGO_URI=mongodb://mongo:27017/waiterapp
```

> Ao rodar sem Docker, use `MONGO_URI=mongodb://localhost:27017/waiterapp`.

## Rodando com Docker

```bash
cp .env.example .env
docker compose up
```

A API estará disponível em `http://localhost:3001`.

## Rodando sem Docker

```bash
yarn install
yarn dev
```

## Scripts

| Comando | Descrição |
|---|---|
| `yarn dev` | Inicia o servidor em modo desenvolvimento com hot reload |
| `yarn build` | Compila o TypeScript para `dist/` |
| `yarn start` | Inicia o servidor a partir do build |

## Endpoints

### Categorias

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/categories` | Lista todas as categorias |
| `POST` | `/categories` | Cria uma nova categoria |
| `DELETE` | `/categories/:id` | Remove uma categoria |

**POST /categories — body:**
```json
{
  "name": "Bebidas",
  "icon": "🥤"
}
```

---

### Produtos

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/products` | Lista todos os produtos |
| `POST` | `/products` | Cria um novo produto |
| `GET` | `/products/:categoryId/products` | Lista produtos por categoria |

---

### Pedidos

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/orders` | Lista todos os pedidos |
| `POST` | `/orders` | Cria um novo pedido |
| `PATCH` | `/orders/:orderId` | Atualiza o status de um pedido |
| `DELETE` | `/orders/:orderId` | Remove um pedido |

**Status de um pedido:**
```
WAITING → IN_PRODUCTION → DONE
```

## Estrutura de pastas

```
src/
├── index.ts               # Inicialização do servidor e conexão com o banco
├── router.ts              # Definição das rotas
└── app/
    ├── models/            # Schemas do Mongoose
    │   ├── Category.ts
    │   ├── Product.ts
    │   └── Order.ts
    └── useCases/          # Lógica de negócio por recurso
        └── categories/
            ├── listCategories.ts
            ├── createCategory.ts
            └── deleteCategory.ts
```
