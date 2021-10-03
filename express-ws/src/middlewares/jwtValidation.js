import HttpStatus from "http-status-codes";
import { verifyToken } from "../utils/jwt";
import User from "../models/user";

export const require = (req, res, next) => {
  try {
    if (req.headers.authorization) {
      let authorization = req.headers.authorization.split(" ");
      if (authorization[0] !== "Bearer") {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          description: "Token is invalid",
        });
      }
      req.jwt = authorization[1];
      return next();
    } else {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        description: "No token provided",
      });
    }
  } catch (error) {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: "an error ocurred",
    });
  }
};

export const validate = (req, res, next) => {
  require(req, res, async () => {
    try {
      verifyToken(
        req.jwt,
        async (payload) => {
          req.user = payload.data;
          req.realUser = await User.findOne({
            email: req.user.email,
          });

          if (!req.realUser)
            return res.status(HttpStatus.UNAUTHORIZED).json({
              message: "Access forbidden",
            });
          return next();
        },
        () => {
          return res.status(HttpStatus.UNAUTHORIZED).json({
            message: "Token has expired",
          });
        }
      );
    } catch (error) {
      console.log("error", error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: "An error ocurred in validate",
      });
    }
  });
};
