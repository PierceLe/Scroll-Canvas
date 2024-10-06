serve-backend:
	@cd backend && docker compose up --build

serve-frontend:
	@cd frontend && npm install && npm run dev