import { fastify } from 'fastify';
import { fastifyCors } from '@fastify/cors';

const app = fastify();

app.listen({ port: 3333 }).then(() => {
  console.log('Server is running on port 3333');
});
