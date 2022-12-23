import { dbConnection } from "../database/db.js";
import { User } from "../models/user.js";
describe("search_top_user_internet_usage", () => {
  beforeAll(() => {
    dbConnection();
  });

  it("search_top_user_internet_usage", async () => {
    const mockUser = { name: "John" };
    const user = await User.findOne({ name: mockUser.name });
    const internet_usage_user = await InternetUsage.findOne({user_id:user._id});
    expect({ id: internet_usage_user.user_id }).toEqual({id:user._id});
  });
});


