#!/bin/bash

# Enable Docker BuildKit for faster builds
export DOCKER_BUILDKIT=1
export COMPOSE_DOCKER_CLI_BUILD=1

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Building and Testing Docker Setup (with BuildKit)${NC}\n"

# Check if docker is installed
if ! command -v docker &> /dev/null; then
    echo -e "${RED}❌ Docker is not installed${NC}"
    exit 1
fi

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo -e "${RED}❌ Docker Compose is not installed${NC}"
    exit 1
fi

# Create .env.production if it doesn't exist
if [ ! -f .env.production ]; then
    echo -e "${YELLOW}⚠️  .env.production not found, creating from template...${NC}"
    cp .env.production.example .env.production 2>/dev/null || true
fi

echo -e "${GREEN}📦 Building Docker images...${NC}"
docker-compose build

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Build successful!${NC}\n"
else
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi

echo -e "${GREEN}🚀 Starting containers...${NC}"
docker-compose up -d

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Containers started!${NC}\n"
else
    echo -e "${RED}❌ Failed to start containers${NC}"
    exit 1
fi

echo -e "${GREEN}⏳ Waiting for services to be ready...${NC}"
sleep 10

# Check if services are running
echo -e "\n${GREEN}📊 Container Status:${NC}"
docker-compose ps

echo -e "\n${GREEN}🔍 Recent logs:${NC}"
docker-compose logs --tail=20

echo -e "\n${GREEN}✨ Deployment complete!${NC}"
echo -e "
${GREEN}Access your application:${NC}
  - Homepage: http://localhost:3000
  - Tutorials: http://localhost:3000/tutorials
  - Admin: http://localhost:3000/admin/tutorials
  - Login: http://localhost:3000/auth/login

${YELLOW}Next steps:${NC}
  1. Go to http://localhost:3000/admin/tutorials
  2. Login with your admin credentials
  3. Click '🗄️ Инициализировать БД' to initialize the database

${YELLOW}Useful commands:${NC}
  - View logs: docker-compose logs -f
  - Stop: docker-compose down
  - Restart: docker-compose restart
"
