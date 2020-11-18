import * as jwt from "jsonwebtoken";

export const checkTokenSetUser = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split("Bearer ")[1];
    if (token) {
      jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
          return next(err);
        } else {
          req['user'] = decoded;
          return next();
        }
      });
    } else {
      return next();
    }
  } else {
    return next();
  }
};

export const authorize = (req, res, next) => {
  if (req['user']) {
    return next();
  } else {
    return next(new Error("Not authorized"));
  }
};

export const errorHandler = (err, req, res, next) => {
  let validationErrors = (errors) => {
    if (Array.isArray(errors)) {
      return errors.map((error) => {
        for (err in error.constraints) {
          return error.constraints[err];
        }
      });
    } else {
      return null;
    }
  };

  res.status(500);
  res.json({
    message: err.message,
    stack: err.stack,
    validationErrors: validationErrors(err),
  });
};

export const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Not found - ${req.originalUrl}`));
};
