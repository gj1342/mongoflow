# Credits & Acknowledgments

## AI Agent Workflow

The AI agent workflow system used in this template is adapted from [**git-dariel/mongo**](https://github.com/git-dariel/mongo) by Dariel Avila.

### Original Repository
- **Repository**: [git-dariel/mongo](https://github.com/git-dariel/mongo)
- **Author**: Dariel Avila ([@git-dariel](https://github.com/git-dariel))
- **License**: GPL-3.0
- **Description**: A robust and scalable MongoDB template using Express.js and TypeScript

### What Was Adapted

From the original repository, we adapted:
- AI agent workflow structure (`ai/` folder)
- Agent role definitions (PROJECT_PLANNER, PM, ARCHITECT, DEVELOPER, QA, SECURITY, REVIEWER)
- Task tracking methodology (TODO.md)
- Architecture documentation approach (ARCHITECTURE.md)
- Code quality rules (RULES.md)
- Workflow integration patterns

### Modifications Made

This template extends the original concept with:
- Stricter layered architecture (models → repositories → services → controllers → routes)
- Enhanced security considerations and DNS fix for MongoDB Atlas
- Swagger/OpenAPI documentation integration
- TypeScript strict mode with ES modules
- Additional middleware patterns (asyncHandler, centralized error handling)
- Comprehensive ROADMAP for future scaling
- Zero-comments code philosophy with self-documenting patterns

## Dependencies

This project uses the following open-source packages:

### Core Dependencies
- **Express.js** - Fast, unopinionated web framework for Node.js
- **Mongoose** - MongoDB object modeling for Node.js
- **TypeScript** - Typed superset of JavaScript
- **dotenv** - Environment variable management
- **cors** - Cross-Origin Resource Sharing middleware

### Documentation
- **swagger-jsdoc** - Generates OpenAPI specification from JSDoc comments
- **swagger-ui-express** - Serves Swagger UI for API documentation

### Development Tools
- **tsx** - TypeScript execution and REPL for Node.js
- **nodemon** - Auto-restart development server on file changes

## Inspiration & Resources

- **Express.js Documentation**: [https://expressjs.com/](https://expressjs.com/)
- **MongoDB Documentation**: [https://docs.mongodb.com/](https://docs.mongodb.com/)
- **Mongoose Documentation**: [https://mongoosejs.com/](https://mongoosejs.com/)
- **TypeScript Documentation**: [https://www.typescriptlang.org/](https://www.typescriptlang.org/)
- **OpenAPI Specification**: [https://swagger.io/specification/](https://swagger.io/specification/)

## Contributing

If you'd like to contribute improvements back to this template or the original git-dariel/mongo repository, please follow their respective contribution guidelines.

## License

This template is licensed under the MIT License. See [LICENSE](LICENSE) for details.

The original git-dariel/mongo repository is licensed under GPL-3.0.
