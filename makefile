serve-backend:
	@cd backend && docker compose up --build

serve-frontend:
	@cd frontend && docker compose up --build

run-test:
	@cd backend && ./gradlew build test JacocoTestReport
