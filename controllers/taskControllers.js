// controllers/taskControllers.js
import { v4 as uuidv4 } from "uuid";
import taskSchema from "../models/taskModel.js";

export const createTask = async (request, reply) => {
  const { title, description } = request.body;
  const id = uuidv4();
  const created_at = new Date().toISOString();

  const task = { id, title, description, created_at };

  const { error } = taskSchema.validate(task);
  if (error) {
    return reply.code(400).send({ error: error.details[0].message });
  }

  try {
    const client = await request.server.pg.connect();
    await client.query(
      "INSERT INTO tasks (id, title, description, created_at) VALUES ($1, $2, $3, $4)",
      [id, title, description, created_at]
    );
    client.release();
    return reply.code(201).send(task);
  } catch (err) {
    request.log.error(err);
    return reply.code(500).send({ error: "Error al crear la tarea" });
  }
};

export const getTasks = async (request, reply) => {
  try {
    const client = await request.server.pg.connect();
    const { rows } = await client.query(
      "SELECT * FROM tasks ORDER BY created_at DESC"
    );
    client.release();
    return reply.send(rows);
  } catch (err) {
    request.log.error(err);
    return reply.code(500).send({ error: "Error al obtener las tareas" });
  }
};

export const getTaskById = async (request, reply) => {
  const { id } = request.params;

  try {
    const client = await request.server.pg.connect();
    const { rows } = await client.query("SELECT * FROM tasks WHERE id = $1", [
      id,
    ]);
    client.release();
    if (rows.length === 0) {
      return reply.code(404).send({ error: "Tarea no encontrada" });
    }
    return reply.send(rows[0]);
  } catch (err) {
    request.log.error(err);
    return reply.code(500).send({ error: "Error al obtener la tarea" });
  }
};

export const updateTask = async (request, reply) => {
  const { id } = request.params;
  const { title, description } = request.body;

  const updatedTask = {
    id,
    title,
    description,
    created_at: new Date().toISOString(),
  };

  const { error } = taskSchema.validate(updatedTask);
  if (error) {
    return reply.code(400).send({ error: error.details[0].message });
  }

  try {
    const client = await request.server.pg.connect();
    const { rowCount } = await client.query(
      "UPDATE tasks SET title = $1, description = $2 WHERE id = $3",
      [title, description, id]
    );
    client.release();
    if (rowCount === 0) {
      return reply.code(404).send({ error: "Tarea no encontrada" });
    }
    return reply.send({ message: "Tarea actualizada" });
  } catch (err) {
    request.log.error(err);
    return reply.code(500).send({ error: "Error al actualizar la tarea" });
  }
};

export const deleteTask = async (request, reply) => {
  const { id } = request.params;

  try {
    const client = await request.server.pg.connect();
    const { rowCount } = await client.query("DELETE FROM tasks WHERE id = $1", [
      id,
    ]);
    client.release();
    if (rowCount === 0) {
      return reply.code(404).send({ error: "Tarea no encontrada" });
    }
    return reply.send({ message: "Tarea eliminada" });
  } catch (err) {
    request.log.error(err);
    return reply.code(500).send({ error: "Error al eliminar la tarea" });
  }
};
