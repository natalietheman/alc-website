# alc-website

LLM retrieval based search engine for liver cancer resources.

## Installation

Please install this application using Docker.

### Getting Started with Docker (Recommended)

1. Ensure Docker and Docker Compose are installed and running on your system.

2. Clone the repository:
   ```bash
   git clone https://github.com/serena2z/alc-website.git
   cd alc-website
   ```

3. Configure the application:
   Rename `sample.config.toml` to `config.toml` (if it doesn't exist already) and fill in the OpenAI API key:

   ```toml
   # API Keys for LLM providers
   [api]
   openai = "your-openai-api-key"  # Required if using OpenAI models   
   ```

4. Build and start the Docker containers:
   ```bash
   docker-compose up -d
   ```

5. The application will be available at `http://localhost:3000` (or the port configured in your setup).

### Running Without Docker

1. Ensure you have Node.js (v16 or higher) installed.

2. Clone the repository:
   ```bash
   git clone https://github.com/your-username/alc-website.git
   cd alc-website
   ```

3. Install dependencies:
   ```bash
   # Install frontend dependencies
   cd ui
   npm install
   
   # Install backend dependencies
   cd ../backend
   npm install
   ```

4. Configure the application:
   Copy `sample.config.toml` to `config.toml` and update it with your configuration.

5. Start the application:
   ```bash
   # Start backend
   cd backend
   npm run start
   
   # In a new terminal, start frontend
   cd ui
   npm run dev
   ```

6. The application will be available at `http://localhost:3000` for the frontend and `http://localhost:8000` (or your configured port) for the backend.

7. You will need the searxng docker image regardless for the website to work, so docker installlation is recommended.

