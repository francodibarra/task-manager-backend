// models/taskModel.js
import Joi from "joi";

const taskSchema = Joi.object({
  id: Joi.string().guid({ version: "uuidv4" }).required(),
  title: Joi.string().min(1).max(255).required(),
  description: Joi.string().allow("", null),
  created_at: Joi.date().iso().required(),
});

export default taskSchema;
