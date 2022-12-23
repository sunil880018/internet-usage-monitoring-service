import { dbConnection } from "../database/db.js";
import { User } from "../models/user.js";
describe("search_user_internet_usage", () => {
  beforeAll(() => {
    dbConnection();
  });

  it("search_user_internet_usage", async () => {
    const mockUser = { name: "John" };
    const user = await User.findOne({ name: mockUser.name });
    expect({ name: user.name }).toEqual(mockUser);
  });
});


