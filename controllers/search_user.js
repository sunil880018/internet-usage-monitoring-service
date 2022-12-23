import { User } from "../models/user.js";
import { InternetUsage } from "../models/internet_usage.js";
import { NotFoundError, BadRequestError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

const search_user_and_get_internet_usage = async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      throw new BadRequestError("Please provide user name");
    }
    const user = await User.findOne({ name: name });
    if (!user) {
      throw new NotFoundError(`${name} Not Found!`);
    }
    // joining the tables
    await InternetUsage.findById({ user_id: user._id })
      .populate({
        path: "user_id",
        select: "name create_at",
      })
      .then((user_internet_usage) => {
        return res.status(StatusCodes.OK).json({ user_internet_usage });
      })
      .catch(() => {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ ok: false, error: getReasonPhrase(StatusCodes.NOT_FOUND) });
      });
  } catch (error) {
    if (error.statusCode === 404) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({
          ok: false,
          error: error.message,
          statusCode: error.statusCode,
        });
    }
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ ok: false, error: error.message, statusCode: error.statusCode });
  }
};

export { search_user_and_get_internet_usage };
