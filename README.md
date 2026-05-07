# Cookie Shop

Проект запускается из корня через Docker Compose:
- backend: `api-gateway`, `catalog-service`, `order-service`, `notification-worker`;
- инфраструктура: `mysql`, `redis`;
- frontend запускается отдельно из `client-vue`.

## Быстрый запуск из корня

1) Запустить backend-стек:

```bash
docker compose up -d --build
```

Что происходит автоматически при запуске:
- `app-init` контейнер выполняет `prisma:generate`, `prisma:deploy`;
- после успешного завершения `app-init` запускается `app` контейнер с API.

2) Остановить стек:

```bash
docker compose down
```

Проверить статус и логи:

```bash
docker compose ps
docker compose logs app-init
docker compose logs app
```

После запуска доступны:
- API Gateway: `http://localhost:18081/api`
- Catalog health: `http://localhost:18082/health`
- Order health: `http://localhost:18083/health`
- MySQL: `localhost:3307`
- Redis: `localhost:6380`

## Запуск frontend (Vue)

```bash
cd client-vue
npm install
npm run dev
```


Ручной прогон backend (опционально):

```bash
cd backend
npm run lint
npm run build
```

