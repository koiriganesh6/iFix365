export const errorHandler = (err, _req, res, _next) => {
  console.error(err.message);
  res.status(err.status || 500).json({ message: err.clientMessage || 'Something went wrong. Please try again.' });
};
