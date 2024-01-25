const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (error) {
    const errorObj = {
      status: 403,
      error: "validation error",
      message: error.errors[0].message,
    };
    next(errorObj);
  }
};

module.exports = validate;
