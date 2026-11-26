import { celebrate, Joi, Segments } from "celebrate";

const text = Joi.string().allow("");

export const validateMovieBody = celebrate({
  body: Joi.object().keys({
    movie_id: Joi.number().integer().required(),
    title: text.required(),
    action: text.required(),
    user_id: Joi.number().integer(),
    rating: Joi.number(),
    genres: Joi.array().items(text),
    description: text,
  }).unknown(true).required()
});

export const validateUserBody = celebrate({
  body: Joi.object().keys({
    user_id: Joi.number().integer().required(),
    action: text.required(),
    timestamp: Joi.string().required(),
    username: text,
    email: text,
  }).unknown(true).required()
});

export const validatePaymentBody = celebrate({
  body: Joi.object().keys({
    payment_id: Joi.number().integer().required(),
    user_id: Joi.number().integer().required(),
    amount: Joi.number().required(),
    status: text.required(),
    timestamp: Joi.string().required(),
    method_type: text,
  }).unknown(true).required()
});
