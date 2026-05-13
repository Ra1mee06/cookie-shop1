docker compose up -d --build

docker compose down

docker compose ps
docker compose logs app-init
docker compose logs app

docker exec cookie-shop-postgres psql -U postgres -d postgres -c "ALTER USER postgres WITH PASSWORD 'admin123';"

cd client-vue
npm install
npm run dev


cd backend
npm run lint
npm run build

docker compose -f "e:\cursach\cookie-shop\docker-compose.yml" down
docker volume rm cookie-shop_pgadmin_data
docker compose -f "e:\cursach\cookie-shop\docker-compose.yml" up -d pgadmin