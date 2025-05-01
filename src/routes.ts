import z from "zod";
import type { FastifyTypedInstance } from "./types";
import { randomUUID } from "node:crypto";

interface User {
  id: string;
  name: string;
  email: string;
}

const db: Array<User> = [];

export async function routes(app: FastifyTypedInstance) {
  app.get(
    "/users",
    {
      schema: {
        tags: ["users"],
        description: "list users",
        response: {
          200: z.array(z.object({
            id: z.string(),
            name: z.string(),
            email: z.string()
          }))
        }
      },
    },
    () => {
      return db;
    },
  );

  app.post(
    "/users",
    {
      schema: {
        tags: ["users"],
        description: "Create new user",
        body: z.object({
          name: z.string(),
          email: z.string().email(),
        }),
        response: {
          201: z.null().describe('User created successfully')
        }
      },
    },
    async (request, response) => {
      const { name, email } = request.body;

      db.push({
        id: randomUUID(),
        name,
        email,
      });

      return response.status(201).send();
    },
  );
}
