# MongoFlow - Mongoose Backend Template

A production-ready Express.js + Mongoose backend template featuring layered architecture, TypeScript, and comprehensive AI agent workflow integration.

## Features

- **Layered Architecture**: Clean separation of concerns with models, repositories, services, controllers, and routes
- **TypeScript**: Full type safety with strict mode enabled
- **Error Handling**: Centralized error handling with custom error classes
- **SOLID Principles**: Single responsibility, dependency injection, interface segregation
- **DRY Code**: Reusable utilities, shared constants, no code duplication
- **AI Agent Workflow**: Integrated workflow system for structured development
- **Zero Comments**: Self-documenting code through clear naming and structure
- **Security First**: Environment variables, input validation, sanitized error messages

## Tech Stack

- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js 5.x
- **Database**: MongoDB with Mongoose ODM
- **Development**: Nodemon, ts-node
- **Type Safety**: TypeScript 5.x with strict mode

## Project Structure

```
mongoflow/
├── src/
│   ├── config/           # Configuration (constants, environment, database)
│   ├── models/           # Mongoose schemas and models
│   ├── repositories/     # Data access layer
│   ├── services/         # Business logic layer
│   ├── controllers/      # HTTP request/response handlers
│   ├── routes/           # API route definitions
│   ├── middlewares/      # Express middlewares
│   └── utils/            # Shared utilities
├── ai/                   # AI agent workflow documentation
│   ├── agents/           # Agent role definitions
│   ├── ARCHITECTURE.md   # System architecture
│   ├── RULES.md          # Coding standards
│   └── TODO.md           # Task tracking
├── .cursor/rules/        # Cursor AI rules
├── .env.example          # Environment variables template
├── ROADMAP.md            # Future enhancements
└── package.json
```

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- MongoDB 6+ running locally or remote instance

### Installation

1. Clone the template:
```bash
git clone <repository-url> my-backend
cd my-backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017
DB_NAME=your_database_name
```

4. Start development server:
```bash
npm run dev
```

The server will start at `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm start` - Run production build
- `npm run typecheck` - Type check without emitting files

## API Endpoints

### API Documentation

Interactive API documentation is available via Swagger UI:

```
http://localhost:3000/api-docs
```

The Swagger UI provides:
- Complete API specification
- Interactive endpoint testing
- Request/response schemas
- Example payloads

### Health Check
```
GET /health
```

### Products API
```
GET    /api/products      - Get all products
GET    /api/products/:id  - Get product by ID
POST   /api/products      - Create new product
PUT    /api/products/:id  - Update product
DELETE /api/products/:id  - Delete product
```

### Example Request
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Sample Product",
    "description": "A sample product description",
    "price": 29.99,
    "stock": 100
  }'
```

## Architecture

### Layered Architecture

The template follows a strict layered architecture with clear separation of concerns:

**Request Flow**:
```
Client → Route → Controller → Service → Repository → Model → MongoDB
```

**Layer Responsibilities**:

- **Models**: Mongoose schemas, data validation, database structure
- **Repositories**: Database operations (CRUD), data access abstraction
- **Services**: Business logic, data transformation, validation rules
- **Controllers**: HTTP handling, request parsing, response formatting
- **Routes**: Endpoint definitions, route composition

### SOLID Principles

- **Single Responsibility**: Each layer handles one concern
- **Open/Closed**: Extend functionality without modifying existing code
- **Liskov Substitution**: Repository interfaces allow implementation swapping
- **Interface Segregation**: Focused interfaces per entity
- **Dependency Inversion**: Depend on abstractions, not concrete implementations

### Error Handling

All errors flow through a centralized error handler:

```typescript
throw new AppError('Resource not found', HTTP_STATUS.NOT_FOUND);
```

Errors are automatically caught and formatted by the error handler middleware.

## AI Agent Workflow

This template includes an AI agent workflow system for structured development:

### Agents

- **PP (Project Planner)**: Break down features into tasks
- **PM**: Assign and track tasks
- **ARCH (Architect)**: Design decisions and architecture
- **DEV (Developer)**: Implementation
- **QA**: Testing and quality assurance
- **SEC (Security)**: Security review
- **REV (Reviewer)**: Final validation

### Usage

```bash
# Example: Planning a new feature
PP: add user authentication

# Example: Implementing a task
DEV: implement task 008

# Example: Reviewing changes
REV: review task 008
```

See [ai/README.md](ai/README.md) for complete workflow documentation.

## Development Guidelines

### Code Standards

- **No Comments**: Code must be self-documenting through clear naming
- **TypeScript Strict**: All code must pass strict type checking
- **Error Handling**: Use AppError for all operational errors
- **Response Format**: Use response utilities for consistent API responses
- **Constants**: Hardcoded values in config/constants.ts
- **Async/Await**: Use asyncHandler wrapper for all async controllers

### Adding New Entities

1. Create model in `src/models/`
2. Create repository in `src/repositories/`
3. Create service in `src/services/`
4. Create controller in `src/controllers/`
5. Create routes in `src/routes/`
6. Register routes in `src/routes/index.ts`

Example following the Product entity pattern.

### Security

- Never commit `.env` files
- Validate all user inputs
- Sanitize error messages (no stack traces in production)
- Use environment variables for secrets
- Run `npm audit` regularly

## Scaling

See [ROADMAP.md](ROADMAP.md) for planned enhancements:

- JWT Authentication & RBAC
- Request validation (Zod/Joi)
- Rate limiting & caching
- File uploads & background jobs
- Testing suite (unit, integration, e2e)
- Docker & CI/CD
- Logging & monitoring
- Database migrations

## Contributing

1. Follow the layered architecture pattern
2. Maintain SOLID and DRY principles
3. No comments in code
4. Update ARCHITECTURE.md for design decisions
5. Add tasks to TODO.md
6. Get security review for sensitive changes

## License

MIT

## Acknowledgments

The AI agent workflow system in this template is adapted from [git-dariel/mongo](https://github.com/git-dariel/mongo), a robust MongoDB template with Express.js and TypeScript by Dariel Avila.

For detailed credits and attributions, see [CREDITS.md](CREDITS.md).

## Support

For issues and questions, please refer to the AI agent workflow documentation in the `ai/` folder.
# mongoflow
