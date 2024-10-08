const errorHandler = (err, req, res, next) => {
  const { status = 500, message = "Something went wrong", data = null } = err;

  res.status(status).json({
    status,
    message,
    data: err.message || data,
  });

  next();
};

export default errorHandler;
