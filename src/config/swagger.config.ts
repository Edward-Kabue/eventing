import { Options } from "swagger-jsdoc";

const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger",
      version: "1.0.0",
      description:
        "A REST API application made with Express and documented with Swagger",
      contact: {
        name: "API Support",
        email: "support@example.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        User: {
          type: "object",
          required: ["name", "email"],
          properties: {
            id: {
              type: "integer",
              description: "User ID auto-generated",
            },
            name: {
              type: "string",
              description: "User name",
            },
            email: {
              type: "string",
              format: "email",
              description: "User email",
            },
            role: {
              type: "string",
              description: "Admin, Vendor, or Customer",
            },
            password: {
              type: "string",
              description: "User password",
            },
            created_at: {
              type: "string",
              format: "date-time",
              description: "Creation date",
            },
            updated_at: {
              type: "string",
              format: "date-time",
              description: "Update date",
            },
          },
        },
        Error: {
          type: "object",
          properties: {
            error: {
              type: "string",
            },
            message: {
              type: "string",
            },
            details: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  field: {
                    type: "string",
                  },
                  message: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
        LoginRequest: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: {
              type: "string",
              format: "email",
            },
            password: {
              type: "string",
            },
          },
        },
        LoginResponse: {
          type: "object",
          properties: {
            token: {
              type: "string",
            },
          },
        },
        Event: {
          type: "object",
          required: [
            "title",
            "description",
            "date",
            "location",
            "capacity",
            "price",
          ],
          properties: {
            id: {
              type: "integer",
              description: "Event ID auto-generated",
            },
            title: {
              type: "string",
              description: "Event title",
            },
            description: {
              type: "string",
              description: "Event description",
            },
            date: {
              type: "string",
              format: "date-time",
              description: "Event date",
            },
            location: {
              type: "string",
              description: "Event location",
            },
            capacity: {
              type: "integer",
              description: "Event capacity",
            },
            price: {
              type: "number",
              description: "Event price",
            },
            creatorId: {
              type: "integer",
              description: "Event creator ID",
            },
            status: {
              type: "string",
              description: "Event status",
            },
            created_at: {
              type: "string",
              format: "date-time",
              description: "Creation date",
            },
            updated_at: {
              type: "string",
              format: "date-time",
              description: "Update date",
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Updated path for TypeScript files
};

export default options;
