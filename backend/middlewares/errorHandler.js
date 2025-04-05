export const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.stack);

  // Handle specific error types
  if (err.code === "ER_DUP_ENTRY") {
    return res.status(409).json({
      error: "Database entry already exists",
      details: err.sqlMessage,
    });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation failed",
      details: err.message,
    });
  }

  // Handle JWT errors
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      error: "Invalid token",
    });
  }

  // Default error response
  res.status(err.statusCode || 500).json({
    error: err.message || "Internal Server Error",
  });
};
