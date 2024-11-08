// routes/tasks.js
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from '../controllers/taskControllers.js';

export default async function routes(fastify, options) {
  fastify.post('/tasks', createTask);
  fastify.get('/tasks', getTasks);
  fastify.get('/tasks/:id', getTaskById);
  fastify.put('/tasks/:id', updateTask);
  fastify.delete('/tasks/:id', deleteTask);
}
