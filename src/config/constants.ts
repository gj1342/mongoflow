export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
} as const;

export const MESSAGES = {
  SUCCESS: {
    CREATED: 'Resource created successfully',
    UPDATED: 'Resource updated successfully',
    DELETED: 'Resource deleted successfully',
    FETCHED: 'Resource fetched successfully',
  },
  ERROR: {
    NOT_FOUND: 'Resource not found',
    ALREADY_EXISTS: 'Resource already exists',
    INVALID_INPUT: 'Invalid input provided',
    INTERNAL_SERVER: 'Internal server error',
    DATABASE_CONNECTION: 'Database connection failed',
    UNAUTHORIZED: 'Unauthorized access',
    FORBIDDEN: 'Forbidden action',
    VALIDATION_FAILED: 'Validation failed',
  },
  VALIDATION: {
    REQUIRED_FIELD: 'This field is required',
    INVALID_EMAIL: 'Invalid email format',
    INVALID_ID: 'Invalid ID format',
    MIN_LENGTH: 'Minimum length not met',
    MAX_LENGTH: 'Maximum length exceeded',
    POSITIVE_NUMBER: 'Value must be a positive number',
    NON_NEGATIVE_NUMBER: 'Value must be non-negative',
  },
} as const;

export const DATABASE = {
  MAX_RETRY_ATTEMPTS: 5,
  RETRY_INTERVAL_MS: 5000,
  CONNECTION_TIMEOUT_MS: 10000,
} as const;

export const SERVER = {
  DEFAULT_PORT: 3000,
  CORS_ORIGIN: '*',
  REQUEST_LIMIT: '10mb',
} as const;
