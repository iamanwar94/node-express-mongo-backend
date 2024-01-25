const errorMiddleware = (err, req, res, next) => {
  const status = err.status || 500;
  const error = err.error || "server error";
  const message = err.message || "internal server error";

  return res.status(status).json({ error, message });
};
module.exports = errorMiddleware;
