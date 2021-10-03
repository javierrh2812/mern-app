import Status from "http-status-codes";
import User from "../../models/user";

export const listUsers = async (req, res) => {
  try {
    const users = await User.find().select("firstName lastName avatarUrl");
    return res.status(Status.OK).json({
      message: "users fetched successfully",
      data: users,
    });
  } catch (error) {
    return res.status(Status.INTERNAL_SERVER_ERROR).json({
      message: error.message || error,
    });
  }
};

export const getUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user)
      return res.status(Status.BAD_REQUEST).json({
        message: "El usuario no existe",
      });

    return res.status(Status.CREATED).json({
      message: "user fetched succesfully",
      data: user,
    });
  } catch (error) {
    return res.status(Status.INTERNAL_SERVER_ERROR).json({
      message: "error",
      error: error.message,
    });
  }
};
export const updateUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user)
      return res.status(Status.BAD_REQUEST).json({
        message: "El usuario no existe",
      });

    user = await User.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    );
    return res.status(Status.CREATED).json({
      message: "user updated succesfully",
      data: user,
    });
  } catch (error) {
    return res.status(Status.INTERNAL_SERVER_ERROR).json({
      message: "error",
      error: error.message,
    });
  }
};
