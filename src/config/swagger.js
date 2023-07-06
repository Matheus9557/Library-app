const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API da Biblioteca',
      version: '1.0.0',
      description: 'Uma API para gerenciar livros e usuários em uma biblioteca.',
    },
    servers: [
      {
        url: 'http://localhost:3000/api/v1',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Book: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'Título do livro.',
              example: 'O Senhor dos Anéis',
            },
            author: {
              type: 'string',
              description: 'Autor do livro.',
              example: 'J.R.R. Tolkien',
            },
            isbn: {
              type: 'string',
              description: 'ISBN do livro.',
              example: '9780345339706',
            },
          },
        },
        NewBook: {
          allOf: [
            {
              $ref: '#/components/schemas/Book',
            },
            {
              type: 'object',
              properties: {
                category_id: {
                  type: 'integer',
                  description: 'ID da categoria do livro.',
                  example: 1,
                },
              },
            },
          ],
        },
        GetBook: {
          allOf: [
            {
              type: 'object',
              properties: {
                id: {
                  type: 'integer',
                  description: 'ID do livro.',
                  example: 1,
                },
                category: {
                  type: 'string',
                  description: 'Nome da categoria do livro.',
                  example: 'Fantasia',
                },
              },
            },
            {
              $ref: '#/components/schemas/Book',
            },
          ],
        },
        BookId: {
          type: 'object',
          properties: {
            bookId: {
              type: 'integer',
              description: 'ID do livro criado.',
              example: 1,
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Nome do usuário.',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              description: 'Email do usuário.',
              example: 'john@example.com',
            },
            password: {
              type: 'string',
              description: 'Senha do usuário.',
              example: 'password123',
            },
          },
        },
        Token: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'Token de autenticação JWT.',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./routes/booksAPI.js', './routes/usersAPI.js'],
};

const swaggerDocs = swaggerJsDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
