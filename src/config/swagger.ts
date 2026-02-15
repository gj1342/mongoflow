import swaggerJsdoc from 'swagger-jsdoc';
import { env } from './environment.js';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MongoFlow API',
      version: '1.0.0',
      description: 'Express + Mongoose backend template with layered architecture',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: `http://localhost:${env.port}`,
        description: 'Development server',
      },
    ],
    tags: [
      {
        name: 'Health',
        description: 'Health check endpoints',
      },
      {
        name: 'Products',
        description: 'Product management endpoints',
      },
    ],
    components: {
      schemas: {
        Product: {
          type: 'object',
          required: ['name', 'description', 'price', 'stock'],
          properties: {
            _id: {
              type: 'string',
              description: 'Product ID',
              example: '507f1f77bcf86cd799439011',
            },
            name: {
              type: 'string',
              description: 'Product name',
              minLength: 3,
              maxLength: 100,
              example: 'Wireless Mouse',
            },
            description: {
              type: 'string',
              description: 'Product description',
              minLength: 10,
              maxLength: 500,
              example: 'High-precision wireless mouse with ergonomic design',
            },
            price: {
              type: 'number',
              description: 'Product price',
              minimum: 0,
              example: 29.99,
            },
            stock: {
              type: 'number',
              description: 'Available stock quantity',
              minimum: 0,
              example: 100,
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Creation timestamp',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp',
            },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            message: {
              type: 'string',
              example: 'Resource fetched successfully',
            },
            data: {
              type: 'object',
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              example: 'Resource not found',
            },
            stack: {
              type: 'string',
              description: 'Stack trace (only in development)',
            },
          },
        },
      },
      responses: {
        BadRequest: {
          description: 'Bad request',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
        NotFound: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
        InternalServerError: {
          description: 'Internal server error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse',
              },
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
