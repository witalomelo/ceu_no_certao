import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Famílias',
      version: '1.0.0',
      description: 'Familias do sertao'
    },
    servers: [
      {
        url: 'http://localhost:3000', 
      },
    ],
  },
  apis: ['./src/docs/swaggerDocs.js'], 
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
