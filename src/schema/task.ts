import Joi from "joi";

export const createTaskBodySchema = Joi.object({
  taskName: Joi.string().required().messages({
    "any.required": "Title must be a string",
  }),
  isCompleted: Joi.boolean().optional().messages({
    "boolean.base": "isCompleted must be a boolean",
  }),
}).options({ stripUnknown: true });

export const updateTaskBodySchema = Joi.object({
  taskName: Joi.string().optional().messages({
    "any.required": "Title must be a string",
  }),
  isCompleted: Joi.boolean().optional().messages({
    "boolean.base": "isCompleted must be a boolean",
  }),
}).options({ stripUnknown: true });

export const taskIdSchema = Joi.object({
  id: Joi.number().required().messages({
    "number.base": "Id must be a number",
    "any.required": "Id is required",
  }),
}).options({ stripUnknown: true });
