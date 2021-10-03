import jwt from "jsonwebtoken";

const secretKey = "secret";

export const createToken = (data) => {
  let options = {
    expiresIn: "1h",
  };
  return jwt.sign({ data }, secretKey, options);
};

export const verifyToken = (token, onSuccess, onError) => {
  return jwt.verify(token, secretKey, (error, payload) => {
    if (error) onError(error);
    else onSuccess(payload);
  });
};
export const decode = (token) => jwt.decode(token);
