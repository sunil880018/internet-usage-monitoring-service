import { InternetUsage } from "../models/internet_usage.js";
import { NotFoundError, BadRequestError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import { GenerateFutureDate } from "../utils/futureDate.js";
const search_top_user_and_get_internet_usage = async (req, res) => {
  const { date, limit, page } = req.query;
  try {
    if (!date || !limit || !page) {
      throw new BadRequestError("Please provide all details");
    }

    const pageNumber = parseInt(page);
    if (pageNumber <= 0) {
      throw new BadRequestError(`invalid page ${pageNumber}`);
    }

    const givenDate = new Date(
      `${date.substr(4, 4)}-${date.substr(2, 2)}-${date.substr(0, 2)}`
    );

    
    let takenFuturedate = GenerateFutureDate();
    const futureDate = new Date(
      `${takenFuturedate.substr(4, 4)}-${takenFuturedate.substr(
        2,
        2
      )}-${takenFuturedate.substr(0, 2)}`
    );

    if (givenDate.getTime() > futureDate.getTime()) {
      throw new BadRequestError(`invalid ${date}`);
    }
    const internet_usage_data = await InternetUsage.find()
      .sort({ usage_time: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    if (!internet_usage_data) {
      throw new NotFoundError("Not Found!");
    } else if (internet_usage_data.length === 0) {
      throw new NotFoundError("Page Size too large !");
    } else {
      const totalPages = InternetUsage.countDocuments() / limit;
      return res.status(StatusCodes.OK).json({
        internet_usage_data: internet_usage_data,
        pageDetails: {
          pageSize: limit,
          page: page,
          totalPages: Math.floor(parseInt(totalPages)),
        },
      });
    }
  } catch (error) {
    if (error.statusCode === 404) {
      return res.status(StatusCodes.NOT_FOUND).json({
        ok: true,
        error: error.message,
        statusCode: error.statusCode,
      });
    }
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ ok: false, error: error.message, statusCode: error.statusCode });
  }
};

export { search_top_user_and_get_internet_usage };
