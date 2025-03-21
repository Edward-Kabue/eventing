#!/bin/bash
set -e

# Check if running on Windows and use appropriate commands
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    COPY_CMD="copy"
    NODE_CMD="node.exe"
else
    COPY_CMD="cp"
    NODE_CMD="node"
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    $COPY_CMD .env.example .env
    echo "Created .env file from .env.example"
fi

# Install dependencies
echo "Installing dependencies..."
npm ci

# Build the project
echo "Building project..."
npm run build

# Choose development environment
echo "Choose your development environment:"
echo "1) Docker Compose"
echo "2) Local Kubernetes (requires Docker Desktop with Kubernetes enabled)"
read -p "Enter choice (1 or 2): " choice

case $choice in
    1)
        echo "Starting Docker Compose environment..."
        docker-compose up -d
        ;;
    2)
        echo "Starting Kubernetes environment..."
        make k8s-up
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac

echo "Development environment setup complete!"
echo "Run 'npm run dev' to start the development server"