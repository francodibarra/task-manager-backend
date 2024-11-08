import Fastify from "fastify";
import fastifyPostgres from "fastify-postgres";
import fastifyCors from '@fastify/cors';
import taskRoutes from "./routes/tasks.js";

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyCors, {
  origin: "*", // Permitir todas las fuentes
});

try {
  fastify.register(fastifyPostgres, {
    connectionString: process.env.DATABASE_URL,
  });
} catch (error) {
  console.log(error);
}

fastify.register(taskRoutes);

const port = 8000;
const start = async () => {
  try {
    await fastify.listen({ port });
    console.log(`Server run in http://localhost:${port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
