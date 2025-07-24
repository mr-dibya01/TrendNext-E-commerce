const Joi=require("joi");

module.exports.registerSchema=Joi.object({
    username: Joi.string().min(3).max(30).required(),
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    contact: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      'string.pattern.base': `Contact number must be 10 digits.`,
    }),
});

module.exports.loginSchema=Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
});


module.exports.addressSchema=Joi.object({
  name: Joi.string().min(3).max(30).required() ,
  contact: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
    'string.pattern.base': `Contact number must be 10 digits.`,
  }),
  pincode: Joi.string().pattern(/^[0-9]{6}$/).required().messages({
    'string.pattern.base': 'PIN code must be exactly 6 digits.',
    'string.empty': 'PIN code is required.',
  }),
  streetName: Joi.string().required(),
  address: Joi.string().required(),
  district: Joi.string().required(),
  state: Joi.string().required(),
  landmark: Joi.string().required(),
  addressType: Joi.string().valid('home', 'office').required()
});

module.exports.productSchema=Joi.object({
  title: Joi.string().min(3).required().messages({
    'string.base': `"title" should be a type of 'text'`,
    'string.empty': `"title" cannot be empty`,
    'any.required': `"title" is a required field`
  }),
  price: Joi.number().min(0).required(),
  description: Joi.string().min(10).required(),
  image: Joi.array().items(
    Joi.object({ 
      url: Joi.string().uri().required(),
      filename: Joi.string().required(),
    })
  ).optional(),
  gender: Joi.string().valid("Male","Female","Others").required(),
  category: Joi.string().required(),
  bestseller: Joi.boolean().optional(),
  discount: Joi.number().required(),
  sizes: Joi.array().items(Joi.string().valid("XS", "S", "M", "L", "XL", "XXL")),
  rating: Joi.object({
    rate: Joi.number().min(0).max(5).optional(),
    count: Joi.number().min(0).optional()
  }).optional()
});