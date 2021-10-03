import Status from "http-status-codes";
import User from "../../models/user";
import { check } from "../../utils/bcrypt";
import { createToken } from "../../utils/jwt";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(Status.BAD_REQUEST).json({
        message: "no email or password",
      });

    const user = await User.findOne({ email });
    if (!(user && check(password, user.password)))
      return res.status(Status.UNAUTHORIZED).json({
        message: "wrong email or password",
      });

    const userData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    userData.token = createToken(user);

    return res.status(Status.OK).json({
      message: "Login successful",
      data: userData,
    });
  } catch (error) {
    return res.status(Status.INTERNAL_SERVER_ERROR).json({
      message: error.message || error,
    });
  }
};

export const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user)
      return res.status(Status.BAD_REQUEST).json({
        message: "El correo ya existe",
      });

    const createdUser = await User.create(req.body);

    const userData = {
      firstName: createdUser.firstName,
      lastName: createdUser.lastName,
      email: createdUser.email,
    };

    userData.token = createToken(userData);

    return res.status(Status.CREATED).json({
      message: "Registration successful",
      data: userData,
    });
  } catch (error) {
    return res.status(Status.INTERNAL_SERVER_ERROR).json({
      message: "error",
      error: error.message,
    });
  }
};
