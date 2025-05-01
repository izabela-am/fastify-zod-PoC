import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { fastify } from "fastify";
import { fastifyCors } from "@fastify/cors";
import {
  validatorCompiler,
  serializerCompiler,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";

import { routes } from "./routes";

const app = fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, { origin: "*" });

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Fastify + Zod PoC",
      version: "1.0.0",
    },
  },
  transform: jsonSchemaTransform
});

app.register(routes);

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.listen({ port: 3333 }).then(() => {
  console.log("Server is running on port 3333");
});
