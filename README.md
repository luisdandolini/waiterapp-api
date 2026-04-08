# WaiterApp API

REST API com suporte a tempo real para gerenciamento de pedidos de restaurante, construída com Node.js, Express e MongoDB.

## Tecnologias

- **Node.js** com **TypeScript**
- **Express 5**
- **MongoDB** com **Mongoose**
- **Socket.IO** (comunicação em tempo real)
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
| `GET` | `/categories/:categoryId/products` | Lista produtos de uma categoria |

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
| `POST` | `/products` | Cria um novo produto (multipart/form-data) |

**POST /products — campos:**

| Campo | Tipo | Descrição |
|---|---|---|
| `name` | string | Nome do produto |
| `description` | string | Descrição do produto |
| `price` | number | Preço |
| `category` | string | ID da categoria |
| `ingredients` | string (JSON) | Array de ingredientes |
| `image` | file | Imagem do produto |

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

## Eventos WebSocket

| Evento | Direção | Descrição |
|---|---|---|
| `orders@new` | Servidor → Cliente | Emitido quando um novo pedido é criado |

## Estrutura de pastas

```
src/
├── index.ts               # Inicialização do servidor, Socket.IO e conexão com o banco
├── router.ts              # Definição das rotas e configuração do Multer
└── app/
    ├── models/            # Schemas do Mongoose
    │   ├── Category.ts
    │   ├── Product.ts
    │   └── Order.ts
    └── useCases/          # Lógica de negócio por recurso
        ├── categories/
        │   ├── listCategories.ts
        │   ├── createCategory.ts
        │   ├── deleteCategory.ts
        │   └── listProductsByCategory.ts
        ├── products/
        │   ├── listProducts.ts
        │   └── createProduct.ts
        └── orders/
            ├── listOrders.ts
            ├── createOrder.ts
            ├── changeOrderStatus.ts
            └── deleteOrder.ts
```
