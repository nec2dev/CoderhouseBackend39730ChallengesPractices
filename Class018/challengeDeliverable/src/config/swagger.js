import swaggerJsDoc from "swagger-jsdoc";
import { __dirname } from "../utils/utils.js";

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "CoderHouse eCommerce API Documentation",
      version: "1.0.0",
      description: "API Documentation for CoderHouse eCommerce Project",
    },
  },
  apis: [`${__dirname}/docs/**/*.yaml`],
};

export const swaggerSetup = swaggerJsDoc(swaggerOptions);
